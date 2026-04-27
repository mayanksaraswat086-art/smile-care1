'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useSWR from 'swr';
import {
  GraduationCap, Languages, Clock, ArrowLeft, Star,
  Award, BookOpen, Stethoscope, Calendar, Shield, Phone
} from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { Dentist } from '@/types/firebase';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DentistProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, error, isLoading } = useSWR(
    id ? `/api/dentists/${id}` : null,
    fetcher,
    { revalidateOnFocus: true, dedupingInterval: 5000 }
  );

  const dentist: Dentist | null = data?.data || null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading dentist profile...</p>
        </div>
      </div>
    );
  }

  if (error || !dentist) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Dentist not found</p>
          <Link href="/home-page#team" className="text-teal-600 hover:text-teal-700 font-medium">
            ← Back to Team
          </Link>
        </div>
      </div>
    );
  }

  const servicesList = dentist.services ? dentist.services.split(',').map(s => s.trim()) : [];
  const certificationsList = dentist.certifications ? dentist.certifications.split(',').map(s => s.trim()) : [];
  const achievementsList = dentist.achievements ? dentist.achievements.split(',').map(s => s.trim()) : [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-navy-700 via-navy-600 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <Link
            href="/home-page#team"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Team</span>
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
              <AppImage
                src={dentist.photo}
                alt={dentist.photoAlt || dentist.name}
                fill
                sizes="224px"
                className="object-cover object-top"
              />
              <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${dentist.badgeColor}`}>
                {dentist.badge}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">{dentist.name}</h1>
              <p className="text-teal-300 text-lg font-medium mb-4">{dentist.title}</p>
              <p className="text-white/80 text-sm leading-relaxed max-w-2xl mb-6">{dentist.bio}</p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-2">
                  <GraduationCap size={18} className="text-teal-300" />
                  <div>
                    <p className="text-xs text-white/60">Experience</p>
                    <p className="text-sm font-semibold">{dentist.experience}</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-2">
                  <Stethoscope size={18} className="text-teal-300" />
                  <div>
                    <p className="text-xs text-white/60">Specialization</p>
                    <p className="text-sm font-semibold">{dentist.specialization}</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-2">
                  <Languages size={18} className="text-teal-300" />
                  <div>
                    <p className="text-xs text-white/60">Languages</p>
                    <p className="text-sm font-semibold">{dentist.languages}</p>
                  </div>
                </div>
                {dentist.rating && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-2">
                    <Star size={18} className="text-amber-400 fill-amber-400" />
                    <div>
                      <p className="text-xs text-white/60">Rating</p>
                      <p className="text-sm font-semibold">{dentist.rating}/5 ({dentist.reviewCount || 0} reviews)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            {dentist.about && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={20} className="text-teal-600" />
                  <h2 className="font-display text-xl font-bold text-navy-700">About</h2>
                </div>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{dentist.about}</p>
              </div>
            )}

            {/* Education */}
            {dentist.education && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap size={20} className="text-teal-600" />
                  <h2 className="font-display text-xl font-bold text-navy-700">Education</h2>
                </div>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{dentist.education}</p>
              </div>
            )}

            {/* Certifications */}
            {certificationsList.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={20} className="text-teal-600" />
                  <h2 className="font-display text-xl font-bold text-navy-700">Certifications</h2>
                </div>
                <div className="space-y-3">
                  {certificationsList.map((cert, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                      <p className="text-slate-600">{cert}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {achievementsList.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={20} className="text-teal-600" />
                  <h2 className="font-display text-xl font-bold text-navy-700">Achievements</h2>
                </div>
                <div className="space-y-3">
                  {achievementsList.map((ach, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <p className="text-slate-600">{ach}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Offered */}
            {servicesList.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope size={20} className="text-teal-600" />
                  <h2 className="font-display text-xl font-bold text-navy-700">Services Offered</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((service, i) => (
                    <span key={i} className="bg-teal-50 text-teal-700 text-sm font-medium px-4 py-2 rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Appointment Card */}
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={20} className="text-teal-600" />
                <h3 className="font-display text-lg font-bold text-navy-700">Book Appointment</h3>
              </div>

              {dentist.nextSlot && (
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 mb-4">
                  <p className="text-sm text-teal-700 font-medium">
                    <Clock size={14} className="inline mr-1" />
                    Next available: {dentist.nextSlot}
                  </p>
                </div>
              )}

              <Link
                href={`/appointments-page?dentist=${dentist.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-navy-600 rounded-xl hover:bg-navy-700 active:scale-95 transition-all duration-150 mb-4"
              >
                Book with {dentist.name?.split(' ')?.[1] || dentist.name}
              </Link>

              {/* Clinic Hours */}
              {dentist.clinicHours && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-navy-700 mb-2">Clinic Hours</h4>
                  <p className="text-sm text-slate-500 whitespace-pre-line">{dentist.clinicHours}</p>
                </div>
              )}

              {/* Contact */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-navy-700 mb-2">Quick Contact</h4>
                <Link
                  href="/home-page#contact"
                  className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  <Phone size={14} />
                  Contact Clinic
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
