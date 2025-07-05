import { query } from "../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await query("DELETE FROM bookings WHERE expires_at < NOW()");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cleanup Error:", error);
    return NextResponse.json({ error: "Temizleme hatası" }, { status: 500 });
  }
}