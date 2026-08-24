"use client";

import type React from "react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { liffService } from "@/lib/liff";
import RegisterHeader from "@/components/register/RegisterHeader";
import { type RegistrationSessionData, type User } from "@/types";
// use fetch instead of axios on client to reduce bundle size
import { motion } from "framer-motion";

import "@/assets/css/register.css";
import "@/assets/css/otp.css";
import "@/assets/css/pxtovw.css";

import spinnerUrl from "@/assets/images/spinner.svg";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  telePhone: number;
};

export default function OTPPage() {
  return (
    <>
      <OTPContent />
    </>
  );
}

const OTPContent = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const otpSentRef = useRef(false);
  const [otp, setOtp] = useState<string>("");
  // const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [tokenOtp, setTokenOtp] = useState<string | null>(null);
  const [refCode, setRefCode] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationSessionData | null>(null);

  // const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const fetchData = useCallback(async () => {
    const data = JSON.parse(
      sessionStorage.getItem("registrationData") || "null"
    );

    if (isLoading) {
      return;
    }

    if (otpSentRef.current) {
      return;
    }

    if (!data?.lineUserId || !data?.first_name || !data?.last_name || !data?.tel_no) {
      router.push("/register");
      return;
    }

    otpSentRef.current = true;
    setRegistrationData(data);

    try {
      setIsResending(true);
      setCountdown(30);
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telephone: data?.tel_no }),
      });
      if (!res.ok) throw new Error(await res.text());
      const response = await res.json();
      const code = response.code;
      const result = response.result;
      if (result) {
        setTokenOtp(result.token);
        setRefCode(result.ref_code);
      }
    } catch (error: any) {
      otpSentRef.current = false;
      console.error("Failed to send OTP:", error?.message || error);
    } finally {
      setIsResending(false);
    }
  }, [isLoading, router]);

  useEffect(() => {
    fetchData();
  }, [isAuthenticated, isLoading, router, fetchData]);

  // useEffect(() => {
  //   if (inputRefs.current[0]) {
  //     inputRefs.current[0]?.focus();
  //   }
  // }, []);

  useEffect(() => {
    // Countdown timer for OTP resend
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // allow only numeric characters

    if (value.length === 6) {
      handleVerify(value);
    }
    setError("");
    setOtp(value);
  };

  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
  //   const value = e.target.value;
    
  //   if (!/^\d*$/.test(value)) return; // allow only numeric characters

  //   const newOtp = [...otp];

  //   // ตรวจสอบว่าเป็นการ autofill หรือไม่ (value มีความยาวมากกว่า 1)
  //   if (value.length > 1) {
  //     // กรองเอาเฉพาะตัวเลข
  //     const numericValue = value.replace(/\D/g, '').slice(0, 6);
      
  //     // กระจายตัวเลขไปใน input ทั้งหมด
  //     for (let i = 0; i < numericValue.length && i < 6; i++) {
  //       newOtp[i] = numericValue[i];
  //     }
      
  //     setOtp(newOtp);
      
  //     // Focus ไปที่ช่องถัดจากช่องสุดท้ายที่มีค่า หรือช่องสุดท้าย
  //     const filledLength = numericValue.length;
  //     if (filledLength < 6) {
  //       inputRefs.current[filledLength]?.focus();
  //     } else {
  //       inputRefs.current[5]?.focus();
  //       handleVerify(numericValue);
  //     }
      
  //     return;
  //   }

  //   // การพิมพ์ปกติ (ทีละตัว)
  //   newOtp[index] = value;
  //   const valueOtp = newOtp.join("");
  //   setOtp(newOtp);
    
  //   if (value && index < 5) {
  //     inputRefs.current[index + 1]?.focus();
  //   }
  //   if (!value && index > 0) {
  //     inputRefs.current[index - 1]?.focus();
  //   }
  //   if (valueOtp.length === 6) {
  //     handleVerify(valueOtp);
  //   }
  // };

  // const handleFocus = (index: number) => {
  //   const firstValue = inputRefs.current[0]?.value || "";
  //   if (index > 0 && firstValue === "") {
  //     inputRefs.current[0]?.focus();
  //   }
  // };

  // const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
  //   const newOtp = [...otp];
  //   for (let i = 0; i < pastedData.length; i++) {
  //     if (!/^\d*$/.test(pastedData[i])) continue;
  //     if (i < 6) newOtp[i] = pastedData[i];
  //   }
  //   setOtp(newOtp);

  //   const filledLength = newOtp.join("").length;
  //   if (filledLength < 6) {
  //     // ใช้ setTimeout 0 เพื่อให้ React เรนเดอร์ก่อน แล้วจึงโฟกัส
  //     setTimeout(() => {
  //       inputRefs.current[filledLength]?.focus();
  //     }, 0);
  //   } else {
  //     setTimeout(() => {
  //       inputRefs.current[5]?.focus();
  //     }, 0);
  //     handleVerify(newOtp.join(""));
  //   }
  // };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
  //   const { key } = e;

  //   // Backspace
  //   if (key === "Backspace") {
  //     e.preventDefault();
  //     const newOtp = [...otp];

  //     if (otp[index]) {
  //       // หากช่องปัจจุบันมีค่า ให้ล้างค่าตัวเอง
  //       newOtp[index] = "";
  //       setOtp(newOtp);
  //     } else if (index > 0) {
  //       // หากช่องปัจจุบันว่าง ให้ย้อนกลับไปช่องก่อนหน้าและล้างค่านั้น
  //       newOtp[index - 1] = "";
  //       setOtp(newOtp);
  //       inputRefs.current[index - 1]?.focus();
  //     }
  //     setError("");
  //     return;
  //   }

  //   // Arrow Left
  //   if (key === "ArrowLeft" && index > 0) {
  //     e.preventDefault();
  //     inputRefs.current[index - 1]?.focus();
  //     return;
  //   }

  //   // Arrow Right
  //   if (key === "ArrowRight" && index < 5) {
  //     e.preventDefault();
  //     inputRefs.current[index + 1]?.focus();
  //   }
  // };

  const handleVerify = async (code: string) => {
    if (!registrationData) {
      router.push("/register");
      return;
    }

    if (code.length !== 6) {
      setError("กรุณากรอกรหัส OTP 6 หลัก");
    } else {
      setIsSubmitting(true);
      // setTimeout(() => {
      //   inputRefs.current.forEach((input) => input?.blur());
      // }, 0);
      try {
        const res = await fetch("/api/otp/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp_code: code, token: tokenOtp, ref_code: refCode }),
        });
        if (!res.ok) throw new Error(await res.text());
        const response = await res.json();
        const codeResponse = response.code;
        const result = response.result;
        if (codeResponse === "000") {
          if (result.status) {
            // try {
              const accessToken = await liffService.getAccessToken();

              const createRes = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: registrationData, accessToken }),
              });
              // if (!createRes.ok) throw new Error(await createRes.text());
              const createUser = await createRes.json();
              const resultRes = createUser.result;

              if (resultRes.code === 422 || resultRes.code === 400) {
                setError("เกิดข้อผิดพลาด กรุณาติดต่อสาขาที่ท่านใช้บริการ");
              } else {
                sessionStorage.removeItem("registrationData");
                router.push("/register/success");
              }
            // } catch (error: any) {
            //   console.error("Failed to create user:", error?.message || error);
            // } finally {
            // }
          } else {
            setError("รหัส OTP ไม่ถูกต้อง");
            setIsSubmitting(false);
          }
        } else {
          setError("รหัส OTP หมดอายุ \nกรุณาขอรหัส OTP ใหม่อีกครั้ง");
          setIsSubmitting(false);
        }
      } catch (error: any) {
        setError(error?.message || "เกิดข้อผิดพลาดในการตรวจสอบ OTP");
        setIsSubmitting(false);
        setOtp("");
        // setOtp(["", "", "", "", "", ""]);
      } finally {
        // setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <main className="w-full">
        <div className="register-container">
          <div className="w-full">
            <RegisterHeader isAuthenticated={isAuthenticated} isLoading={isLoading} profileImage={user?.profileImage} />
            <div className="register-content relative flex-start-center flex-col mx-auto w-651 mt-50 mb-w-651 mb-mt-50 mb-445 mb-mb-445">
              <div className="bg-white w-full pt-56 pl-10 pr-10 pb-60 rounded-10 mb-pt-56 mb-pl-10 mb-pr-10 mb-pb-60 mb-rounded-10">
                <div className="flex-start-center flex-col pb-56 mb-pb-56">
                  <div className="skeleton-animate w-292 h-40 rounded-6 mb-w-292 mb-h-40 mb-rounded-6"></div>
                  <div className="skeleton-animate w-460 h-40 mt-15 rounded-6 mb-w-460 mb-h-40 mb-mt-15 mb-rounded-6"></div>
                </div>
                <div className="flex-center">
                  <div className="skeleton-animate w-580 h-95 mx-auto rounded-17 mb-w-580 mb-h-95 mb-rounded-17"></div>
                </div>
                <div className="text-exceeds-w-box relative left-1-2 translate-x--1-2">
                  <div className="flex-start-center flex-col pt-56 mb-pt-56">
                    <div className="skeleton-animate w-605 h-40 rounded-6 mb-w-605 mb-h-40 mb-rounded-6"></div>
                    <div className="skeleton-animate w-295 h-40 mt-15 rounded-6 mb-w-295 mb-h-40 mb-mt-15 mb-rounded-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full">
      <div className="register-container">
        <div className="w-full">
          <RegisterHeader isAuthenticated={isAuthenticated} isLoading={isLoading} profileImage={user?.profileImage} />
          <div className="register-content relative flex-start-center flex-col mx-auto w-651 mt-50 mb-w-651 mb-mt-50 mb-445 mb-mb-445">
            <div className="bg-white w-full pt-56 pl-10 pr-10 pb-60 rounded-10 mb-pt-56 mb-pl-10 mb-pr-10 mb-pb-60 mb-rounded-10">
              <motion.p 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ 
                  duration: 0.9,
                  ease: [0.17, 0.55, 0.55, 1],
                  delay: 0.3,
                }}
                className="pb-56 font-size-30 mb-pb-56 mb-font-size-30 text-color-blue-deep font-light text-center">
                กรุญายืนยัน OTP 6 หลัก
                <br />
                ที่ส่งไปที่หมายเลขโทรศัพท์ {registrationData?.tel_no}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ 
                  duration: 0.9,
                  ease: [0.17, 0.55, 0.55, 1],
                  delay: 0.4,
                }}
                className={`otp-input relative flex-center w-538 h-112 mx-auto px-0 rounded-17 mb-w-538 mb-h-112 mb-rounded-17 ${error ? "otp-input-error" : ""}${isSubmitting ? "disabled" : ""}`}>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  id="otp"
                  name="otp"
                  value={otp}
                  className={`px-0 mb-px-0 font-kanit text-color-blue font-normal text-center w-full h-full pl-34 rounded-17 font-size-60 text-spacing-35 mb-pl-34 mb-rounded-17 mb-font-size-60 mb-text-spacing-35`}
                  placeholder="••••••"
                  maxLength={6}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                {isSubmitting && (
                  <div className="flex absolute top-1-2 translate-y--1-2 right-20 mb-right-20">
                    <Image
                      width={48}
                      height={48}
                      src={spinnerUrl.src}
                      alt="spinner"
                      className="w-48 h-48 mb-w-48 mb-h-48"
                    />
                    {/* <img src={spinnerUrl.src} alt="spinner" className="w-48 h-48 mb-w-48 mb-h-48" /> */}
                  </div>
                )}
              </motion.div>
              {/* <form 
                className={`otp-input relative flex-center w-538 h-112 mx-auto px-0 rounded-17 mb-w-538 mb-h-112 mb-rounded-17${error ? " otp-input-error" : ""}${isSubmitting ? " disabled" : ""}`}
                onSubmit={(e) => e.preventDefault()}
              >
                {otp.map((value, index) => (
                  <input
                    type="text"
                    id={`otp-${index}`}
                    name={`otp-${index}`}
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    placeholder="•"
                    key={index}
                    value={value}
                    onChange={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => handleFocus(index)}
                    onPaste={handlePaste}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className={`w-55 h-full text-color-blue font-normal text-center font-size-55 line-1 px-0 border-w-0 mb-w-55 mb-h-full mb-font-size-55`}
                    disabled={isSubmitting}
                  />
                ))}
                {isSubmitting && (
                  <div className="flex absolute top-1-2 translate-y--1-2 right-40 mb-right-40">
                    <Image
                      width={48}
                      height={48}
                      src={spinnerUrl.src}
                      alt="spinner"
                      className="w-48 h-48 mb-w-48 mb-h-48"
                    />/
                  </div>
                )}
              </form> */}

              {/* Request OTP */}
              <div className="text-exceeds-w-box relative left-1-2 translate-x--1-2">
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ 
                    duration: 0.9,
                    ease: [0.17, 0.55, 0.55, 1],
                    delay: 0.5,
                  }} 
                  className="pt-56 font-size-30 mb-pt-56 mb-font-size-30 text-color-blue-deep font-light text-center">
                  กรณียังไม่ได้รับรหัส SMS OTP ให้กด{" "}
                  <button
                    type="button"
                    onClick={() => {
                      otpSentRef.current = false;
                      fetchData();
                    }}
                    className={`text-color-blue underline font-size-30 mb-font-size-30 font-normal ${countdown > 0 || isResending || isSubmitting ? "opacity-50 cursor-not-allowed text-color-gray-soft" : ""}`}
                    disabled={countdown > 0 || isResending || isSubmitting}
                  >
                    Request OTP
                  </button>
                  <br />
                  เพื่อขอรับรหัสใหม่อีกครั้ง{" "}
                  {countdown > 0 || isResending ? (
                    <span className="text-color-red">{`กรุณารอ (${countdown}s)`}</span>
                  ) : (
                    ""
                  )}
                  {/* <span className="text-color-red">{`กรุณารอ (30s)`}</span> */}
                </motion.p>
              </div>

            </div>
            {/* Error Message */}
            <div className="relative w-full">
              {error && ( // แสดง error ถ้ามี
                <div 
                  className="absolute flex-center top-40 mb-top-40 left-1-2 translate-x--1-2 bg-color-red-soft text-error font-light line-14 text-center w-537 rounded-17 font-size-30 whitespace-pre-line pt-20 pb-20 pl-40 pr-40 mb-w-537 mb-rounded-17 mb-font-size-30 mb-pt-20 mb-pb-20 mb-pl-40 mb-pr-40"
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}
              {/* <div className="absolute flex-center top-40 mb-top-40 left-1-2 translate-x--1-2 bg-color-red-soft text-error font-light line-14 text-center w-537 rounded-17 font-size-30 pt-20 pb-20 pl-40 pr-40 mb-w-537 mb-rounded-17 mb-font-size-30 mb-pt-20 mb-pb-20 mb-pl-40 mb-pr-40 ">รหัส OTP ไม่ถูกต้อง</div> */}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
