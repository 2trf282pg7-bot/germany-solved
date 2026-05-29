import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'GermanySolved – Navigate German Immigration',
    template: '%s | GermanySolved',
  },
  description:
    'Crowdsourced database of real German immigration experiences. Find wait times, rejection reasons, and tips for every Ausländerbehörde in Germany.',
  keywords: [
    'German visa',
    'Ausländerbehörde',
    'immigration Germany',
    'work visa Germany',
    'Blue Card Germany',
    'residence permit Germany',
    'waiting times immigration',
  ],
  openGraph: {
    title: 'GermanySolved – Navigate German Immigration',
    description:
      'Real experiences from foreigners navigating German immigration bureaucracy. Wait times, outcomes, tips.',
    type: 'website',
    locale: 'en_US',
  },
  verification: {
    google: 'vivVzHAN3WW6Sd8bcxR_7XOhQ9pkZQY2GtCUZkUaTSQ',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,300;0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,300;1,7..72,400;1,7..72,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
