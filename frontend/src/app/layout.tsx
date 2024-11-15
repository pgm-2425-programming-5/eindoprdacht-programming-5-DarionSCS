"use client";
import localFont from "next/font/local";
import "./globals.css";
import { useState } from "react";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [updateCart, setUpdateCart] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
          <Header />
          {children}
          <Footer />
        </UpdateCartContext.Provider>
      </body>
    </html>
  );
}
