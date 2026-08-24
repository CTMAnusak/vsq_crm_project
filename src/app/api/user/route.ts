import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import axios from "axios";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { user, accessToken } = body;

        // ตรวจสอบว่ามีข้อมูลที่จำเป็น
        if (!user?.lineUserId) {
            return NextResponse.json(
                { error: "lineUserId is required" },
                { status: 400 }
            );
        }

        const newUserRes = await fetch(`${process.env.NEXT_PUBLIC_API_OPD_URL}/api/registrations/confirm`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                tel_no: user.tel_no,
                is_old_customer: user.is_old_customer,
            })
        });
        const res = await newUserRes.json();
        const newUser = res.data;
        const memberLevelLower = (newUser?.member_level_name ?? "").toLowerCase();

        if (res.code === 422 || res.code === 400) {
            return NextResponse.json({ message: "Create user error", richMenuAssigned: false, result: res }, { status: 400 });
        } else {
            let userClass = process.env.RICHMENU_MEMBER;
            if (memberLevelLower === "v gold") {
                userClass = process.env.RICHMENU_GOLD;
            } else if (memberLevelLower === "v platinum") {
                userClass = process.env.RICHMENU_PLATINUM;
            } else {
                userClass = process.env.RICHMENU_MEMBER;
            }
            try {
                await axios.post(`https://api.line.me/v2/bot/user/${user.lineUserId}/richmenu/${userClass}`, {}, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
                    },
                    timeout: 10000,
                });
                return NextResponse.json({ message: "User created successfully", richMenuAssigned: true, result: newUser }, { status: 201 });
            } catch (err) {
                console.error("Rich Menu assign failed:", axios.isAxiosError(err) ? err.response?.data || err.message : err);
                // สมัครสำเร็จแต่ผูกเมนูไม่สำเร็จ
                return NextResponse.json({ message: "User created successfully (rich menu skipped)", richMenuAssigned: false, result: res }, { status: 201 });
            }
        }

    } catch (error) {
        console.error("Create user error:", error);

        // หาก lineUserId ซ้ำ
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: "User with this LINE ID already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}