//this api route is for admin only
import { NextResponse } from "next/server";
import Rajesh from "@/lib/models/trueSchema";
import { ConnectDB } from "@/lib/config/db";

export const GET = async (req, { params }) => {
  try {
    await ConnectDB();

    const { id } = await params;

    console.log("Fetching vehicle with ID:", id);

    const vehicle = await Rajesh.findById(id);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, vehicle }, { status: 200 });
  } catch (err) {
    console.error("GET /api/admin/truevalue/[id] failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vehicle." },
      { status: 500 }
    );
  }
};
