import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "../assets/css/register.css"
import "../assets/css/_settings.css"
import "../assets/css/pxtovw.css"
import "../assets/css/main.css"
import "../assets/css/register.css"


export const metadata: Metadata = {
  title: "V Square Clinic - ลงทะเบียนสมาชิก",
  description: "ลงทะเบียนเป็นสมาชิก V Square Clinic เพื่อรับสิทธิพิเศษ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
