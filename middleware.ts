// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('🔥 Middleware çalıştı:', request.nextUrl.pathname); // 👈 BUNU GÖRMEN LAZIM
  const cookieValue = request.cookies.get('admin-auth')?.value;
  console.log('🧁 Cookie değeri:', cookieValue); // 👈 Bu da görünmeli

  const isAdmin = cookieValue === 'true';

  if (request.nextUrl.pathname.startsWith('/admin/dashboard') && !isAdmin) {
    console.log('⛔ Admin değil, yönlendiriliyor');
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard', '/admin/dashboard/:path*'],
};
