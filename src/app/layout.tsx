import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import AnnouncementBanner from '@/components/AnnouncementBanner';

export const metadata: Metadata = {
  title: 'Believers Bible Baptist Church',
  description:
    'A Bible-centered church family — from the Cross, through the Church, to the world.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AnnouncementBanner />
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
