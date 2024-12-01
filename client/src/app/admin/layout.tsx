"use client";
import type { Metadata } from "next";
import "./../globals.css";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Spin } from "antd";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
