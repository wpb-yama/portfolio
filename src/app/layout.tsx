import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Will Booth — Senior Product Manager",
  description: "Personal portfolio of Will Booth, Senior Product Manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation:wght@400..700&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased bg-white"
      >
        <Navbar />
        {/* Offset content so it isn't hidden behind the sidebar / top bar */}
        <div className="lg:pl-52 pt-14 lg:pt-0">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
