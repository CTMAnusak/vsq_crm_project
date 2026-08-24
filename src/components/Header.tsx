"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../assets/images/home/vsquare-logo.png"

export default function Header() {

  return (
    <header className="absolute top-6 right-29 z-9 mb-top-6 mb-right-29">
        <Link href="/" className="w-168 h-65 mb-w-168 mb-h-65">
            <Image className="w-full h-auto" src={logo} alt="logo" />
        </Link>
    </header>
  );
}
