"use client";
import Image from "next/image";
import React, { useState } from "react";
import "../../assets/css/course.css";
import "../../assets/css/fonts.css";
import vitamin from "../../assets/images/course/img-vitamin.png";
import coolyag from "../../assets/images/course/img-coolyag.png";
import hifu from "../../assets/images/course/img-hifu.png";
import gfg from "../../assets/images/course/fgf.png";
import iconvsq from "../../assets/images/course/img-vsq.png";
import bgBlue from "../../assets/images/course/bg-blue.png";
import bgGold from "../../assets/images/course/bg-gold.png";
import bgPlatinum from "../../assets/images/course/bg-patinum.png";
import Titlepage from "../../components/titlepage";

export default function Course() {
  console.log(vitamin);

  const [dropdown, setDropdown] = useState(false); // สร้างสถานะ clicked
  
  // สมมติว่าคะแนน memberships (คุณสามารถเปลี่ยนค่าเพื่อทดสอบ)
  const membershipScore = 300000; // ตัวอย่างคะแนน 150000 จะได้ bg-gold

  const handleClick = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const getBgImage = (score) => {
    if (score >= 0 && score <= 100000) {
      return bgBlue.src;
    } else if (score >= 100001 && score <= 300000) {
      return bgGold.src;
    } else if (score >= 300001 && score <= 500000) {
      return bgPlatinum.src;
    } else {
      return ""; // กรณีคะแนนนอกเหนือเงื่อนไข
    }
  };

  const getTextColor = (score) => {
    if (score >= 0 && score <= 100000) {
      return "#2d4c9d"; // สีขาวสำหรับพื้นหลังสีน้ำเงิน
    } else if (score >= 100001 && score <= 300000) {
      return "#644D3D"; // สีดำสำหรับพื้นหลังสีทอง
    } else if (score >= 300001 && score <= 500000) {
      return "#ffffff"; // สีขาวสำหรับพื้นหลังสีแพลทินัม
    } else {
      return "#2d4c9d"; // สีดำเป็นค่าเริ่มต้น
    }
  };

  // ตั้งค่า CSS custom property สำหรับพื้นหลังและสีตัวอักษร
  React.useEffect(() => {
    document.documentElement.style.setProperty('--btn-dropdown-bg', `url(${getBgImage(membershipScore)})`);
    document.documentElement.style.setProperty('--btn-dropdown-text-color', getTextColor(membershipScore));
  }, [membershipScore]);

  return (
    <main className="section-course w-full overflow-hidden">
      <div className="section-course-bg">
        <Titlepage title={"สิทธิพิเศษ"}/>
        <section className="dropdown-menu-vip-hed relative w-768 mb-w-768 flex">
          <div className="container w-full mb-w-full">
            <div className="dropdown">
              <button
                className={`btn-dropdown font-size-38 mb-font-size-38 font-light text-drakble ${
                  dropdown ? "active" : ""
                }`}
                type="button"
                onClick={handleClick}
              >
                สิทธิพิเศษ <span className="text-vip">VIP</span>
              </button>
              {dropdown && ( // ใช้ && แทน if
                <div className="dropdown-vip-list w-670 mb-w-670 h-1000 mb-h-1000">
                  <p className="redeem-text font-size-30 mb-font-size-30 font-light mt-45 mb-mt-45 ml-20 mb-ml-20">
                    แลกรับบริการฟรี
                  </p>
                  <div className="all-service-item flex-center-start gap-9 mb-gap-9 mt-20 mb-mt-20">
                    <div className="all-service-item-wrapper">
                      <div
                        className="all-service-img w-full mb-w-full h-full mb-h-full z-1 rounded-21 mb-rounded-21"
                        style={{
                          backgroundImage: `url(${vitamin.src})`,
                          backgroundSize: "100% auto",
                          height: "100%",
                        }}
                      ></div>
                      <div className="all-service-detail">
                        <div className="all-service-headline">
                          <span className="all-service-subtext font-size-11 mb-font-size-11">
                            โปรแกรม
                          </span>
                          <h6 className="all-service-title font-size-18 mb-font-size-18 font-normal line-12 mb-line-12">
                            วิตามินผิว
                          </h6>
                          <h6 className="all-service-title font-size-18 mb-font-size-18 font-normal line-12 mb-line-12">
                            มูลค่า{" "}
                            <span className="service-title-vip">4,500.-</span>
                          </h6>
                        </div>
                        <div className="all-service-btn-wrapper">
                          <div className="all-service-btn font-size-13 mb-font-size-13 font-normal">
                            แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 1 เดือน
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="all-service-item-wrapper">
                      <div
                        className="all-service-img w-full mb-w-full h-full mb-h-full z-1 rounded-21 mb-rounded-21"
                        style={{
                          backgroundImage: `url(${coolyag.src})`,
                          backgroundSize: "100% auto",
                          height: "100%",
                        }}
                      ></div>
                      <div className="all-service-detail">
                        <div className="all-service-headline">
                          <span className="all-service-subtext font-size-11 mb-font-size-11">
                            โปรแกรม
                          </span>
                          <h6 className="all-service-title font-size-18 mb-font-size-18 font-normal line-12 mb-line-12">
                            Cool Yag <br />ตำแหน่งใดก็ได้
                          </h6>
                          <h6 className="all-service-title font-size-18 mb-font-size-18 font-normal line-12 mb-line-12">
                            มูลค่า{" "}
                            <span className="service-title-vip">4,500.-</span>
                          </h6>
                        </div>
                        <div className="all-service-btn-wrapper">
                          <div className="all-service-btn font-size-13 mb-font-size-13 font-normal">
                            แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 1 เดือน
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="all-service-item-wrapper">
                      <div
                        className="all-service-img w-full mb-w-full h-full mb-h-full z-1 rounded-21 mb-rounded-21"
                        style={{
                          backgroundImage: `url(${hifu.src})`,
                          backgroundSize: "100% auto",
                          height: "100%",
                        }}
                      ></div>
                      <div className="all-service-detail">
                        <div className="all-service-headline">
                          <span className="all-service-subtext font-size-11 mb-font-size-11">
                            โปรแกรม
                          </span>
                          <h6 className="all-service-title font-size-18 mb-font-size-18 font-normal line-12 mb-line-12">
                            HIFU Ultraformer III <br />400 shot
                          </h6>
                          <h6 className="all-service-title font-size-18 mb-font-size-18 font-normal line-12 mb-line-12">
                            มูลค่า{" "}
                            <span className="service-title-vip">11,000.-</span>
                          </h6>
                        </div>
                        <div className="all-service-btn-wrapper">
                          <div className="all-service-btn font-size-13 mb-font-size-13 font-normal">
                            แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 1 เดือน
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-start-start flex-col w-full mb-w-full mt-40 mb-mt-40">
                    <p className="redeem-text font-size-30 mb-font-size-30 font-light mt-35 mb-mt-35 ml-20 mb-ml-20">
                      ประวัติการแลกสิทธิพิเศษ
                    </p>
                    <div className="flex-start-center flex-col mt-25 mb-mt-25">
                      <div className="shadow-item w-630 mb-w-630 mx-auto rounded-16 pt-32 pb-32 pl-20 pr-20 mb-rounded-16 mb-pt-32 mb-pb-32 mb-pl-20 mb-pr-20">
                        <div className="grid grid-cols-6 gap-28 mb-gap-28">
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ม.ค.
                            </p>
                            <button
                              data-target="redem-1"
                              className="icon-redemption active w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"
                            ></button>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ก.พ.
                            </p>
                            <button
                              data-target="redem-2"
                              className="icon-redemption active w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"
                            ></button>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              มี.ค.
                            </p>
                            <button
                              data-target="redem-3"
                              className="icon-redemption active w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"
                            ></button>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              เม.ย.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              พ.ค.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              มิ.ย.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ก.ค.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ส.ค.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ก.ย.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ต.ค.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              พ.ย.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ธ.ค.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-center-start w-full mt-16 mb-mt-16">
                        <div className="flex flex-col">
                          <div className="flex-start-center">
                            <div className="icon-redemption w-42 h-42 border-w-1 mb-w-42 mb-h-42"></div>
                            <p className="font-size-26 color-theme font-light line-1 ml-24 mb-font-size-26 mb-ml-24">
                              สิทธิ์คงเหลือสำหรับแลกรับบริการ
                            </p>
                          </div>
                          <div className="flex-start-center mt-5 mb-mt-5">
                            <div className="icon-redemption active w-42 h-42 border-w-1 mb-w-42 mb-h-42"></div>
                            <p className="font-size-26 color-theme font-light line-1 ml-24 mb-font-size-26 mb-ml-24">
                              แลกสิทธิ์สำเร็จแล้ว
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="section-course-expire">
          <h1 className="head-course-expire font-size-45 font-light pl-54 text-drakblue mb-font-size-45 mb-pl-54">
            ของสมนาคุณพิเศษ
          </h1>
          <div className="flex flex-col gap-30 items-center">
            <div className="section-lits-course-expire flex-center flex-wrap relative top-13 gap-28 mb-gap-28 ">
              <div className="course-list-info relative overflow-hidden flex-wrap flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28">
                  <Image src={gfg} alt="" className="w-full h-auto mb-w-full"/>
                </div>
                <div className="text-activity text-start h-178 mb-h-178 ">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium mb-font-size-28">
                    กิจกรรม เพื่อนได้เราได้
                  </h3>
                  <p className="text-content font-size-24 text-lingblue font-light mb-font-size-24">
                    มาเด้ <span className="span-text-content">|</span> 1 ครั้ง
                  </p>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                    ถึง 26 ก.ค. 68
                  </p>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 mb-ml-5">
                  <Image src={iconvsq} alt="" className="w-full h-auto"/>
                </div>
                <div className="text-activity text-start h-178  mb-h-178">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium line-14 mb-font-size-28 mb-line-14">
                    กิจกรรมบอกต่อความ<br/>ประทับใจ
                  </h3>
                  <p className="text-content font-size-24 text-lingblue font-light mb-font-size-24">
                    แฟต <span className="span-text-content">|</span> 6 CC
                  </p>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                  ถึง 2 มิ.ย. 68
                  </p>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 mb-ml-5">
                  <Image src={iconvsq} alt="" className="w-full h-auto"/>
                </div>
                <div className="text-activity text-start h-178  mb-h-178">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium line-14 mb-font-size-28 mb-line-14">
                    ของขวัญจกคุณหมอ
                  </h3>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                  ถึง 2 มิ.ย. 68
                  </p>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32 mb-gap-50">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28">
                  <Image src={iconvsq} alt="" className="w-full h-auto"/>
                </div>
                <div className="text-activity text-start h-178  mb-h-178">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium line-14 mb-font-size-28 mb-line-14">
                  Voucher เลเซอร์ขนพรีเมี่ยม
                  </h3>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                  ถึง 2 มิ.ย. 68
                  </p>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32 mb-gap-50 mb-pd-0">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 mb-ml-5">
                  <Image src={iconvsq} alt="" className="w-full h-auto"/>
                </div>
                <div className="text-activity text-start h-178 mb-h-178 ">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium line-14 mb-font-size-28 mb-line-14">
                  กิจกรรมเพื่อนชวนเพื่อน <br/>(เลเซอร์ขน)
                  </h3>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                  ถึง 2 มิ.ย. 68
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
