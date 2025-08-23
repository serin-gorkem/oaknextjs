import { query } from '../../../(client)/lib/db';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await query(
      `SELECT ar.*, v.name as vehicle_name, a.name as airport_name 
       FROM airport_rates ar
       JOIN vehicles v ON ar.vehicle_id = v.id
       JOIN airports a ON ar.airport_id = a.id
       ORDER BY a.name, v.id`
    );
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("DB read error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
