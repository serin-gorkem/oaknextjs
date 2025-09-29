import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET() {
  try {
    const result = await query(`
      SELECT id, display_name, price
      FROM extras
      ORDER BY id ASC
    `);

    // price değerini kesinlikle number olarak gönderiyoruz
    const formatted = result.rows.map((r) => ({
      ...r,
      price: r.price !== null ? Number(r.price) : 0,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("DB ERROR:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
