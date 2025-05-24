"use client";

import axios from "@/utils/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Organization, WorkspaceMember } from "../types";

interface AuthContextType {
  session: any;
  loading: boolean;
  signUpWithCredentials: (values: {
    email: string;
    name: string;
    password: string;
    contactNo: string | null;
    location: string | null;
    jobTitle: string;
    designation: string;
    organizationName: string;
    organizationType: string;
  }) => Promise<void>;
  loginWithCredentials: (values: { email: string; password: string }) => Promise<void>;
  logoutUser: () => Promise<void>;
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
    memberships: WorkspaceMember[];
    organizationId: string;
    ownedOrganization: Organization;
    organization: Organization;
    jobTitle: string;
    designation: string;
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
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(undefined);
  const [isClient, setIsClient] = useState(false); // ✅ hydration guard

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const sessionString = sessionStorage.getItem("session");
    if (sessionString) {
      setSession(JSON.parse(sessionString));
    }

    const fetchUser = async () => {
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
            jobTitle: res.data.user?.jobTitle,
            designation: res.data.user?.designation,
            authStatus: res.data.authStatus,
            memberships: res.data.user.memberships,
            organizationId: res.data.user.organizationId,
            organization: res.data.user.organization,
            ownedOrganization: res.data.user.ownedOrganization,
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

    fetchUser();
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    if (session) {
      sessionStorage.setItem("session", JSON.stringify(session));
    } else {
      sessionStorage.removeItem("session");
    }
  }, [session, isClient]);

  const loginWithCredentials = async (values: { email: string; password: string }) => {
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
          jobTitle: response.data.user.jobTitle,
          designation: response.data.user.designation,
          authStatus: response.data.authStatus,
          memberships: response.data.user.memberships,
          organizationId: response.data.user.organizationId,
          organization: response.data.user.organization,
          ownedOrganization: response.data.user.ownedOrganization,
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

  const signUpWithCredentials = async (values: {
    email: string;
    name: string;
    password: string;
    contactNo: string | null;
    location: string | null;
    organizationName: string;
    organizationType: string;
    jobTitle: string;
    designation: string;
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
          jobTitle: response.data.user.jobTitle,
          designation: response.data.user.designation,
          avatar: response.data.user?.avatar,
          authStatus: response.data.authStatus,
          memberships: response.data.user.memberships,
          organizationId: response.data.user.organizationId,
          organization: response.data.user.organization,
          ownedOrganization: response.data.user.ownedOrganization,
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

  // ✅ Do not render until client mounted
  if (!isClient) return null;

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
