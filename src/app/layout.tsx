import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/Components/shared/Header";
import Navbar from "@/Components/shared/Navbar";
import MarqueeNews from "@/Components/shared/MarqueeNews";
import { Toast } from "@heroui/react";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["latin", "bengali"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Today News 24",
  description: "Explore the latest news",
  icons: {
    icon: '/logo.webp'
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${hindSiliguri.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Header></Header>
        <Navbar></Navbar>
        <MarqueeNews></MarqueeNews>
        <main>{children}</main>

        <Toast.Provider placement="top"/>
      </body>
    </html>
  );
}
