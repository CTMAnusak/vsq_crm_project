// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const PUBLIC_PATHS = ["/register", "/callback", "/api", "/_next", "/assets", "/favicon.ico"];

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   if (PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p))) return NextResponse.next();

//   const token = req.cookies.get("AUTH_TOKEN")?.value;
//   if (pathname.startsWith("/register") && token) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/";
//     return NextResponse.redirect(url);
//   }
//   if (!token) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/register";
//     return NextResponse.redirect(url);
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next|api|assets|favicon\\.ico).*)"],
// };