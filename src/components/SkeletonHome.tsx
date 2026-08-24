"use client";

import Image from "next/image";

import bgHeader from "@/assets/images/home/bg-header.png";
import light from "@/assets/images/home/light.png";
import "@/assets/css/home.css";

export default function SkeletonHome() {

  return (
    <div className="bg-loading w-full relative pb-70 mb-pb-70">
        <header className="absolute top-22 right-29 z-9 mb-top-22 mb-right-29">
            <div className="skeleton-animate w-168 h-60 rounded-8 mb-w-168 mb-h-60 mb-rounded-8"></div>
        </header>
        {/* Header background image */}
        {/* <div className="absolute top-0 left-0 right-0 z-0 overflow-visible">
            <Image
                src={bgHeader}
                alt="Header background"
                width={768}
                height={546}
                className="w-full h-auto bg-header-shadow"
            />
        </div> */}

        {/* Main content */}
        <main className="w-full flex flex-col items-center min-height-100dvh">
            {/* Greeting */}
            <div className="w-full pl-50 pr-50 mt-70 mb-80 mb-pl-50 mb-pr-50 mb-mt-70 mb-mb-80 z-3">
                <h1 className="skeleton-animate w-231 h-64 rounded-8 mt-15 mb-14 mb-w-231 mb-h-64 mb-rounded-8 mb-mt-15 mb-mb-14"></h1>
                <h2 className="skeleton-animate w-440 h-54 rounded-8 mt-14 mb-w-440 mb-h-54 mb-rounded-8 mb-mt-14"></h2>
            </div>

            {/* Membership Card */}
            <div className="relative">
                <div className="bg-white overflow-hidden card-shadow w-669 h-435 rounded-22 mb-w-669 mb-h-435 mb-rounded-22">
                    <div className="skeleton-animate w-full h-full"></div>
                </div>
                <div className="absolute top-342 left--110 w-640 h-183 mb-top-342 mb-left--110 mb-w-640 mb-h-183">
                    <Image src={light} alt="Light effect" className="w-full h-auto" />
                </div>
            </div>

            {/* Membership Level */}
            <div className="w-full flex-start-center flex-col mt-20 mb-60 mb-mt-20 mb-mb-60">
                <h3 className="skeleton-animate w-418 h-60 rounded-8 mt-24 mb-w-418 mb-h-60 mb-rounded-8 mb-mt-24"></h3>
                <div className="skeleton-animate w-182 h-55 rounded-50 pl-33 pr-33 mt-30 mb-w-182 mb-h-55 mb-rounded-50 mb-pl-33 mb-pr-33 mb-mt-30 card-shadow"></div>
            </div>
            {/* Progress Bar */}
            <div className="w-full mb-30 mb-mb-30">
                <div className="flex flex-col items-center h-100 mb-h-100">
                    <div className="skeleton-animate w-152 h-38 mb-20 rounded-4 mb-w-152 mb-h-38 mb-mb-20 mb-rounded-4"></div>
                    <div className="flex-center mb-8 gap-9 mb-mb-8 mb-gap-9">
                        <div className="skeleton-animate w-116 h-34 rounded-4 mb-w-116 mb-h-34 mb-rounded-4"></div>
                        <div className="flex-1 relative flex items-center w-440 mb-w-440">
                            <div className="w-full bg-white relative overflow-hidden h-10 rounded-100 mb-h-10 mb-rounded-100 ">
                                <div
                                    className="skeleton-animate h-full"
                                    style={{ width: "50%" }}
                                ></div>
                            </div>
                            <span className="skeleton-animate absolute left-0 w-24 h-24 mb-w-24 mb-h-24 rounded-100 mb-rounded-100"></span>
                            <span className="absolute right-0 w-24 h-24 mb-w-24 mb-h-24 rounded-100 mb-rounded-100 bg-white"></span>
                            <div className="absolute left-0 top-40 translate-x--75 mb-top-40 mb-translate-x--75">
                                <div className="skeleton-animate w-128 h-28 rounded-4 mb-w-128 mb-h-28 mb-rounded-4"></div>
                            </div>
                            <div className="absolute right-0 top-40 translate-x-75 mb-top-40 mb-translate-x-75">
                                <div className="skeleton-animate w-150 h-28 rounded-4 mb-w-150 mb-h-28 mb-rounded-4"></div>
                            </div>
                        </div>
                        <div className="skeleton-animate w-97 h-34 rounded-4 mb-w-97 mb-h-34 mb-rounded-4"></div>
                    </div>
                </div>
            </div>
            <div className="flex-start-center flex-col w-full mt-50 mb-mt-50">
                <div className="skeleton-animate flex w-320 h-28 rounded-4 mb-w-320 mb-h-28 mb-rounded-4"></div>
                <div className="skeleton-animate flex w-390 h-28 rounded-4 mt-11 mb-w-390 mb-h-28 mb-rounded-4 mb-mt-11"></div>
            </div>
        </main>
    </div>
  );
}
