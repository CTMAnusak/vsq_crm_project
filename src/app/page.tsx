"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Reset PDPA status when app starts
    localStorage.removeItem("vsquare_pdpa_accepted")
    // Redirect to register page
    router.push("/register")
  }, [router])

  return null
}
