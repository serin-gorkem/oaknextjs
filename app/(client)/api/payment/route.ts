import { NextResponse } from "next/server";
import crypto from "crypto";
import { query } from "../../lib/db";

// --- Utils ---
const sha1HexUpper = (s: string) =>
  crypto.createHash("sha1").update(Buffer.from(s, "utf8")).digest("hex").toUpperCase();

const sha512HexUpper = (s: string) =>
  crypto.createHash("sha512").update(Buffer.from(s, "utf8")).digest("hex").toUpperCase();

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const pad2 = (v: string | number) => String(v).padStart(2, "0");

export async function POST(req: Request) {
  console.log("\n==================== Garanti Payment INIT (512) ====================\n");
  try {
    const body = await req.json().catch(() => ({}));
    const { uuid, cardData } = body || {};
    console.log("Received body:", body);

    if (!uuid) return new NextResponse("Missing uuid", { status: 400 });
    if (!cardData?.number || !cardData?.month || !cardData?.year || !cardData?.cvv)
      return new NextResponse("Missing cardData", { status: 400 });

    // --- Booking kontrolü ---
    const result = await query("SELECT price FROM bookings WHERE uuid = $1", [uuid]);
    if (!result.rows.length)
      return new NextResponse("Booking not found", { status: 404 });
    const dbPrice = result.rows[0].price;
    console.log("✅ Booking found:", { uuid, dbPrice });

    // --- ENV değişkenleri ---
    const terminalId = process.env.GARANTI_TERMINAL_ID!;
    const merchantId = process.env.GARANTI_MERCHANT_ID!;
    const provUser = process.env.GARANTI_PROV_USER!;
    const provPass = process.env.GARANTI_PROV_PASS!;
    const storeKey = process.env.GARANTI_STORE_KEY!;
    const GARANTI_MODE = process.env.GARANTI_MODE || "TEST";
    const SUCCESS_URL = process.env.GARANTI_SUCCESS_URL!;
    const ERROR_URL = process.env.GARANTI_ERROR_URL!;
    console.log("🧩 Garanti Config:", {
      terminalId,
      merchantId,
      provUser,
      GARANTI_MODE,
    });

    // --- Transaction ---
    const orderId = uuid;
    const amountKurus = Math.round(Number(dbPrice) * 100).toString();
    const currency = "949";
    const txntype = "sales";
    const installment = "0";

    // --- Hash (SHA512) ---
    const hashedPassword = sha1HexUpper(provPass + "0" + terminalId);
    const plain =
      terminalId +
      orderId +
      amountKurus +
      currency +
      SUCCESS_URL +
      ERROR_URL +
      txntype +
      installment +
      storeKey +
      hashedPassword;
    const secure3dhash = sha512HexUpper(plain);

    console.log("🔐 hp(SHA1):", hashedPassword);
    console.log("✅ secure3dhash(SHA512):", secure3dhash);

    const endpoint =
      GARANTI_MODE === "PROD"
        ? "https://sanalposprov.garanti.com.tr/servlet/gt3dengine"
        : "https://sanalposprovtest.garantibbva.com.tr/servlet/gt3dengine";

    // --- Form alanları ---
    const formFields: Record<string, string> = {
      mode: GARANTI_MODE,
      apiversion: "512",
      secure3dsecuritylevel: "3D",
      terminalprovuserid: provUser,
      terminaluserid: provUser,
      terminalmerchantid: merchantId,
      terminalid: terminalId,
      orderid: orderId,
      successurl: SUCCESS_URL,
      errorurl: ERROR_URL,
      storetype: "3d_pay",
      secure3dhash,
      txnamount: amountKurus,
      txncurrencycode: currency,
      txntype,
      txninstallmentcount: installment,
      lang: "tr",
      cardnumber: cardData.number.replace(/\D/g, ""),
      cardexpiredatemonth: pad2(cardData.month),
      cardexpiredateyear: pad2(cardData.year).slice(-2),
      cardcvv2: String(cardData.cvv),
    };
    console.log("📦 Form Fields (512):", formFields);

    // --- HTML redirect ---
    const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Redirecting...</title></head>
<body onload="document.forms[0].submit();">
<form method="post" action="${endpoint}">
${Object.entries(formFields)
  .map(
    ([k, v]) => `<input type="hidden" name="${k}" value="${escapeHtml(v)}" />`
  )
  .join("\n")}
<noscript><button type="submit">Continue</button></noscript>
</form>
<script>setTimeout(()=>{try{document.forms[0].submit()}catch(e){}},1200)</script>
</body></html>`;

    console.log(
      "\n==================== Redirecting to Garanti 3D Secure ====================\n"
    );
    return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
  } catch (err: any) {
    console.error("❌ Error in /api/payment:", err.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}