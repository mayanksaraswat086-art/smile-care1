// Supabase direct seeding script - Works in production
// Run: node scripts/seed-supabase-direct.js
// Requires: npm install @supabase/supabase-js

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration - use environment variables in production
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://flrsuvqmyrpmmbqsxnqu.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscnN1dnFteXJwbW1icXN4bnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyOTc2NDMsImV4cCI6MjA5Mjg3MzY0M30.D0_nYfbkcUM4pVdf4AcWdov8l01V2JK3kQrwsRkOt2k';

// Initialize Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

const appointments = [
  {
    service: "Dental Checkup",
    dentist_name: "Dr. Sarah Johnson",
    date: "2026-04-28",
    time_slot: "10:00 AM",
    patient_name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-123-4567",
    notes: "First time patient, slight sensitivity in upper right molars",
    is_existing_patient: false,
    consent_given: true,
    insurance_provider: "Blue Cross Blue Shield",
    member_id: "BCBS123456789",
    reference_number: "SC-ABC123456",
    status: "confirmed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    service: "Teeth Whitening",
    dentist_name: "Dr. Emily Davis",
    date: "2026-04-29",
    time_slot: "2:30 PM",
    patient_name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1-555-987-6543",
    notes: "Wedding in 3 weeks, want bright smile",
    is_existing_patient: true,
    consent_given: true,
    insurance_provider: "Aetna",
    member_id: "AET987654321",
    reference_number: "SC-DEF789012",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    service: "Root Canal",
    dentist_name: "Dr. Priya Sharma",
    date: "2026-04-27",
    time_slot: "11:00 AM",
    patient_name: "Robert Johnson",
    email: "robert.j@email.com",
    phone: "+1-555-456-7890",
    notes: "Severe pain in tooth #14, referred by Dr. Chen",
    is_existing_patient: true,
    consent_given: true,
    insurance_provider: "Cigna",
    member_id: "CIG456789012",
    reference_number: "SC-GHI345678",
    status: "confirmed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    service: "Dental Implants",
    dentist_name: "Dr. James Wilson",
    date: "2026-05-02",
    time_slot: "9:00 AM",
    patient_name: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "+1-555-321-0987",
    notes: "Missing tooth #19, want implant consultation",
    is_existing_patient: false,
    consent_given: true,
    insurance_provider: "MetLife",
    member_id: "MET321098765",
    reference_number: "SC-JKL901234",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    service: "Braces",
    dentist_name: "Dr. Sarah Johnson",
    date: "2026-04-30",
    time_slot: "3:00 PM",
    patient_name: "Sophie Williams",
    email: "sophie.w@email.com",
    phone: "+1-555-654-3210",
    notes: "Teenager, interested in clear aligners consultation",
    is_existing_patient: false,
    consent_given: true,
    insurance_provider: "United Healthcare",
    member_id: "UHC654321098",
    reference_number: "SC-MNO567890",
    status: "confirmed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    service: "Emergency Care",
    dentist_name: "Dr. Michael Chen",
    date: "2026-04-26",
    time_slot: "8:00 PM",
    patient_name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1-555-789-0123",
    notes: "Broken tooth from accident, bleeding",
    is_existing_patient: true,
    consent_given: true,
    insurance_provider: "Delta Dental",
    member_id: "DEL789012345",
    reference_number: "SC-PQR234567",
    status: "completed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    service: "Tooth Extraction",
    dentist_name: "Dr. James Wilson",
    date: "2026-05-01",
    time_slot: "10:30 AM",
    patient_name: "Lisa Anderson",
    email: "lisa.a@email.com",
    phone: "+1-555-098-7654",
    notes: "Wisdom tooth extraction, lower left",
    is_existing_patient: false,
    consent_given: true,
    insurance_provider: "Guardian",
    member_id: "GRD098765432",
    reference_number: "SC-STU890123",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    service: "Veneers",
    dentist_name: "Dr. Emily Davis",
    date: "2026-05-05",
    time_slot: "1:00 PM",
    patient_name: "Michael Thompson",
    email: "michael.t@email.com",
    phone: "+1-555-234-5678",
    notes: "Want veneers for front 6 teeth, cosmetic improvement",
    is_existing_patient: true,
    consent_given: true,
    insurance_provider: "Humana",
    member_id: "HUM234567890",
    reference_number: "SC-VWX456789",
    status: "confirmed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const queries = [
  {
    name: "Jennifer Martinez",
    email: "jennifer.m@email.com",
    phone: "+1-555-876-5432",
    subject: "appointment",
    message: "I would like to schedule a dental checkup for next week. I'm a new patient and would prefer an appointment on Friday afternoon if possible.",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Kevin Lee",
    email: "kevin.lee@email.com",
    phone: "+1-555-543-2109",
    subject: "insurance",
    message: "I have questions about my insurance coverage for dental implants. My provider is Aetna and I want to know what's covered before scheduling a consultation.",
    status: "in-progress",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1-555-432-1098",
    subject: "billing",
    message: "I received a bill for my recent root canal treatment but I believe there might be an error. The amount seems higher than what I was quoted. Can you please review?",
    status: "resolved",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "James Rodriguez",
    email: "james.r@email.com",
    phone: "+1-555-321-8765",
    subject: "records",
    message: "I need to transfer my dental records to another dentist. Please let me know the process and any forms I need to complete.",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Amanda Foster",
    email: "amanda.f@email.com",
    phone: "+1-555-210-9876",
    subject: "feedback",
    message: "I wanted to share my positive experience with Dr. Sharma. She was very gentle and explained everything clearly. The root canal procedure was much better than I expected. Thank you!",
    status: "resolved",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Christopher Davis",
    email: "chris.davis@email.com",
    phone: "+1-555-109-8765",
    subject: "other",
    message: "I'm interested in learning more about your pediatric dentistry services for my 5-year-old daughter. She's quite nervous about dental visits and I wanted to know if you have experience with anxious children.",
    status: "in-progress",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Rachel Green",
    email: "rachel.g@email.com",
    phone: "+1-555-987-6543",
    subject: "appointment",
    message: "I need to reschedule my upcoming appointment with Dr. Wilson on April 28th. Something came up and I need to move it to May 3rd if possible.",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Daniel Kim",
    email: "daniel.kim@email.com",
    phone: "+1-555-765-4321",
    subject: "insurance",
    message: "I recently changed jobs and have new insurance through United Healthcare. I want to confirm that you accept this provider and what my coverage will be for preventive care.",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Michelle Taylor",
    email: "michelle.t@email.com",
    phone: "+1-555-654-3210",
    subject: "feedback",
    message: "The new website is great but I had some trouble finding the appointment booking form. Maybe make it more prominent on the homepage? Otherwise, excellent service as always!",
    status: "resolved",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Thomas Anderson",
    email: "thomas.a@email.com",
    phone: "+1-555-543-2109",
    subject: "other",
    message: "I'm experiencing some jaw pain and clicking when I open my mouth wide. I'm not sure if this is a dental issue or something else. Should I schedule with a dentist or see a different specialist?",
    status: "in-progress",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

async function seed() {
  try {
    console.log('🌱 Seeding Appointments to Supabase...');
    for (const apt of appointments) {
      try {
        const { error } = await supabase.from('appointments').insert(apt);
        if (error) {
          console.error(`❌ Appointment failed: ${apt.patient_name}`, error.message);
        } else {
          console.log(`✅ Appointment: ${apt.patient_name}`);
        }
      } catch (e) {
        console.error(`❌ Appointment failed: ${apt.patient_name}`, e.message);
      }
    }
    
    console.log('\n🌱 Seeding Queries to Supabase...');
    for (const q of queries) {
      try {
        const { error } = await supabase.from('queries').insert(q);
        if (error) {
          console.error(`❌ Query failed: ${q.name}`, error.message);
        } else {
          console.log(`✅ Query: ${q.name}`);
        }
      } catch (e) {
        console.error(`❌ Query failed: ${q.name}`, e.message);
      }
    }
    
    console.log('\n✨ Production data seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
