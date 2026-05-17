import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

const protectedRoutes = ["/settings", "/dashboard"]
const authRoutes = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"]

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const sessionCookie = getSessionCookie(request)

    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (!sessionCookie) {
            const url = new URL("/sign-in", request.url)
            url.searchParams.set("redirect", pathname)
            return NextResponse.redirect(url)
        }
    }

    if (authRoutes.some(route => pathname.startsWith(route))) {
        if (sessionCookie) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}