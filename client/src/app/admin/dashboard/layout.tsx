"use client";
import "./../../globals.css";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { Spin } from "antd";
import axiosInstance from "@/config/axios";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import AdminHeader from "@/components/layout/adminDashboardHeader";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function isAuthorized() {
      try {
        const res = await axiosInstance.get("auth/status", {
          withCredentials: true,
        });
        if (res.data.isAdmin === false) {
          throw new Error();
        }
        return;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            error instanceof AxiosError
              ? error.response?.data.message
              : "You are not authorized to access this page.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        router.replace("/admin/login");
      }
    }
    isAuthorized();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className="mx-auto min-h-screen max-w-[1440px] text-sm">
          <Suspense
            fallback={
              <div>
                <Spin fullscreen />
              </div>
            }
          >
            <AdminHeader />
            {children}
            <Footer />
            <Toaster />
          </Suspense>
        </body>
      </html>
    </QueryClientProvider>
  );
}
