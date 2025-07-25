import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AuthProvider from "../providers/AuthProvider";
import ProviderMaster from "../providers/ProviderMaster";
import SidebarLayoutProvider from "../providers/DashboardLayoutProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorkSphere",
  description: "A platform for project management and collaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ProviderMaster>
            <SidebarLayoutProvider>
              {children}
              </SidebarLayoutProvider>
              </ProviderMaster>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
