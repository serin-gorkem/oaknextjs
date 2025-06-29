// // app/api/customer/route.ts
// import { db } from '@/lib/db';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const result = await db.query('SELECT * FROM customers ORDER BY created_at DESC');
//   return NextResponse.json(result.rows);
// }

// export async function POST(req: Request) {
//   const body = await req.json();

//   const result = await db.query(
//     `INSERT INTO customers (name, email, location)
//      VALUES ($1, $2, $3) RETURNING *`,
//     [body.name, body.email, body.location]
//   );

//   return NextResponse.json(result.rows[0]);
// }