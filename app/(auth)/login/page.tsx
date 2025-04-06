"use client";
import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/app/providers/AuthProvider";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Page() {
  const { session } = useAuth();
  console.log(session);
  useEffect(() => {
    if (session && session?.authStatus === "authenticated") {
      redirect("/dashboard");
    }
  }, [session]);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
