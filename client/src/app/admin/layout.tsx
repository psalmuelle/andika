"use client";
import "./../globals.css";
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

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    async function isAuthorized() {
      try {
        if (window.location.pathname.startsWith("/admin/auth")) return;
        const res = await axiosInstance.get("auth/status", {
          withCredentials: true,
        });
        return res;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            error instanceof AxiosError
              ? error.response?.data.message
              : "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        router.replace("/admin/auth/login");
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
            {children}
            <Footer />
            <Toaster />
          </Suspense>
        </body>
      </html>
    </QueryClientProvider>
  );
}
