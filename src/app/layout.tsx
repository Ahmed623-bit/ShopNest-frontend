// frontend/src/app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

// خطوط Google Fonts
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// بيانات الـ metadata
export const metadata = {
  title: "ShopNest",
  description: "متجرك الإلكتروني العصري",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`bg-gray-50 text-gray-900 ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
