import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import React from "react";
import {Toaster} from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Crack AI",
  description: "An AI-powered platform for preparing for mock interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${monaSans.className} antialiased`}
      >
        {children}

        <Toaster />
      </body>
    </html>
  );
}
