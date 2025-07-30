import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 如果访问根路径，重定向到中文版本
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/zh', request.url))
  }
  
  // 如果路径不是以 /zh、/en 或 /ja 开头，且不是API或静态文件，重定向到中文版本
  if (
    !pathname.startsWith('/zh') && 
    !pathname.startsWith('/en') && 
    !pathname.startsWith('/ja') && 
    !pathname.startsWith('/api') && 
    !pathname.startsWith('/_next') &&
    !pathname.includes('.')
  ) {
    return NextResponse.redirect(new URL(`/zh${pathname}`, request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}