import { NextRequest, NextResponse } from "next/server";
import { query } from "../../lib/db";   

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const airportId = searchParams.get("airportId");

  if (!airportId) return NextResponse.json({ error: "airportId missing" }, { status: 400 });

  try {
    const result = await query(
      `SELECT ar.vehicleid, v.name as vehicle_name, ar.baseprice, ar.kmrate
       FROM airport_rates ar
       JOIN vehicle v ON v.id = ar.vehicleid
       WHERE ar.airportid = $1
       ORDER BY ar.vehicleid`,
      [airportId]
    );
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("DB read error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
