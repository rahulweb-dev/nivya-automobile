import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json();

  // ✅ Example admin credentials (use env variables in real project)
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const res = NextResponse.json({
      success: true,
      message: 'Login successful',
    });

    // ✅ Set auth cookie (expires in 1 day)
    res.cookies.set('adminAuth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60, // 1 day
      path: '/',
    });

    return res;
  }

  return NextResponse.json(
    { success: false, error: 'Invalid credentials' },
    { status: 401 }
  );
}
