'use client';
import React from 'react';
import Link from 'next/link';
import { CheckCircle, Calendar, Clock, User, Download, ArrowRight, Bell, Home } from 'lucide-react';
import type { BookingData } from './AppointmentBookingFlow';

type Props = {
  data: BookingData;
  confirmationRef: string;
  onBookAnotherAction: () => void;
};

const nextSteps = [
  { icon: Bell, title: 'Check your email', desc: 'Confirmation sent to your inbox with all appointment details and a calendar invite.' },
  { icon: Calendar, title: 'Save the date', desc: 'Add to your calendar using the link in your confirmation email. SMS reminder arrives 24h before.' },
  { icon: Clock, title: 'Arrive 10 minutes early', desc: 'New patients: bring a photo ID and insurance card. Existing patients: just your smile.' },
];

export default function Step3Confirmation({ data, confirmationRef, onBookAnotherAction }: Props) {
  const formattedDate = data.date
    ? new Date(data.date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      {/* Success header */}
      <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-card text-center mb-6">
        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-teal-50 rounded-full mb-5">
          <CheckCircle size={40} className="text-teal-500" />
          <span className="absolute inset-0 rounded-full border-2 border-teal-200 animate-ping opacity-30" />
        </div>

        <h2 className="font-display text-2xl lg:text-3xl font-bold text-navy-700 mb-2">
          Appointment Confirmed!
        </h2>
        <p className="text-slate-500 mb-6">
          Your appointment has been booked and a confirmation has been sent to{' '}
          <span className="font-semibold text-navy-700">{data.email || 'your email'}</span>.
        </p>

        {/* Ref number */}
        <div className="inline-flex items-center gap-3 bg-navy-50 border border-navy-100 rounded-2xl px-6 py-3 mb-6">
          <span className="text-sm text-navy-500">Confirmation Reference</span>
          <span className="font-display text-xl font-bold text-navy-700 tabular-nums tracking-widest">
            {confirmationRef}
          </span>
        </div>

        {/* Appointment details card */}
        <div className="bg-slate-50 rounded-2xl p-5 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                <Calendar size={16} className="text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Date</p>
                <p className="text-sm font-semibold text-navy-700">{formattedDate || 'Selected date'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                <Clock size={16} className="text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Time</p>
                <p className="text-sm font-semibold text-navy-700">{data.timeSlot || '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-navy-50 flex items-center justify-center shrink-0">
                <User size={16} className="text-navy-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Dentist</p>
                <p className="text-sm font-semibold text-navy-700">{data.dentistName || '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <CheckCircle size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Service</p>
                <p className="text-sm font-semibold text-navy-700">{data.service || '—'}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Location</p>
              <p className="text-sm font-medium text-navy-700">247 Maplewood Drive, Suite 3B, San Francisco, CA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
        <h3 className="font-display text-base font-semibold text-navy-700 mb-4">What Happens Next</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nextSteps.map((step, i) => (
            <div key={`nextstep-${i}`} className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                <step.icon size={15} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-700 mb-0.5">{step.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBookAnotherAction}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-xl active:scale-95 transition-all duration-150"
        >
          <Calendar size={16} />
          Book Another Appointment
        </button>
        <Link
          href="/home-page"
          className="flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-xl active:scale-95 transition-all duration-150"
        >
          <Home size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}