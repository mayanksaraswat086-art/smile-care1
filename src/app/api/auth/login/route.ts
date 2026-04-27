import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }
    
    // TODO: Implement Supabase Auth
    // Install @supabase/supabase-js and use supabase.auth.signInWithPassword()
    return NextResponse.json({ 
      success: false, 
      error: 'Supabase Auth not configured. Please set up Supabase Auth in the dashboard.' 
    }, { status: 501 });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Login failed' 
    }, { status: 500 });
  }
}
