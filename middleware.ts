import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (!req.auth && !req.url.includes("login")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (req.auth && req.url.includes("login")) {
    return NextResponse.redirect(new URL("/profile", req.url))
  }

})

export const config = {
  matcher: ["/admin/:path*", "/profile", "/login"],
}
  