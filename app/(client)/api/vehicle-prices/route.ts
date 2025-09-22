import { NextResponse } from "next/server";
import { query } from "../../lib/db";


export async function GET() {
  try {
    const result = await query(`
      SELECT 
        v.id AS vehicle_id,
        v.name AS vehicle_name,
        json_agg(
          json_build_object(
            'currency', p.currency,
            'amount', p.amount,
            'price_id', p.id,
            'currency_symbol', p.currency_symbol
          ) ORDER BY p.id
        ) AS prices
      FROM vehicles v
      JOIN prices p ON p.vehicle_id = v.id
      GROUP BY v.id
      ORDER BY v.id
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Vehicle price fetch error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
