"use client";
import { useAuth } from "@/app/providers/AuthProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { SignupForm } from "./_components/signup-form";

export default function Page() {
  const { session } = useAuth();
  useEffect(() => {
    if (session && session?.authStatus === "authenticated") {
      redirect("/dashboard");
    }
  }, [session]);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
