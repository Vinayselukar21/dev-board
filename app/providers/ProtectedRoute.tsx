"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/app/providers/AuthProvider";

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
        router.push("/login");
      } else if (session && isPublic) {
        // Authenticated → redirect to workspace or home
        router.push("/dashboard"); // or wherever
      }
    }
  }, [session, loading, pathname]);

  // Optionally show nothing or loader while deciding
  if (loading) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
