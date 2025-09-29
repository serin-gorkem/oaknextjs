import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { updates } = await req.json(); // [{ id, display_name, price }]

    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json({ error: "Invalid updates" }, { status: 400 });
    }

    const promises = updates.map((e: any) =>
      query(
        `UPDATE extras SET display_name=$1, price=$2 WHERE id=$3`,
        [e.display_name, e.price, e.id]
      )
    );

    await Promise.all(promises);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DB ERROR:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
