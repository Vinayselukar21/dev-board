"use client";

import { useAuth } from "@/app/providers/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarLayoutProvider from "./DashboardLayoutProvider";

const publicRoutes = ["/login", "/signup"];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const { session, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // ensure we are on client
  }, []);

  useEffect(() => {
    if (!loading && isClient) {
      const isPublic = publicRoutes.includes(pathname);
      if (!session && !isPublic) {
        router.push("/login");
      } else if (session && isPublic) {
        router.push(pathname);
      }
    }
  }, [session, loading, pathname, isClient]);

  if (!isClient || loading) return "Loading...";

  if (session && !publicRoutes.includes(pathname)) {
    return <SidebarLayoutProvider>{children}</SidebarLayoutProvider>;
  }

  if (publicRoutes.includes(pathname)) return <>{children}</>;
  return null;
};

export default ProtectedRoute;
