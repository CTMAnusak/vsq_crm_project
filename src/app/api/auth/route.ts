import { type NextRequest, NextResponse } from "next/server";
import { createAuthToken } from "@/lib/auth";
import jwt, { JwtPayload } from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { profile, idToken, accessToken } = await request.json();

    if (!accessToken) {
      const res = NextResponse.json({ authenticated: false, error: "Invalid Access Token" }, { status: 400 });
      res.headers.set("Cache-Control", "no-store");
      return res;
    }

    // เตรียมข้อมูลจาก ID Token (ถ้ามี)
    let lineUserId: string | null = null;
    let profileEmail: string | null = null;
    let profileImage: string | null = null;

    if (idToken) {
      const decoded = jwt.decode(idToken) as JwtPayload | null;
      if (decoded?.sub) {
        // ตรวจสอบอายุและ issuer หากมีข้อมูล
        // const now = Math.floor(Date.now() / 1000);
        // if (decoded.exp && decoded.exp < now) {
        //   const res = NextResponse.json({ authenticated: false, error: "ID Token has expired" }, { status: 400 });
        //   res.headers.set("Cache-Control", "no-store");
        //   return res;
        // }
        if (decoded.iss && decoded.iss !== "https://access.line.me") {
          const res = NextResponse.json({ authenticated: false, error: "Invalid Token issuer" }, { status: 400 });
          res.headers.set("Cache-Control", "no-store");
          return res;
        }
        lineUserId = decoded.sub ?? null;
        profileEmail = (decoded as any)?.email ?? null;
        profileImage = (decoded as any)?.picture ?? null;
      }
    }

    // ตรวจสอบสถานะการลงทะเบียนจาก OPD
    const statusRes = await fetch(`${process.env.NEXT_PUBLIC_API_OPD_URL}/api/registrations/status`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    });

    // console.log("statusRes status:", statusRes.status, statusRes.statusText);

    let isRegistered = false;
    if (statusRes.ok) {
      const statusJson = await statusRes.json();
      // console.log("statusJson:", statusJson);
      isRegistered = Boolean(statusJson?.data?.is_registered);
    } else {
      const errorBody = await statusRes.text().catch(() => null);
      // console.error("statusRes error body:", errorBody);
    }

    // ถ้าลงทะเบียนแล้ว ดึงโปรไฟล์ลูกค้าเพื่อสร้าง JWT และตั้งคุกกี้
    if (isRegistered) {
      const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_OPD_URL}/api/customers/profile`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      });

      let result: any = null;
      if (profileRes.ok) {
        const data = await profileRes.json();
        result = data?.data ?? null;
      }

      const authToken = createAuthToken(
        (result?.line_user_id ?? lineUserId) ?? null,
        result?.hn ?? null,
        result?.first_name ?? null,
        result?.last_name ?? null,
        (result?.email ?? profileEmail) ?? null,
        result?.tel_no ?? null,
        profileImage ?? null,
        result?.customer_uuid ?? null,
        result?.badge_counts ?? null,
        result?.member_level_name ?? null,
        result?.member_level_short_name ?? null,
        result?.member_level_period ?? null,
        result?.progress_bar ?? null,
        result?.remaining_service ?? null,
        result?.remaining_gift ?? null,
        result?.next_appointment_date ?? null,
      );

      const res = NextResponse.json({
        authenticated: true,
        isRegistered: true,
        user: {
          lineUserId: (result?.line_user_id ?? lineUserId) ?? null,
          customerUuid: result?.customer_uuid ?? null,
          badgeCounts: result?.badge_counts ?? null,
          hn: result?.hn ?? null,
          firstName: result?.first_name ?? null,
          lastName: result?.last_name ?? null,
          email: (result?.email ?? profileEmail) ?? null,
          telePhone: result?.tel_no ?? null,
          profileImage: profileImage ?? null,
          memberLevelName: result?.member_level_name ?? null,
          memberLevelShortName: result?.member_level_short_name ?? null,
          memberLevelPeriod: result?.member_level_period ?? null,
          progressBar: result?.progress_bar ?? null,
          remainingService: result?.remaining_service ?? null,
          remainingGift: result?.remaining_gift ?? null,
          nextAppointmentDate: result?.next_appointment_date ?? null,
        },
      });
      res.headers.set("Cache-Control", "no-store");
      res.cookies.set("AUTH_TOKEN", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 90,
        path: "/",
      });
      return res;
    }

    // ยังไม่ลงทะเบียน: ส่งข้อมูลขั้นต่ำกลับไปให้ client ตัดสินใจ flow ต่อ
    const res = NextResponse.json({
      authenticated: false,
      isRegistered: false,
      user: {
        lineUserId: (profile?.userId ?? lineUserId) ?? null,
        email: profileEmail ?? null,
        profileImage: profileImage ?? null,
      },
    });
    res.headers.set("Cache-Control", "no-store");
    return res;

    // if (user) {
    //   const res = NextResponse.json({ authenticated: true, user });
    //   res.headers.set("Cache-Control", "no-store");
    //   return res;
    // } else {
    //   const res = NextResponse.json({ authenticated: false }, { status: 401 });
    //   res.headers.set("Cache-Control", "no-store");
    //   return res;
    // }

    // const { accessToken } = await request.json();

    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_OPD_URL}/api/customers/profile`, {
    //   method: 'GET',
    //   cache: 'no-store',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${accessToken}`
    //   },
    //   // body: JSON.stringify(payload);
    // });
    // const data = await res.json();

    // if (data.status === false) {
    //   const res = NextResponse.json({ authenticated: false, is_registered: false });
    //   res.headers.set("Cache-Control", "no-store");
    //   return res;
    // } else {
    //   const result = data.data;
    //   const res = NextResponse.json({ authenticated: true, is_registered: true, user: result });
    //   res.headers.set("Cache-Control", "no-store");
    //   return res;
    // }

    // const data = await fetch(`${process.env.NEXT_PUBLIC_API_OPD_URL}/api/registrations/status`, {
    //   method: 'POST',
    //   cache: 'no-store',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${accessToken}`
    //   },
    //   // body: JSON.stringify(payload);
    // });
    // const result = await data.json();
    // const resultData = result.data;
    // const res = NextResponse.json({ authenticated: true, customer: resultData.is_registered });
    // res.headers.set("Cache-Control", "no-store");
    // return res;
  } catch (error) {
    console.error("Auth check error:", error);
    const res = NextResponse.json({ authenticated: false }, { status: 401 });
    res.headers.set("Cache-Control", "no-store");
    return res;
  }
}



