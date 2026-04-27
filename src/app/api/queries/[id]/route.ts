import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// PUT update query
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { data: existing } = await supabase
      .from('queries')
      .select('id')
      .eq('id', id)
      .single();
    
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Query not found' }, { status: 404 });
    }
    
    const updateData = {
      ...body,
      updated_at: new Date()
    };
    
    const { data, error } = await supabase
      .from('queries')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating query:', error);
      return NextResponse.json({ success: false, error: 'Failed to update query' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data: data });
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
    const { id } = await params;
    
    const { data: existing } = await supabase
      .from('queries')
      .select('id')
      .eq('id', id)
      .single();
    
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Query not found' }, { status: 404 });
    }
    
    const { error } = await supabase
      .from('queries')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting query:', error);
      return NextResponse.json({ success: false, error: 'Failed to delete query' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'Query deleted successfully' });
  } catch (error) {
    console.error('Error deleting query:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete query' }, { status: 500 });
  }
}
