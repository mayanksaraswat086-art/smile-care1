import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { ContactQuery } from '@/types/firebase';

const QUERIES_COLLECTION = 'queries';

// GET all queries
export async function GET() {
  try {
    const queriesRef = collection(db, QUERIES_COLLECTION);
    const q = query(queriesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const queries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ContactQuery[];
    
    return NextResponse.json({ success: true, data: queries });
  } catch (error) {
    console.error('Error fetching queries:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch queries' }, { status: 500 });
  }
}

// POST create new query
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    const queryData = {
      name,
      email,
      phone: phone || '',
      subject,
      message,
      status: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, QUERIES_COLLECTION), queryData);
    
    return NextResponse.json({ success: true, data: { id: docRef.id, ...queryData } }, { status: 201 });
  } catch (error) {
    console.error('Error creating query:', error);
    return NextResponse.json({ success: false, error: 'Failed to create query' }, { status: 500 });
  }
}
