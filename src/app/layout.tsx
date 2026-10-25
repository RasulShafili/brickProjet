import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/layout/MobileStickyBar';

export const metadata: Metadata = {
  title: 'Usta & Mühəndis Briqadası | Fərdi Ev Tikintisi, Kərpic Hörgü və Dam İşləri',
  description:
    'Bakı və Abşeronda sıfırdan fərdi evlərin tikintisi, dəmir-beton bünövrə, 380mm qoşa kərpic və daş hörgü, mansard dam karkasları və monolit pilləkənlər. 18 illik təcrübə, 10 il rəsmi zəmanət.',
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
