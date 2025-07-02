// src/components/register/RegistrationDebugLogger.tsx
import { useEffect } from "react";

export default function RegisterConsoleLog({ pageName }: { pageName: string }) {
  useEffect(() => {
    const arr: { label: string, value: string }[] = [];

    const pdpaStatus = localStorage.getItem("vsquare_pdpa_accepted");
    arr.push({ label: "PDPA Status", value: pdpaStatus === "true" ? "ได้รับการยอมรับ" : "ไม่ได้รับการยอมรับ" });

    const lineUserId = localStorage.getItem("vsquare_line_user_id");
    arr.push({ label: "login liff", value: lineUserId ? "login liff แล้ว" : "ยังไม่ได้ login" });

    const regData = localStorage.getItem("registrationData");
    if (regData) {
      try {
        const data = JSON.parse(regData);
        arr.push({ label: "firstName", value: data.firstName });
        arr.push({ label: "lastName", value: data.lastName });
        arr.push({ label: "email", value: data.email });
        arr.push({ label: "phone", value: data.phone });
      } catch (e) {
        arr.push({ label: "registrationData", value: "format error" });
      }
    } else {
      arr.push({ label: "registrationData", value: "ไม่มีข้อมูล registrationData ใน localStorage" });
    }

    console.log(`Page : ${pageName}`, arr);
  }, [pageName]);
  return null;
}