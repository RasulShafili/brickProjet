import type { Metadata, Viewport } from 'next';
import { Montserrat, Rubik } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/layout/MobileStickyBar';

// Memarlıq və Tabela Başlıq Şrifti (Azərbaycan hərfləri — ə, Ə, ğ, ş, ç, ö, ü tam dəstəklənir)
const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

// Kərpic həndəsəsinə uyğun qalın və oxunaqlı əsas mətn şrifti
const rubik = Rubik({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

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
    <html lang="az" className={`${montserrat.variable} ${rubik.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F9F7F2] text-[#1A110B]">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
