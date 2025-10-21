import { ConnectDB } from '@/lib/config/db';
import Sellcar from '@/lib/models/sell-a-car';

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await ConnectDB();
    const { name, email, number, regNumber } = await req.json();

    if (!name || !email || !number || !regNumber) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    const newEntry = await Sellcar.create({ name, email, number, regNumber });

    return NextResponse.json(
      { success: true, data: newEntry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.regNumber }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await ConnectDB();
    const Usedcars = await Sellcar.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: Sellcar }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.regNumber }, { status: 500 });
  }
}
