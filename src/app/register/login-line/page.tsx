"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import ButtonSubmit from "../../../components/register/button-submit"
import liff from "@line/liff"

export default function LoginLinePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect if PDPA is not accepted
    const accepted = localStorage.getItem("vsquare_pdpa_accepted")
    if (accepted !== "true") {
      router.push("/register");
      return;
    }

    // Initialize LIFF
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
      } catch (err) {
        console.error("LIFF initialization failed", err)
      }
    }
    initializeLiff()

    // เพิ่ม class ให้ header
    const header = document.querySelector("header");
    if (header) header.classList.add("hide-header-footer");

    // เพิ่ม class ให้ footer
    const footer = document.querySelector("footer");
    if (footer) footer.classList.add("hide-header-footer");

    // cleanup (ลบ class เมื่อออกจากเพจนี้)
    return () => {
      if (header) header.classList.remove("hide-header-footer");
      if (footer) footer.classList.remove("hide-header-footer");
    };
  }, [router])

  const handleLoginLiff = () => {
    if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: process.env.NEXT_PUBLIC_LIFF_URL! });
    } else {
        // If already logged in, maybe redirect back to register
        router.push("/register");
    }
  }

  return (
    <main className="h-full-dvh flex-center w-full min-h-screen flex-center-center flex-col bg-white">

      <ButtonSubmit
        onClick={handleLoginLiff}
        variant="green_bg"
        className="w-553 h-81 mb-w-553 mb-h-81"
      >
        เข้าสู่ระบบด้วย Line
      </ButtonSubmit>
    </main>
  )
}
