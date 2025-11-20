'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { RainbowKitProviderWrapper } from "@/providers/rainbow-kit-provider";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>PHDV-AI: Personal Health Data Vault</title>
        <meta name="description" content="An ecosystem of living health data, owned by the individual, governed by a DAO, enriched by AI." />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!mounted ? (
          <div className="w-screen h-screen flex items-center justify-center bg-black">
            <div className="text-cyan-400 text-xl">Loading...</div>
          </div>
        ) : (
          <RainbowKitProviderWrapper>
            <Navigation />
            {children}
            <ToastContainer />

          </RainbowKitProviderWrapper>
        )}
      </body>
    </html>
  );
}
