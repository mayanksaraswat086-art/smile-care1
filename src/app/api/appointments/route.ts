import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy, where } from 'firebase/firestore';
import { Appointment } from '@/types/firebase';

const APPOINTMENTS_COLLECTION = 'appointments';

// GET all appointments
export async function GET(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const appointmentsRef = collection(db, APPOINTMENTS_COLLECTION);
    const q = query(appointmentsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const appointments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Appointment[];
    
    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

// POST create new appointment
export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const body = await request.json();
    const { 
      service, 
      dentistName, 
      date, 
      timeSlot, 
      patientName, 
      email, 
      phone, 
      notes, 
      isExistingPatient, 
      consentGiven, 
      insuranceProvider, 
      memberId 
    } = body;
    
    if (!service || !dentistName || !date || !timeSlot || !patientName || !email || !phone || !consentGiven) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    // Generate reference number
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const ref = 'SC-' + Array.from({ length: 6 }, (_, i) => chars[(i * 7 + 13) % chars.length]).join('') + String(Date.now()).slice(-3);
    
    const appointmentData = {
      service,
      dentistName,
      date,
      timeSlot,
      patientName,
      email,
      phone,
      notes: notes || '',
      isExistingPatient: isExistingPatient || false,
      consentGiven,
      insuranceProvider: insuranceProvider || '',
      memberId: memberId || '',
      referenceNumber: ref,
      status: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, APPOINTMENTS_COLLECTION), appointmentData);
    
    return NextResponse.json({ success: true, data: { id: docRef.id, ...appointmentData } }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ success: false, error: 'Failed to create appointment' }, { status: 500 });
  }
}
