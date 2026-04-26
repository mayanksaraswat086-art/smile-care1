import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import AppointmentBookingFlow from './components/AppointmentBookingFlow';
import { Toaster } from 'sonner';

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      <Toaster position="bottom-right" richColors />
      <main className="pt-16">
        {/* Page header */}
        <div className="bg-navy-700 py-12">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
            <p className="text-teal-400 text-sm font-medium uppercase tracking-widest mb-2">Online Booking</p>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
              Book Your Appointment
            </h1>
            <p className="text-navy-200 max-w-xl">
              Reserve your slot in under 2 minutes. Same-day appointments available for most services. Confirmation sent immediately to your email.
            </p>
          </div>
        </div>
        <AppointmentBookingFlow />
      </main>
      <PublicFooter />
    </div>
  );
}