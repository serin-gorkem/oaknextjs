export async function UpdateData({ clientData }: { clientData: any }) {
  console.log(clientData);
  
  try {
    const res = await fetch("/api/form-data", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uuid: clientData.uuid,
        return_data: clientData.return_data,
        booking: clientData.booking,
        extras: clientData.extras,
        details: clientData.details,
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Unknown error");
    console.log("Booking updated successfully");
  } catch (err) {
    console.error("Booking update failed:", err);
  }
}