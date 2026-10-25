import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsGallerySection from '@/components/sections/ProjectsGallerySection';
import TrustAndProcessSection from '@/components/sections/TrustAndProcessSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full relative">
      {/* 1. Birbaşa Usta Güvəni və Giriş Bölməsi */}
      <HeroSection />

      {/* 2. Fərdi Ev Tikintisi və Təmir Xidmətləri (6 Aydın İstiqamət) */}
      <ServicesSection />

      {/* 3. Əvvəl / Sonra Müqayisəli Qalereya və Real Şantiye Sübutları */}
      <ProjectsGallerySection />

      {/* 4. 4 Addımlı Şəffaf İş Prosesi, Müştəri Rəyləri və Tez-tez Verilən Suallar */}
      <TrustAndProcessSection />

      {/* 5. WhatsApp ilə 3 Addımda Sürətli Qiymət Al və Birbaşa Əlaqə */}
      <ContactSection />
    </div>
  );
}
