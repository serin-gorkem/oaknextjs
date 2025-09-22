import { query } from '../../../(client)/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await query('SELECT * FROM prices ORDER BY id ASC');
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('DB read error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
