import { NextRequest, NextResponse } from "next/server";
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
        json_agg(json_build_object('currency', p.currency, 'amount', p.amount)) AS prices
      FROM vehicles v
      LEFT JOIN prices p ON v.id = p.vehicle_id
      GROUP BY v.id
    `);

    return NextResponse.json(result.rows); // array of vehicle objects
  } catch (error) {
    console.error("DB ERROR:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
