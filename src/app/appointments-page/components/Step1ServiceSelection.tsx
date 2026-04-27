'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, User, CheckCircle, Loader2 } from 'lucide-react';
import type { BookingData } from './AppointmentBookingFlow';
import AppImage from '@/components/ui/AppImage';
import { Dentist, Service } from '@/types/supabase';


// Generate available dates (next 14 days)
function getAvailableDates() {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

// Time slots
const morningSlots = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
const afternoonSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];
const eveningSlots = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'];



function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatDateValue(d: Date) {
  return d.toISOString().split('T')[0];
}

function isToday(d: Date) {
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

type Props = {
  data: BookingData;
  updateDataAction: (partial: Partial<BookingData>) => void;
  onNextAction: () => void;
};

export default function Step1ServiceSelection({ data, updateDataAction, onNextAction }: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const dates = getAvailableDates();

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesRes, dentistsRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/dentists')
        ]);
        
        const servicesData = await servicesRes.json();
        const dentistsData = await dentistsRes.json();
        
        if (servicesData.success) setServices(servicesData.data);
        if (dentistsData.success) setDentists(dentistsData.data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const selectedDentistBooked: string[] = [];
  const isDentistFull = false;

  const allSlots = [...morningSlots, ...afternoonSlots, ...eveningSlots];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.service) e.service = 'Please select a service';
    if (!data.dentistId) e.dentist = 'Please select a dentist';
    if (!data.date) e.date = 'Please select a date';
    if (!data.timeSlot) e.time = 'Please select a time slot';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNextAction();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-card">
        <Loader2 className="w-10 h-10 text-teal-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading available slots...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Main form */}
      <div className="xl:col-span-2 space-y-7">
        {/* Service selection */}
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold text-navy-700 mb-1">Select a Service</h2>
          <p className="text-sm text-slate-500 mb-5">Choose the treatment you need. Duration shown is approximate.</p>

          {errors.service &&
          <p className="text-red-500 text-sm mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              {errors.service}
            </p>
          }

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {services.map((svc) =>
            <button
              key={svc.id}
              onClick={() => updateDataAction({ service: svc.name })}
              className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-150 active:scale-95 ${
              data.service === svc.name ?
              'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20' : 'border-slate-200 hover:border-navy-200 hover:bg-slate-50'} ${
              svc.category === 'Emergency' ? 'border-red-200 hover:border-red-300' : ''}`}>

                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                svc.category === 'Emergency' ? 'bg-red-50 text-red-600' :
                svc.category === 'Cosmetic' ? 'bg-amber-50 text-amber-600' :
                svc.category === 'Preventive' ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-500'}`
                }>
                    {svc.category}
                  </span>
                  {data.service === svc.name &&
                <CheckCircle size={14} className="text-teal-500 shrink-0" />
                }
                </div>
                <p className="text-sm font-semibold text-navy-700 leading-tight">{svc.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={11} className="text-slate-400" />
                  <span className="text-xs text-slate-400">{svc.duration}</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Dentist selection */}
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold text-navy-700 mb-1">Choose Your Dentist</h2>
          <p className="text-sm text-slate-500 mb-5">Select a dentist or leave as &quot;No preference&quot; and we&apos;ll assign the next available.</p>

          {errors.dentist &&
          <p className="text-red-500 text-sm mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              {errors.dentist}
            </p>
          }

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* No preference option */}
            <button
              onClick={() => updateDataAction({ dentistId: 'any', dentistName: 'No preference' })}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${
              data.dentistId === 'any' ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20' : 'border-slate-200 hover:border-navy-200'}`
              }>

              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <User size={20} className="text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-700">No Preference</p>
                <p className="text-xs text-slate-500">First available dentist</p>
              </div>
              {data.dentistId === 'any' && <CheckCircle size={16} className="text-teal-500 ml-auto shrink-0" />}
            </button>

            {dentists.map((doc) =>
            <button
              key={doc.id}
              onClick={() => updateDataAction({ dentistId: doc.id, dentistName: doc.name })}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${
              data.dentistId === doc.id ?
              'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20' : 'border-slate-200 hover:border-navy-200 active:scale-95'}`
              }>

                <AppImage
                src={doc.photo}
                alt={doc.photoAlt}
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl object-cover shrink-0" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy-700 truncate">{doc.name}</p>
                  <p className="text-xs text-slate-500">{doc.specialization}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-teal-600">● Available today</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400">Slots available</span>
                  </div>
                </div>
                {data.dentistId === doc.id && <CheckCircle size={16} className="text-teal-500 shrink-0" />}
              </button>
            )}
          </div>
        </div>

        {/* Date selection */}
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold text-navy-700 mb-1">Select a Date</h2>
          <p className="text-sm text-slate-500 mb-5">Available for the next 14 days. Emergency appointments available same-day.</p>

          {errors.date &&
          <p className="text-red-500 text-sm mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              {errors.date}
            </p>
          }

          <div className="flex gap-2 overflow-x-auto pb-2">
            {dates.map((d) => {
              const val = formatDateValue(d);
              const today = isToday(d);
              const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
              const dayNum = d.getDate();
              const month = d.toLocaleDateString('en-US', { month: 'short' });
              const isSunday = d.getDay() === 0;

              return (
                <button
                  key={`date-${val}`}
                  onClick={() => updateDataAction({ date: val, timeSlot: '' })}
                  className={`flex flex-col items-center shrink-0 w-14 py-3 rounded-xl border transition-all duration-150 active:scale-95 ${
                  data.date === val ?
                  'bg-navy-600 border-navy-600 text-white' :
                  today ?
                  'border-teal-300 bg-teal-50 text-navy-700' : 'border-slate-200 hover:border-navy-200 text-navy-700'}`
                  }>

                  <span className={`text-xs font-medium ${data.date === val ? 'text-navy-200' : 'text-slate-400'}`}>
                    {dayName}
                  </span>
                  <span className="text-lg font-bold leading-tight">{dayNum}</span>
                  <span className={`text-xs ${data.date === val ? 'text-navy-200' : 'text-slate-400'}`}>
                    {month}
                  </span>
                  {today && data.date !== val &&
                  <span className="text-xs font-semibold text-teal-600 mt-0.5">Today</span>
                  }
                  {isSunday &&
                  <span className="text-xs text-orange-400 mt-0.5">Lim.</span>
                  }
                </button>);

            })}
          </div>
        </div>

        {/* Time slot selection */}
        {data.date &&
        <div className="bg-white rounded-2xl p-6 shadow-card animate-slide-up">
            <h2 className="font-display text-lg font-semibold text-navy-700 mb-1">Choose a Time Slot</h2>
            <p className="text-sm text-slate-500 mb-5">
              {data.dentistId && data.dentistId !== 'any' ?
            `Showing availability for ${data.dentistName}. Greyed slots are already booked.` :
            'Showing all available slots.'}
            </p>

            {errors.time &&
          <p className="text-red-500 text-sm mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                {errors.time}
              </p>
          }

            {[
          { label: 'Morning', slots: morningSlots },
          { label: 'Afternoon', slots: afternoonSlots },
          { label: 'Evening', slots: eveningSlots }].
          map(({ label, slots }) =>
          <div key={`period-${label}`} className="mb-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2.5">{label}</p>
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot) => {
                const isBooked = selectedDentistBooked.includes(slot);
                const isSelected = data.timeSlot === slot;
                return (
                  <button
                    key={`slot-${slot}`}
                    disabled={isBooked}
                    onClick={() => !isBooked && updateDataAction({ timeSlot: slot })}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 active:scale-95 ${
                    isBooked ?
                    'bg-slate-100 text-slate-300 cursor-not-allowed line-through' :
                    isSelected ?
                    'bg-teal-500 text-white shadow-md' :
                    'bg-slate-50 text-slate-700 border border-slate-200 hover:border-teal-300 hover:text-teal-700'}`
                    }>

                        {slot}
                      </button>);

              })}
                </div>
              </div>
          )}

            <p className="text-xs text-slate-400 mt-2">
              <span className="inline-block w-3 h-3 bg-slate-100 border border-slate-200 rounded mr-1 align-middle" />
              Greyed slots are booked. Max 8 appointments per dentist per day.
            </p>
          </div>
        }
      </div>

      {/* Right sidebar — booking summary */}
      <div className="xl:col-span-1">
        <div className="bg-white rounded-2xl p-6 shadow-card sticky top-24">
          <h3 className="font-display text-base font-semibold text-navy-700 mb-4">Booking Summary</h3>

          <div className="space-y-3 mb-6">
            {[
            { label: 'Service', value: data.service || '—' },
            { label: 'Dentist', value: data.dentistName || '—' },
            { label: 'Date', value: data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '—' },
            { label: 'Time', value: data.timeSlot || '—' }].
            map((item) =>
            <div key={`summary-${item.label}`} className="flex justify-between gap-2">
                <span className="text-sm text-slate-400">{item.label}</span>
                <span className={`text-sm font-medium text-right ${item.value === '—' ? 'text-slate-300' : 'text-navy-700'}`}>
                  {item.value}
                </span>
              </div>
            )}
          </div>

          <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 mb-5">
            <p className="text-xs text-teal-700 font-medium mb-1">📧 Confirmation sent instantly</p>
            <p className="text-xs text-teal-600">Email + SMS reminder 24h and 1h before your appointment.</p>
          </div>


          <button
            onClick={handleNext}
            disabled={!data.service || !data.dentistId || !data.date || !data.timeSlot}
            className="w-full flex items-center justify-center gap-2 py-3 bg-navy-600 hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl active:scale-95 transition-all duration-150">

            Continue to Details
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>);

}