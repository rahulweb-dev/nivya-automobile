import { ConnectDB } from '@/lib/config/db';
import AccessoryOrder from '@/lib/models/accessories';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await ConnectDB();

    const body = await req.json();
    const { customerName, customerPhone, itemCode, itemName } = body;

    // ✅ Validate required fields
    if (!customerName || !customerPhone || !itemCode || !itemName) {
      return NextResponse.json(
        { error: 'All required fields must be filled.' },
        { status: 400 }
      );
    }

    // ✅ Optional: Validate phone number format
    if (!/^\d{10}$/.test(customerPhone)) {
      return NextResponse.json(
        { error: 'Phone number must be 10 digits.' },
        { status: 400 }
      );
    }

    // ✅ Create new accessory order
    const newEntry = await AccessoryOrder.create({
      customerName,
      customerPhone,
      itemCode,
      itemName,
    });

    return NextResponse.json(
      {
        success: true,
        data: newEntry,
        message: 'Order added successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Accessory POST error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await ConnectDB();

    // ✅ Fetch all orders (most recent first)
    const accessories = await AccessoryOrder.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: accessories },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Accessory GET error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
