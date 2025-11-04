import { ConnectDB } from '@/lib/config/db';
import Sellcar from '@/lib/models/sell-a-car';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await ConnectDB();
    const { name, email, number, authorize } = await req.json();

    // Validation
    if (!name || !number) {
      return NextResponse.json(
        { success: false, message: 'Name and number are required.' },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const newEntry = await Sellcar.create({
      name,
      email,
      number,
      authorize,
    });

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully', data: newEntry },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /sell-a-car Error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await ConnectDB();
    const usedCars = await Sellcar.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: usedCars },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /sell-a-car Error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
