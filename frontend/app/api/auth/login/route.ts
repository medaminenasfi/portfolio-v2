import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Integrate with your database
    // For now, we'll implement a basic authentication flow
    // In production, you would:
    // 1. Query the database for the user
    // 2. Verify the password using bcrypt
    // 3. Create a secure session or JWT token

    // Mock authentication for demonstration
    if (email === 'admin@portfolio.com' && password === 'password') {
      const response = NextResponse.json({
        success: true,
        user: {
          id: '1',
          email: 'admin@portfolio.com',
          name: 'Portfolio Admin',
        },
      });

      // Set a secure HTTP-only cookie for session management
      response.cookies.set('auth-token', 'mock-token-12345', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
