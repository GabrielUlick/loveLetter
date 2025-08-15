import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meu Amor em Carta",
  description: "Uma carta de amor com estilo Frutiger Aero",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="pt-BR">
      <body
    className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-pink-500/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
