import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ReservationModal } from '@/components/reservation/ReservationModal';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Anti-Gravity — The Royal Fire | Luxury Heritage Fine Dining',
  description:
    'Royal culinary heritage meets experimental digital theatre. Experience 36-hour slow embers, Dum Pukht clay cooking, and interactive culinary craft.',
  keywords: [
    'Fine Dining',
    'Luxury Restaurant',
    'Royal Indian Cuisine',
    'Dum Pukht',
    'Awadhi Heritage',
    'Tandoor',
    'Chef Table',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-warm-ivory min-h-screen flex flex-col font-sans selection:bg-champagne-gold/30 selection:text-warm-ivory">
        {/* Global Floating Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Live Ember Footer */}
        <Footer />

        {/* Global In-Place Reservation Modal */}
        <ReservationModal />
      </body>
    </html>
  );
}
