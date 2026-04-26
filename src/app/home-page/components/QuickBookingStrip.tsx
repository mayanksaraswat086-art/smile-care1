'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

type QuickBookForm = {
  name: string;
  phone: string;
  service: string;
};

const serviceOptions = [
  'Dental Checkup', 'Teeth Whitening', 'Dental Fillings',
  'Root Canal', 'Tooth Extraction', 'Dental Implants',
  'Braces', 'Invisalign', 'Veneers', 'Crowns', 'Emergency Care',
];

export default function QuickBookingStrip() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<QuickBookForm>();

  const onSubmit = async (data: QuickBookForm) => {
    // TODO: Backend — POST /api/appointments/quick-request with data
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    toast.success('Request received! We\'ll call you within 30 minutes to confirm.');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-500">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        {submitted ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-4">
              <CheckCircle size={28} className="text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">Request Received!</h3>
            <p className="text-teal-100">Our team will call you within 30 minutes to confirm your appointment.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="shrink-0 text-center lg:text-left">
              <p className="text-teal-100 text-sm font-medium uppercase tracking-widest mb-1">Quick Request</p>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white">
                Book in Under 60 Seconds
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-3 flex-1 w-full"
            >
              <div className="flex-1">
                <input
                  {...register('name', { required: 'Your name is required' })}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 rounded-xl text-sm bg-white/15 border ${
                    errors.name ? 'border-red-300' : 'border-white/20'
                  } text-white placeholder-teal-200 focus:outline-none focus:border-white focus:bg-white/20 transition-all`}
                />
                {errors.name && <p className="text-red-200 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div className="flex-1">
                <input
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: { value: /^\+?[\d\s\-()]{10,}$/, message: 'Enter a valid phone number' }
                  })}
                  placeholder="Phone number"
                  type="tel"
                  className={`w-full px-4 py-3 rounded-xl text-sm bg-white/15 border ${
                    errors.phone ? 'border-red-300' : 'border-white/20'
                  } text-white placeholder-teal-200 focus:outline-none focus:border-white focus:bg-white/20 transition-all`}
                />
                {errors.phone && <p className="text-red-200 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div className="flex-1">
                <select
                  {...register('service', { required: 'Please select a service' })}
                  className={`w-full px-4 py-3 rounded-xl text-sm bg-white/15 border ${
                    errors.service ? 'border-red-300' : 'border-white/20'
                  } text-white focus:outline-none focus:border-white focus:bg-white/20 transition-all`}
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" className="bg-teal-700">Select a service</option>
                  {serviceOptions.map((s) => (
                    <option key={`qs-${s}`} value={s} className="bg-teal-700">{s}</option>
                  ))}
                </select>
                {errors.service && <p className="text-red-200 text-xs mt-1">{errors.service.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 bg-navy-600 hover:bg-navy-700 disabled:opacity-70 text-white font-semibold rounded-xl active:scale-95 transition-all duration-150 min-w-[140px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Request Callback
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}