import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {GeistSans} from 'geist/font/sans';
import {ThemeProvider} from "@/shared/config/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garnet | Transactional Infrastructure",
  description: "",
    icons: {
      icon: '/crystal-1.png'
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning className={GeistSans.className}>
        <body className="min-h-screen bg-background text-foreground antialiased selection:bg-(--carulean)/30">
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <div className="relative min-h-screen transition-colors duration-300">
                    {children}
                </div>
            </ThemeProvider>
        </body>
      </html>
  );
}
