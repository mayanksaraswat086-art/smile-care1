import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }
    
    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        token 
      } 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.code === 'auth/email-already-in-use' 
        ? 'Email already registered' 
        : 'Registration failed' 
    }, { status: 400 });
  }
}
