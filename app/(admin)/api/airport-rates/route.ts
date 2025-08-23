import { query } from '../../../(client)/lib/db';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await query(
      `SELECT ar.*, v.name as vehicle_name, a.name as airport_name 
       FROM airport_rates ar
       JOIN vehicles v ON ar.vehicleid = v.id
       JOIN airports a ON ar.airportid = a.id
       ORDER BY a.name, v.id`
    );
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("DB read error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
