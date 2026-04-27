import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Initialize Firebase with fallback for build time
let app: FirebaseApp | null = null;

if (typeof window !== 'undefined' && firebaseConfig.projectId) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

// Initialize Auth (null on server/build time)
export const auth: Auth | null = app ? getAuth(app) : null;

// Initialize Firestore (null on server/build time)
export const db: Firestore | null = app ? getFirestore(app) : null;

export default app;
