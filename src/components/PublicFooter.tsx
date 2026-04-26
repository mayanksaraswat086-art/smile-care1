import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

// Social icons as inline SVGs (Facebook, Instagram, Twitter/X, Youtube removed from lucide-react v1.x)
function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}



const services = [
  'Dental Checkup', 'Teeth Whitening', 'Dental Fillings',
  'Root Canal', 'Tooth Extraction', 'Dental Implants',
  'Braces', 'Invisalign', 'Veneers',
];

const quickLinks = [
  { label: 'Book Appointment', href: '/appointments-page' },
  { label: 'Our Team', href: '/home-page#team' },
  { label: 'Services', href: '/home-page#services' },
  { label: 'Contact Us', href: '/home-page#contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

const hours = [
  { day: 'Mon – Fri', time: '8:00 AM – 7:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 5:00 PM' },
  { day: 'Sunday', time: '10:00 AM – 2:00 PM' },
  { day: 'Emergencies', time: '24/7 On-Call' },
];

export default function PublicFooter() {
  return (
    <footer className="bg-navy-700 text-white">
      {/* Emergency banner */}
      <div className="bg-red-600 px-6 py-3 text-center">
        <p className="text-sm font-medium">
          🚨 Dental Emergency? Call us now:{' '}
          <a href="tel:+15559111234" className="font-bold underline hover:no-underline">
            (555) 911-1234
          </a>{' '}
          — 24/7 emergency line
        </p>
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={36} />
              <span className="font-display text-xl font-bold text-white">SmileCare</span>
            </div>
            <p className="text-sm text-navy-200 leading-relaxed mb-5">
              Providing compassionate, comprehensive dental care to families across the community since 2008. Your smile is our mission.
            </p>
            <div className="flex items-center gap-3">
              {[
                { SocialIcon: FacebookIcon, label: 'Facebook' },
                { SocialIcon: InstagramIcon, label: 'Instagram' },
                { SocialIcon: TwitterIcon, label: 'Twitter' },
                { SocialIcon: YoutubeIcon, label: 'Youtube' },
              ]?.map(({ SocialIcon: SocialIconComponent, label }, i) => (
                <a
                  key={`social-${i}`}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-navy-600 hover:bg-teal-600 flex items-center justify-center transition-colors duration-150"
                  aria-label={label}
                >
                  <SocialIconComponent size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-600 uppercase tracking-widest text-teal-400 mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              {services?.map((s) => (
                <li key={`footer-svc-${s}`}>
                  <Link
                    href="/home-page#services"
                    className="text-sm text-navy-200 hover:text-white transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-600 uppercase tracking-widest text-teal-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks?.map((l) => (
                <li key={`footer-link-${l?.label}`}>
                  <Link
                    href={l?.href}
                    className="text-sm text-navy-200 hover:text-white transition-colors"
                  >
                    {l?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Hours */}
          <div>
            <h4 className="font-display text-sm font-600 uppercase tracking-widest text-teal-400 mb-4">
              Contact & Hours
            </h4>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-teal-400 mt-0.5 shrink-0" />
                <span className="text-sm text-navy-200">
                  247 Maplewood Drive, Suite 3B<br />San Francisco, CA 94102
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-teal-400 shrink-0" />
                <a href="tel:+15551234567" className="text-sm text-navy-200 hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-teal-400 shrink-0" />
                <a href="mailto:hello@smilecare.clinic" className="text-sm text-navy-200 hover:text-white transition-colors">
                  hello@smilecare.clinic
                </a>
              </li>
            </ul>
            <div className="space-y-1.5">
              {hours?.map((h) => (
                <div key={`hour-${h?.day}`} className="flex items-center gap-2">
                  <Clock size={12} className="text-teal-400 shrink-0" />
                  <span className="text-xs text-navy-300">{h?.day}:</span>
                  <span className="text-xs text-navy-200 font-medium">{h?.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-400">
            © 2026 SmileCare Dental Clinic. All rights reserved.
          </p>
          <p className="text-xs text-navy-400">
            HIPAA Compliant · ADA Accessible · SSL Secured
          </p>
        </div>
      </div>
    </footer>
  );
}