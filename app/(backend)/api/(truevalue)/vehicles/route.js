//this api route is for users only

import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import TrueSchema from "@/lib/models/trueSchema";

// GET: Fetch all vehicles that are published
export async function GET() {
  try {
    await ConnectDB();
    const vehicles = await TrueSchema.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();

    if (!vehicles || vehicles.length === 0) {
      return NextResponse.json(
        { success: false, error: "No published vehicles found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, vehicles }, { status: 200 });
  } catch (err) {
    console.error("GET vehicles failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vehicles." },
      { status: 500 }
    );
  }
}
