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

const services = [
  {
    name: 'Dental Checkup',
    category: 'Preventive',
    duration: '60 min',
    price: 'From $85',
    description: 'Comprehensive oral examination, X-rays, and professional cleaning to keep your teeth healthy.',
    popular: false,
    color: 'bg-blue-50 text-blue-600',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Teeth Whitening',
    category: 'Cosmetic',
    duration: '90 min',
    price: 'From $299',
    description: 'Professional in-office whitening that delivers up to 8 shades brighter in a single session.',
    popular: true,
    color: 'bg-amber-50 text-amber-600',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Dental Fillings',
    category: 'Restorative',
    duration: '45 min',
    price: 'From $150',
    description: 'Tooth-colored composite fillings that restore cavities seamlessly with your natural enamel.',
    popular: false,
    color: 'bg-teal-50 text-teal-600',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Root Canal',
    category: 'Restorative',
    duration: '90 min',
    price: 'From $850',
    description: 'Pain-free root canal therapy using rotary endodontics and digital X-ray guidance.',
    popular: false,
    color: 'bg-red-50 text-red-600',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Tooth Extraction',
    category: 'Surgical',
    duration: '30 min',
    price: 'From $200',
    description: 'Simple and surgical extractions performed with precision and post-op care instructions.',
    popular: false,
    color: 'bg-slate-50 text-slate-600',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Dental Implants',
    category: 'Surgical',
    duration: '2–3 visits',
    price: 'From $2,200',
    description: 'Titanium implants that look, feel, and function like natural teeth — built to last decades.',
    popular: true,
    color: 'bg-navy-50 text-navy-600',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Braces',
    category: 'Orthodontic',
    duration: '12–24 mo',
    price: 'From $3,500',
    description: 'Traditional metal and ceramic braces for children and adults with complex alignment needs.',
    popular: false,
    color: 'bg-purple-50 text-purple-600',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Invisalign',
    category: 'Orthodontic',
    duration: '6–18 mo',
    price: 'From $4,200',
    description: 'Clear removable aligners for discreet, comfortable teeth straightening without metal wires.',
    popular: true,
    color: 'bg-cyan-50 text-cyan-600',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Veneers',
    category: 'Cosmetic',
    duration: '2 visits',
    price: 'From $1,100',
    description: 'Porcelain veneers crafted to perfect your smile — covering chips, stains, and gaps.',
    popular: false,
    color: 'bg-pink-50 text-pink-600',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Crowns',
    category: 'Restorative',
    duration: '2 visits',
    price: 'From $950',
    description: 'Same-day CEREC crowns available — restore broken or severely decayed teeth in one visit.',
    popular: false,
    color: 'bg-yellow-50 text-yellow-600',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Dentures',
    category: 'Restorative',
    duration: '3–4 visits',
    price: 'From $1,800',
    description: 'Full and partial dentures custom-fitted for comfort, function, and natural appearance.',
    popular: false,
    color: 'bg-orange-50 text-orange-600',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Emergency Care',
    category: 'Emergency',
    duration: 'Same day',
    price: 'From $150',
    description: 'Urgent dental care for toothache, broken teeth, lost fillings, and trauma — call now.',
    popular: false,
    color: 'bg-red-50 text-red-700',
    urgent: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

const dentists = [
  {
    name: 'Dr. Priya Sharma',
    title: 'DDS, MS',
    specialization: 'General & Cosmetic Dentistry',
    experience: '14 years',
    languages: 'English, Hindi, Gujarati',
    bio: 'Dr. Sharma completed her residency at UCSF and has a special interest in anxiety-free dentistry and smile makeovers.',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_11129419a-1772852838420.png",
    photoAlt: 'Dr. Priya Sharma, female dentist with dark hair wearing white lab coat and stethoscope',
    badge: 'Lead Dentist',
    badgeColor: 'bg-teal-100 text-teal-700',
    nextSlot: 'Today, 3:30 PM',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Dr. Emeka Okafor',
    title: 'DMD, PhD',
    specialization: 'Orthodontics & Implants',
    experience: '11 years',
    languages: 'English, Igbo, French',
    bio: 'Dr. Okafor is our implant specialist, trained at Johns Hopkins, with over 800 successful implant placements.',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_10337129e-1772074664598.png",
    photoAlt: 'Dr. Emeka Okafor, male dentist with close-cropped hair in navy scrubs smiling in clinic',
    badge: 'Implant Specialist',
    badgeColor: 'bg-navy-100 text-navy-700',
    nextSlot: 'Tomorrow, 10:00 AM',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Dr. Mei-Ling Chen',
    title: 'DDS',
    specialization: 'Pediatric & Preventive',
    experience: '9 years',
    languages: 'English, Mandarin, Cantonese',
    bio: 'Dr. Chen makes dental visits fun for kids and adults alike. Her preventive-first approach reduces long-term treatment needs.',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_11ae2c4d2-1772086801082.png",
    photoAlt: 'Dr. Mei-Ling Chen, female dentist in blue scrubs with friendly smile in pediatric dental office',
    badge: 'Pediatric Expert',
    badgeColor: 'bg-amber-100 text-amber-700',
    nextSlot: 'Mon, 9:00 AM',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

async function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  try {
    // Add Services
    console.log('Adding services...');
    for (const service of services) {
      await addDoc(collection(db, 'services'), service);
      console.log(`✅ Added service: ${service.name}`);
    }
    
    // Add Dentists
    console.log('Adding dentists...');
    for (const dentist of dentists) {
      await addDoc(collection(db, 'dentists'), dentist);
      console.log(`✅ Added dentist: ${dentist.name}`);
    }
    
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

seedDatabase();
