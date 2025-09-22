import { query } from '../../../(client)/lib/db';
import { NextResponse } from "next/server";

interface UpdateRate {
  airport_id: string;
  vehicle_id: number;
  base_price: number;
  km_rate: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updates: UpdateRate[] = body.updates;

    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    for (const u of updates) {
      const { airport_id, vehicle_id, base_price, km_rate} = u;

      await query(
        `UPDATE airport_rates SET base_price = $1, km_rate = $2 
         WHERE airport_id = $3 AND vehicle_id = $4`,
        [base_price, km_rate, airport_id, vehicle_id]
      );
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB update error" }, { status: 500 });
  }
}
