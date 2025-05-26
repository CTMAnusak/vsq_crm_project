import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

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
        <main className="page-screen">{children}</main>
      </body>
    </html>
  )
}
