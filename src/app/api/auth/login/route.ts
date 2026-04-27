import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function POST(request: NextRequest) {
  try {
    if (!auth) {
      return NextResponse.json({ success: false, error: 'Auth not available' }, { status: 503 });
    }

    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        token 
      } 
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.code === 'auth/invalid-credential' 
        ? 'Invalid email or password' 
        : 'Login failed' 
    }, { status: 401 });
  }
}
