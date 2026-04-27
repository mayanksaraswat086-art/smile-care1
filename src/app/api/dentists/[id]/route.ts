import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Dentist } from '@/types/supabase';

// GET single dentist by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from('dentists')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false, error: 'Dentist not found' }, { status: 404 });
    }

    const dentist = data as Dentist;

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
    const { id } = await params;
    const body = await request.json();
    
    const { data: existing } = await supabase
      .from('dentists')
      .select('id')
      .eq('id', id)
      .single();
    
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Dentist not found' }, { status: 404 });
    }
    
    const updateData = {
      ...body,
      updated_at: new Date()
    };
    
    const { data, error } = await supabase
      .from('dentists')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating dentist:', error);
      return NextResponse.json({ success: false, error: 'Failed to update dentist' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data: data });
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
    
    const { data: existing } = await supabase
      .from('dentists')
      .select('id')
      .eq('id', id)
      .single();
    
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Dentist not found' }, { status: 404 });
    }
    
    const { error } = await supabase
      .from('dentists')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting dentist:', error);
      return NextResponse.json({ success: false, error: 'Failed to delete dentist' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'Dentist deleted successfully' });
  } catch (error) {
    console.error('Error deleting dentist:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete dentist' }, { status: 500 });
  }
}
