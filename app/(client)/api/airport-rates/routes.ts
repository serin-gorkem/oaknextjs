
// app/api/airport-rates/route.ts
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../lib/db";

export const runtime = "nodejs"; // logların görünmesi için

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const airportId = searchParams.get("airportId");

  // Eğer airportId yoksa 400 dön
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

    // Response’a hem query sonucu hem de kullanılan airportId’yi ekle
    return NextResponse.json({
      requestedAirportId: airportId,   // Client hangi ID ile çağırdı
      resultCount: result.rows.length, // Kaç satır geldi
      rows: result.rows                // Asıl veriler
    });
  } catch (err) {
    console.error("DB read error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
