import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientInit from "@/components/ClientInit";

export const metadata: Metadata = {
  title: "Forehand Learn & Tournaments",
  description: "Your all-in-one tournament hub. Manage. Play. Compete.",
};

export const viewport: Viewport = {
  themeColor: "#FF7A1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <ClientInit />
        {children}
      </body>
    </html>
  );
}
