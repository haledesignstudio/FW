import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Preloader from '@/components/Preloader';
import { PreloaderProvider } from '@/components/PreloaderContext';
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import ReloadOnBreakpoint from "@/components/ReloadOnBreakpoint";
import { DisableDraftMode } from '@/components/DisableDraftMode';
import { SanityLive } from "@/sanity/lib/live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FutureWorld",
  description: "Create tomorrow together",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled


  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Helps first load of Sanity images */}
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
      </head>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReloadOnBreakpoint />
        <PreloaderProvider>
          <Preloader />
          {children}
          
          {isDraftMode ? (
            <>
              <SanityLive />
              <DisableDraftMode />
              <VisualEditing trailingSlash={false} />
            </>
          ) : null}
        </PreloaderProvider>
      </body>
    </html>
  );
}
