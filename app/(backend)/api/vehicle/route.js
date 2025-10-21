
import { ConnectDB } from '@/lib/config/db';
import Vehicle from '@/lib/models/vehicle';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await ConnectDB();
    const { name, model, number } = await req.json();

    if (!name || !model || !number) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    const newEntry = await Vehicle.create({ name, model, number });

    return NextResponse.json(
      { success: true, data: newEntry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await ConnectDB();
    const vehicle = await Vehicle.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: vehicle },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
