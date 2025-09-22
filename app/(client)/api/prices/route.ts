// app/api/prices/route.ts
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const airportId = searchParams.get("airportId");
  const distanceKm = Number(searchParams.get("distanceKm"));

  if (!airportId) {
    return NextResponse.json({ error: "airportId missing" }, { status: 400 });
  }

  try {
    const sql = `
      SELECT 
        ar.airport_id,
        ar.vehicle_id,
        ar.base_price,
        ar.km_rate,
        v.name AS vehicle_name
      FROM airport_rates ar
      JOIN vehicles v ON v.id = ar.vehicle_id
      WHERE TRIM(UPPER(ar.airport_id)) = TRIM(UPPER($1))
    `;

    const result = await query(sql, [airportId]);

    // Add calculated price per row
    const rowsWithCalc = result.rows.map((row: any) => ({
      ...row,
      total_price: Number(row.base_price) + Number(row.km_rate) * distanceKm,
    }));

    return NextResponse.json({
      airportId,
      distanceKm,
      resultCount: rowsWithCalc.length,
      rows: rowsWithCalc,
    });
  } catch (err) {
    console.error("DB read error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
