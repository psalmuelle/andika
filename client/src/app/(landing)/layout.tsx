import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import "./../globals.css";

export const metadata: Metadata = {
  title: "Andika",
  description:
    "Andika is a leading technical writing agency specializing in crafting clear, concise, and impactful documentation for startups. We help bring your ideas to life with expertly written user manuals, API docs, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-[1440px] scroll-smooth text-sm antialiased">
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
