import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        v.id,
        v.name,
        v.image_url,
        v.capacity_person,
        v.capacity_bags,
        v.features,
        v.base_price
      FROM vehicles v
      ORDER BY v.id
    `);

    return NextResponse.json(result.rows); // array of vehicle objects
  } catch (error) {
    console.error("DB ERROR:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
