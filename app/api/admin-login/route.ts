import { cookies } from 'next/headers';
import { isValidAdmin } from '../../lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!isValidAdmin(username, password)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set('admin-auth', 'true', { httpOnly: true });
  return NextResponse.json({ success: true });
}
