import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware routes requests to the appropriate app folder based on hostname.
 * 
 * Each domain serves a different climate dataset:
 * - rainfall.geography.hawaii.edu → /rainfall app
 * - climate.geography.hawaii.edu → /climate app
 * - solarradiation.geography.hawaii.edu → /solarradiation app
 * - evapotranspiration.geography.hawaii.edu → /evapotranspiration app
 * - localhost → /rainfall app (default)
 * 
 * Example: GET /interactive-map on rainfall.geography.hawaii.edu
 *          → Rewrites to /rainfall/interactive-map
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = request.nextUrl.hostname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/public") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Determine which app to route to
  let appFolder = "rainfall"; // default

  if (hostname === "climate.geography.hawaii.edu") {
    appFolder = "climate";
  } else if (hostname === "solarradiation.geography.hawaii.edu") {
    appFolder = "solarradiation";
  } else if (hostname === "evapotranspiration.geography.hawaii.edu") {
    appFolder = "evapotranspiration";
  } else if (hostname === "rainfall.geography.hawaii.edu") {
    appFolder = "rainfall";
  }

  // Rewrite the request to the app folder (including API routes)
  const rewritePath = `/${appFolder}${pathname}`;
  return NextResponse.rewrite(new URL(rewritePath, request.url));
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
    },
  ],
};
