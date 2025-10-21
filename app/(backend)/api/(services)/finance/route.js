import { NextResponse } from 'next/server';
import FinanceEnquiry from '@/lib/models/FinanceEnquiry';
import { ConnectDB } from '@/lib/config/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      mobile,
      email,
      city,
      comments,
      model,
      purchaseTime,
      loanAmount,
      duration,
    } = body;

    // === Validation ===
    if (!name || !mobile || !city || !model || !loanAmount || !duration) {
      return NextResponse.json(
        { success: false, message: 'Please fill all required fields.' },
        { status: 400 }
      );
    }

    // === Connect & Save ===
    await ConnectDB();

    const newEnquiry = await FinanceEnquiry.create({
      name,
      mobile,
      email,
      city,
      comments,
      model,
      purchaseTime,
      loanAmount,
      duration,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your finance enquiry has been submitted successfully!',
        data: newEnquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting finance enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Connect to DB
    await ConnectDB();

    // Fetch all finance enquiries
    const enquiries = await FinanceEnquiry.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: enquiries },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching finance enquiries:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
