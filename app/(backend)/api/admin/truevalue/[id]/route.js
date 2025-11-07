// this API route is for admin only
import { NextResponse } from "next/server";
import Rajesh from "@/lib/models/trueSchema";
import { ConnectDB } from "@/lib/config/db";

// 🔹 GET: Fetch vehicle by ID
export const GET = async (req, { params }) => {
  try {
    await ConnectDB();

    const { id } = params;
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

// 🔹 PUT: Update vehicle by ID
export const PUT = async (req, { params }) => {
  try {
    await ConnectDB();
    const { id } = params;
    const data = await req.json();

    console.log("Updating vehicle:", id);

    const updatedVehicle = await Rajesh.findByIdAndUpdate(id, data, {
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
    console.error("PUT /api/admin/truevalue/[id] failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update vehicle." },
      { status: 500 }
    );
  }
};

// 🔹 DELETE: Delete vehicle by ID
export const DELETE = async (req, { params }) => {
  try {
    await ConnectDB();
    const { id } = params;

    console.log("Deleting vehicle with ID:", id);

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
    console.error("DELETE /api/admin/truevalue/[id] failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete vehicle." },
      { status: 500 }
    );
  }
};
