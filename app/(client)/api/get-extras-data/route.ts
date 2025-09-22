import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        e.id,
        e.display_name,
        e.price
      FROM extras e
      GROUP BY e.id
      ORDER BY e.id
    `);

    return NextResponse.json(result.rows); // array of extras objects with prices
  } catch (error) {
    console.error("DB ERROR:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
