// Data seeding script for SmileCare
// Run with: node scripts/seed-data.js

const services = [
  {
    name: "Root Canal Treatment",
    category: "Restorative",
    duration: "60 min",
    price: "From $200",
    description: "Advanced root canal therapy to save your natural teeth",
    popular: false,
    color: "bg-blue-50 text-blue-600",
    urgent: false
  },
  {
    name: "Teeth Whitening",
    category: "Cosmetic",
    duration: "45 min",
    price: "From $150",
    description: "Professional teeth whitening for a brighter smile",
    popular: true,
    color: "bg-amber-50 text-amber-600",
    urgent: false
  },
  {
    name: "Dental Checkup",
    category: "Preventive",
    duration: "30 min",
    price: "From $50",
    description: "Comprehensive dental examination and cleaning",
    popular: false,
    color: "bg-teal-50 text-teal-600",
    urgent: false
  },
  {
    name: "Dental Implants",
    category: "Restorative",
    duration: "90 min",
    price: "From $800",
    description: "Permanent tooth replacement with natural-looking implants",
    popular: true,
    color: "bg-purple-50 text-purple-600",
    urgent: false
  },
  {
    name: "Braces & Aligners",
    category: "Orthodontic",
    duration: "45 min",
    price: "From $300",
    description: "Straighten your teeth with modern orthodontic solutions",
    popular: false,
    color: "bg-pink-50 text-pink-600",
    urgent: false
  },
  {
    name: "Tooth Extraction",
    category: "Surgical",
    duration: "30 min",
    price: "From $100",
    description: "Safe and painless tooth extraction procedures",
    popular: false,
    color: "bg-red-50 text-red-600",
    urgent: false
  },
  {
    name: "Emergency Dental Care",
    category: "Emergency",
    duration: "30 min",
    price: "From $150",
    description: "24/7 emergency dental services for urgent needs",
    popular: false,
    color: "bg-red-100 text-red-700",
    urgent: true
  },
  {
    name: "Dental Crowns",
    category: "Restorative",
    duration: "60 min",
    price: "From $250",
    description: "Custom crowns to restore damaged teeth",
    popular: false,
    color: "bg-indigo-50 text-indigo-600",
    urgent: false
  },
  {
    name: "Veneers",
    category: "Cosmetic",
    duration: "45 min",
    price: "From $400",
    description: "Transform your smile with porcelain veneers",
    popular: true,
    color: "bg-rose-50 text-rose-600",
    urgent: false
  },
  {
    name: "Gum Treatment",
    category: "Preventive",
    duration: "30 min",
    price: "From $75",
    description: "Treatment for gum disease and periodontal health",
    popular: false,
    color: "bg-green-50 text-green-600",
    urgent: false
  },
  {
    name: "Dentures",
    category: "Restorative",
    duration: "60 min",
    price: "From $500",
    description: "Custom dentures for complete or partial tooth loss",
    popular: false,
    color: "bg-orange-50 text-orange-600",
    urgent: false
  },
  {
    name: "Pediatric Dentistry",
    category: "Preventive",
    duration: "30 min",
    price: "From $50",
    description: "Specialized dental care for children and teens",
    popular: false,
    color: "bg-cyan-50 text-cyan-600",
    urgent: false
  }
];

const dentists = [
  {
    name: "Dr. Sarah Johnson",
    title: "DDS, MS",
    specialization: "Orthodontics",
    experience: "14 years",
    languages: "English, Hindi, Gujarati",
    bio: "Dr. Sarah specializes in orthodontic treatments and smile transformations. She has helped over 2000 patients achieve their dream smiles.",
    photo: "/images/dentist1.jpg",
    photoAlt: "Dr. Sarah Johnson",
    badge: "Dentist",
    badgeColor: "bg-teal-100 text-teal-700",
    nextSlot: "Today, 3:30 PM"
  },
  {
    name: "Dr. Michael Chen",
    title: "DDS",
    specialization: "General Dentistry",
    experience: "10 years",
    languages: "English, Mandarin, Spanish",
    bio: "Dr. Chen is an expert in general dentistry with a focus on preventive care and patient education.",
    photo: "/images/dentist2.jpg",
    photoAlt: "Dr. Michael Chen",
    badge: "Dentist",
    badgeColor: "bg-blue-100 text-blue-700",
    nextSlot: "Today, 4:00 PM"
  },
  {
    name: "Dr. Priya Sharma",
    title: "BDS, MDS",
    specialization: "Endodontics",
    experience: "8 years",
    languages: "English, Hindi, Marathi",
    bio: "Dr. Sharma specializes in root canal treatments and endodontic procedures with a gentle touch.",
    photo: "/images/dentist3.jpg",
    photoAlt: "Dr. Priya Sharma",
    badge: "Dentist",
    badgeColor: "bg-purple-100 text-purple-700",
    nextSlot: "Tomorrow, 10:00 AM"
  },
  {
    name: "Dr. James Wilson",
    title: "DDS, PhD",
    specialization: "Oral Surgery",
    experience: "15 years",
    languages: "English, French",
    bio: "Dr. Wilson is an oral surgeon specializing in complex extractions and implant procedures.",
    photo: "/images/dentist4.jpg",
    photoAlt: "Dr. James Wilson",
    badge: "Dentist",
    badgeColor: "bg-navy-100 text-navy-700",
    nextSlot: "Tomorrow, 2:00 PM"
  }
];

async function seedData() {
  const API_BASE = 'http://localhost:4028/api';
  
  console.log('🌱 Seeding Services...');
  for (const service of services) {
    try {
      const res = await fetch(`${API_BASE}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      });
      const data = await res.json();
      if (data.success) {
        console.log(`✅ Added: ${service.name}`);
      } else {
        console.error(`❌ Failed: ${service.name} - ${data.error}`);
      }
    } catch (error) {
      console.error(`❌ Error adding ${service.name}:`, error.message);
    }
  }

  console.log('\n🌱 Seeding Dentists...');
  for (const dentist of dentists) {
    try {
      const res = await fetch(`${API_BASE}/dentists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dentist)
      });
      const data = await res.json();
      if (data.success) {
        console.log(`✅ Added: ${dentist.name}`);
      } else {
        console.error(`❌ Failed: ${dentist.name} - ${data.error}`);
      }
    } catch (error) {
      console.error(`❌ Error adding ${dentist.name}:`, error.message);
    }
  }

  console.log('\n✨ Seeding complete!');
}

seedData().catch(console.error);
