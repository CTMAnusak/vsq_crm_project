import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";


export const metadata: Metadata = {
  title: "V Square Clinic Member",
  description: "V Square Clinic Member Application",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>
        <AuthProvider>
          <div className="relative w-full max-w-768 mx-auto mb-max-w-full overflow-x-hidden scrollbar-none">
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
} 