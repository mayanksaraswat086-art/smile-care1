import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { ContactQuery } from '@/types/firebase';

// GET all queries
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('queries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching queries:', error);
      return NextResponse.json({ success: false, error: 'Failed to fetch queries' }, { status: 500 });
    }
    
    const queries = data as ContactQuery[];
    
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
      phone,
      subject,
      message
    };
    
    const { data, error } = await supabase
      .from('queries')
      .insert(queryData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating query:', error);
      return NextResponse.json({ success: false, error: 'Failed to create query' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data: data }, { status: 201 });
  } catch (error) {
    console.error('Error creating query:', error);
    return NextResponse.json({ success: false, error: 'Failed to create query' }, { status: 500 });
  }
}
