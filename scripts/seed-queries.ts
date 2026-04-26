import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIWNWsDBCg8mboVvmIHmOMXT6dilKUGQI",
  authDomain: "dental-clinic-cd8af.firebaseapp.com",
  projectId: "dental-clinic-cd8af",
  storageBucket: "dental-clinic-cd8af.firebasestorage.app",
  messagingSenderId: "1076584101551",
  appId: "1:1076584101551:web:9fb1caad8f3c5c62d9c65a"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

const queries = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 234-5678',
    subject: 'Teeth Whitening Inquiry',
    message: 'Hi, I\'m interested in your teeth whitening service. How long does the procedure take and what are the aftercare instructions?',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    phone: '(555) 345-6789',
    subject: 'Implant Consultation',
    message: 'I need a dental implant consultation. I lost a tooth in an accident and would like to know about the implant process and cost.',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 456-7890',
    subject: 'Braces for Teenager',
    message: 'My 14-year-old daughter needs braces. Can you provide information about the different types of braces available and payment plans?',
    status: 'resolved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'David Thompson',
    email: 'dthompson@email.com',
    phone: '(555) 567-8901',
    subject: 'Emergency Tooth Pain',
    message: 'I have severe tooth pain and need to see a dentist as soon as possible. Do you have emergency appointments available today?',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Jessica Williams',
    email: 'j.williams@email.com',
    phone: '(555) 678-9012',
    subject: 'General Checkup',
    message: 'I would like to schedule a general dental checkup and cleaning. It has been over a year since my last visit.',
    status: 'resolved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

async function seedQueries() {
  console.log('🌱 Seeding contact queries...');
  
  try {
    for (const query of queries) {
      await addDoc(collection(db, 'queries'), query);
      console.log(`✅ Added query: ${query.name} - ${query.subject}`);
    }
    console.log('✅ Contact queries seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding queries:', error);
  }
}

seedQueries();
