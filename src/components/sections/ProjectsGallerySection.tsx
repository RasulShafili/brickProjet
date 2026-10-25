'use client';

import React, { useState } from 'react';
import { MapPin, Clock, Layers, MoveHorizontal, Video, ZoomIn, CheckCircle2 } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'all' | 'before-after' | 'full' | 'roof' | 'masonry';
  categoryLabel: string;
  location: string;
  duration: string;
  materialSpec: string;
  problemAndSolution: string;
  isBeforeAfter?: boolean;
  beforeLabel?: string;
  afterLabel?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: '[1-ci Layihə — Məs: 2 Mərtəbəli Fərdi Evin Hörgü və Fasad Təmiri]',
    category: 'before-after',
    categoryLabel: 'Əvvəl / Sonra',
    location: '[Ərazi / Qəsəbə adı yazılacaq]',
    duration: '[Məs: 18 Gün]',
    materialSpec: '[Məs: Qoşa Kubik + Mayak Suvaq]',
    problemAndSolution:
      'Əvvəl: Yarımçıq qalmış və əyri hörülmüş divarlar. Görülən iş: Divarlar lazer tərəzi ilə düzəldildi, suvaq və fasad tam təhvil verildi.',
    isBeforeAfter: true,
    beforeLabel: 'ƏVVƏL (Qaba / Köhnə Vəziyyəti)',
    afterLabel: 'SONRA (Tam Hazır Təhvil)',
  },
  {
    id: 'p2',
    title: '[2-ci Layihə — Məs: Köhnə Dam Örtüyünün Sökülüb Çerepitsa İlə Yenilənməsi]',
    category: 'before-after',
    categoryLabel: 'Əvvəl / Sonra',
    location: '[Ərazi / Qəsəbə adı yazılacaq]',
    duration: '[Məs: 9 Gün]',
    materialSpec: '[Məs: Qalın Profnastil + İstilik İzolyasiyası]',
    problemAndSolution:
      'Əvvəl: Yağış zamanı su axıdan köhnə şifer dam. Görülən iş: Karkas gücləndirildi, izolyasiya döşəndi və yeni dam örtüyü vuruldu.',
    isBeforeAfter: true,
    beforeLabel: 'ƏVVƏL (Köhnə Sızdıran Dam)',
    afterLabel: 'SONRA (Yeni İzolyasiyalı Dam)',
  },
  {
    id: 'p3',
    title: '[3-cü Layihə — Məs: Həyət Evi Daxili Təmir və Hamam Kafel-Metlax İşi]',
    category: 'before-after',
    categoryLabel: 'Əvvəl / Sonra',
    location: '[Ərazi / Qəsəbə adı yazılacaq]',
    duration: '[Məs: 12 Gün]',
    materialSpec: '[Məs: Hidroizolyasiya + Kermoqranit]',
    problemAndSolution:
      'Əvvəl: Təmirsiz beton divarlar və köhnə borular. Görülən iş: Suvaq, styajka, hidroizolyasiya və kafel-metlax tam dəqiqliklə döşəndi.',
    isBeforeAfter: true,
    beforeLabel: 'ƏVVƏL (Təmirsiz Vəziyyət)',
    afterLabel: 'SONRA (Tam Təmirli Vəziyyət)',
  },
  {
    id: 'p4',
    title: '[4-cü Layihə — Məs: Sıfırdan 1 Mərtəbəli Kürsülü Həyət Evinin Tikintisi]',
    category: 'full',
    categoryLabel: 'Sıfırdan Ev',
    location: '[Ərazi / Qəsəbə adı yazılacaq]',
    duration: '[Məs: 45 Gün]',
    materialSpec: '[Məs: M-400 Beton Bünövrə + Qoşa Daş]',
    problemAndSolution:
      'Boş torpaq sahəsində 6 daş kürsülü, 4 otaqlı həyət evinin bünövrədən dama qədər tam tikintisi və suvağı.',
    isBeforeAfter: false,
  },
  {
    id: 'p5',
    title: '[5-ci Layihə — Məs: Həyətyanı Daş Hasar və Darvaza Sütunlarının Hörgüsü]',
    category: 'masonry',
    categoryLabel: 'Hörgü və Suvaq',
    location: '[Ərazi / Qəsəbə adı yazılacaq]',
    duration: '[Məs: 10 Gün]',
    materialSpec: '[Məs: Miysar Daşı + Beton Kəmər]',
    problemAndSolution:
      '6 sot həyətin perimetri boyu lentvari bünövrə töküldü, ip və tərəzi ilə düz daş hasar hörülüb suvaqlandı.',
    isBeforeAfter: false,
  },
  {
    id: 'p6',
    title: '[6-cı Layihə — Məs: Mansard Tipli Dam Konstruksiyasının Yığılması]',
    category: 'roof',
    categoryLabel: 'Dam Örtüyü',
    location: '[Ərazi / Qəsəbə adı yazılacaq]',
    duration: '[Məs: 11 Gün]',
    materialSpec: '[Məs: Quru Şam Taxtası + Metal Çerepitsa]',
    problemAndSolution:
      'Küləyə və yağışa davamlı möhkəm taxta karkas yığıldı, su novçaları və karnizlər tam quraşdırıldı.',
    isBeforeAfter: false,
  },
];

