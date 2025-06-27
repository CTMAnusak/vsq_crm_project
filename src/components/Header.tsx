"use client";

import Image from "next/image";
import logo from "../assets/images/home/vsquare-logo.png"

export default function Header() {

  return (
    <header className="absolute top-16 right-29 z-9">
        <div className="w-168 h-65 mb-w-168 mb-h-65">
            <Image className="w-full h-auto" src={logo} alt="logo" />
        </div>
    </header>

  );
}
