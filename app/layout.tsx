import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { BackgroundPaths } from "@/components/ui/background-paths";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Double Date",
  description: "A party game for double dates",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col items-center justify-center">
        <BackgroundPaths />
        <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
