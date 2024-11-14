"use client";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/layout/footer";
import "./../globals.css";
import AppSidebar from "@/components/layout/userSider";
import DashboardHeader from "@/components/layout/dashboardHeader";
import useUserStore from "@/context/auth";
import useProfileStore from "@/context/profile";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { init } = useUserStore();
  const getProfile = useProfileStore((state) => state.getProfile);

  useEffect(() => {
    const authenticateUser = async () => {
      await init().catch(() => {
        window.location.href = "/auth/login";
      });
      getProfile();
    };
    authenticateUser();
  }, []);

  return (
    <html lang="en">
      <body className="mx-auto max-w-[1440px] text-sm">
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <DashboardHeader />
            {children}
          </main>
        </SidebarProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
