import type { Metadata } from 'next';
import './globals.css';
import './theaters.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tequila-town-technology.blocpodcreative.chatgpt.site'),
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
  return <html lang="en"><body>{children}</body></html>;
}
