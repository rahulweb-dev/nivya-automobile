//this api route is for admin only

import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import Rajesh from '@/lib/models/trueSchema';

// GET: Fetch all vehicles
export async function GET() {
  try {
    await ConnectDB();

    const vehicles = await Rajesh.find({
      // published: true,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, vehicles }, { status: 200 });
  } catch (err) {
    console.error('GET vehicles failed:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vehicles.' },
      { status: 500 }
    );
  }
}

// POST: Create a new vehicle
export async function POST(req) {
  try {
    await ConnectDB();
    const body = await req.json();
    console.log('body', JSON.stringify(body));

    // 🔍 Validate required fields
    const requiredFields = ['brand', 'model', 'ownerType'];
    const missing = requiredFields.filter((f) => !body[f]);
    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required field(s): ${missing.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const formData = {
      name: String(body.brand).trim() + ' ' + String(body.model).trim(),
      brand: String(body.brand).trim(),
      model: String(body.model).trim(),
      ownerType: String(body.ownerType).trim(),
      fuelType: String(body.fuelType).trim(),
      modelYear: body.modelYear ? Number(body.modelYear) : null,
      price: body.price ? Number(body.price) : 0,
      kmDriven: body.kmDriven ? Number(body.kmDriven) : 0,
      fuelType: body.fuelType?.trim() || 'Unknown',
      transmission: 'Manual',
      // transmission: body.transmission?.trim() || "Manual",
      bodyType: body.bodyType?.trim() || 'Other',
      color: body.color?.trim() || 'Unspecified',
      userType: body.userType?.trim() || 'Dealer',
      location: body.location?.trim() || 'Unknown',
      images: Array.isArray(body.images)
        ? body.images
            .filter(
              (img) =>
                img &&
                typeof img === 'object' &&
                typeof img.url === 'string' &&
                img.url.trim() !== ''
            )
            .map((img) => ({
              url: img.url.trim(),
              fileId: img.fileId || null,
            }))
        : [],
      published: body.published || true,
      features: Array.isArray(body.features) ? body.features : [],
      description: body.description?.trim() || '',
    };

    // 💾 Save to DB
    const vehicle = await Rajesh.create(formData);

    console.log(vehicle);

    return NextResponse.json(
      {
        success: true,
        message: 'Vehicle created successfully',
        vehicle,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Vehicle creation failed:', err);

    if (err.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// 🔹 PUT: Update vehicle by ID
export const PUT = async (req, { params }) => {
  try {
    await ConnectDB();
    const { id } = params;
    const data = await req.json();

    console.log('Updating vehicle:', id);

    const updatedVehicle = await Rajesh.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedVehicle) {
      return NextResponse.json(
        { success: false, error: 'Vehicle not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Vehicle updated successfully',
        vehicle: updatedVehicle,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('PUT /api/admin/truevalue/[id] failed:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to update vehicle.' },
      { status: 500 }
    );
  }
};

// 🔹 DELETE: Delete vehicle by ID
export const DELETE = async (req, { params }) => {
  try {
    await ConnectDB();
    const { id } = params;

    console.log('Deleting vehicle with ID:', id);

    const deletedVehicle = await Rajesh.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return NextResponse.json(
        { success: false, error: 'Vehicle not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Vehicle deleted successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('DELETE /api/admin/truevalue/[id] failed:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to delete vehicle.' },
      { status: 500 }
    );
  }
};
