import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "./../globals.css";

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
      <body className="mx-auto max-w-[1440px] text-sm scroll-smooth antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
