// Simple seed script - Direct API calls
// Run: node scripts/simple-seed.js

const services = [
  { name: "Dental Checkup", category: "Preventive", duration: "30 min", price: "$50", description: "Comprehensive dental examination and cleaning", popular: false, color: "bg-teal-50 text-teal-600" },
  { name: "Teeth Cleaning", category: "Preventive", duration: "30 min", price: "$75", description: "Professional teeth cleaning and polishing", popular: false, color: "bg-green-50 text-green-600" },
  { name: "Fluoride Treatment", category: "Preventive", duration: "15 min", price: "$40", description: "Fluoride treatment for stronger teeth", popular: false, color: "bg-cyan-50 text-cyan-600" },
  { name: "Teeth Whitening", category: "Cosmetic", duration: "45 min", price: "$150", description: "Professional teeth whitening for brighter smile", popular: true, color: "bg-amber-50 text-amber-600" },
  { name: "Veneers", category: "Cosmetic", duration: "60 min", price: "$400", description: "Porcelain veneers for perfect smile", popular: true, color: "bg-rose-50 text-rose-600" },
  { name: "Bonding", category: "Cosmetic", duration: "30 min", price: "$100", description: "Dental bonding for minor repairs", popular: false, color: "bg-pink-50 text-pink-600" },
  { name: "Root Canal", category: "Restorative", duration: "60 min", price: "$200", description: "Save your natural teeth with root canal", popular: false, color: "bg-blue-50 text-blue-600" },
  { name: "Dental Implants", category: "Restorative", duration: "90 min", price: "$800", description: "Permanent tooth replacement", popular: true, color: "bg-purple-50 text-purple-600" },
  { name: "Crowns", category: "Restorative", duration: "60 min", price: "$250", description: "Custom dental crowns", popular: false, color: "bg-indigo-50 text-indigo-600" },
  { name: "Braces", category: "Orthodontic", duration: "45 min", price: "$300", description: "Traditional metal braces", popular: false, color: "bg-slate-50 text-slate-600" },
  { name: "Clear Aligners", category: "Orthodontic", duration: "30 min", price: "$500", description: "Invisible clear aligners", popular: true, color: "bg-gray-50 text-gray-600" },
  { name: "Retainers", category: "Orthodontic", duration: "20 min", price: "$100", description: "Orthodontic retainers", popular: false, color: "bg-zinc-50 text-zinc-600" },
  { name: "Tooth Extraction", category: "Surgical", duration: "30 min", price: "$100", description: "Safe tooth extraction", popular: false, color: "bg-red-50 text-red-600" },
  { name: "Wisdom Teeth", category: "Surgical", duration: "45 min", price: "$200", description: "Wisdom teeth removal", popular: false, color: "bg-orange-50 text-orange-600" },
  { name: "Gum Surgery", category: "Surgical", duration: "60 min", price: "$300", description: "Periodontal gum surgery", popular: false, color: "bg-yellow-50 text-yellow-600" },
  { name: "Emergency Care", category: "Emergency", duration: "30 min", price: "$150", description: "24/7 emergency dental care", popular: false, color: "bg-red-100 text-red-700", urgent: true }
];

const dentists = [
  { name: "Dr. Sarah Johnson", title: "DDS, MS", specialization: "Orthodontics", experience: "14 years", languages: "English, Hindi, Gujarati", bio: "Expert in orthodontics and smile transformations", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", photoAlt: "Dr. Sarah Johnson", badge: "Dentist", badgeColor: "bg-teal-100 text-teal-700", nextSlot: "Today, 3:30 PM" },
  { name: "Dr. Michael Chen", title: "DDS", specialization: "General Dentistry", experience: "10 years", languages: "English, Mandarin, Spanish", bio: "Expert in general dentistry and preventive care", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", photoAlt: "Dr. Michael Chen", badge: "Dentist", badgeColor: "bg-blue-100 text-blue-700", nextSlot: "Today, 4:00 PM" },
  { name: "Dr. Priya Sharma", title: "BDS, MDS", specialization: "Endodontics", experience: "8 years", languages: "English, Hindi, Marathi", bio: "Specialist in root canal treatments", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", photoAlt: "Dr. Priya Sharma", badge: "Dentist", badgeColor: "bg-purple-100 text-purple-700", nextSlot: "Tomorrow, 10:00 AM" },
  { name: "Dr. James Wilson", title: "DDS, PhD", specialization: "Oral Surgery", experience: "15 years", languages: "English, French", bio: "Expert in complex surgeries and implants", photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop", photoAlt: "Dr. James Wilson", badge: "Dentist", badgeColor: "bg-navy-100 text-navy-700", nextSlot: "Tomorrow, 2:00 PM" },
  { name: "Dr. Emily Davis", title: "DDS", specialization: "Cosmetic Dentistry", experience: "7 years", languages: "English, German", bio: "Specialist in cosmetic procedures", photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop", photoAlt: "Dr. Emily Davis", badge: "Dentist", badgeColor: "bg-pink-100 text-pink-700", nextSlot: "Tomorrow, 11:00 AM" },
  { name: "Dr. Raj Patel", title: "BDS", specialization: "Pediatric Dentistry", experience: "6 years", languages: "English, Hindi, Gujarati", bio: "Expert in children's dental care", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", photoAlt: "Dr. Raj Patel", badge: "Dentist", badgeColor: "bg-green-100 text-green-700", nextSlot: "Today, 5:00 PM" }
];

async function seed() {
  const API = 'http://localhost:4028/api';
  
  for (const s of services) {
    try {
      const res = await fetch(`${API}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s)
      });
      console.log(`Service: ${s.name} - ${res.ok ? '✅' : '❌'}`);
    } catch (e) { console.error(e.message); }
  }
  
  for (const d of dentists) {
    try {
      const res = await fetch(`${API}/dentists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d)
      });
      console.log(`Dentist: ${d.name} - ${res.ok ? '✅' : '❌'}`);
    } catch (e) { console.error(e.message); }
  }
}

seed();
