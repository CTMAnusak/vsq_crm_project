import { useEffect } from "react";

export default function HideHeaderFooter() {
  useEffect(() => {
    // เพิ่ม class ให้ header
    const header = document.querySelector("header");
    if (header) header.classList.add("hide-header-footer");

    // เพิ่ม class ให้ footer
    const footer = document.querySelector("footer");
    if (footer) footer.classList.add("hide-header-footer");

    // cleanup (ลบ class เมื่อออกจากเพจนี้)
    return () => {
      if (header) header.classList.remove("hide-header-footer");
      if (footer) footer.classList.remove("hide-header-footer");
    };
  }, []);
  return null;
} 