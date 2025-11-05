export function hasAccess(path: string, role?: string) {
  if (path.startsWith("/admin")) return role === "admin";
  if (path.startsWith("/dashboard")) return ["admin", "user"].includes(role || "");
  return true;
}

export const publicPaths = ["/login", "/api/auth", "/denied"];

export function isPublicPath(path: string): boolean {
  return publicPaths.some(publicPath => path.startsWith(publicPath));
}