"use client";
import localFont from "next/font/local";
import "./globals.css";
import { useState } from "react";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Toaster } from "sonner";

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
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </UpdateCartContext.Provider>
        </body>
      </html>
    </PayPalScriptProvider>
  );
}
