// import { db } from '@/lib/db';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const result = await db.query('SELECT * FROM prices ORDER BY currency');
//   return NextResponse.json(result.rows);
// }

// export async function POST(req: Request) {
//   const body = await req.json();

//   // currency: "USD", amount: 1250.00
//   const result = await db.query(
//     `INSERT INTO prices (currency, amount)
//      VALUES ($1, $2)
//      ON CONFLICT (currency)
//      DO UPDATE SET amount = EXCLUDED.amount`,
//     [body.currency, body.amount]
//   );

//   return NextResponse.json({ success: true });
// }