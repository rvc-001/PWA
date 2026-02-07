import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientInit from "@/components/ClientInit";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Forehand – Tournament Hub",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('forehand:theme');var d=document.documentElement;if(s==='dark')d.classList.add('dark');else if(s==='light')d.classList.remove('dark');else if(window.matchMedia('(prefers-color-scheme: dark)').matches)d.classList.add('dark');else d.classList.remove('dark');})();`,
          }}
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ClientInit />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
