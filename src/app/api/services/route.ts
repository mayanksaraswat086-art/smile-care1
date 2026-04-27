import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types/firebase';

// GET all services
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching services:', error);
      return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 });
    }
    
    const services = data as Service[];
    
    return NextResponse.json(
      { success: true, data: services },
      { 
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'CDN-Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 });
  }
}

// POST create new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, duration, price, description, popular, color, urgent } = body;
    
    if (!name || !category || !duration || !price || !description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    const serviceData = {
      name,
      category,
      duration,
      price,
      description,
      popular: popular || false,
      color: color || 'bg-blue-50 text-blue-600',
      urgent: urgent || false
    };
    
    const { data, error } = await supabase
      .from('services')
      .insert(serviceData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating service:', error);
      return NextResponse.json({ success: false, error: 'Failed to create service' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data: data }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ success: false, error: 'Failed to create service' }, { status: 500 });
  }
}
