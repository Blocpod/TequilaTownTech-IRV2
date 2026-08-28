import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tequila-town-technology.blocpodcreative.chatgpt.site'),
  title: 'Tequila Town Technology — The Experience Operating System',
  description: 'The technology operating system around Tequila Town: acquisition, guest experience, operations, and executive intelligence.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Tequila Town Technology',
    description: 'The experience is physical. The multiplier is digital.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'T³ — Tequila Town Technology' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tequila Town Technology',
    description: 'The experience is physical. The multiplier is digital.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
