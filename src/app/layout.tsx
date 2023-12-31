import "./globals.css";
import { Inter } from "next/font/google";
import ToastProvider from "@/components/toastProvider/ToastProvider";
import Footer from "@/layouts/footer/Footer";
import Header from "@/layouts/header/Header";
import Providers from "@/redux/provider";
import NavbarProvider from "@/layouts/navbar/NavbarProvider";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "react-shop-app",
  description: "copy of famous shopping site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <ToastProvider />
          <NavbarProvider>{children}</NavbarProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
