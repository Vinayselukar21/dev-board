"use client";
import TanstackProvider from "./TanstackProvider";

export default function ProviderMaster({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackProvider>
      {children}
    </TanstackProvider>
  );
}
