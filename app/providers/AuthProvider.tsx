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
    contactNo: string | null;
    location: string | null;
  }) => Promise<void>;
  loginWithCredentials: (values: {
    email: string;
    password: string;
  }) => Promise<void>;
  logoutUser: () => Promise<void>;
}

interface WorkspaceMember {
  id: string;
  role: "admin" | "member" | "viewer"; // Add other roles if needed
  invitedAt: string; // ISO string (use `Date` if you prefer to parse it)
  accepted: boolean;
  userId: string;
  workspaceId: string;
  departmentId: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  authStatus: "authenticated" | "unauthenticated";
  user: {
    email: string;
    name: string;
    id: number;
    contactNo: string | null;
    location: string | null;
    avatar: string | null;
    role: string | null;
    createdAt: string | null;
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
  const [loading, setLoading] = useState(true); // Start with loading true
  const [session, setSession] = useState<any>(undefined);

  // 🔁 Load session from session storage on first mount
  useEffect(() => {
    const sessionString = sessionStorage.getItem("session");
    if (sessionString) {
      setSession(JSON.parse(sessionString));
      setLoading(false);
    } else {
      // If no session in storage, we need to validate
      fetchUser();
    }
  }, []);

  // Function to fetch user data - extracted for reusability
  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get<AuthResponse>("/auth/me");
      if (res.data.authStatus === "authenticated") {
        const userSession = {
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          avatar: res.data.user?.avatar,
          contactNo: res.data.user?.contactNo,
          location: res.data.user?.location,
          authStatus: res.data.authStatus,
          role: res.data.user.role,
          createdAt: res.data.user.createdAt,
          memberships: res.data.user.memberships,
        };
        setSession(userSession);
        sessionStorage.setItem("session", JSON.stringify(userSession));
      } else {
        setSession(undefined);
        sessionStorage.removeItem("session");
        // If on a protected route, redirect to login
        if (isProtectedRoute(window.location.pathname)) {
          router.push(`/login?redirectTo=${encodeURIComponent(window.location.pathname)}`);
        }
      }
    } catch (err) {
      setSession(undefined);
      sessionStorage.removeItem("session");
      // If on a protected route, redirect to login
      if (isProtectedRoute(window.location.pathname)) {
        router.push(`/login?redirectTo=${encodeURIComponent(window.location.pathname)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if route is protected
  const isProtectedRoute = (path: string) => {
    const protectedRoutes = ['/dashboard', '/profile', '/settings'];
    return protectedRoutes.some(route => 
      path === route || path.startsWith(`${route}/`)
    );
  };

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
          contactNo: response.data.user.contactNo,
          location: response.data.user.location,
          authStatus: response.data.authStatus,
          memberships: response.data.user.memberships,
          role: response.data.user.role,
          createdAt: response.data.user.createdAt,
        };
        setSession(userSession);
        sessionStorage.setItem("session", JSON.stringify(userSession));
        
        // Check if there's a redirect URL in the query params
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('redirectTo');
        router.push(redirectTo || "/dashboard");
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
    contactNo: string | null;
    location: string | null;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post<AuthResponse>("/auth/register", values);
      if (response.data.authStatus === "authenticated") {
        const userSession = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          contactNo: response.data.user.contactNo,
          location: response.data.user.location,
          avatar: response.data.user?.avatar,
          authStatus: response.data.authStatus,
          role: response.data.user.role,
          createdAt: response.data.user.createdAt,
          memberships: response.data.user.memberships || [],
        };
        setSession(userSession);
        sessionStorage.setItem("session", JSON.stringify(userSession));
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