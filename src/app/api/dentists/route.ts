import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Dentist } from '@/types/supabase';

// GET all dentists
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('dentists')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching dentists:', error);
      return NextResponse.json({ success: false, error: 'Failed to fetch dentists' }, { status: 500 });
    }
    
    const dentists = data as Dentist[];
    
    return NextResponse.json(
      { success: true, data: dentists },
      { 
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'CDN-Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching dentists:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch dentists' }, { status: 500 });
  }
}

// POST create new dentist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, title, specialization, experience, languages, bio, photo, photoAlt, badge, badgeColor, nextSlot, education, certifications, achievements, about, services, clinicHours, rating, reviewCount } = body;
    
    if (!name || !title || !specialization || !experience || !languages || !bio || !photo) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    const dentistData = {
      name,
      title,
      specialization,
      experience,
      languages,
      bio,
      photo,
      photo_alt: photoAlt || '',
      badge: badge || 'Dentist',
      badge_color: badgeColor || 'bg-teal-100 text-teal-700',
      next_slot: nextSlot || '',
      education: education || '',
      certifications: certifications || '',
      achievements: achievements || '',
      about: about || '',
      services: services || '',
      clinic_hours: clinicHours || '',
      rating: rating || 0,
      review_count: reviewCount || 0,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const { data, error } = await supabase
      .from('dentists')
      .insert(dentistData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating dentist:', error);
      return NextResponse.json({ success: false, error: 'Failed to create dentist' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data: data }, { status: 201 });
  } catch (error) {
    console.error('Error creating dentist:', error);
    return NextResponse.json({ success: false, error: 'Failed to create dentist' }, { status: 500 });
  }
}
