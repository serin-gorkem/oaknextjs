import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, amount } = body;
  try {
    await query("UPDATE prices SET amount = $1 WHERE id = $2", [amount,id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
