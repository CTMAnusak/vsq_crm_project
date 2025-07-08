// src/components/register/RegistrationDebugLogger.tsx
import { useEffect, useRef, useState } from "react";

export default function RegisterConsoleLog({ pageName }: { pageName: string }) {
  const lastLogRef = useRef<string>("");
  const [pdpaStatus, setPdpaStatus] = useState<string | null>(null);
  const [lineUserId, setLineUserId] = useState<string | null>(null);
  const [regData, setRegData] = useState<any>(null);

  // ดึงค่าจาก localStorage เมื่อ mount และเมื่อ localStorage เปลี่ยน
  useEffect(() => {
    function updateStateFromStorage() {
      setPdpaStatus(localStorage.getItem("vsquare_pdpa_accepted"));
      setLineUserId(localStorage.getItem("vsquare_line_user_id"));
      const reg = localStorage.getItem("registrationData");
      setRegData(reg ? JSON.parse(reg) : null);
    }
    updateStateFromStorage();
    const interval = setInterval(updateStateFromStorage, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // log เฉพาะเมื่อค่าพร้อม (ไม่ใช่ mount แรกที่ยังไม่มีค่า)
    if (pdpaStatus !== null && lineUserId !== null) {
      const arr: { label: string, value: string }[] = [];
      arr.push({ label: "PDPA Status", value: pdpaStatus === "true" ? "ได้รับการยอมรับ" : "ไม่ได้รับการยอมรับ" });
      arr.push({ label: "login liff", value: lineUserId ? "login liff แล้ว" : "ยังไม่ได้ login" });
      if (regData) {
        arr.push({ label: "firstName", value: regData.firstName });
        arr.push({ label: "lastName", value: regData.lastName });
        arr.push({ label: "email", value: regData.email });
        arr.push({ label: "phone", value: regData.phone });
      } else {
        arr.push({ label: "registrationData", value: "ไม่มีข้อมูล registrationData ใน localStorage" });
      }
      const arrString = JSON.stringify(arr);
      if (arrString !== lastLogRef.current) {
        lastLogRef.current = arrString;
        console.log(`Page : ${pageName}`, arr);
      }
    }
  }, [pageName, pdpaStatus, lineUserId, regData]);

  return null;
}