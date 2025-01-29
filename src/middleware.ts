import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyToken } from './server-actions/auth.actions';



export async function middleware(request: NextRequest) {
    const cookiesHeader = request.headers.get("cookie");
    if (!cookiesHeader) return NextResponse.redirect(new URL('/', request.url))

    const cookies = Object.fromEntries(
        cookiesHeader.split(";").map((cookie) => cookie.trim().split("="))
    );
    const token = cookies['token']
    if (!token) return NextResponse.redirect(new URL('/', request.url))
    
    try {
        const { payload } = await verifyToken(token)

        if (!payload) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        // Check if token has expired
        const currentTimestamp = Math.floor(Date.now() / 1000)
        if (payload.exp && payload.exp < currentTimestamp) {
            console.error('Token has expired')
            return NextResponse.redirect(new URL('/', request.url))
        }

        return NextResponse.next()
    } catch (e) {
        console.error('Token verification failed:', e)
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: '/dashboard/:path*',
}