import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Service } from '@/types/firebase';

const SERVICES_COLLECTION = 'services';

// GET all services
export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const servicesRef = collection(db, SERVICES_COLLECTION);
    const q = query(servicesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Service[];
    
    return NextResponse.json(
      { success: true, data: services },
      { 
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'CDN-Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 });
  }
}

// POST create new service
export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const body = await request.json();
    const { name, category, duration, price, description, popular, color, urgent } = body;
    
    if (!name || !category || !duration || !price || !description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    const serviceData = {
      name,
      category,
      duration,
      price,
      description,
      popular: popular || false,
      color: color || 'bg-blue-50 text-blue-600',
      urgent: urgent || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, SERVICES_COLLECTION), serviceData);
    
    return NextResponse.json({ success: true, data: { id: docRef.id, ...serviceData } }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ success: false, error: 'Failed to create service' }, { status: 500 });
  }
}
