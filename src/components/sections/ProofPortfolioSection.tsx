'use client';

import React, { useState } from 'react';
import { MapPin, Calendar, CheckCircle2, ArrowRight, Layers, Sliders } from 'lucide-react';

const PORTFOLIO_PROJECTS = [
  {
    id: 'merdekan-villa',
    title: 'Mərdəkan Müasir Fərdi Yaşayış Villası',
    category: 'FULL_HOUSE',
    location: 'Mərdəkan, Bakı',
    area: '240 m²',
    duration: '5.5 ay',
    materials: 'Qoşa qırmızı kərpic, B25 monolit beton, Alman metal kirəmit',
    challenge: 'Yüksək qrunt suyu səviyyəsi; 2 qat polimer membranlı xüsusi kesson tipli bünövrə quruldu.',
    status: 'TƏHVİL VERİLİB // 2025',
    beforeTitle: 'BƏZƏKSİZ STRUKTUR: Çılpaq kərpic tikişləri və monolit kəmər',
    afterTitle: 'TAM TƏHVİL: Fasad, izolyasiya və yaşayışa hazır vəziyyət',
  },
  {
    id: 'shuvelan-roof',
    title: 'Şüvəlan İkimərtəbəli Mansard Dam Ferması',
    category: 'STRUCTURAL_PARTS',
    location: 'Şüvəlan Qəsəbəsi',
    area: '160 m² dam sahəsi',
    duration: '18 gün',
    materials: '50x200mm antiseptik şam, Tyvek membran, Ral 7024 metal kirəmit',
    challenge: 'Sahil zonası güclü dəniz küləyi; əlavə köndələn bəndlər və polad bərkidicilər hesablandı.',
    status: 'TƏHVİL VERİLİB // 2025',
    beforeTitle: 'STRUKTUR SÜBUT: Stropil fermalarının həndəsi üçbucağı',
    afterTitle: 'TAM TƏHVİL: İzolyasiya edilmiş isti mansard otaqları',
  },
  {
    id: 'bilgeh-foundation',
    title: 'Bilgəh Pilləli Mailli Qayalıq Bünövrəsi',
    category: 'STRUCTURAL_PARTS',
    location: 'Bilgəh, Bağlar massivi',
    area: '180 m² bünövrə',
    duration: '22 gün',
    materials: 'B25 M350 beton, Ø16mm A500C toxunma karkas',
    challenge: '12 dərəcəlik təbii yamac; torpaq sürüşməsinə qarşı pilləli lentvari dayaq bünövrəsi töküldü.',
    status: 'TƏHVİL VERİLİB // 2024',
    beforeTitle: 'STRUKTUR SÜBUT: 16mm armaturların sıx toxunma addımı',
    afterTitle: 'TAM TƏHVİL: Kürsülük və üzərində ucaldılmış divarlar',
  },
  {
    id: 'novxani-extension',
    title: 'Novxanı Mövcud Evə Monolit Qonaq Otağı Artırması',
    category: 'FULL_HOUSE',
    location: 'Novxanı Bağları',
    area: '75 m² artırma + Terras',
    duration: '45 gün',
    materials: '380mm kərpic, kimyəvi calaq ankerləri, panoramik tağlar',
    challenge: 'Köhnə 15 illik evə sıfır çatla birləşmə; deformasiya tikişi (dilatasion şov) tətbiq edildi.',
    status: 'TƏHVİL VERİLİB // 2024',
    beforeTitle: 'STRUKTUR SÜBUT: Birləşmə ankerlərinin dərin quraşdırılması',
    afterTitle: 'TAM TƏHVİL: Əsas evlə tam harmoniyada fasad',
  },
];

