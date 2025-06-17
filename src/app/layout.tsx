import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "../assets/scss/_settings.scss"
import "../assets/css/pxtovw.css"
import "../assets/scss/main.scss"

import Header from "../components/Header";
import Footer from "../components/Footer";



export const metadata: Metadata = {
  title: "",
  description: "",
}

export default function RootLayout({children}) {
  return (
    <html lang="th">
      <body cz-shortcut-listen="true">
        <div className="relative w-full max-w-768 mx-auto mb-max-w-full overflow-x-hidden scrollbar-none">
          <Header />
          {children}
          <Footer />
        </div>
        
      </body>
    </html>
  )
}