"use client";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/layout/footer";
import "./../globals.css";
import AppSidebar from "@/components/layout/userSider";
import DashboardHeader from "@/components/layout/dashboardHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/context/UserProvider";
import { Suspense } from "react";
import Loading from "./loading";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <html lang="en">
          <body className="mx-auto max-w-[1440px] text-sm">
            <Suspense fallback={<Loading />}>
              <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                  <DashboardHeader />
                  {children}
                </main>
              </SidebarProvider>
              <Footer />
              <Toaster />
            </Suspense>
          </body>
        </html>
      </UserProvider>
    </QueryClientProvider>
  );
}
