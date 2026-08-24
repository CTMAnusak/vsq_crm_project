import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { dataToCheck, accessToken } = body ?? {};

        if (!accessToken) {
            const res = NextResponse.json({ error: "Invalid Access Token" }, { status: 400 });
            res.headers.set("Cache-Control", "no-store");
            return res;
        }

        if (!dataToCheck || typeof dataToCheck !== 'object') {
            const res = NextResponse.json({ error: "Invalid dataToCheck payload" }, { status: 400 });
            res.headers.set("Cache-Control", "no-store");
            return res;
        }

        // Extract และ normalize ค่าให้ถูก type/รูปแบบ
        const is_old_customer = Boolean(dataToCheck?.is_old_customer);
        const first_name = dataToCheck?.first_name ?? null;
        const last_name = dataToCheck?.last_name ?? null;
        const email = dataToCheck?.email ?? null;
        const tel_no = dataToCheck?.tel_no ?? null;

        const payload = { is_old_customer, first_name, last_name, email, tel_no };

        const opdRes = await fetch(`${process.env.NEXT_PUBLIC_API_OPD_URL}/api/registrations/check`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(payload),
        });

        let opdJson: any = null;
        // try { opdJson = await opdRes.json(); } catch {}
        opdJson = await opdRes.json();
        
        // if (!opdRes.ok) {
        //     const res = NextResponse.json({ error: opdJson?.error ?? 'Upstream error' }, { status: opdRes.status });
        //     res.headers.set("Cache-Control", "no-store");
        //     return res;
        // }

        const res = NextResponse.json({ result: opdJson });
        res.headers.set("Cache-Control", "no-store");
        return res;

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}