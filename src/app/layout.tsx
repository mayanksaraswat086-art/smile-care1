import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'SmileCare — Modern Dental Care You Can Trust',
  description: 'SmileCare Dental Clinic offers comprehensive dental services — from routine checkups to advanced implants — with easy online booking and patient records access.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    title: 'SmileCare — Modern Dental Care You Can Trust',
    description: 'Book your dental appointment online. Expert dentists, 12+ services, same-day emergency slots available.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}
</body>
    </html>
  );
}