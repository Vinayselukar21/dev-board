"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./providers/AuthProvider";

export default function Home() {
  const { session } = useAuth();
  console.log(session.authStatus);
  useEffect(() => {
    if (session?.authStatus !== "authenticated") {
      redirect("/login");
    }
  }, [session]);

  return null;
}
