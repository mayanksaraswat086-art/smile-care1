import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const APPOINTMENTS_COLLECTION = 'appointments';

// PUT update appointment
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
    
    const appointmentRef = doc(db, APPOINTMENTS_COLLECTION, id);
    const appointmentDoc = await getDoc(appointmentRef);
    
    if (!appointmentDoc.exists()) {
      return NextResponse.json({ success: false, error: 'Appointment not found' }, { status: 404 });
    }
    
    const updateData = {
      ...body,
      updatedAt: new Date()
    };
    
    await updateDoc(appointmentRef, updateData);
    
    return NextResponse.json({ success: true, data: { id, ...updateData } });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ success: false, error: 'Failed to update appointment' }, { status: 500 });
  }
}

// DELETE appointment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const { id } = await params;
    
    const appointmentRef = doc(db, APPOINTMENTS_COLLECTION, id);
    const appointmentDoc = await getDoc(appointmentRef);
    
    if (!appointmentDoc.exists()) {
      return NextResponse.json({ success: false, error: 'Appointment not found' }, { status: 404 });
    }
    
    await deleteDoc(appointmentRef);
    
    return NextResponse.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete appointment' }, { status: 500 });
  }
}
