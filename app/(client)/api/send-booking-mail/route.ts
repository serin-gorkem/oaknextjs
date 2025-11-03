import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Nodemailer transporter ayarları
    const transporter = nodemailer.createTransport({
      host: "smtp.eu.mailgun.org",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
      },
    });

    // Mail içeriğini oluştur
    const emailContent = `
    <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
        <h2>Booking Details</h2>
        <p><strong>Name:</strong> ${data.details.name} ${data.details.lastName}</p>
        <p><strong>Email:</strong> ${data.details.email}</p>
        <p><strong>Phone:</strong> ${data.details.phone}</p>
        <p><strong>Passengers Count:</strong> ${data.passenger_count}</p>
        ${data.details?.message ? `<p><strong>Message:</strong> ${data.details.message}</p>` : ""}
        <p><strong>Pickup Location:</strong> ${data.pickup_location?.name}</p>
        ${data.details?.flightNumber ? `<p><strong>Flight Number:</strong> ${data.details.flightNumber}</p>` : ""}
        ${data.extras && Object.keys(data.extras).length > 0 ? `<p><strong>Extras:</strong> ${Object.entries(data.extras)
        .filter(([_, value]) => value && value !== 0)
        .map(([key, value]) => {
            if (key === "airportAssistance") return "Airport Assistance";
            if (key === "childSeat") return `Child Seat (${value})`;
            if (key === "flowers") return "Flowers";
            if (key === "wait") return "Waiting Service";
            return key;
        }).join(", ")}</p>` : ""}
        <p><strong>Drop Off Location:</strong> ${data.drop_off_location?.name}</p>
        <p><strong>Pickup Date:</strong> ${data.pickup_date}</p>
        <p><strong>Pickup Hour:</strong> ${data.pickup_hour}</p>
        ${data.return_data?.return_trip ? `<p><strong>Return Trip:</strong> ${data.return_data.return_date || "No date"}${data.return_data.return_hour ? ` at ${data.return_data.return_hour}` : ""}${data.return_data.return_count ? ` — Passengers: ${data.return_data.return_count}` : ""}</p>` : ""}
        <p><strong>Vehicle Type:</strong> ${data.booking?.vehicle_name}</p>
        <p><strong>Payment Method:</strong> ${data.payment_method === "credit" ? "Credit Card" : "Cash"}</p>
        <p><strong>Price:</strong> ${data.price} ${data.symbol}</p>
    </div>
    `;


    await transporter.sendMail({
      from: `"Booking System" <${process.env.MAILGUN_USER}>`,
      to: "info@airporttohotels.com", // maili alıcı
      subject: "New Booking Received",
      html: emailContent,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
  }
}
