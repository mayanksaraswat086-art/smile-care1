import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const QUERIES_COLLECTION = 'queries';

// PUT update query
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
    
    const queryRef = doc(db, QUERIES_COLLECTION, id);
    const queryDoc = await getDoc(queryRef);
    
    if (!queryDoc.exists()) {
      return NextResponse.json({ success: false, error: 'Query not found' }, { status: 404 });
    }
    
    const updateData = {
      ...body,
      updatedAt: new Date()
    };
    
    await updateDoc(queryRef, updateData);
    
    return NextResponse.json({ success: true, data: { id, ...updateData } });
  } catch (error) {
    console.error('Error updating query:', error);
    return NextResponse.json({ success: false, error: 'Failed to update query' }, { status: 500 });
  }
}

// DELETE query
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const { id } = await params;
    
    const queryRef = doc(db, QUERIES_COLLECTION, id);
    const queryDoc = await getDoc(queryRef);
    
    if (!queryDoc.exists()) {
      return NextResponse.json({ success: false, error: 'Query not found' }, { status: 404 });
    }
    
    await deleteDoc(queryRef);
    
    return NextResponse.json({ success: true, message: 'Query deleted successfully' });
  } catch (error) {
    console.error('Error deleting query:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete query' }, { status: 500 });
  }
}
