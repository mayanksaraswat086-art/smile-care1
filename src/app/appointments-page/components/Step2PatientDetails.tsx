'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeft, ChevronRight, FileText, Shield } from 'lucide-react';
import { toast } from 'sonner';
import type { BookingData } from './AppointmentBookingFlow';

type PatientForm = {
  patientName: string;
  email: string;
  phone: string;
  notes: string;
  isExistingPatient: boolean;
  consentGiven: boolean;
};

type Props = {
  data: BookingData;
  updateDataAction: (partial: Partial<BookingData>) => void;
  onBackAction: () => void;
  onNextAction: (ref: string) => void;
};

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'SC-' + Array.from({ length: 6 }, (_, i) => chars[(i * 7 + 13) % chars.length]).join('') +
    String(Date.now()).slice(-3);
}

export default function Step2PatientDetails({ data, updateDataAction, onBackAction, onNextAction }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PatientForm>({
    defaultValues: {
      patientName: data.patientName,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
      isExistingPatient: data.isExistingPatient,
      consentGiven: data.consentGiven,
    },
  });

  const consentGiven = watch('consentGiven');

  const onSubmit = async (formData: PatientForm) => {
    try {
      const appointmentData = {
        service: data.service,
        dentistName: data.dentistName,
        date: data.date,
        timeSlot: data.timeSlot,
        patientName: formData.patientName,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes,
        isExistingPatient: formData.isExistingPatient,
        consentGiven: formData.consentGiven,
      };

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
      });
      const result = await res.json();
      if (result.success) {
        updateDataAction({ ...formData });
        onNextAction(result.data.referenceNumber);
      } else {
        toast.error(result.error || 'Failed to book appointment');
      }
    } catch (error) {
      toast.error('Failed to book appointment');
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal info */}
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold text-navy-700 mb-1">Your Information</h2>
            <p className="text-sm text-slate-500 mb-5">All information is HIPAA compliant and encrypted at rest.</p>

            <div className="flex items-center gap-3 p-3 bg-navy-50 rounded-xl mb-5">
              <input
                {...register('isExistingPatient')}
                type="checkbox"
                id="existing-patient"
                className="w-4 h-4 accent-navy-600 rounded"
              />
              <label htmlFor="existing-patient" className="text-sm font-medium text-navy-700 cursor-pointer">
                I am an existing SmileCare patient
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('patientName', { required: 'Full name is required' })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${errors.patientName ? 'border-red-300 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all`}
                  placeholder="Aaliya Rahman"
                />
                {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-400 mb-1">Confirmation sent here</p>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
                  })}
                  type="email"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all`}
                  placeholder="aaliya@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-400 mb-1">SMS reminders sent here</p>
                <input
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: { value: /^\+?[\d\s\-()]{10,}$/, message: 'Enter a valid phone number' },
                  })}
                  type="tel"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all`}
                  placeholder="(555) 000-0000"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Date of Birth</label>
                <p className="text-xs text-slate-400 mb-1">For identity verification</p>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold text-navy-700 mb-1">Insurance Information</h2>
            <p className="text-sm text-slate-500 mb-5">Optional — helps us prepare your visit and estimate costs upfront.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Insurance Provider</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-white">
                  <option value="">Select provider (optional)</option>
                  <option>Aetna</option>
                  <option>Blue Cross Blue Shield</option>
                  <option>Cigna</option>
                  <option>Delta Dental</option>
                  <option>Guardian</option>
                  <option>Humana</option>
                  <option>MetLife</option>
                  <option>United Healthcare</option>
                  <option>No insurance — self-pay</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Member ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="e.g. AET1234567"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold text-navy-700 mb-1">Additional Notes</h2>
            <p className="text-sm text-slate-500 mb-4">Share any concerns, allergies, or special requirements with your dentist.</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Notes for your dentist</label>
              <textarea
                {...register('notes')}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                placeholder="e.g. I have a latex allergy, I get anxious about drills, last X-ray was 6 months ago..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Latex allergy',
                'Dental anxiety',
                'On blood thinners',
                'Diabetic',
                'Pregnant',
                'Heart condition',
              ].map((tag) => (
                <label
                  key={`tag-${tag}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:border-navy-200 cursor-pointer group"
                >
                  <input type="checkbox" className="w-4 h-4 accent-teal-500 rounded" />
                  <span className="text-sm text-slate-600 group-hover:text-navy-700">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Consent */}
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-navy-50 flex items-center justify-center shrink-0">
                <FileText size={16} className="text-navy-600" />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-navy-700">Consent & Agreement</h2>
                <p className="text-sm text-slate-500">Required before confirming your appointment.</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500 leading-relaxed mb-4 max-h-32 overflow-y-auto border border-slate-200">
              By booking this appointment, you consent to receive dental examination and treatment by SmileCare dental professionals. You acknowledge that dental procedures carry inherent risks which will be explained before any treatment begins. SmileCare collects and stores your personal and health information in accordance with HIPAA regulations and our Privacy Policy. You agree to receive appointment confirmation and reminder communications via email and SMS.
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                {...register('consentGiven', { required: 'You must agree to the consent terms to proceed' })}
                type="checkbox"
                className="w-4 h-4 accent-teal-500 mt-0.5 shrink-0"
              />
              <span className="text-sm text-slate-700 group-hover:text-navy-700">
                I have read and agree to the consent terms and SmileCare&apos;s{' '}
                <a href="/privacy-policy" target="_blank" className="text-teal-600 underline hover:no-underline">Privacy Policy</a>{' '}
                and{' '}
                <a href="/terms-of-service" target="_blank" className="text-teal-600 underline hover:no-underline">Terms of Service</a>.
              </span>
            </label>
            {errors.consentGiven && (
              <p className="text-red-500 text-xs mt-2">{errors.consentGiven.message}</p>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBackAction}
              className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all duration-150"
            >
              <ChevronLeft size={16} />
              Back to Selection
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !consentGiven}
              className="flex items-center gap-2 px-6 py-3 bg-navy-600 hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl active:scale-95 transition-all duration-150 min-w-[180px] justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Confirming...
                </>
              ) : (
                <>
                  Confirm Appointment
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Right sidebar summary */}
      <div className="xl:col-span-1">
        <div className="bg-white rounded-2xl p-6 shadow-card sticky top-24">
          <h3 className="font-display text-base font-semibold text-navy-700 mb-4">Appointment Summary</h3>

          <div className="space-y-3 mb-5">
            {[
              { label: 'Service', value: data.service },
              { label: 'Dentist', value: data.dentistName },
              { label: 'Date', value: data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '—' },
              { label: 'Time', value: data.timeSlot },
            ].map((item) => (
              <div key={`step2-summary-${item.label}`} className="flex justify-between gap-2">
                <span className="text-sm text-slate-400">{item.label}</span>
                <span className="text-sm font-medium text-navy-700 text-right">{item.value || '—'}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <Shield size={14} className="text-teal-600 shrink-0" />
              <p className="text-xs text-slate-500">HIPAA compliant — data encrypted in transit and at rest</p>
            </div>
            <div className="flex items-center gap-2.5">
              <FileText size={14} className="text-navy-400 shrink-0" />
              <p className="text-xs text-slate-500">Confirmation PDF sent to your email immediately</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}