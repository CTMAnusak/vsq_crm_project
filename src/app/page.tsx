"use client";

import Image from "next/image";
import "../assets/css/pxtovw.css";
import "../assets/css/home.css";
import "../assets/css/main.css";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { useState } from "react";

// Import card images
import basicCard from "../assets/images/home/basic-card.png";
import silverCard from "../assets/images/home/silver-card.png";
import goldCard from "../assets/images/home/gold-card.png";
import platinumCard from "../assets/images/home/platinum-card.png";
import diamondCard from "../assets/images/home/platinum-card.png";
import bgHeader from "../assets/images/home/bg-header.png";

type MembershipClass = "member" | "gold" | "platinum" | "diamond"

// Define membership data for each class
const membershipData = {
  member: {
    cardImage: basicCard,
    bgMainClass: "bg-basic",
    bgSubClass: "bg-basic-sub",
    spendingAmount: "10,500 บาท",
    progressBgColor: "bg-white",
    progressIndicatorColor: "progressIndicatorColor-basic",
  },
  gold: {
    cardImage: goldCard,
    bgMainClass: "bg-gold",
    bgSubClass: "bg-gold-sub",
    spendingAmount: "200,500 บาท",
    progressBgColor: "bg-white",
    progressIndicatorColor: "progressIndicatorColor-gold",
  },
  platinum: {
    cardImage: platinumCard,
    bgMainClass: "bg-platinum",
    bgSubClass: "bg-platinum-sub",
    spendingAmount: "450,000 บาท",
    progressBgColor: "bg-white",
    progressIndicatorColor: "progressIndicatorColor-platinum",
  },
  diamond: {
    cardImage: diamondCard,
    bgMainClass: "bg-diamond",
    bgSubClass: "bg-diamond-sub",
    spendingAmount: "750,000 บาท",
    progressBgColor: "bg-white",
    progressIndicatorColor: "progressIndicatorColor-diamond",
  },
}

// Define membership class order and range
const memberships = [
  {
    key: "member",
    label: "V MEMBER",
    min: 0,
    max: 100000,
  },
  {
    key: "gold",
    label: "V GOLD",
    min: 100001,
    max: 300000,
  },
  {
    key: "platinum",
    label: "V PLATINUM",
    min: 300001,
    max: 500000,
  },
  {
    key: "diamond",
    label: "V DIAMOND",
    min: 500001,
    max: 1000000,
  },
];

const getClassIndex = (memberClass: string) => memberships.findIndex(c => c.key === memberClass);

const getClassRange = (memberClass: string) => {
  const idx = getClassIndex(memberClass);
  return {
    current: memberships[idx],
    next: memberships[idx + 1] || null,
    prev: memberships[idx - 1] || null,
    isFirst: idx === 0,
    isLast: idx === memberships.length - 1,
  };
};

// Function to calculate progress within current class range
const calculateRangeProgress = (spendingAmount: string, memberClass: MembershipClass): number => {
  const amount = parseInt(spendingAmount.replace(/[^0-9]/g, ''));
  const { current, next } = getClassRange(memberClass);
  if (!next) {
    // กรณี platinum ให้แสดงเต็ม 100%
    return 100;
  }
  const min = current.min;
  const max = next.min - 1;
  const progress = Math.max(0, Math.min(100, Math.round(((amount - min) / (max - min)) * 100)));
  return progress;
};

