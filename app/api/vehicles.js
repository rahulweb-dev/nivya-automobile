// pages/api/vehicles.js
import admin from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const data = req.body;
    const db = admin.firestore();
    // Add timestamps & small validation as needed
    data.createdAt = admin.firestore.FieldValue.serverTimestamp();

    const docRef = await db.collection("vehicles").add(data);
    return res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
