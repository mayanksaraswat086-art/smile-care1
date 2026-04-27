-- Dentists table
CREATE TABLE IF NOT EXISTS dentists (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialization TEXT NOT NULL,
  experience TEXT NOT NULL,
  languages TEXT[] NOT NULL,
  bio TEXT NOT NULL,
  photo TEXT NOT NULL,
  photo_alt TEXT,
  badge TEXT,
  badge_color TEXT,
  next_slot TEXT,
  education TEXT[],
  certifications TEXT[],
  achievements TEXT[],
  about TEXT,
  services TEXT[],
  clinic_hours JSONB,
  rating DECIMAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  price DECIMAL NOT NULL,
  description TEXT NOT NULL,
  popular BOOLEAN DEFAULT false,
  color TEXT DEFAULT 'bg-blue-50 text-blue-600',
  urgent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  service TEXT NOT NULL,
  dentist_name TEXT NOT NULL,
  date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT,
  is_existing_patient BOOLEAN DEFAULT false,
  consent_given BOOLEAN NOT NULL,
  insurance_provider TEXT,
  member_id TEXT,
  reference_number TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Queries table
CREATE TABLE IF NOT EXISTS queries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE dentists ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE queries ENABLE ROW LEVEL SECURITY;

-- Allow public access for demo purposes
CREATE POLICY "Public access to dentists" ON dentists FOR SELECT USING (true);
CREATE POLICY "Public insert to dentists" ON dentists FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update dentists" ON dentists FOR UPDATE USING (true);
CREATE POLICY "Public delete dentists" ON dentists FOR DELETE USING (true);

CREATE POLICY "Public access to services" ON services FOR SELECT USING (true);
CREATE POLICY "Public insert to services" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update services" ON services FOR UPDATE USING (true);
CREATE POLICY "Public delete services" ON services FOR DELETE USING (true);

CREATE POLICY "Public access to appointments" ON appointments FOR SELECT USING (true);
CREATE POLICY "Public insert to appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update appointments" ON appointments FOR UPDATE USING (true);
CREATE POLICY "Public delete appointments" ON appointments FOR DELETE USING (true);

CREATE POLICY "Public access to queries" ON queries FOR SELECT USING (true);
CREATE POLICY "Public insert to queries" ON queries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update queries" ON queries FOR UPDATE USING (true);
CREATE POLICY "Public delete queries" ON queries FOR DELETE USING (true);
