import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Styles & Providers
import '../styles/globals.css';

import { GlobalProvider } from './GlobalProvider';
import { ToastProvider } from '../context/ToastContext';

// Components
import AffiliateTracker from '../components/AffiliateTracker';

// ==========================================
// VIEWPORT CONFIGURATION (App-like feel)
// ==========================================
export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, 
};

// ==========================================
// METADATA & SEO CONFIGURATION
// ==========================================
export const metadata: Metadata = {
  title: {
    default: 'Essential | Fine Horology & Luxury Timepieces',
    template: '%s | Essential Fine Horology'
  },
  description: 'The ultimate digital vault for investment-grade luxury timepieces. Curated masterpieces for the modern horologist.',
  keywords: ['luxury watches', 'rolex', 'patek philippe', 'fine horology', 'investment watches', 'essential rush'],
  authors: [{ name: 'Essential Rush' }],
  creator: 'Essential Rush',
  publisher: 'Essential Rush',
  manifest: '/manifest.json',
  applicationName: 'Essential Rush',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Essential',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://essentialrush.com',
    siteName: 'Essential Fine Horology',
    title: 'Essential | Fine Horology',
    description: 'The ultimate digital vault for investment-grade luxury timepieces.',
    images: [
      {
        url: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/essential/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Essential Fine Horology',
      },
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Essential | Fine Horology',
    description: 'The ultimate digital vault for investment-grade luxury timepieces.',
    images: ['https://res.cloudinary.com/your-cloud-name/image/upload/v1/essential/og-default.jpg'],
    creator: '@essentialrush',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ==========================================
// ROOT LAYOUT
// ==========================================
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden">
        
        {/* 🚀 INVISIBLE LINK TRACKER */}
        <Suspense fallback={null}>
          <AffiliateTracker />
        </Suspense>

        {/* 🚀 GLOBAL STATE PROVIDERS */}
        <GlobalProvider>
          <ToastProvider>
            <main>
              {children}
            </main>
          </ToastProvider>
        </GlobalProvider>

        {/* 🚀 VERCEL ANALYTICS */}
        <Analytics />
        
      </body>
    </html>
  );
}