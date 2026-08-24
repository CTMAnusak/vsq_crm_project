"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import SkeletonHome from "@/components/SkeletonHome";
import "@/assets/css/pxtovw.css";

export default function CallbackPage() {
    const { isLoading, isAuthenticated, user } = useAuth();
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        // รอให้ AuthContext initialize เสร็จก่อน
        if (isLoading) return;

        // ถ้า AuthContext ยังไม่มี user ให้รอ (ปล่อย Skeleton แสดงไปก่อน)
        if (!user) return;

        // ใช้สถานะจาก AuthContext เพื่อตัดสินเส้นทาง โดยไม่เรียก API ซ้ำ
        const isRegistered = Boolean((user as any)?.customerUuid);
        if (isRegistered) {
            router.replace("/");
        } else {
            router.replace("/register");
        }
    }, [router, isLoading, user]);

    return (
        <SkeletonHome />
    );
}