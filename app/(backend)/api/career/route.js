import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import Career from '@/lib/models/career';

export async function POST(req) {
  try {
    await ConnectDB();
    const body = await req.json();

    // Basic validation
    const { salutation, firstName, lastName, email, phone, resumeLink } = body;
    if (
      !salutation ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !resumeLink
    ) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      );
    }

    const application = await Career.create(body);
    return NextResponse.json(
      { success: true, data: application },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ConnectDB();
    const applications = await Career.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: applications },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}