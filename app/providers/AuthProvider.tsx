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
export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  authStatus: "authenticated" | "unauthenticated"; // you can expand this if needed
  user: {
    email: string;
    name: string;
    id: number;
    avatar: string | null;
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
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  // ✅ Auto-fetch user if cookie is present
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<AuthResponse>("/auth/me");
        if (res.data.authStatus === "authenticated") {
          setSession({
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            avatar: res.data.user?.avatar,
            authStatus: res.data.authStatus,
          });
        }
      } catch (err) {
        setSession(null); // not authenticated
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const loginWithCredentials = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post<AuthResponse>("/auth/login", values);
      if (response.data.authStatus === "authenticated") {
        setSession({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          avatar: response.data.user?.avatar,
          authStatus: response.data.authStatus,
        });
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
        setSession({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          avatar: response.data.user?.avatar,
          authStatus: response.data.authStatus,
        });
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
      setSession(null);
      // console.log("logout successfull");
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
