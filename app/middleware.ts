import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get('admin-auth')?.value === 'true';

  if (request.nextUrl.pathname.startsWith('/admin/dashboard') && !isAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/admin/dashboard/:path*'], // ✅ sadece admin korunsun
};