import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://flrsuvqmyrpmmbqsxnqu.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscnN1dnFteXJwbW1icXN4bnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyOTc2NDMsImV4cCI6MjA5Mjg3MzY0M30.D0_nYfbkcUM4pVdf4AcWdov8l01V2JK3kQrwsRkOt2k';

const supabase = createClient(supabaseUrl, supabaseKey);

const queries = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 234-5678',
    subject: 'Teeth Whitening Inquiry',
    message: 'Hi, I\'m interested in your teeth whitening service. How long does the procedure take and what are the aftercare instructions?',
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    phone: '(555) 345-6789',
    subject: 'Implant Consultation',
    message: 'I need a dental implant consultation. I lost a tooth in an accident and would like to know about the implant process and cost.',
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 456-7890',
    subject: 'Braces for Teenager',
    message: 'My 14-year-old daughter needs braces. Can you provide information about the different types of braces available and payment plans?',
    status: 'resolved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'David Thompson',
    email: 'dthompson@email.com',
    phone: '(555) 567-8901',
    subject: 'Emergency Tooth Pain',
    message: 'I have severe tooth pain and need to see a dentist as soon as possible. Do you have emergency appointments available today?',
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Jessica Williams',
    email: 'j.williams@email.com',
    phone: '(555) 678-9012',
    subject: 'General Checkup',
    message: 'I would like to schedule a general dental checkup and cleaning. It has been over a year since my last visit.',
    status: 'resolved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

async function seedQueries() {
  console.log('🌱 Seeding contact queries...');
  
  try {
    for (const query of queries) {
      const { error } = await supabase.from('queries').insert(query);
      if (error) {
        console.error(`❌ Failed to add query: ${query.name}`, error.message);
      } else {
        console.log(`✅ Added query: ${query.name} - ${query.subject}`);
      }
    }
    console.log('✅ Contact queries seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding queries:', error);
  }
}

seedQueries();
