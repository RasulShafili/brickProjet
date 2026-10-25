import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsGallerySection from '@/components/sections/ProjectsGallerySection';
import WorkProcessSection from '@/components/sections/WorkProcessSection';
import ContactSection from '@/components/sections/ContactSection';
import FloatingBricksBackground from '@/components/canvas/FloatingBricksBackground';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full relative">
      {/* Kənarlarda süzülən kərpic blokları, lazer şüası və tikinti koordinatları animasiyası */}
      <FloatingBricksBackground />

      {/* 1. Kəskin Kərpic Hero Bölməsi */}
      <HeroSection />

      {/* 2. Nə Edirik? Tikinti Xidmətlərimiz */}
      <ServicesSection />

      {/* 3. Tikdiyimiz Evlərin Şəkilləri (Fotoqalereya & Şəkil Əlavə Etmə) */}
      <ProjectsGallerySection />

      {/* 4. İşi Necə Təşkil Edirik? (Standartlar və Addımlar) */}
      <WorkProcessSection />

      {/* 5. Usta ilə Birbaşa Əlaqə */}
      <ContactSection />
    </div>
  );
}
