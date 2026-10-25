import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsGallerySection from '@/components/sections/ProjectsGallerySection';
import TrustAndProcessSection from '@/components/sections/TrustAndProcessSection';
import ContactSection from '@/components/sections/ContactSection';
import ScrollBrickWallBackground from '@/components/canvas/ScrollBrickWallBackground';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full relative">
      {/* Aşağı scroll etdikcə arxa planda solğun şəkildə hörülən kərpic divar animasiyası */}
      <ScrollBrickWallBackground />

      {/* 1. Birbaşa Usta Güvəni və Giriş Bölməsi */}
      <HeroSection />

      {/* 2. Fərdi Ev Tikintisi və Təmir Xidmətləri */}
      <ServicesSection />

      {/* 3. Əvvəl / Sonra Müqayisəli Qalereya */}
      <ProjectsGallerySection />

      {/* 4. 4 Addımlı İş Prosesi və Müştəri Rəyləri */}
      <TrustAndProcessSection />

      {/* 5. WhatsApp ilə Sürətli Qiymət Sorğusu və Birbaşa Əlaqə */}
      <ContactSection />
    </div>
  );
}
