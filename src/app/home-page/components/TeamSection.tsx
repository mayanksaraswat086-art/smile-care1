'use client';
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { GraduationCap, Languages, Clock, ArrowRight } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { Dentist } from '@/types/supabase';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TeamSection() {
  const { data, error, isLoading } = useSWR('/api/dentists', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 5000
  });

  const dentists = data?.data || [];

  if (isLoading) {
    return (
      <section id="team" className="py-20 lg:py-28 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
          <div className="text-center">
            <p className="text-slate-500">Loading team...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="team" className="py-20 lg:py-28 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
          <div className="text-center">
            <p className="text-red-500">Failed to load team</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5 mb-3">
            Our Dentists
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-700 mb-4">
            Meet the Hands Behind Your Smile
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            Our team of board-certified dentists brings specialized expertise across every area of oral health — united by a shared commitment to patient-first care.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {dentists?.map((doc: Dentist) =>
          <Link key={doc?.id} href={`/dentists/${doc?.id}`} className="bg-white rounded-3xl overflow-hidden shadow-card card-hover group block">
              {/* Photo */}
              <div className="relative h-56 overflow-hidden">
                <AppImage
                src={doc?.photo}
                alt={doc?.photoAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />

                <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 to-transparent" />
                <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${doc?.badgeColor}`}>
                  {doc?.badge}
                </span>
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-display font-bold text-lg leading-tight">{doc?.name}</p>
                  <p className="text-navy-200 text-sm">{doc?.title}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm font-semibold text-teal-600 mb-2">{doc?.specialization}</p>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{doc?.bio}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={14} className="text-navy-400 shrink-0" />
                    <span className="text-xs text-slate-500">{doc?.experience} of clinical experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages size={14} className="text-navy-400 shrink-0" />
                    <span className="text-xs text-slate-500">{doc?.languages}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-teal-500 shrink-0" />
                    <span className="text-xs text-teal-600 font-medium">Next available: {doc?.nextSlot}</span>
                  </div>
                </div>

                <span
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-navy-600 rounded-xl hover:bg-navy-700 active:scale-95 transition-all duration-150">

                  View Profile
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/home-page#team"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors">

            View all dentists
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}