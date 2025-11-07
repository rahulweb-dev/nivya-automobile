// This API route is for admin only

import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import Rajesh from "@/lib/models/trueSchema";

// =========================
// 🟩 GET: Fetch all vehicles
// =========================
export async function GET() {
  try {
    await ConnectDB();

    const vehicles = await Rajesh.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, vehicles }, { status: 200 });
  } catch (err) {
    console.error("GET vehicles failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vehicles." },
      { status: 500 }
    );
  }
}

// ==========================
// 🟦 POST: Create a vehicle
// ==========================
export async function POST(req) {
  try {
    await ConnectDB();
    const body = await req.json();
    console.log("body", JSON.stringify(body));

    // 🔍 Validate required fields
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
      fuelType: body.fuelType?.trim() || "Unknown",
      modelYear: body.modelYear ? Number(body.modelYear) : null,
      price: body.price ? Number(body.price) : 0,
      kmDriven: body.kmDriven ? Number(body.kmDriven) : 0,
      transmission: body.transmission?.trim() || "Manual",
      bodyType: body.bodyType?.trim() || "Other",
      color: body.color?.trim() || "Unspecified",
      userType: body.userType?.trim() || "Dealer",
      location: body.location?.trim() || "Unknown",
      images: Array.isArray(body.images)
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
      published: body.published ?? true,
      features: Array.isArray(body.features) ? body.features : [],
      description: body.description?.trim() || "",
    };

    // 💾 Save to DB
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

// =========================
// 🟧 PUT: Update a vehicle
// =========================
export async function PUT(req) {
  try {
    await ConnectDB();
    const body = await req.json();

    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const updatedVehicle = await Rajesh.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedVehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Vehicle updated successfully",
        vehicle: updatedVehicle,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Vehicle update failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update vehicle" },
      { status: 500 }
    );
  }
}

// ===========================
// 🟥 DELETE: Delete a vehicle
// ===========================
export async function DELETE(req) {
  try {
    await ConnectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const deletedVehicle = await Rajesh.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Vehicle deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Vehicle deletion failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
