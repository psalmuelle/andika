"use client";
import "./../../globals.css";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className="mx-auto min-h-screen max-w-[1440px] text-sm">
          <header className="sticky top-0 z-20 bg-white/70 px-[5%] py-3 text-center shadow-sm backdrop-blur">
            <h1 className="scroll-m-20 font-mono text-xl font-semibold tracking-tight text-zinc-800">
              Andika
            </h1>
          </header>
          {children}
          <Footer />
          <Toaster />
        </body>
      </QueryClientProvider>
    </html>
  );
}
