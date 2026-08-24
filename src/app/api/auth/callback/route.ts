import { type NextRequest, NextResponse } from "next/server";
import { createAuthToken } from "@/lib/auth";
import jwt, { JwtPayload } from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { profile, idToken, accessToken } = await request.json();
    if (!profile?.userId) return NextResponse.json({ error: "Invalid Profile data" }, { status: 400 });
    if (!idToken) return NextResponse.json({ error: "Invalid ID Token" }, { status: 400 });
    if (!accessToken) return NextResponse.json({ error: "Invalid Access Token" }, { status: 400 });

    const decoded = jwt.decode(idToken) as JwtPayload | null;
    if (!decoded?.sub) return NextResponse.json({ error: "Invalid ID Token" }, { status: 400 });

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      return NextResponse.json({ error: "ID Token has expired" }, { status: 400 });
    }
    if (decoded.iss !== "https://access.line.me") {
      return NextResponse.json({ error: "Invalid Token issuer" }, { status: 400 });
    }

    const lineUserId = decoded.sub;
    const profileEmail = (decoded as any)?.email ?? null;
    const profileImage = (decoded as any)?.picture ?? null;

    // const user = await prisma.user.findUnique({ where: { lineUserId } });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_OPD_URL}/api/customers/profile`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      // body: JSON.stringify(payload);
    });
    const data = await res.json();
    const result = data?.data ?? null;

    const authToken = createAuthToken(
      result?.line_user_id ?? lineUserId ?? null,
      result?.hn ?? null,
      result?.first_name ?? null,
      result?.last_name ?? null,
      result?.email ?? profileEmail ?? null,
      result?.tel_no ?? null,
      profileImage,
      result?.customer_uuid ?? null,
      result?.badge_counts ?? null,
      result?.member_level_name ?? null,
      result?.member_level_short_name ?? null,
      result?.member_level_period ?? null,
      result?.progress_bar ?? null,
      result?.remaining_service ?? null,
      result?.remaining_gift ?? null,
      result?.next_appointment_date ?? null
    );

    const buildResponse = (body: any) => {
      const response = NextResponse.json(body);
      response.headers.set("Cache-Control", "no-store");
      response.cookies.set("AUTH_TOKEN", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 90,
        path: "/",
      });
      return response;
    };

    return buildResponse({
      isRegistered: result ? true : false,
      user: {
        lineUserId: result?.line_user_id ?? lineUserId ?? null,
        customerUuid: result?.customer_uuid ?? null,
        badgeCounts: result?.badge_counts ?? null,
        hn: result?.hn ?? null,
        firstName: result?.first_name ?? null,
        lastName: result?.last_name ?? null,
        email: result?.email ?? profileEmail ?? null,
        telePhone: result?.tel_no ?? null,
        profileImage,
        memberLevelName: result?.member_level_name ?? null,
        memberLevelShortName: result?.member_level_short_name ?? null,
        memberLevelPeriod: result?.member_level_period ?? null,
        progressBar: result?.progress_bar ?? null,
        remainingService: result?.remaining_service ?? null,
        remainingGift: result?.remaining_gift ?? null,
        nextAppointmentDate: result?.next_appointment_date ?? null,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}