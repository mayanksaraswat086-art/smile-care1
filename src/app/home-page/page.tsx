import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import ServicesSection from './components/ServicesSection';
import WhyChooseUs from './components/WhyChooseUs';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialsSection';
import QuickBookingStrip from './components/QuickBookingStrip';
import ContactSection from './components/ContactSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main>
        <HeroSection />
        <StatsBar />
        <ServicesSection />
        <WhyChooseUs />
        <TeamSection />
        <TestimonialsSection />
        <QuickBookingStrip />
        <ContactSection />
      </main>
      <PublicFooter />
    </div>
  );
}