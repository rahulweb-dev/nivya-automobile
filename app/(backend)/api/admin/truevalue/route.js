// File: app/api/admin/truevalue/route.js

import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import Rajesh from "@/lib/models/trueSchema";

// ✅ GET: Fetch all vehicles
export async function GET() {
  try {
    await ConnectDB();
    const vehicles = await Rajesh.find().sort({ createdAt: -1 });

    // Always return an array (even if empty)
    return NextResponse.json(
      { success: true, vehicles: vehicles || [] },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET vehicles failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vehicles." },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new vehicle
export async function POST(req) {
  try {
    await ConnectDB();
    const body = await req.json();

    // Validate required fields
    const requiredFields = ["brand", "model", "ownerType"];
    const missing = requiredFields.filter((f) => !body[f]);
    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required field(s): ${missing.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const formData = {
      name: `${String(body.brand).trim()} ${String(body.model).trim()}`,
      brand: String(body.brand).trim(),
      model: String(body.model).trim(),
      ownerType: String(body.ownerType).trim(),
      fuelType: String(body.fuelType || "Unknown").trim(),
      modelYear: body.modelYear ? Number(body.modelYear) : null,
      price: Number(body.price) || 0,
      kmDriven: Number(body.kmDriven) || 0,
      transmission: body.transmission?.trim() || "Manual",
      bodyType: body.bodyType?.trim() || "Other",
      color: body.color?.trim() || "Unspecified",
      userType: body.userType?.trim() || "Dealer",
      location: body.location?.trim() || "Unknown",

      // Ensure clean images array
      images:
        Array.isArray(body.images) && body.images.length > 0
          ? body.images
              .filter(
                (img) =>
                  img &&
                  typeof img === "object" &&
                  typeof img.url === "string" &&
                  img.url.trim() !== ""
              )
              .map((img) => ({
                url: img.url.trim(),
                fileId: img.fileId || null,
              }))
          : [],

      published: typeof body.published === "boolean" ? body.published : true,
      features: Array.isArray(body.features) ? body.features : [],
      description: body.description?.trim() || "",
    };

    // Save to DB
    const vehicle = await Rajesh.create(formData);

    return NextResponse.json(
      {
        success: true,
        message: "Vehicle created successfully",
        vehicle,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Vehicle creation failed:", err);

    if (err.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