/**
 * İnteraktiv Əvvəl / Sonra (Before / After) Sürüşdürmə Kartı:
 * İstifadəçi barmağı və ya siçan ilə ortadakı çubuğu sağa-sola sürüşdürərək
 * təmirdən əvvəlki və sonrakı vəziyyəti müqayisə edir.
 */
function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
}: {
  beforeLabel: string;
  afterLabel: string;
}) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-[#262626] bg-[#262626] select-none rounded-[2px]">
      
      {/* SAĞ TƏRƏF (SONRA — Tam Hazır Ev Şəkli Yeri) */}
      <div className="absolute inset-0 bg-[#E6EFE9] flex flex-col items-center justify-center p-4 text-center">
        <span className="px-2.5 py-1 bg-emerald-800 text-white text-[10px] font-bold rounded-[2px] mb-2">
          {afterLabel}
        </span>
        <div className="text-xs sm:text-sm font-black text-[#1F2421] max-w-[200px]">
          [Bura Təmirdən / Tikintidən SONRAKI Hazır Şəkil Qoyulacaq]
        </div>
        <span className="text-[10px] text-emerald-900 font-bold mt-1">
          ✓ Tərəzi dəqiqliyi ilə təmiz təhvil
        </span>
      </div>

      {/* SOL TƏRƏF (ƏVVƏL — Köhnə / Qaba İnşaat Şəkli Yeri) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden bg-[#E5DEC9] border-r-2 border-[#262626]"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="w-[320px] sm:w-[380px] h-full flex flex-col items-center justify-center p-4 text-center">
          <span className="px-2.5 py-1 bg-[#262626] text-[#F4F0DB] text-[10px] font-bold rounded-[2px] mb-2">
            {beforeLabel}
          </span>
          <div className="text-xs sm:text-sm font-black text-[#262626] max-w-[200px]">
            [Bura İşdən ƏVVƏLKİ (Köhnə / Qaba İnşaat) Şəkil Qoyulacaq]
          </div>
          <span className="text-[10px] text-[#262626]/70 font-bold mt-1">
            Başlanğıc vəziyyət
          </span>
        </div>
      </div>

      {/* Sürüşdürmə Xətti və Mərkəzi Düymə */}
      <div
        className="absolute inset-y-0 w-0.5 bg-[#C85A32] pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#C85A32] text-white border-2 border-[#262626] shadow-[2px_2px_0px_#262626] flex items-center justify-center">
          <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>

      {/* Toxunma və Sürüşdürmə Inputu (Mobil barmaq üçün 100% rahat) */}
      <input
        type="range"
        min={10}
        max={90}
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        aria-label="Əvvəl və Sonra müqayisə sürüşdürücüsü"
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />

      {/* Alt İpucu Zolağı */}
      <div className="absolute bottom-2 left-2 right-2 pointer-events-none flex items-center justify-between text-[10px] font-bold">
        <span className="bg-[#262626]/90 text-white px-2 py-0.5 rounded-[2px]">◀ ƏVVƏL</span>
        <span className="bg-[#FFFFFF]/95 text-[#262626] px-2 py-0.5 border border-[#262626] rounded-[2px]">
          Sağa-sola sürüşdürün
        </span>
        <span className="bg-emerald-800/95 text-white px-2 py-0.5 rounded-[2px]">SONRA ▶</span>
      </div>
    </div>
  );
}

