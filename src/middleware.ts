import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // Ignore static assets
  if(!(
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".gif")
  )) {
    if(
      pathname.startsWith("/rainfall") ||
      pathname.startsWith("/evap") ||
      pathname.startsWith("/climate") ||
      pathname.startsWith("/solarradiation")
    ) {
      return NextResponse.next();
    }

    const rewriteUrl = request.nextUrl.clone();
    
    const cleanPath = pathname === '/' ? '' : pathname;

    switch (hostname) {
      case "rainfall.geography.hawaii.edu":
        rewriteUrl.pathname = "/rainfall" + cleanPath;
        return NextResponse.rewrite(rewriteUrl);

      // changed to /evap in order to have evapotranspiration.geography.hawaii.edu:3000/ work in dev
      // you can type in /rainfall if you still want to check that nothing was affected
      case "localhost":
        rewriteUrl.pathname = "/evap" + cleanPath;

        return NextResponse.rewrite(rewriteUrl);
      case "climate.geography.hawaii.edu":
        rewriteUrl.pathname = "/climate" + cleanPath;
        return NextResponse.rewrite(rewriteUrl);
      case "solarradiation.geography.hawaii.edu":
        rewriteUrl.pathname = "/solarradiation" + cleanPath;
        return NextResponse.rewrite(rewriteUrl);
      case "evapotranspiration.geography.hawaii.edu":
        rewriteUrl.pathname = "/evap" + cleanPath;
        return NextResponse.rewrite(rewriteUrl);
      default:
        rewriteUrl.pathname = "/rainfall" + cleanPath;
        return NextResponse.rewrite(rewriteUrl);
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