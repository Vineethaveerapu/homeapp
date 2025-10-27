import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { QueryClientProvider } from "@/providers/query-client-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Home App",
  description: "Home App"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`p-8 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors />
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
