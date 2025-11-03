import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // === Mailgun transporter ===
    const transporter = nodemailer.createTransport({
      host: "smtp.eu.mailgun.org",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
      },
    });

    // === Extras alanını okunabilir hale getir ===
    const extrasList =
      data.extras && Object.keys(data.extras).length > 0
        ? Object.entries(data.extras)
            .filter(([_, value]) => value && value !== 0)
            .map(([key, value]) => {
              if (key === "airportAssistance") return "Airport Assistance";
              if (key === "flowers") return "Flowers";
              if (key === "wait") return "Waiting Service";
              if (key === "childSeat") return `Child Seat (${value})`;
              return key;
            })
            .join(", ")
        : null;

    // === Ortak tablo (tüm alanlar dahil) ===
    const bookingDetails = `
      <table style="width:100%; border-collapse:collapse; font-family:Arial, sans-serif; color:#333;">
        <tr><td><strong>Name:</strong></td><td>${data.details.name} ${data.details.lastName}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${data.details.email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${data.details.phone}</td></tr>
        ${data.details?.flightNumber ? `<tr><td><strong>Flight Number:</strong></td><td>${data.details.flightNumber}</td></tr>` : ""}
        ${data.details?.message ? `<tr><td><strong>Message:</strong></td><td>${data.details.message}</td></tr>` : ""}
        <tr><td><strong>Passengers:</strong></td><td>${data.passenger_count}</td></tr>
        <tr><td><strong>Pickup:</strong></td><td>${data.pickup_location?.name}</td></tr>
        <tr><td><strong>Drop Off:</strong></td><td>${data.drop_off_location?.name}</td></tr>
        <tr><td><strong>Pickup Date:</strong></td><td>${data.pickup_date}</td></tr>
        <tr><td><strong>Pickup Hour:</strong></td><td>${data.pickup_hour}</td></tr>
        <tr><td><strong>Vehicle:</strong></td><td>${data.booking?.vehicle_name}</td></tr>
        ${extrasList ? `<tr><td><strong>Extras:</strong></td><td>${extrasList}</td></tr>` : ""}
        ${
          data.return_data?.return_trip
            ? `<tr><td><strong>Return Trip:</strong></td>
                <td>
                  ${data.return_data.return_date || "No date"} 
                  ${data.return_data.return_hour ? `at ${data.return_data.return_hour}` : ""} 
                  ${data.return_data.return_count ? `— Passengers: ${data.return_data.return_count}` : ""}
                </td>
              </tr>`
            : ""
        }
        <tr><td><strong>Payment:</strong></td><td>${data.payment_method === "credit" ? "Credit Card" : "Cash"}</td></tr>
        <tr><td><strong>Price:</strong></td><td>${data.price} ${data.symbol}</td></tr>
      </table>
    `;

    // === 1️⃣ Şirkete mail ===
    await transporter.sendMail({
      from: `"Airport To Hotels" <${process.env.MAILGUN_USER}>`,
      to: "info@airporttohotels.com",
      subject: "New Booking Received",
      html: `
        <div style="font-family:Arial,sans-serif; color:#333; line-height:1.6;">
          <h2>New Booking Received</h2>
          ${bookingDetails}
        </div>
      `,
    });

    // === 2️⃣ Kullanıcıya mail ===
    const userMailHtml = `
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1); font-family:Arial,sans-serif;">
        <!-- Header -->
        <div style="background-color:#0e3a75; color:#fff; padding:20px; text-align:center;">
          <img src="https://airporttohotels.com/images/logos/Logo_W.png" alt="Airport To Hotels" style="max-width:160px; margin-bottom:10px;">
          <h2 style="margin:0; font-size:20px;">Booking Confirmation</h2>
        </div>

        <!-- Body -->
        <div style="padding:20px;">
          <p>Dear <strong>${data.details.name}</strong>,</p>
          <p>Thank you for choosing <strong>Airport To Hotels</strong>. Your booking has been successfully confirmed.</p>

          <h3 style="border-bottom:1px solid #ddd; padding-bottom:5px;">Booking Details</h3>
          ${bookingDetails}

          <p style="margin-top:20px;">If you have any questions or need assistance, feel free to contact us anytime.</p>
        </div>

        <!-- Footer -->
        <div style="background-color:#f5f5f5; padding:15px; text-align:center; font-size:13px; color:#555;">
          <p><strong>Airport To Hotels</strong></p>
          <p>📞 +90 554 016 19 23 &nbsp; | &nbsp; ✉️ info@airporttohotels.com</p>
          <p>🌐 <a href="https://airporttohotels.com" style="color:#0e3a75; text-decoration:none;">airporttohotels.com</a></p>
          <p style="margin-top:8px;">Thank you for trusting us with your transfer.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Airport To Hotels" <${process.env.MAILGUN_USER}>`,
      to: data.details.email,
      subject: "Your Booking Confirmation — Airport To Hotels",
      html: userMailHtml,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("❌ send-booking-mail error:", error);
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }
}