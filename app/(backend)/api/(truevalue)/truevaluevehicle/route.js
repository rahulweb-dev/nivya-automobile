import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import Vehicle from '@/lib/models/TrueValueVehicle';

// GET: fetch all vehicles
export async function GET(req) {
  try {
    await ConnectDB();
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, vehicles });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// POST: create a new vehicle
export async function POST(req) {
  try {
    await ConnectDB();
    const data = await req.json();

    // Optional: validate required fields
    if (!data.name || !data.brand) {
      return NextResponse.json(
        { success: false, error: 'Name and Brand are required' },
        { status: 400 }
      );
    }

    // Set primary image if provided
    const vehicle = await Vehicle.create({
      name: data.name,
      brand: data.brand,
      modelYear: data.modelYear,
      price: data.price,
      kmDriven: data.kmDriven,
      fuelType: data.fuelType,
      transmission: data.transmission,
      bodyType: data.bodyType,
      color: data.color,
      userType: data.userType,
      location: data.location,
      image: data.image || '', // primary image
      features: data.features || [],
      description: data.description || '',
    });

    return NextResponse.json({ success: true, vehicle });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
