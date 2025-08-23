import { query } from '../../../(client)/lib/db';
import { NextResponse } from "next/server";

interface UpdateRate {
  airportId: string;
  vehicleId: number;
  baseprice: number;
  kmrate: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updates: UpdateRate[] = body.updates;

    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    for (const u of updates) {
      const { airportId, vehicleId, baseprice, kmrate } = u;

      await query(
        `UPDATE airport_rates SET baseprice = $1, kmrate = $2 
         WHERE airportid = $3 AND vehicleid = $4`,
        [baseprice, kmrate, airportId, vehicleId]
      );
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB update error" }, { status: 500 });
  }
}
