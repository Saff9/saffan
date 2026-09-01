import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials, generateSessionToken, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const isValid = validateAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials. Please verify against your .env configuration.' }, { status: 401 });
    }

    const token = generateSessionToken();
    const response = NextResponse.json({ success: true, message: 'Authentication successful' });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
