import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/layout/MobileStickyBar';

export const metadata: Metadata = {
  title: 'Zəfər Usta | Qəbələ və Ətraf Ərazilərdə Fərdi Ev Tikintisi, Hörgü və Təmir',
  description:
    'Qəbələ və ətraf ərazilərdə sıfırdan fərdi evlərin tikintisi, kubik hörgüsü, suvaq, dam örtüyü, pol-patalok, alçipan, laminat və oboy işləri. Əlaqə: +994 51 548 03 00',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body className="min-h-screen flex flex-col bg-[#F9F7F2] text-[#1F2421]">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