// const body = await request.json()
// const { profile, idToken } = body

// if (!profile || !profile.userId) {
//   return NextResponse.json({ error: "Invalid profile data" }, { status: 400 })
// }

// // 🔍 ใช้ ID Token เพื่อดึงข้อมูลเพิ่มเติม
// let email: string | null = null
// if (idToken) {
//   try {
//     const decoded = jwt.decode(idToken) as any
//     email = decoded?.email || null

//     // ตรวจสอบความถูกต้องของ token
//     const now = Math.floor(Date.now() / 1000)
//     if (decoded?.exp && decoded.exp < now) {
//       console.warn("ID Token has expired")
//     }

//     // ตรวจสอบว่า token มาจาก LINE
//     if (decoded?.iss !== "https://access.line.me") {
//       console.warn("Invalid token issuer")
//     }

//     console.log("ID Token decoded successfully:", {
//       userId: decoded?.sub,
//       name: decoded?.name,
//       email: decoded?.email,
//       exp: new Date(decoded?.exp * 1000),
//     })
//   } catch (error) {
//     console.error("Error decoding ID token:", error)
//   }
// }

// // สร้างหรืออัปเดตผู้ใช้ในฐานข้อมูล
// let user = await prisma.user.findUnique({
//   where: { providerId: profile.userId },
// })

// if (!user) {
//   user = await prisma.user.create({
//     data: {
//       name: profile.displayName,
//       email: email, // 📧 ใช้อีเมลจาก ID Token
//       image: profile.pictureUrl || null,
//       provider: "line",
//       providerId: profile.userId,
//     },
//   })
// } else {
//   user = await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       name: profile.displayName,
//       email: email || user.email, // อัปเดตอีเมลถ้ามี
//       image: profile.pictureUrl || user.image,
//     },
//   })
// }

// const authToken = await createAuthToken(user.id)

// const response = NextResponse.json({
//   success: true,
//   user: {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     image: user.image,
//   },
// })

// response.cookies.set("auth-token", authToken, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "lax",
//   maxAge: 60 * 60 * 24 * 7, // 7 days
//   path: "/",
// })

// return response
