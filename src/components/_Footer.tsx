"use client";

import Image from "next/image";
import iconHome from "../assets/images/home/icon-home.png";
import iconCourse from "../assets/images/home/icon-course.png";
import iconGift from "../assets/images/home/icon-gift.png";
import iconAppointment from "../assets/images/home/icon-appointment.png";
import iconHomeActive from "../assets/images/home/icon-home-active.png";
import iconCourseActive from "../assets/images/home/icon-course-active.png";
import iconGiftActive from "../assets/images/home/icon-gift-active.png";
import iconAppointmentActive from "../assets/images/home/icon-appointment-active.png";
import { useState } from "react";
import Link from 'next/link';

interface FooterButtonProps {
    icon: any;
    activeIcon?: any;
    id: string;
    isActive: boolean;
    onClick: () => void;
    notificationCount?: number;
    href: string;
    label: string;
}

const FooterButton = ({ icon, activeIcon, id, isActive, onClick, notificationCount, href, label }: FooterButtonProps) => (
    <Link 
        className={`w-145 h-145 rounded-circle cursor-pointer relative flex-center flex-col transition-all duration-200 mb-w-145 mb-h-145 ${
            isActive ? "" : ""
        }`}
        href={href}
        onClick={onClick}
    >
        <Image 
            src={isActive && activeIcon ? activeIcon : icon} 
            alt="" 
            className={`w-59 h-61 mb-w-59 mb-h-61 opacity-04 ${
                isActive ? "brightness-300 opacity-1" : ""
            }`}
        />
        <span className={`font-size-17 mt-3 mb-font-size-17 mb-mt-3 opacity-04 ${isActive ? "text-footer-active opacity-1" : "text-darkblue"} whitespace-pre-line text-center line-12`}>
            {label}
        </span>
        {notificationCount !== undefined && notificationCount > 0 && (
            <span className="absolute flex-center bg-alert text-white rounded-circle gotham z-2 top-18 right-32 mb-top-18 mb-right-32 w-22 h-22 mb-w-22 mb-h-22 font-size-16 mb-font-size-16">
                {notificationCount}
            </span>
        )}
    </Link>
);

export default function Footer() {
    const [activeButton, setActiveButton] = useState("home");
    
    const buttons = [
        { 
            id: "home", 
            icon: iconHome, 
            activeIcon: iconHomeActive,
            href: '/', 
            label: 'หน้าแรก' 
        },
        { 
            id: "course", 
            icon: iconCourse, 
            activeIcon: iconCourseActive,
            notificationCount: 4, 
            href: '/service', 
            label: 'บริการของคุณ' 
        },
        { 
            id: "gift", 
            icon: iconGift, 
            activeIcon: iconGiftActive,
            notificationCount: 3, 
            href: '/course', 
            label: 'สิทธิพิเศษ' 
        },
        { 
            id: "appointment", 
            icon: iconAppointment, 
            activeIcon: iconAppointmentActive,
            notificationCount: 2, 
            href: '/appointment', 
            label: 'นัดหมาย' 
        }
    ];

    return (
        // <footer className="relative bottom-0 shadow-footer-container z-9 h-180 mb-h-180">
        <footer className="fixed bottom-0 left-0 shadow-footer-container z-9 w-full h-180 mb-h-180">
            <div className="shadow-footer-item bg-white flex-center mx-auto w-728 h-129 rounded-80 gap-35 mb-w-728 mb-h-129 mb-rounded-80 mb-gap-35">
                {buttons.map(({ id, icon, activeIcon, notificationCount, href, label }) => (
                    <FooterButton
                        key={id}
                        icon={icon}
                        activeIcon={activeIcon}
                        id={id}
                        isActive={activeButton === id}
                        onClick={() => setActiveButton(id)}
                        notificationCount={notificationCount}
                        href={href}
                        label={label}
                    />
                ))}
            </div>
        </footer>
    );
}
