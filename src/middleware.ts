import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  if (!(
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".gif")
  )) {
    switch (request.nextUrl.hostname) {
      case "rainfall.geography.hawaii.edu":
        return NextResponse.rewrite(new URL("/rainfall" + pathname, request.url));
      case "localhost":
        return NextResponse.rewrite(new URL("/rainfall" + pathname, request.url));
      case "climate.geography.hawaii.edu":
        return NextResponse.rewrite(new URL("/climate" + pathname, request.url));
      case "solarradiation.geography.hawaii.edu":
        return NextResponse.rewrite(new URL("/solarradiation" + pathname, request.url));
      case "evapotranspiration.geography.hawaii.edu":
        return NextResponse.rewrite(new URL("/evapotranspiration" + pathname, request.url));
      default:
        return NextResponse.rewrite(new URL("/rainfall" + pathname, request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
    },
  ],
};