export default function Home() {
  // State to track current membership class (default to platinum)
  const [memberClass, setMemberClass] = useState<MembershipClass>("platinum")

  // Get current membership data based on class
  const currentMembership = membershipData[memberClass]

  // ----------------------
  // MOCKUP: ตัวอย่างโค้ดสำหรับดึงข้อมูลจากฐานข้อมูลในอนาคต
  // ตัวอย่างนี้ใช้ async function และ useEffect (React hook)
  //
  // useEffect(() => {
  //   async function fetchUserData() {
  //     // ตัวอย่าง: เรียก API หรือ database
  //     const res = await fetch('/api/user');
  //     const data = await res.json();
  //     // สมมุติ data = { name: 'ชื่อผู้ใช้', spendingAmount: '123,456 บาท', class: 'gold' }
  //     setMemberClass(data.class);
  //     // สามารถ set state อื่นๆ เช่นชื่อ, spendingAmount ได้ที่นี่
  //   }
  //   fetchUserData();
  // }, []);
  //
  // หมายเหตุ: ต้องสร้าง state สำหรับ name, spendingAmount และ map ข้อมูลที่ได้กับ membershipData/memberships
  // ----------------------

  return (
    <div className={`w-full relative pb-243 mb-pb-213 ${currentMembership.bgMainClass}`}>
      {/* Header background image */}
      <div className="absolute top-0 left-0 right-0 z-0 overflow-visible">
        <Image
          src={bgHeader}
          alt="Header background"
          width={768}
          height={546}
          className="w-full h-auto bg-header-shadow"
        />
      </div>

        {/* Class selector (for demo purposes) */}
        <div className="absolute absolute top-16 left-29 w-80 h-65 mb-top-16 mb-left-29 mb-w-80 mb-h-65 ">
          <Select value={memberClass} onValueChange={(value) => setMemberClass(value as MembershipClass)}>
            <SelectTrigger className="w-150 bg-white h-65 font-size-20 bg-blue text-white rounded-15 flex-center mb-w-150 mb-h-65 mb-font-size-20 mb-rounded-15">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem 
              className="font-size-20" value="member">Member</SelectItem>
              <SelectItem 
              className="font-size-20" value="gold">Gold</SelectItem>
              <SelectItem 
              className="font-size-20" value="platinum">Platinum</SelectItem>
              <SelectItem 
              className="font-size-20" value="diamond">Diamond</SelectItem>
            </SelectContent>
          </Select>
        </div>
      

     
      {/* Main content */}
      <main className="w-full flex-1 flex flex-col items-center px-6 pt-4 z-2">
          {/* Greeting */}
          <div className="w-full pl-50 pr-50 mt-70 mb-80 mb-pl-50 mb-pr-50 mb-mt-70 mb-mb-80 z-3">
            <h1 className="font-light font-size-71 mx-0 mb-font-size-71 line-13 text-darkblue">สวัสดีค่ะ</h1>
            <h2 className="font-light font-size-54 mx-0 mb-font-size-54 line-1 text-blue">คุณ อารียา วรรณคีรี</h2>
          </div>

          {/* Membership Card */}
          <div className="relative"> 
            <div className="w-669 mb-w-669">
              <div className="overflow-hidden card-shadow">
                <Image
                  src={currentMembership.cardImage || "/placeholder.svg"}
                  alt={`${memberClass.charAt(0).toUpperCase() + memberClass.slice(1)} Membership Card`}
                  width={400}
                  height={225}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <p className="text-right font-light text-white mt-22 mb-mt-22 font-size-21 mb-font-size-21">วันที่หมดอายุ 30/06/69</p>
          </div> 

          {/* Membership Level */}
          <div className="w-full text-center mt-58 mb-110 mb-mt-58 mb-mb-110">
            <h3 className="text-white mb-2 font-size-75 line-15 mb-font-size-75 mb-line-15 gotham-light">
              <span className="px-4 py-2 rounded-lg">V {memberClass.toUpperCase()}</span>
            </h3>
            <div className={`inline-block text-white px-4 py-1 mt-2 rounded-35 pl-33 pr-33 font-size-34 mb-rounded-35 mb-pl-33 mb-pr-33 mb-font-size-34 gotham-light card-shadow ${currentMembership.bgSubClass}`}>CLASS</div>
          </div>

        {/* Progress Bar */}
        <div className="w-full mb-30 mb-mb-30">
            <div className="flex flex-col items-center">
              <p className="relative left-25 mb-left-25 w-440 mb-w-440 text-center text-white font-light font-size-text-center text-white font-light font-size-24 mb-font-size-24 mt-2 mb-font-size-25 mt-2">
                ยอดใช้จ่ายสะสม
              </p>
              {/* Class range label */}
              <div className="flex items-center justify-center mb-8 gap-9 mb-mb-8 mb-gap-9">
                {/* Start class */}
                <span className="text-white font-size-21 mb-font-size-21 gotham-light" style={{ minWidth: 90, textAlign: 'left' }}>
                  {getClassRange(memberClass).current.label}
                </span>
                {/* Progress bar */}
                <div className="flex-1 relative flex items-center w-440 mb-w-440" style={{ minWidth: 0 }}>
                  {/* Bar background */}
                  <div className="w-full bg-white relative overflow-hidden h-10 rounded-100 mb-h-10 mb-rounded-100 ">
                    {/* Progress indicator */}
                    <div
                      className={`h-full ${currentMembership.progressIndicatorColor}`}
                      style={{
                        width: `${calculateRangeProgress(currentMembership.spendingAmount, memberClass)}%`,
                      }}
                    />
                  </div>
                  {/* Start dot */}
                  <span className={`absolute left-0 w-24 h-24 mb-w-24 mb-h-24 rounded-100 ${currentMembership.progressIndicatorColor}`}></span>
                  {/* End dot */}
                  <span className={`absolute right-0 w-24 h-24 mb-w-24 mb-h-24 rounded-100 ${getClassRange(memberClass).isLast ? currentMembership.progressIndicatorColor : 'bg-white'}`}></span>
                  {/* SpendingAmount/Max label */}
                  {getClassRange(memberClass).isLast ? (
                    <span className="absolute left-1-2 translate-x--1-2 top-25 mt-8 text-center w-180 text-balance text-white font-size-24 mb-font-size-24 font-light">
                      {currentMembership.spendingAmount}
                    </span>
                  ) : (
                    <>
                      <span className="absolute left-0 top-25 mt-8 mb-top-25 mb-mt-8 text-center w-180 mb-w-180 text-balance text-white font-size-24 mb-font-size-24 font-light translate-x--75 mb-translate-x--75">
                        {currentMembership.spendingAmount}
                      </span>
                      <span className="absolute right-0 top-25 mt-8 mb-top-25 mb-mt-8 text-center w-150 mb-w-150 text-balance text-white font-size-24 mb-font-size-24 font-light translate-x-75 mb-translate-x-75">
                        {(() => {
                          const { current, next } = getClassRange(memberClass);
                          return (next.min - 1).toLocaleString() + ' บาท';
                        })()}
                      </span>
                    </>
                  )}
                </div>
                {/* End class */}
                {getClassRange(memberClass).isLast ? (
                  <span className="inline-block min-w-85 mb-min-w-85 text-right">&nbsp;</span>
                ) : (
                  getClassRange(memberClass).next && (
                    <span className="text-white font-size-21 mb-font-size-21 gotham-light text-right">
                      {getClassRange(memberClass).next.label}
                    </span>
                  )
                )}
              </div>
             
            </div>
          </div>
        </main>
    </div>
  );
}
