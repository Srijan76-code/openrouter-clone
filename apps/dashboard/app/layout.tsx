import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { dark } from '@clerk/themes'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { ClerkProvider } from '@clerk/nextjs';
import { QueryProvider } from "@/components/providers/query-provider";

export const metadata: Metadata = {
  title: "AetherRoute — One API. Every Model.",
  description:
    "Access 300+ LLMs through a single OpenAI-compatible endpoint. Switch models without changing your code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
     theme: dark,
   }}>
      <html lang="en" className="scroll-smooth dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
        >
          <QueryProvider>
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
