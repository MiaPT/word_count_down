import "~/styles/globals.css";
import { TooltipProvider } from "../components/ui/tooltip";
import { Inter } from "next/font/google";
import { TopNav } from "~/components/topnav";
import { Toaster } from "../components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Word-count-down",
  description: "A website to keep track of writing projects:)",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable} dark`}>
          <TooltipProvider delayDuration={100}>
            <TopNav />
            {children}
          </TooltipProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
