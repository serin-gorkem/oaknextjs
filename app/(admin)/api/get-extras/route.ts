import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        e.id,
        e.display_name
      FROM extras e
      ORDER BY e.id ASC
    `);

    return NextResponse.json(result.rows); // array of vehicle objects
  } catch (error) {
    console.error("DB ERROR:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
