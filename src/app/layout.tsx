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
        <div className="relative w-full max-w-768 mb-max-w-768 mx-auto overflow-x-hidden">
          {children}
          </div>
      </body>
    </html>
  )
}
