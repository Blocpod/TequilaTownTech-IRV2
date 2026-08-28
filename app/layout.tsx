import type { Metadata } from 'next';
import './globals.css';
import './theaters.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Tequila Town Tech — The Experience Operating System',
  description: 'Four smart tools that help Tequila Town find customers, guide guests, get work done, and make better decisions.',
  icons: { icon: '/brand/favicon.png', apple: '/brand/apple-touch-icon.png' },
  openGraph: {
    title: 'Tequila Town Tech',
    description: 'Four smart tools. One system that gets better every day.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Tequila Town Tech — The Experience Operating System' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tequila Town Tech',
    description: 'Four smart tools. One system that gets better every day.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preload" href="/fonts/tequila-town.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/></head><body>{children}</body></html>;
}
