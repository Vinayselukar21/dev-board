"use client";
import axios from "@/utils/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  session: any;
  loading: boolean;
  signUpWithCredentials: (values: {
    email: string;
    name: string;
    password: string;
  }) => Promise<void>;
  loginWithCredentials: (values: {
    email: string;
    password: string;
  }) => Promise<void>;
  logoutUser: () => Promise<void>;
}

interface WorkspaceMember {
  id: string;
  role: 'admin' | 'member' | 'viewer'; // Add other roles if needed
  invitedAt: string; // ISO string (use `Date` if you prefer to parse it)
  accepted: boolean;
  userId: string;
  workspaceId: string;
  departmentId: string;
};


export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  authStatus: "authenticated" | "unauthenticated";
  user: {
    email: string;
    name: string;
    id: number;
    avatar: string | null;
    memberships: WorkspaceMember[];
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // default to true
  const [session, setSession] = useState<any>(undefined);

  // 🔁 Load session from session storage on first mount
  useEffect(() => {
    const sessionString = sessionStorage.getItem("session");
    if (sessionString) {
      setSession(JSON.parse(sessionString));
    }
  }, []);

  // 🔁 Auto-validate user if cookie exists
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<AuthResponse>("/auth/me");
        if (res.data.authStatus === "authenticated") {
          const userSession = {
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            avatar: res.data.user?.avatar,
            authStatus: res.data.authStatus,
            memberships: res.data.user.memberships,
          };
          setSession(userSession);
          sessionStorage.setItem("session", JSON.stringify(userSession));
        } else {
          setSession(undefined);
          sessionStorage.removeItem("session");
        }
      } catch (err) {
        setSession(undefined);
        sessionStorage.removeItem("session");
        if (window.location.pathname !== "/login") {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (session === undefined) {
      fetchUser();
    }
  }, [session]);

  // 🔐 Store session changes in session storage
  useEffect(() => {
    if (session) {
      sessionStorage.setItem("session", JSON.stringify(session));
    } else {
      sessionStorage.removeItem("session");
    }
  }, [session]);

  const loginWithCredentials = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post<AuthResponse>("/auth/login", values);
      if (response.data.authStatus === "authenticated") {
        const userSession = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          avatar: response.data.user?.avatar,
          authStatus: response.data.authStatus,
          memberships: response.data.user.memberships,
        };
        setSession(userSession);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithCredentials = async (values: {
    email: string;
    name: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post<AuthResponse>("/auth/register", values);
      if (response.data.authStatus === "authenticated") {
        const userSession = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          avatar: response.data.user?.avatar,
          authStatus: response.data.authStatus,
        };
        setSession(userSession);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await axios.post("/auth/logout");
      setSession(undefined);
      sessionStorage.removeItem("session");
      router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signUpWithCredentials,
        loginWithCredentials,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
