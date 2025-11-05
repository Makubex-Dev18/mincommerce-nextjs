import { auth } from "@/auth";
import { NextResponse } from "next/server";

function hasAccess(path: string, role?: string) {
  if (path.startsWith("/admin")) return role === "admin";
  if (path.startsWith("/dashboard"))
    return ["admin", "user"].includes(role || "");
  return true;
}

export default auth((req) => {
  const { auth } = req;
  const path = req.nextUrl.pathname;

  // Si no está autenticado y no está en login
  if (!auth && !path.includes("login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Si está autenticado y trata de acceder a login
  if (auth && path.includes("login")) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // Verificación de roles
  if (auth && !hasAccess(path, auth.user?.role)) {
    return NextResponse.redirect(new URL("/denied", req.url));
  }
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile",
    "/login",
    "/dashboard/:path*",
    "/denied",
  ],
};

/*
import { auth } from "@/auth"
import { NextResponse } from "next/server"

// El middleware necesita 1 función export default:
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
*/
