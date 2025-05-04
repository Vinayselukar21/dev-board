"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./providers/AuthProvider";

export default function Home() {
  const { session } = useAuth();
  useEffect(() => {
    if (session?.authStatus !== "authenticated") {
      redirect("/login");
    }
    if (session?.authStatus === "authenticated") {
      redirect("/dashboard");
    }
  }, [session]);

  return null;
}
