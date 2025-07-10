// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { isValidAdmin } from '../../lib/auth';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!isValidAdmin(username, password)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  // httpOnly + path: '/' ile tüm siteye açık
  response.cookies.set('admin-auth', 'true', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 gün
    secure: false,
  });

  return response;
}
