// Firebase direct seeding script - Works in production
// Run: node scripts/seed-firebase-direct.js
// Requires: npm install firebase

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

// Firebase configuration - use environment variables in production
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDsLeWlngaeA3L310wbr7qkaTFF-lfF_k0',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dental-clinic-d8a9c.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dental-clinic-d8a9c',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'dental-clinic-d8a9c.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '991437778639',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:991437778639:web:38873f32c1bf8cbdd291ba',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const appointments = [
  {
    service: "Dental Checkup",
    dentistName: "Dr. Sarah Johnson",
    date: "2026-04-28",
    timeSlot: "10:00 AM",
    patientName: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-123-4567",
    notes: "First time patient, slight sensitivity in upper right molars",
    isExistingPatient: false,
    consentGiven: true,
    insuranceProvider: "Blue Cross Blue Shield",
    memberId: "BCBS123456789",
    referenceNumber: "SC-ABC123456",
    status: "confirmed",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    service: "Teeth Whitening",
    dentistName: "Dr. Emily Davis",
    date: "2026-04-29",
    timeSlot: "2:30 PM",
    patientName: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1-555-987-6543",
    notes: "Wedding in 3 weeks, want bright smile",
    isExistingPatient: true,
    consentGiven: true,
    insuranceProvider: "Aetna",
    memberId: "AET987654321",
    referenceNumber: "SC-DEF789012",
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    service: "Root Canal",
    dentistName: "Dr. Priya Sharma",
    date: "2026-04-27",
    timeSlot: "11:00 AM",
    patientName: "Robert Johnson",
    email: "robert.j@email.com",
    phone: "+1-555-456-7890",
    notes: "Severe pain in tooth #14, referred by Dr. Chen",
    isExistingPatient: true,
    consentGiven: true,
    insuranceProvider: "Cigna",
    memberId: "CIG456789012",
    referenceNumber: "SC-GHI345678",
    status: "confirmed",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    service: "Dental Implants",
    dentistName: "Dr. James Wilson",
    date: "2026-05-02",
    timeSlot: "9:00 AM",
    patientName: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "+1-555-321-0987",
    notes: "Missing tooth #19, want implant consultation",
    isExistingPatient: false,
    consentGiven: true,
    insuranceProvider: "MetLife",
    memberId: "MET321098765",
    referenceNumber: "SC-JKL901234",
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    service: "Braces",
    dentistName: "Dr. Sarah Johnson",
    date: "2026-04-30",
    timeSlot: "3:00 PM",
    patientName: "Sophie Williams",
    email: "sophie.w@email.com",
    phone: "+1-555-654-3210",
    notes: "Teenager, interested in clear aligners consultation",
    isExistingPatient: false,
    consentGiven: true,
    insuranceProvider: "United Healthcare",
    memberId: "UHC654321098",
    referenceNumber: "SC-MNO567890",
    status: "confirmed",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    service: "Emergency Care",
    dentistName: "Dr. Michael Chen",
    date: "2026-04-26",
    timeSlot: "8:00 PM",
    patientName: "David Brown",
    email: "david.brown@email.com",
    phone: "+1-555-789-0123",
    notes: "Broken tooth from accident, bleeding",
    isExistingPatient: true,
    consentGiven: true,
    insuranceProvider: "Delta Dental",
    memberId: "DEL789012345",
    referenceNumber: "SC-PQR234567",
    status: "completed",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    service: "Tooth Extraction",
    dentistName: "Dr. James Wilson",
    date: "2026-05-01",
    timeSlot: "10:30 AM",
    patientName: "Lisa Anderson",
    email: "lisa.a@email.com",
    phone: "+1-555-098-7654",
    notes: "Wisdom tooth extraction, lower left",
    isExistingPatient: false,
    consentGiven: true,
    insuranceProvider: "Guardian",
    memberId: "GRD098765432",
    referenceNumber: "SC-STU890123",
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    service: "Veneers",
    dentistName: "Dr. Emily Davis",
    date: "2026-05-05",
    timeSlot: "1:00 PM",
    patientName: "Michael Thompson",
    email: "michael.t@email.com",
    phone: "+1-555-234-5678",
    notes: "Want veneers for front 6 teeth, cosmetic improvement",
    isExistingPatient: true,
    consentGiven: true,
    insuranceProvider: "Humana",
    memberId: "HUM234567890",
    referenceNumber: "SC-VWX456789",
    status: "confirmed",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
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
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "Kevin Lee",
    email: "kevin.lee@email.com",
    phone: "+1-555-543-2109",
    subject: "insurance",
    message: "I have questions about my insurance coverage for dental implants. My provider is Aetna and I want to know what's covered before scheduling a consultation.",
    status: "in-progress",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1-555-432-1098",
    subject: "billing",
    message: "I received a bill for my recent root canal treatment but I believe there might be an error. The amount seems higher than what I was quoted. Can you please review?",
    status: "resolved",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "James Rodriguez",
    email: "james.r@email.com",
    phone: "+1-555-321-8765",
    subject: "records",
    message: "I need to transfer my dental records to another dentist. Please let me know the process and any forms I need to complete.",
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "Amanda Foster",
    email: "amanda.f@email.com",
    phone: "+1-555-210-9876",
    subject: "feedback",
    message: "I wanted to share my positive experience with Dr. Sharma. She was very gentle and explained everything clearly. The root canal procedure was much better than I expected. Thank you!",
    status: "resolved",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "Christopher Davis",
    email: "chris.davis@email.com",
    phone: "+1-555-109-8765",
    subject: "other",
    message: "I'm interested in learning more about your pediatric dentistry services for my 5-year-old daughter. She's quite nervous about dental visits and I wanted to know if you have experience with anxious children.",
    status: "in-progress",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "Rachel Green",
    email: "rachel.g@email.com",
    phone: "+1-555-987-6543",
    subject: "appointment",
    message: "I need to reschedule my upcoming appointment with Dr. Wilson on April 28th. Something came up and I need to move it to May 3rd if possible.",
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "Daniel Kim",
    email: "daniel.kim@email.com",
    phone: "+1-555-765-4321",
    subject: "insurance",
    message: "I recently changed jobs and have new insurance through United Healthcare. I want to confirm that you accept this provider and what my coverage will be for preventive care.",
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "Michelle Taylor",
    email: "michelle.t@email.com",
    phone: "+1-555-654-3210",
    subject: "feedback",
    message: "The new website is great but I had some trouble finding the appointment booking form. Maybe make it more prominent on the homepage? Otherwise, excellent service as always!",
    status: "resolved",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "Thomas Anderson",
    email: "thomas.a@email.com",
    phone: "+1-555-543-2109",
    subject: "other",
    message: "I'm experiencing some jaw pain and clicking when I open my mouth wide. I'm not sure if this is a dental issue or something else. Should I schedule with a dentist or see a different specialist?",
    status: "in-progress",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
];

async function seed() {
  try {
    console.log('🌱 Seeding Appointments to Firebase...');
    for (const apt of appointments) {
      try {
        await addDoc(collection(db, 'appointments'), apt);
        console.log(`✅ Appointment: ${apt.patientName}`);
      } catch (e) {
        console.error(`❌ Appointment failed: ${apt.patientName}`, e.message);
      }
    }
    
    console.log('\n🌱 Seeding Queries to Firebase...');
    for (const q of queries) {
      try {
        await addDoc(collection(db, 'queries'), q);
        console.log(`✅ Query: ${q.name}`);
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