export default function ProjectsGallerySection() {
  const [filter, setFilter] = useState<'all' | 'before-after' | 'full' | 'roof' | 'masonry'>('all');
  const [selectedProj, setSelectedProj] = useState<ProjectItem | null>(null);

  const filtered = PROJECTS.filter((p) => (filter === 'all' ? true : p.category === filter));

  return (
    <section
      id="gallery"
      className="px-4 sm:px-8 py-14 lg:py-20 bg-[#F4F0DB] border-b-2 border-[#262626] relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Başlıq (Admin/Test düymələri tamamilə təmizləndi) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b-2 border-[#262626] pb-5">
          <div>
            <div className="text-xs text-[#C85A32] font-extrabold uppercase tracking-wider mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>REAL ŞANTİYE SÜBUTLARI VƏ NƏTİCƏLƏR</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#262626] tracking-tight">
              Görülən İşlər: Əvvəl və Sonra Müqayisəsi
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#262626]/85 max-w-md font-medium">
            Hər bir layihənin başlanğıc vəziyyəti, istifadə olunan material standartı və neçə günə təhvil verildiyi şəffaf şəkildə qeyd olunub.
          </p>
        </div>

        {/* Kateqoriya Filtrləri (Minimum 44px mobil toxunma hündürlüyü) */}
        <div className="flex flex-wrap gap-2 mb-8 text-xs">
          {[
            { id: 'all', label: `Bütün İşlər (${PROJECTS.length})` },
            { id: 'before-after', label: 'Əvvəl / Sonra Müqayisə (3)' },
            { id: 'full', label: 'Sıfırdan Ev Tikintisi' },
            { id: 'masonry', label: 'Hörgü və Suvaq' },
            { id: 'roof', label: 'Dam Örtükləri' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`min-h-[42px] px-4 py-2 border-2 border-[#262626] rounded-[4px] font-bold transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#C85A32] text-white shadow-[3px_3px_0px_#262626]'
                  : 'bg-[#FFFFFF] text-[#262626] hover:bg-[#EAE5D0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Qalereya Şəbəkəsi: Əvvəl/Sonra Sürüşdürmə Kartları + Konkret Layihə Künyələri */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="brick-card bg-[#FFFFFF] p-3.5 sm:p-4 flex flex-col justify-between"
            >
              <div>
                {/* Görsəl Hissə: Əvvəl/Sonra Sürüşdürücüsü və ya Real Şantiye Foto Çərçivəsi */}
                {proj.isBeforeAfter ? (
                  <BeforeAfterSlider
                    beforeLabel={proj.beforeLabel || 'ƏVVƏL'}
                    afterLabel={proj.afterLabel || 'SONRA'}
                  />
                ) : (
                  <div
                    onClick={() => setSelectedProj(proj)}
                    className="relative aspect-[4/3] overflow-hidden border-2 border-[#262626] bg-[#EAE5D0] flex flex-col items-center justify-center p-5 text-center cursor-pointer group rounded-[2px]"
                  >
                    <span className="px-2.5 py-1 bg-[#262626] text-[#F4F0DB] text-[10px] font-bold rounded-[2px] mb-2">
                      {proj.categoryLabel}
                    </span>
                    <div className="text-xs sm:text-sm font-black text-[#262626] max-w-[220px]">
                      [Bura Real Şantiye / Tamamlanmış Ev Fotoşəkli Qoyulacaq (WebP)]
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#262626] text-[11px] font-bold text-[#262626] group-hover:bg-[#C85A32] group-hover:text-white transition-colors">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Böyüt və Detallara Bax</span>
                    </div>
                  </div>
                )}

                {/* Konkret Layihə Künyəsi (Ərazi, Müddət, Material) */}
                <div className="mt-3.5 space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F4F0DB] border border-[#262626]/40 text-[#262626] rounded-[2px]">
                      <MapPin className="w-3 h-3 text-[#C85A32]" />
                      {proj.location}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F4F0DB] border border-[#262626]/40 text-[#262626] rounded-[2px]">
                      <Clock className="w-3 h-3 text-[#C85A32]" />
                      Müddət: {proj.duration}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-[#262626] leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-[#262626]/85 leading-relaxed">
                    {proj.problemAndSolution}
                  </p>
                </div>
              </div>

              {/* Alt Material Standartı Zolağı */}
              <div className="mt-4 pt-2.5 border-t border-[#262626]/15 flex items-center justify-between text-[11px] font-bold text-[#262626]">
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Standart: {proj.materialSpec}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Qısa Şantiye Videoları Bloku (Ustanın Öz Səsi İlə 15-20 Saniyəlik Real İş Sübutu) */}
        <div className="mt-10 bg-[#FFFFFF] border-2 border-[#262626] shadow-[4px_4px_0px_#262626] rounded-[4px] p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 bg-[#C85A32] text-white border-2 border-[#262626] flex items-center justify-center rounded-[4px] shrink-0 shadow-[2px_2px_0px_#262626]">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-[#C85A32] uppercase tracking-wider block">
                  CANLI ŞANTİYE VİDEOLARI (15–20 SANİYƏ)
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#262626]">
                  [Bura Ustanın Öz Səsi İlə Çəkdiyi Qısa İş Videoları Əlavə Ediləcək]
                </h3>
                <p className="text-xs sm:text-sm text-[#262626]/80 mt-0.5">
                  Hörgü tərəzisinin düzgünlüyünü, suvağın hamarlığını və dam izolyasiyasını birbaşa şantiyedən qısa videolarla izləyin.
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="brick-btn min-h-[44px] bg-[#262626] text-[#F4F0DB] hover:bg-[#C85A32] hover:text-white px-5 py-2.5 text-xs font-bold shrink-0"
            >
              WhatsApp-da Videoları İstə
            </a>
          </div>
        </div>

      </div>

      {/* ŞƏKİL BÖYÜK BAXIŞ MODALI (LIGHTBOX) */}
      {selectedProj && (
        <div
          onClick={() => setSelectedProj(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFFFF] border-4 border-[#262626] max-w-xl w-full shadow-[8px_8px_0px_#C85A32] relative p-5 rounded-[4px]"
          >
            <button
              onClick={() => setSelectedProj(null)}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-[#C85A32] text-white border-2 border-[#262626] flex items-center justify-center hover:bg-[#B84A27] font-bold text-sm cursor-pointer rounded-[4px]"
            >
              ✕
            </button>

            <div className="aspect-[4/3] bg-[#EAE5D0] border-2 border-[#262626] flex items-center justify-center p-6 text-center mb-4">
              <div className="font-black text-sm sm:text-base text-[#262626]">
                {selectedProj.title} — [Real Böyük Fotoşəkil Yeri]
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-[#C85A32]">
                <span>{selectedProj.location}</span>
                <span>Müddət: {selectedProj.duration}</span>
              </div>
              <p className="text-[#262626] font-medium leading-relaxed">
                {selectedProj.problemAndSolution}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
