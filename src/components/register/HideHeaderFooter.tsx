import { useEffect } from "react";

export default function HideHeaderFooter() {
  useEffect(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    // ลบ attribute ทั้งหมดของตัวเอง
    function cleanAttributes(el: HTMLElement | null) {
      if (!el) return;
      Array.from(el.attributes).forEach(attr => el.removeAttribute(attr.name));
    }
    cleanAttributes(header as HTMLElement);
    cleanAttributes(footer as HTMLElement);

    // ลบ element ลูกหลานทั้งหมด (เหลือแต่ tag เปล่า)
    if (header) header.innerHTML = "";
    if (footer) footer.innerHTML = "";

    // เพิ่ม className 'hide-header-footer'
    if (header) header.className = "hide-header-footer";
    if (footer) footer.className = "hide-header-footer";

    return () => {};
  }, []);
  return null;
} 