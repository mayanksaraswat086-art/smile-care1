import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Appointment } from '@/types/firebase';

// GET all appointments
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching appointments:', error);
      return NextResponse.json({ success: false, error: 'Failed to fetch appointments' }, { status: 500 });
    }
    
    const appointments = data as Appointment[];
    
    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

// POST create new appointment
export async function POST(request: NextRequest) {
  try {
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
      dentist_name: dentistName,
      date,
      time_slot: timeSlot,
      patient_name: patientName,
      email,
      phone,
      notes: notes || '',
      is_existing_patient: isExistingPatient || false,
      consent_given: consentGiven,
      insurance_provider: insuranceProvider || '',
      member_id: memberId || '',
      reference_number: ref,
      status: 'pending'
    };
    
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating appointment:', error);
      return NextResponse.json({ success: false, error: 'Failed to create appointment' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data: data }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ success: false, error: 'Failed to create appointment' }, { status: 500 });
  }
}
