"use client";

import { useAuth } from "@/app/providers/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import SidebarLayoutProvider from "./DashboardLayoutProvider";

const publicRoutes = ["/login", "/signup"];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth(); // make sure `loading` is handled
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      const isPublic = publicRoutes.includes(pathname);
      if (!session && !isPublic) {
        // Not authenticated → redirect to login
        console.log("pushing to loginnnn --------------------------->")
        router.push("/login");
      } else if (session && isPublic) {
        // Authenticated → redirect to workspace or home
        console.log("pushing to pathname --------------------------->")
        router.push(pathname);
      }
    }
  }, [session, loading, pathname]);

  // Optionally show nothing or loader while deciding
  if (loading) return "Loading...";

  if (session && !publicRoutes.includes(pathname))
    return <SidebarLayoutProvider>{children}</SidebarLayoutProvider>;

  if (publicRoutes.includes(pathname)) return <>{children}</>;
  return null;
};

export default ProtectedRoute;
