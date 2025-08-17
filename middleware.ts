import { NextRequest, NextResponse } from 'next/server'

const supportedLocales = ['zh', 'en', 'ja']

export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    
    // Skip middleware for static files, API routes, and Next.js internals
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.includes('.') ||
      pathname.startsWith('/favicon')
    ) {
      return NextResponse.next()
    }
    
    // If accessing root path, show English version without /en prefix
    if (pathname === '/') {
      return NextResponse.next()
    }
    
    // Check if the pathname starts with a supported locale
    const pathnameHasLocale = supportedLocales.some(
      locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    
    // If no locale found, redirect to English version
    if (!pathnameHasLocale) {
      return NextResponse.redirect(new URL(`/en${pathname}`, request.url))
    }
    
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}