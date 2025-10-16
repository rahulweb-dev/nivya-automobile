import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';


export async function POST(req) {
  try {
    await ConnectDB();

    const { itemName, itemCode, customerName, customerPhone } = await req.json();

    // Validations
    if (!itemName || !itemCode || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(customerPhone)) {
      return NextResponse.json(
        { error: 'Phone number must be 10 digits.' },
        { status: 400 }
      );
    }

    const newOrder = await AccessoryOrder.create({
      itemName,
      itemCode,
      customerName,
      customerPhone,
    });

    return NextResponse.json(
      { success: true, data: newOrder, message: 'Order submitted successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Accessory order error:', error);
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Optional: GET route to fetch all orders
export async function GET(req) {
  try {
    await ConnectDB();
    const orders = await AccessoryOrder.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
