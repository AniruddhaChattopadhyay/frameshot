import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrameShot - Beautiful Browser Screenshots",
  description: "Capture beautiful browser mockup screenshots of any website in seconds. Perfect for presentations, portfolios, and social media.",
  keywords: ["screenshot", "browser mockup", "website capture", "screen capture"],
  openGraph: {
    title: "FrameShot - Beautiful Browser Screenshots",
    description: "Capture beautiful browser mockup screenshots of any website in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
