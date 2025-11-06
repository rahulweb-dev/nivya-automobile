import { ConnectDB } from '@/lib/config/db';
import Service from '@/lib/models/service';

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await ConnectDB();
    const { name, number, message } = await req.json();

    if (!name || !number || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    const newEntry = await Service.create({ name, number, message });

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
    const services = await Service.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: services },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
