import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import axios from "axios";

export async function DELETE(request: NextRequest) {
    try {

        // const users = await prisma.user.findMany({
        //     select: { lineUserId: true },
        // });

        // console.log("users", users);

        // แปลงเป็นอาร์เรย์ของ string เพียว ๆ
        // const lineUserIds = users.map((u) => u.lineUserId);

        // console.log("lineUserIds", lineUserIds);

        try {
            // await Promise.all(
            //     lineUserIds.map((id) =>
            //         axios.delete(`https://api.line.me/v2/bot/user/${id}/richmenu`, {
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 "Authorization": `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
            //             },
            //         })
            //     )
            // );

            // await prisma.user.deleteMany();

            return NextResponse.json(
                { message: "User deleted successfully" },
                { status: 200 }
            );

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Delete Rich Menu Member error:", error.response?.data?.message || error.message);
                return NextResponse.json({ message: "Failed to Delete Rich Menu", error: error.response?.data || error.message }, { status: error.response?.status || 500 });
            } else {
                console.error("Failed to Delete Rich Menu:", error);
                return NextResponse.json({ message: "Failed to Delete Rich Menu", error: "An unknown error occurred" }, { status: 500 });
            }
        }

    } catch (error) {
        console.error("Delete Rich Menu Member error:", error);
        return NextResponse.json({ message: "Failed to Delete Rich Menu", error: "An unknown error occurred" }, { status: 500 });
    }
}
