import { ConnectDB } from '@/lib/config/db';
import Usedcar from '@/lib/models/usedcar';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await ConnectDB();
    const { name, email, number, message } = await req.json();

    if (!name || !email || !number ) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    const newEntry = await Usedcar.create({ name, email, number, message });

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
    const Usedcars = await Usedcar.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: Usedcars },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
