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
import { ConfigProvider } from "antd";
import NotificationProvider from "@/context/notificationProvider";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#18181b",
                borderRadius: 6,
              },
            }}
          >
            <NotificationProvider>
              <UserProvider>
                <Suspense fallback={<Loading />}>
                  <SidebarProvider>
                    <AppSidebar />
                    <main className="mx-auto w-full max-w-[1440px] text-sm">
                      <DashboardHeader />
                      {children}
                    </main>
                  </SidebarProvider>
                  <Footer />
                  <Toaster />
                </Suspense>
              </UserProvider>
            </NotificationProvider>
          </ConfigProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
