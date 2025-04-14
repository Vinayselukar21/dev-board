"use client";
import ProtectedRoute from "./ProtectedRoute";
import TanstackProvider from "./TanstackProvider";

export default function ProviderMaster({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackProvider>
      <ProtectedRoute>{children}</ProtectedRoute>
    </TanstackProvider>
  );
}
