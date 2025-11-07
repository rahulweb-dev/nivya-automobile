//this api route is for admin only
import { NextResponse } from "next/server";
import Rajesh from "@/lib/models/trueSchema";
import { ConnectDB } from "@/lib/config/db";

export const GET = async (req, { params }) => {
  try {
    await ConnectDB();

    const { id } = await params;

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

export const PUT = async (req, { params }) => {
  try {
    await ConnectDB();
    const body = await req.json();
    const { id } = await params;

    // Validate ID format
    if (!id || id.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Invalid vehicle ID" },
        { status: 400 }
      );
    }

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

    // Check if vehicle exists
    const vehicle = await Rajesh.findById(id);
    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    // Prepare update data
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

    // Update vehicle
    const updatedVehicle = await Rajesh.findByIdAndUpdate(id, formData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Vehicle updated successfully",
        data: updatedVehicle,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Vehicle update failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update vehicle",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await ConnectDB();

    const { id } = await params;

    const vehicle = await Rajesh.findById(id);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    // Delete all images from ImageKit first
    if (vehicle.images?.length > 0) {
      try {
        await Promise.all(
          vehicle.images.map(async (image) => {
            try {
              // Use absolute API path if it's a local route
              const res = await fetch(
                `${
                  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
                }/api/imagekit/${image.fileId}`,
                { method: "DELETE" }
              );

              if (!res.ok) {
                console.error(`Failed to delete image: ${image.fileId}`);
              }
            } catch (error) {
              console.error(`Error deleting image ${image.fileId}:`, error);
            }
          })
        );
        console.log("All images deleted from ImageKit");
      } catch (err) {
        console.error("Failed to delete one or more images:", err);
        return NextResponse.json(
          { success: false, error: "Failed to delete images from ImageKit" },
          { status: 500 }
        );
      }
    }

    // Delete the vehicle after all images are deleted
    await Rajesh.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Vehicle deleted successfully!" },
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
