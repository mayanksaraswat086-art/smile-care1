import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { Dentist } from '@/types/firebase';

const DENTISTS_COLLECTION = 'dentists';

// GET all dentists
export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const dentistsRef = collection(db, DENTISTS_COLLECTION);
    const q = query(dentistsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const dentists = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Dentist[];
    
    return NextResponse.json(
      { success: true, data: dentists },
      { 
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'CDN-Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching dentists:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch dentists' }, { status: 500 });
  }
}

// POST create new dentist
export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const body = await request.json();
    const { name, title, specialization, experience, languages, bio, photo, photoAlt, badge, badgeColor, nextSlot, education, certifications, achievements, about, services, clinicHours, rating, reviewCount } = body;
    
    if (!name || !title || !specialization || !experience || !languages || !bio || !photo) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    const dentistData = {
      name,
      title,
      specialization,
      experience,
      languages,
      bio,
      photo,
      photoAlt: photoAlt || '',
      badge: badge || 'Dentist',
      badgeColor: badgeColor || 'bg-teal-100 text-teal-700',
      nextSlot: nextSlot || '',
      education: education || '',
      certifications: certifications || '',
      achievements: achievements || '',
      about: about || '',
      services: services || '',
      clinicHours: clinicHours || '',
      rating: rating || 0,
      reviewCount: reviewCount || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, DENTISTS_COLLECTION), dentistData);
    
    return NextResponse.json({ success: true, data: { id: docRef.id, ...dentistData } }, { status: 201 });
  } catch (error) {
    console.error('Error creating dentist:', error);
    return NextResponse.json({ success: false, error: 'Failed to create dentist' }, { status: 500 });
  }
}
