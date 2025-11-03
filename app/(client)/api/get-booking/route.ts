import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uuid = searchParams.get("uuid");
  if (!uuid) return NextResponse.json({ error: "Missing uuid" }, { status: 400 });

  try {
    const result = await query("SELECT * FROM bookings WHERE uuid = $1", [uuid]);
    if (!result.rows.length) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(result.rows[0]);
  } catch (err: any) {
    console.error("getBooking error:", err.message);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
