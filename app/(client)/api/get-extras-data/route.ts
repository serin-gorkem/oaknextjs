import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        e.id,
        e.display_name,
       json_agg(
          json_build_object(
            'currency', p.currency,
            'amount', p.amount,
            'price_id', p.id,
            'currency_symbol', p.currency_symbol
          ) ORDER BY p.id
        ) AS prices
      FROM extras e
      LEFT JOIN prices p ON e.id = p.extras_id
      GROUP BY e.id
      ORDER BY e.id
    `);

    return NextResponse.json(result.rows); // array of extras objects with prices
  } catch (error) {
    console.error("DB ERROR:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
