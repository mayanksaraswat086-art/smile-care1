import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://flrsuvqmyrpmmbqsxnqu.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscnN1dnFteXJwbW1icXN4bnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyOTc2NDMsImV4cCI6MjA5Mjg3MzY0M30.D0_nYfbkcUM4pVdf4AcWdov8l01V2JK3kQrwsRkOt2k';

const supabase = createClient(supabaseUrl, supabaseKey);

const services = [
  {
    name: 'Dental Checkup',
    category: 'Preventive',
    duration: '60 min',
    price: 'From $85',
    description: 'Comprehensive oral examination, X-rays, and professional cleaning to keep your teeth healthy.',
    popular: false,
    color: 'bg-blue-50 text-blue-600',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Teeth Whitening',
    category: 'Cosmetic',
    duration: '90 min',
    price: 'From $299',
    description: 'Professional in-office whitening that delivers up to 8 shades brighter in a single session.',
    popular: true,
    color: 'bg-amber-50 text-amber-600',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Dental Fillings',
    category: 'Restorative',
    duration: '45 min',
    price: 'From $150',
    description: 'Tooth-colored composite fillings that restore cavities seamlessly with your natural enamel.',
    popular: false,
    color: 'bg-teal-50 text-teal-600',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Root Canal',
    category: 'Restorative',
    duration: '90 min',
    price: 'From $850',
    description: 'Pain-free root canal therapy using rotary endodontics and digital X-ray guidance.',
    popular: false,
    color: 'bg-red-50 text-red-600',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Tooth Extraction',
    category: 'Surgical',
    duration: '30 min',
    price: 'From $200',
    description: 'Simple and surgical extractions performed with precision and post-op care instructions.',
    popular: false,
    color: 'bg-slate-50 text-slate-600',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Dental Implants',
    category: 'Surgical',
    duration: '2–3 visits',
    price: 'From $2,200',
    description: 'Titanium implants that look, feel, and function like natural teeth — built to last decades.',
    popular: true,
    color: 'bg-navy-50 text-navy-600',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Braces',
    category: 'Orthodontic',
    duration: '12–24 mo',
    price: 'From $3,500',
    description: 'Traditional metal and ceramic braces for children and adults with complex alignment needs.',
    popular: false,
    color: 'bg-purple-50 text-purple-600',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Invisalign',
    category: 'Orthodontic',
    duration: '6–18 mo',
    price: 'From $4,200',
    description: 'Clear removable aligners for discreet, comfortable teeth straightening without metal wires.',
    popular: true,
    color: 'bg-cyan-50 text-cyan-600',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Veneers',
    category: 'Cosmetic',
    duration: '2 visits',
    price: 'From $1,100',
    description: 'Porcelain veneers crafted to perfect your smile — covering chips, stains, and gaps.',
    popular: false,
    color: 'bg-pink-50 text-pink-600',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Crowns',
    category: 'Restorative',
    duration: '2 visits',
    price: 'From $950',
    description: 'Same-day CEREC crowns available — restore broken or severely decayed teeth in one visit.',
    popular: false,
    color: 'bg-yellow-50 text-yellow-600',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Dentures',
    category: 'Restorative',
    duration: '3–4 visits',
    price: 'From $1,800',
    description: 'Full and partial dentures custom-fitted for comfort, function, and natural appearance.',
    popular: false,
    color: 'bg-orange-50 text-orange-600',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
    photo_alt: 'Dr. Priya Sharma, female dentist with dark hair wearing white lab coat and stethoscope',
    badge: 'Lead Dentist',
    badge_color: 'bg-teal-100 text-teal-700',
    next_slot: 'Today, 3:30 PM',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Dr. Emeka Okafor',
    title: 'DMD, PhD',
    specialization: 'Orthodontics & Implants',
    experience: '11 years',
    languages: 'English, Igbo, French',
    bio: 'Dr. Okafor is our implant specialist, trained at Johns Hopkins, with over 800 successful implant placements.',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_10337129e-1772074664598.png",
    photo_alt: 'Dr. Emeka Okafor, male dentist with close-cropped hair in navy scrubs smiling in clinic',
    badge: 'Implant Specialist',
    badge_color: 'bg-navy-100 text-navy-700',
    next_slot: 'Tomorrow, 10:00 AM',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Dr. Mei-Ling Chen',
    title: 'DDS',
    specialization: 'Pediatric & Preventive',
    experience: '9 years',
    languages: 'English, Mandarin, Cantonese',
    bio: 'Dr. Chen makes dental visits fun for kids and adults alike. Her preventive-first approach reduces long-term treatment needs.',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_11ae2c4d2-1772086801082.png",
    photo_alt: 'Dr. Mei-Ling Chen, female dentist in blue scrubs with friendly smile in pediatric dental office',
    badge: 'Pediatric Expert',
    badge_color: 'bg-amber-100 text-amber-700',
    next_slot: 'Mon, 9:00 AM',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

async function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  try {
    // Add Services
    console.log('Adding services...');
    for (const service of services) {
      const { error } = await supabase.from('services').insert(service);
      if (error) {
        console.error(`❌ Failed to add service: ${service.name}`, error.message);
      } else {
        console.log(`✅ Added service: ${service.name}`);
      }
    }
    
    // Add Dentists
    console.log('Adding dentists...');
    for (const dentist of dentists) {
      const { error } = await supabase.from('dentists').insert(dentist);
      if (error) {
        console.error(`❌ Failed to add dentist: ${dentist.name}`, error.message);
      } else {
        console.log(`✅ Added dentist: ${dentist.name}`);
      }
    }
    
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

seedDatabase();
