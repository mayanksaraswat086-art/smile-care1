import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if config is available (skip during build)
const app: FirebaseApp = firebaseConfig.projectId && !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// Initialize Auth (client-side only usage)
export const auth: Auth = app ? getAuth(app) : null as any;

// Initialize Firestore (works on both client and server)
export const db: Firestore = app ? getFirestore(app) : null as any;

export default app;
