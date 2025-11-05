import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { uuid, status } = await req.json();

    if (!uuid || !status) {
      return NextResponse.json(
        { error: "Missing uuid or status" },
        { status: 400 }
      );
    }

    const sql = `
      UPDATE bookings
      SET status = $1
      WHERE uuid = $2
      RETURNING uuid, status;
    `;

    const result = await query(sql, [status, uuid]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      updated: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating payment status:", err);
    return NextResponse.json(
      { error: "Failed to update payment status" },
      { status: 500 }
    );
  }
}
