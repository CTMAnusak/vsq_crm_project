import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { Hn } = await request.json();

    if (!Hn) {
      const res = NextResponse.json({ error: "Invalid Hn" }, { status: 400 });
      res.headers.set("Cache-Control", "no-store");
      return res;
    }

    const statusRes = await fetch(`https://vipvsq.vsquareclinic.com/api/customer/hn/HN${Hn}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const statusJson = await statusRes.json();
    
    const res = NextResponse.json({ result: statusJson });
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (error) {
    console.error("Hn error:", error);
    const res = NextResponse.json({ error: "Invalid Hn" }, { status: 401 });
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
