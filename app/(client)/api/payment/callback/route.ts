import { NextResponse } from "next/server";
import crypto from "crypto";
import { query } from "../../../lib/db";

// === Helpers ===
const sha1HexUpper = (s: string) =>
  crypto
    .createHash("sha1")
    .update(Buffer.from(s, "utf8"))
    .digest("hex")
    .toUpperCase();

async function parseForm(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/x-www-form-urlencoded")) {
    const form = await req.formData();
    const obj: Record<string, string> = {};
    form.forEach((v, k) => (obj[k] = String(v)));
    return obj;
  }
  const url = new URL(req.url);
  const obj: Record<string, string> = {};
  url.searchParams.forEach((v, k) => (obj[k] = v));
  return obj;
}

// === Main Handler ===
export async function POST(req: Request) {
  console.log(
    "\n==================== Garanti Unified CALLBACK ====================\n"
  );
  try {
    const payload = await parseForm(req);
    const orderId = payload.oid || payload.orderid || payload.ORDERID;
    if (!orderId) return new NextResponse("Missing order id", { status: 400 });

    const storeKey = process.env.GARANTI_STORE_KEY || "";
    const isTest = process.env.GARANTI_MODE === "TEST";

    // --- Log incoming payload for clarity ---
    console.log("🧩 Callback raw payload keys:", Object.keys(payload));
    console.log("📑 hashparams string:", payload.hashparams);

    const returnedHash = payload.hash || "";
    const hashParams = (payload.hashparams || "").split(":").filter(Boolean);

    // --- Hash reconstruction ---
    let concatenated = "";
    for (const key of hashParams) concatenated += payload[key] ?? "";
    const calcHash = sha1HexUpper(concatenated + storeKey);
    const hashMatch = calcHash === returnedHash;

    // --- Garanti fields ---
    const mdstatus = String(payload.mdstatus || "");
    const prc = String(payload.procreturncode || "");
    const responseField = String(payload.response || "").toLowerCase();

    // --- Approval logic ---
    const approved =
      ["1", "2", "3", "4"].includes(mdstatus) &&
      (prc === "00" || responseField.includes("approved"));

    console.log("🧾 Garanti unified callback details:", {
      orderId,
      mdstatus,
      procreturncode: prc,
      response: responseField,
      hashMatch,
      calcHash,
      returnedHash,
      approved,
    });

    // --- DB update ---
    if (approved) {
      await query(
        "UPDATE bookings SET status=$1, paid_at=NOW(), gateway_response=$2 WHERE uuid=$3",
        ["paid", JSON.stringify(payload), orderId]
      );
      console.log("✅ Payment success:", orderId);
    } else {
      await query(
        "UPDATE bookings SET status=$1, gateway_response=$2 WHERE uuid=$3",
        ["payment_failed", JSON.stringify(payload), orderId]
      );
      console.log("❌ Payment failed:", orderId);
    }

    // --- Redirect to frontend ---
    const base = process.env.NEXT_PUBLIC_BASE_URL!;
    // === Approval logic sonrası ===
    let errorCode = "GENERIC_ERROR";
    let errorMessage = "Transaction declined";
    if (!approved) {
      console.warn("❌ PAYMENT FAILED", {
        orderId,
        errorCode,
        errorMessage,
        mdstatus: payload.mdstatus,
        procreturncode: payload.procreturncode,
        response: payload.response,
      });
    }
    if (payload.procreturncode) {
      errorCode = `PRC_${payload.procreturncode}`;
      errorMessage =
        payload.ErrMsg ||
        payload.mdErrorMsg ||
        payload.response ||
        errorMessage;
    } else if (
      payload.mdstatus &&
      !["1", "2", "3", "4"].includes(String(payload.mdstatus))
    ) {
      errorCode = `MD_${payload.mdstatus}`;
      errorMessage = payload.mdErrorMsg || "3D authentication failed";
    }

    const fullErrorJson = encodeURIComponent(JSON.stringify(payload));

    const redirectUrl = approved
      ? `${base}/success?uuid=${orderId}&status=paid`
      : `${base}/failed?uuid=${orderId}&status=failed&code=${errorCode}&error=${fullErrorJson}`;

    const html = `
      <html><head>
        <meta http-equiv="refresh" content="0;url=${redirectUrl}" />
      </head>
      <body>
        <p>Redirecting to <a href="${redirectUrl}">${redirectUrl}</a></p>
      </body></html>`;

    return new Response(html, { headers: { "Content-Type": "text/html" } });
  } catch (err: any) {
    console.error("❌ Error in /api/payment/callback:", err.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}
