'use client';
import Image from 'next/image';
import logo from '../assets/images/logo-vsq.png';

export default function Header() {

    return (
      <header className="absolute top-0 right-0 z-9">
        <div className="h-65 img-h-full">
          <Image src={logo} alt="logo" />
        </div>
      </header>
    );
}