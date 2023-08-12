import { NextResponse } from "next/server";

const allowedOrigins =
  process.env.NEXT_PUBLIC_ENV_PRODUCTION === "production"
    ? ["https://sigma-world-fe.vercel.app"]
    : ["http://localhost:3000"];

export function middleware(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
