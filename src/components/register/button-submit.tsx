"use client"

import { ButtonHTMLAttributes } from "react"
import Link from "next/link"

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blue_bg" | "blue_border" | "gray_bg"
  className?: string
  isDisabled?: boolean
  href?: string
}

export default function ButtonSubmit({ 
  variant = "blue_bg", 
  className = "",
  isDisabled = false,
  href,
  children,
  ...props 
}: ButtonSubmitProps) {
  const baseClasses = "flex-center font-light font-kanit font-size-30 mb-font-size-30 rounded-17 mb-rounded-17"
  
  const variantClasses = {
    blue_bg: "text-color-white-light bg-color-blue",
    blue_border: "text-color-blue bg-white border-color-blue",
    gray_bg: "text-color-white-light bg-color-gray-soft"
  }

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  )
} 