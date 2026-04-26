import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const DENTISTS_COLLECTION = 'dentists';

// PUT update dentist
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
