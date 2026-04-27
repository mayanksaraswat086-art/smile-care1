import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { Dentist } from '@/types/firebase';

const DENTISTS_COLLECTION = 'dentists';

// GET single dentist by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const { id } = await params;
    const dentistRef = doc(db, DENTISTS_COLLECTION, id);
    const dentistDoc = await getDoc(dentistRef);

    if (!dentistDoc.exists()) {
      return NextResponse.json({ success: false, error: 'Dentist not found' }, { status: 404 });
    }

    const dentist = { id: dentistDoc.id, ...dentistDoc.data() } as Dentist;

    return NextResponse.json({ success: true, data: dentist });
  } catch (error) {
    console.error('Error fetching dentist:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch dentist' }, { status: 500 });
  }
}

// PUT update dentist
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const { id } = await params;
    const body = await request.json();
    
    const dentistRef = doc(db, DENTISTS_COLLECTION, id);
    const dentistDoc = await getDoc(dentistRef);
    
    if (!dentistDoc.exists()) {
      return NextResponse.json({ success: false, error: 'Dentist not found' }, { status: 404 });
    }
    
    const updateData = {
      ...body,
      updatedAt: new Date()
    };
    
    await updateDoc(dentistRef, updateData);
    
    return NextResponse.json({ success: true, data: { id, ...updateData } });
  } catch (error) {
    console.error('Error updating dentist:', error);
    return NextResponse.json({ success: false, error: 'Failed to update dentist' }, { status: 500 });
  }
}

// DELETE dentist
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const { id } = await params;
    
    const dentistRef = doc(db, DENTISTS_COLLECTION, id);
    const dentistDoc = await getDoc(dentistRef);
    
    if (!dentistDoc.exists()) {
      return NextResponse.json({ success: false, error: 'Dentist not found' }, { status: 404 });
    }
    
    await deleteDoc(dentistRef);
    
    return NextResponse.json({ success: true, message: 'Dentist deleted successfully' });
  } catch (error) {
    console.error('Error deleting dentist:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete dentist' }, { status: 500 });
  }
}
