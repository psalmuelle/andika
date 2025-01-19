import type { Metadata } from "next";
import "./../globals.css";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Andika",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto min-h-screen max-w-[1440px] text-sm">
        <header className="sticky top-0 z-20 bg-white/70 px-[5%] py-3 text-center shadow-sm backdrop-blur">
          <Link href={"/"}>
            <h1 className="scroll-m-20 font-mono text-xl font-semibold tracking-tight text-zinc-800">
              Andika
            </h1>
          </Link>
        </header>
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
