//this api route is for users only

import { NextResponse } from "next/server";
import TrueSchema from "@/lib/models/trueSchema";
import { ConnectDB } from "@/lib/config/db";

//fetch vehicle by id if only its published
export const GET = async ({ params }) => {
  try {
    await ConnectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const vehicle = await TrueSchema.findOne({ _id: id, published: true });

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
