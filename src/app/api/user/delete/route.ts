import { type NextRequest, NextResponse } from "next/server";
import { basicAuthHeader } from '@/lib/basicAuth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { uuid, accessToken } = body ?? {};
        // const userNameAuth = process.env.BASIC_AUTH_USER;
        // const passWordAuth = process.env.BASIC_AUTH_PASS;
        // const basicAuth = btoa(`${userNameAuth}:${passWordAuth}`);
        // const basicAuth = Buffer.from(`${userNameAuth ?? ''}:${passWordAuth ?? ''}`).toString('base64');

        if (!accessToken) {
            const res = NextResponse.json({ error: "Invalid Access Token" }, { status: 400 });
            res.headers.set("Cache-Control", "no-store");
            return res;
        }

        if (!uuid || typeof uuid !== 'string') {
            const res = NextResponse.json({ error: "Invalid uuid" }, { status: 400 });
            res.headers.set("Cache-Control", "no-store");
            return res;
        }

        const opdRes = await fetch(`${process.env.NEXT_PUBLIC_API_OPD_URL}/api/customers/delete/${uuid}`, {
            method: 'DELETE',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicAuthHeader(),
            },
        });

        // if (!opdRes.ok) {
        //     const text = await opdRes.text();
        //     throw new Error(`Failed to fetch: ${opdRes.status} ${text}`);
        // }

        // const opdJson = await opdRes.json();
        // console.log(opdJson);

        // let opdJson: any = null;
        // // try { opdJson = await opdRes.json(); } catch {}
        // opdJson = await opdRes.json();
        // console.log("opdJson: ", opdJson);
        // if (!opdRes.ok) {
        //     const res = NextResponse.json({ error: opdJson?.error ?? 'Upstream error' }, { status: opdRes.status });
        //     res.headers.set("Cache-Control", "no-store");
        //     return res;
        // }



        // let responseBody: any = null;
        // const contentType = opdRes.headers.get('content-type') || '';
        // try {
        //     if (contentType.includes('application/json')) {
        //         responseBody = await opdRes.json();
        //     } else {
        //         responseBody = await opdRes.text();
        //     }
        // } catch { }

        // if (!opdRes.ok) {
        //     const message = typeof responseBody === 'string' ? responseBody : (responseBody?.error ?? 'Upstream error');
        //     const res = NextResponse.json({ error: message }, { status: opdRes.status });
        //     res.headers.set("Cache-Control", "no-store");
        //     return res;
        // }

        const res = NextResponse.json({ result: opdRes });
        // ลบคุกกี้ AUTH_TOKEN เมื่อการลบผู้ใช้สำเร็จ
        res.headers.set("Cache-Control", "no-store");
        res.cookies.delete("AUTH_TOKEN");
        return res;
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}