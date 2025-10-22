import { NextResponse } from 'next/server';

export async function POST() {
  // Create a response object
  const res = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  // ✅ Delete the auth cookie
  res.cookies.set('adminAuth', '', {
    httpOnly: true,
    expires: new Date(0), // immediately expire
    path: '/',
  });

  return res;
}
