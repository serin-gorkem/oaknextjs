//Fetch data from the form, and push it to the database.
//After the new page is loaded, the data is fetched from the database and displayed on the page.
//You need to delete the data from the database after the page is loaded.

import { NextRequest, NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  
  const {
    pickup_location,
    drop_off_location,
    pickup_date,
    pickup_hour,
    passenger_count,
    uuid,
    return_data,
    booking,
    extras,
    details,
    price,
  } = body;

  try {
    await query(
      `INSERT INTO bookings (
    pickup_location, drop_off_location, pickup_date,
    pickup_hour, passenger_count, uuid,return_data,booking, extras, details, price
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        JSON.stringify(pickup_location),
        JSON.stringify(drop_off_location),
        pickup_date,
        pickup_hour,
        passenger_count,
        uuid,
        return_data,
        booking ? JSON.stringify(booking) : JSON.stringify({}),
        extras ? JSON.stringify(extras) : null,
        details ? JSON.stringify(details) : JSON.stringify({}),
        price ?? 0

      ]
    );
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json({ error: "UUID eksik" }, { status: 400 });
  }

  try {
    const result = await query(
      `SELECT * FROM bookings WHERE uuid = $1 AND expires_at > NOW()`,
      [uuid]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Kayıt bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Veri çekme hatası" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("uuid");
  if (!uuid) {
    return NextResponse.json({ error: "UUID eksik" }, { status: 400 });
  }
  try {
    await query("DELETE FROM bookings WHERE uuid = $1", [uuid]);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Veri silme hatası" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const {
    uuid,
    return_data,
    booking,
    extras,
    details,
    price,
  } = body;

  if (!uuid) {
    return NextResponse.json({ error: "UUID missing" }, { status: 400 });
  }

  try {
    await query(
      `
      UPDATE bookings
      SET return_data = $1, booking=$2, extras = $3, details = $4 , price = $5
      WHERE uuid = $6
    `,
      [
        return_data ?? null,
        booking ?? {},
        extras ?? null, 
        details ?? {},
        price ?? 0,
        uuid,
      ]
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