export default function ProofPortfolioSection() {
  const [filter, setFilter] = useState<'ALL' | 'FULL_HOUSE' | 'STRUCTURAL_PARTS'>('ALL');
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    'merdekan-villa': 50,
    'shuvelan-roof': 50,
    'bilgeh-foundation': 50,
    'novxani-extension': 50,
  });

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (filter === 'ALL') return true;
    return p.category === filter;
  });

  const handleSliderChange = (id: string, val: number) => {
    setSliderValues((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <section id="portfolio" className="px-[4%] py-20 border-b border-graphiteText bg-stonePaper">
      <div className="max-w-7xl mx-auto">
        
        {/* Bölmə Başlığı & Kateqoriya Filtrləri */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-graphiteText pb-6">
          <div>
            <div className="font-mono text-xs text-terracotta font-bold tracking-widest uppercase mb-2">
              [MODUL 05 // STRUKTUR SÜBUT VƏ PORTFEL]
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-graphiteText">
              Bəzəksiz Struktur Sübut: Divarın Arxası
            </h2>
          </div>

          {/* Filtrləmə Düymələri */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 border transition-colors ${
                filter === 'ALL'
                  ? 'bg-graphiteText text-stonePaper border-graphiteText font-bold shadow-brutalSm'
                  : 'bg-stonePaper text-graphiteText border-graphiteText hover:bg-stonePaperLight'
              }`}
            >
              Bütün İşlər ({PORTFOLIO_PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter('FULL_HOUSE')}
              className={`px-3 py-1.5 border transition-colors ${
                filter === 'FULL_HOUSE'
                  ? 'bg-terracotta text-stonePaper border-graphiteText font-bold shadow-brutalSm'
                  : 'bg-stonePaper text-graphiteText border-graphiteText hover:bg-stonePaperLight'
              }`}
            >
              Tam Evlər
            </button>
            <button
              onClick={() => setFilter('STRUCTURAL_PARTS')}
              className={`px-3 py-1.5 border transition-colors ${
                filter === 'STRUCTURAL_PARTS'
                  ? 'bg-blueprint text-stonePaper border-graphiteText font-bold shadow-brutalSm'
                  : 'bg-stonePaper text-graphiteText border-graphiteText hover:bg-stonePaperLight'
              }`}
            >
              Konstruksiya & Dam
            </button>
          </div>
        </div>

        {/* Layihələr Şəbəkəsi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const sliderVal = sliderValues[project.id] ?? 50;

            return (
              <div
                key={project.id}
                className="brutal-card bg-stonePaperLight p-6 flex flex-col justify-between"
              >
                {/* Üst İnfo */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-3 border-b border-graphiteText/20 pb-2">
                    <span className="flex items-center gap-1.5 font-bold text-graphiteText">
                      <MapPin className="w-3.5 h-3.5 text-terracotta" />
                      <span>{project.location}</span>
                    </span>
                    <span className="px-2 py-0.5 bg-forest text-stonePaper text-[10px] font-bold">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-graphiteText mb-4">
                    {project.title}
                  </h3>

                  {/* İnteraktiv Müqayisə Slayderi (Before / During / After) */}
                  <div className="relative w-full h-56 bg-obsidianCad border border-graphiteText overflow-hidden mb-4 select-none">
                    
                    {/* AFTER TƏBƏQƏSİ (Sağ fon) */}
                    <div className="absolute inset-0 bg-[#e5dfce] p-4 flex flex-col justify-between text-graphiteText">
                      <div className="font-mono text-xs font-bold text-forest bg-white/70 px-2 py-1 w-fit border border-graphiteText/20">
                        [TAM TƏHVİL EDİLMİŞ NƏTİCƏ]
                      </div>
                      <div className="text-xs font-mono text-graphiteText/90 bg-white/80 p-2 border border-graphiteText/20">
                        {project.afterTitle}
                      </div>
                    </div>

                    {/* BEFORE TƏBƏQƏSİ (Sol qat - çılpaq struktur) */}
                    <div
                      className="absolute inset-y-0 left-0 bg-[#3a2f28] p-4 flex flex-col justify-between text-stonePaper border-r-2 border-terracotta overflow-hidden"
                      style={{ width: `${sliderVal}%` }}
                    >
                      <div className="font-mono text-xs font-bold text-terracottaLight bg-black/60 px-2 py-1 w-fit whitespace-nowrap border border-white/20">
                        [BƏZƏKSİZ STRUKTUR KEYFİYYƏTİ]
                      </div>
                      <div className="text-xs font-mono text-stonePaper/90 bg-black/60 p-2 border border-white/20 whitespace-normal min-w-[240px]">
                        {project.beforeTitle}
                      </div>
                    </div>

                    {/* Slayder Ayırıcı Xətti & Tutacaq */}
                    <div
                      className="absolute top-0 bottom-0 pointer-events-none flex items-center justify-center -translate-x-1/2"
                      style={{ left: `${sliderVal}%` }}
                    >
                      <div className="w-7 h-7 bg-terracotta text-white border border-graphiteText rounded-full flex items-center justify-center shadow-lg text-xs font-bold font-mono">
                        ◄►
                      </div>
                    </div>

                    {/* Əsl Sürgü Inputu */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderVal}
                      onChange={(e) => handleSliderChange(project.id, parseInt(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                      aria-label="Müqayisə sürgüsü"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-graphiteText/70 mb-4 px-1">
                    <span>◄ Suvaqsız Struktur (Kərpic/Beton)</span>
                    <span>Hazır Nəticə ►</span>
                  </div>

                  {/* Texniki Göstəricilər */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4 bg-stonePaper p-3 border border-graphiteText/20">
                    <div>
                      <span className="text-graphiteText/60 block text-[10px]">SAHƏ:</span>
                      <strong className="text-graphiteText">{project.area}</strong>
                    </div>
                    <div>
                      <span className="text-graphiteText/60 block text-[10px]">MÜDDƏT:</span>
                      <strong className="text-graphiteText">{project.duration}</strong>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-graphiteText/10">
                      <span className="text-graphiteText/60 block text-[10px]">İSTİFADƏ OLUNAN MATERİAL:</span>
                      <span className="text-graphiteText text-[11px]">{project.materials}</span>
                    </div>
                  </div>

                  {/* Həll Edilmiş Mühəndis Çətinliyi */}
                  <div className="text-xs font-mono bg-amber-500/10 border-l-2 border-amber-600 p-2.5 mb-6 text-graphiteText/90">
                    <strong>Həll Edilmiş Mühəndis Çətinliyi:</strong> {project.challenge}
                  </div>
                </div>

                {/* Alt Hissə: Bənzər Layihə İstəyirəm */}
                <div className="pt-3 border-t border-graphiteText/20 flex items-center justify-between">
                  <span className="font-mono text-xs text-graphiteText/70">
                    Bu layihənin çertyojları arxivdədir
                  </span>
                  <a
                    href="#lead"
                    className="brutal-btn bg-stonePaper px-3.5 py-1.5 text-xs text-graphiteText hover:bg-terracotta hover:text-white flex items-center gap-1.5"
                  >
                    <span>Bənzər Layihə Sifariş Et</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
