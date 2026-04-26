import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const SERVICES_COLLECTION = 'services';

// PUT update service
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const serviceRef = doc(db, SERVICES_COLLECTION, id);
    const serviceDoc = await getDoc(serviceRef);
    
    if (!serviceDoc.exists()) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }
    
    const updateData = {
      ...body,
      updatedAt: new Date()
    };
    
    await updateDoc(serviceRef, updateData);
    
    return NextResponse.json({ success: true, data: { id, ...updateData } });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ success: false, error: 'Failed to update service' }, { status: 500 });
  }
}

// DELETE service
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const serviceRef = doc(db, SERVICES_COLLECTION, id);
    const serviceDoc = await getDoc(serviceRef);
    
    if (!serviceDoc.exists()) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }
    
    await deleteDoc(serviceRef);
    
    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete service' }, { status: 500 });
  }
}
