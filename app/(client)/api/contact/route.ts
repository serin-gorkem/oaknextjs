import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try { 
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.eu.mailgun.org",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
      },
    });

    // Mail ayarları
    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${process.env.MAILGUN_USER}>`,
      to: "your_email@airporttohotels.com", // kendi mail adresin
      subject: "New Contact Form Submission",
      html: `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Mail send error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
