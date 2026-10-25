'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Plus, ZoomIn, MapPin, Upload, RotateCcw, PaintRoller } from 'lucide-react';

interface ProjectImage {
  id: string;
  url: string;
  title: string;
  category: 'full' | 'roof' | 'masonry' | 'user';
  location: string;
  tag: string;
}

const INITIAL_PROJECTS: ProjectImage[] = [
  {
    id: 'h1',
    url: '/images/projects/house-1.png',
    title: '[1-ci Layihənin adı yazılacaq]',
    category: 'full',
    location: '[Ərazi / Ünvan yazılacaq]',
    tag: '[Kateqoriya]',
  },
  {
    id: 'h2',
    url: '/images/projects/house-2.png',
    title: '[2-ci Layihənin adı yazılacaq]',
    category: 'roof',
    location: '[Ərazi / Ünvan yazılacaq]',
    tag: '[Kateqoriya]',
  },
  {
    id: 'h3',
    url: '/images/projects/house-3.png',
    title: '[3-cü Layihənin adı yazılacaq]',
    category: 'masonry',
    location: '[Ərazi / Ünvan yazılacaq]',
    tag: '[Kateqoriya]',
  },
  {
    id: 'h4',
    url: '/images/projects/house-4.png',
    title: '[4-cü Layihənin adı yazılacaq]',
    category: 'full',
    location: '[Ərazi / Ünvan yazılacaq]',
    tag: '[Kateqoriya]',
  },
  {
    id: 'h5',
    url: '/images/projects/house-5.png',
    title: '[5-ci Layihənin adı yazılacaq]',
    category: 'full',
    location: '[Ərazi / Ünvan yazılacaq]',
    tag: '[Kateqoriya]',
  },
  {
    id: 'h6',
    url: '/images/projects/house-6.png',
    title: '[6-cı Layihənin adı yazılacaq]',
    category: 'roof',
    location: '[Ərazi / Ünvan yazılacaq]',
    tag: '[Kateqoriya]',
  },
  {
    id: 'h7',
    url: '/images/projects/house-7.png',
    title: '[7-ci Layihənin adı yazılacaq]',
    category: 'masonry',
    location: '[Ərazi / Ünvan yazılacaq]',
    tag: '[Kateqoriya]',
  },
  {
    id: 'h8',
    url: '/images/projects/house-8.png',
    title: '[8-ci Layihənin adı yazılacaq]',
    category: 'full',
    location: '[Ərazi / Ünvan yazılacaq]',
    tag: '[Kateqoriya]',
  },
];

/**
 * QALEREYA BÖLMƏSİ ANİMASİYASI (Bölmə 2):
 * "Tikinti İskələsi (Lesa) Sökülməsi və Mala/Rulon ilə Yuxarıdan Aşağıya Sürətli Açılış"
 * - İstifadəçi bölməyə çatdıqda və ya filtri dəyişdikdə kartlar 1 -> 2 -> 3 -> 4 ardıcıllığı ilə açılır.
 * - Hər şəkilin üzərindəki dəmir tikinti iskələsi (lesa) və mala xətti sürətlə aşağı çəkilərək hazır evi üzə çıxarır.
 */
export default function ProjectsGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<ProjectImage[]>(INITIAL_PROJECTS);
  const [filter, setFilter] = useState<'all' | 'full' | 'roof' | 'masonry' | 'user'>('all');
  const [selectedImg, setSelectedImg] = useState<ProjectImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLoc, setNewLoc] = useState('');

  // Animasiya vəziyyəti: false = İskələ (Lesa) bağlıdır, true = Yuxarıdan aşağıya sürətlə açılır
  const [revealed, setRevealed] = useState(false);
  const [animCycle, setAnimCycle] = useState(0);
  const hasTriggeredRef = useRef(false);

  const triggerScaffoldReveal = () => {
    setRevealed(false);
    setAnimCycle((prev) => prev + 1);
    requestAnimationFrame(() => {
      setTimeout(() => {
        setRevealed(true);
      }, 60);
    });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          triggerScaffoldReveal();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleFilterChange = (newFilter: 'all' | 'full' | 'roof' | 'masonry' | 'user') => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    triggerScaffoldReveal();
  };

  const handleUserAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);

      const newItem: ProjectImage = {
        id: `usr-${Date.now()}`,
        url,
        title: newTitle.trim() || '[Layihənin adı]',
        category: 'user',
        location: newLoc.trim() || '[Ərazi]',
        tag: '[Yeni Şəkil]',
      };

      setProjects((prev) => [newItem, ...prev]);
      setFilter('all');
      setIsModalOpen(false);
      setNewTitle('');
      setNewLoc('');
      triggerScaffoldReveal();
    }
  };

  const filtered = projects.filter((p) => (filter === 'all' ? true : p.category === filter));

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="px-3 sm:px-8 py-14 lg:py-20 bg-[#F4F0DB] border-b-2 border-[#262626] relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Başlıq və Düymələr */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b-2 border-[#262626] pb-4">
          <div>
            <div className="font-mono text-xs text-[#C85A32] font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
              <PaintRoller className="w-4 h-4" />
              <span>[Qalereya üst etiketi]</span>
            </div>
            <h2 className="text-xl sm:text-4xl font-black text-[#262626] uppercase tracking-tight">
              [Bura Qalereya bölməsinin başlığı yazılacaq]
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={triggerScaffoldReveal}
              className="brick-btn bg-[#FFFFFF] text-[#262626] hover:bg-[#262626] hover:text-[#F4F0DB] px-3.5 py-2.5 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              title="İskələ və Mala açılış animasiyasını təkrar izlə"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Təkrar İzlə</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="brick-btn bg-[#C85A32] text-white hover:bg-[#B84A27] px-4 py-2.5 text-xs font-mono flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Şəkil Əlavə Et</span>
            </button>
          </div>
        </div>

        {/* Kateqoriya Filtrləri */}
        <div className="flex flex-wrap gap-2 mb-6 font-mono text-xs">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 border-2 border-[#262626] font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#262626] text-[#F4F0DB] shadow-[3px_3px_0px_#C85A32]'
                : 'bg-[#FFFFFF] text-[#262626] hover:bg-[#F4F0DB]'
            }`}
          >
            HAMISI ({projects.length})
          </button>
          <button
            onClick={() => handleFilterChange('full')}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 border-2 border-[#262626] font-bold transition-all cursor-pointer ${
              filter === 'full'
                ? 'bg-[#C85A32] text-white shadow-[3px_3px_0px_#262626]'
                : 'bg-[#FFFFFF] text-[#262626] hover:bg-[#F4F0DB]'
            }`}
          >
            [Filtr 1 adı]
          </button>
          <button
            onClick={() => handleFilterChange('roof')}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 border-2 border-[#262626] font-bold transition-all cursor-pointer ${
              filter === 'roof'
                ? 'bg-[#262626] text-[#F4F0DB] shadow-[3px_3px_0px_#C85A32]'
                : 'bg-[#FFFFFF] text-[#262626] hover:bg-[#F4F0DB]'
            }`}
          >
            [Filtr 2 adı]
          </button>
          <button
            onClick={() => handleFilterChange('masonry')}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 border-2 border-[#262626] font-bold transition-all cursor-pointer ${
              filter === 'masonry'
                ? 'bg-[#C85A32] text-white shadow-[3px_3px_0px_#262626]'
                : 'bg-[#FFFFFF] text-[#262626] hover:bg-[#F4F0DB]'
            }`}
          >
            [Filtr 3 adı]
          </button>
        </div>

        {/* =====================================================================
            QALEREYA ŞƏBƏKƏSİ (Mobildə 2 sütun yığcam, PC-də 4 sütun):
            Hər kart 1 -> 2 -> 3 -> 4 ardıcıllığı ilə yuxarıdan aşağıya açılır,
            üzərindəki "Tikinti İskələsi (Lesa) və Mala" pərdəsi sürətlə aşağı enir!
           ===================================================================== */}
        <div
          key={`gallery-grid-${animCycle}`}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5"
        >
          {filtered.map((proj, idx) => {
            // Yuxarıdan aşağıya ardıcıl gecikmə (0ms, 95ms, 190ms, 285ms...)
            const staggerMs = idx * 95;

            return (
              <div
                key={proj.id}
                onClick={() => setSelectedImg(proj)}
                style={{
                  transform: revealed
                    ? 'translate3d(0, 0, 0) scale(1)'
                    : 'translate3d(0, -14px, 0) scale(0.94)',
                  opacity: revealed ? 1 : 0,
                  transition: `transform 280ms cubic-bezier(0.2, 0.95, 0.3, 1.04) ${staggerMs}ms, opacity 200ms ease-out ${staggerMs}ms`,
                }}
                className="brick-card overflow-hidden group cursor-pointer bg-[#FFFFFF] p-1.5 sm:p-2 will-change-transform"
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-[#262626] bg-[#262626]">
                  <img
                    src={proj.url}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/projects/house-1.png';
                    }}
                  />

                  {/* --- TİKİNTİ İSKƏLƏSİ (LESA) VƏ MALA AÇILIŞ PƏRDƏSİ --- */}
                  <div
                    style={{
                      transform: revealed ? 'translate3d(0, 105%, 0)' : 'translate3d(0, 0%, 0)',
                      transition: `transform 460ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerMs + 90}ms`,
                    }}
                    className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between bg-[#262626]/95 will-change-transform"
                  >
                    {/* Üst narıncı mala / suvaq şeridi */}
                    <div className="w-full h-2.5 bg-[#C85A32] border-b-2 border-[#1A1A1A] flex items-center justify-between px-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4F0DB]" />
                      <span className="font-mono text-[8px] font-bold text-white tracking-wider">LESA // 0{idx + 1}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4F0DB]" />
                    </div>

                    {/* Metal İskələ (Lesa) Çarpaz Konstruksiyası SVG */}
                    <svg viewBox="0 0 200 120" className="w-full h-full opacity-80" preserveAspectRatio="none">
                      {/* Üfüqi dəmir borular */}
                      <line x1="0" y1="40" x2="200" y2="40" stroke="#FACC15" strokeWidth="2.5" />
                      <line x1="0" y1="80" x2="200" y2="80" stroke="#FACC15" strokeWidth="2.5" />
                      {/* Şaquli dayaqlar */}
                      <line x1="12" y1="0" x2="12" y2="120" stroke="#94A3B8" strokeWidth="3" />
                      <line x1="100" y1="0" x2="100" y2="120" stroke="#94A3B8" strokeWidth="3" />
                      <line x1="188" y1="0" x2="188" y2="120" stroke="#94A3B8" strokeWidth="3" />
                      {/* Çarpaz X-bərkidicilər */}
                      <line x1="12" y1="0" x2="100" y2="60" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 2" />
                      <line x1="100" y1="0" x2="12" y2="60" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 2" />
                      <line x1="100" y1="0" x2="188" y2="60" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 2" />
                      <line x1="188" y1="0" x2="100" y2="60" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 2" />
                      <line x1="12" y1="60" x2="100" y2="120" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 2" />
                      <line x1="100" y1="60" x2="12" y2="120" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 2" />
                      <line x1="100" y1="60" x2="188" y2="120" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 2" />
                      <line x1="188" y1="60" x2="100" y2="120" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 2" />
                    </svg>

                    {/* Alt sarı-qara tikinti xəbərdarlıq zolağı */}
                    <div
                      className="w-full h-2"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(45deg, #FACC15, #FACC15 6px, #1A1A1A 6px, #1A1A1A 12px)',
                      }}
                    />
                  </div>

                  {/* Şəkil Üstü Nömrə və Kateqoriya Etiketi */}
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-[#262626] text-[#F4F0DB] px-1.5 py-0.5 font-mono text-[8px] sm:text-[9px] font-bold">
                    #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </div>
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-[#C85A32] text-white px-1.5 sm:px-2 py-0.5 font-mono text-[8px] sm:text-[9px] font-bold">
                    {proj.tag}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white text-[#262626] border-2 border-[#262626] flex items-center justify-center font-bold">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="pt-1.5 sm:pt-2 px-0.5 sm:px-1 font-mono">
                  <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-[#C85A32] font-bold mb-0.5 truncate">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                    <span className="truncate">{proj.location}</span>
                  </div>
                  <h3 className="font-bold text-[11px] sm:text-xs text-[#262626] truncate">
                    {proj.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ŞƏKİL BÖYÜK BAXIŞ MODALI */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFFFF] border-4 border-[#262626] max-w-3xl w-full shadow-[8px_8px_0px_#C85A32] relative font-mono"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-[#C85A32] text-white border-2 border-[#262626] flex items-center justify-center hover:bg-[#B84A27] font-bold text-sm"
            >
              ✕
            </button>

            <div className="max-h-[68vh] overflow-hidden bg-black flex items-center justify-center border-b-2 border-[#262626]">
              <img
                src={selectedImg.url}
                alt={selectedImg.title}
                className="max-h-[68vh] w-auto object-contain"
              />
            </div>

            <div className="p-4 bg-[#F4F0DB] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#C85A32] font-bold block">{selectedImg.location}</span>
                <span className="text-base font-bold text-[#262626]">{selectedImg.title}</span>
              </div>
              <span className="px-3 py-1 bg-[#262626] text-white text-xs font-bold">
                {selectedImg.tag}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ŞƏKİL ƏLAVƏ ETMƏ MODALI */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono text-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFFFF] border-4 border-[#262626] p-6 max-w-md w-full shadow-[8px_8px_0px_#C85A32] relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#262626] hover:text-[#C85A32] font-bold text-sm"
            >
              ✕
            </button>

            <h3 className="text-base font-bold text-[#262626] uppercase mb-1">
              [YENİ EV ŞƏKLİ ƏLAVƏ ET]
            </h3>
            <p className="text-[#262626]/70 mb-4 text-[11px]">
              [Bura şəkil yükləmə pəncərəsi izahı yazılacaq]
            </p>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-[#262626] mb-1">LAYİHƏNİN ADI:</label>
                <input
                  type="text"
                  placeholder="[Layihənin adını daxil edin]"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 border-2 border-[#262626] bg-[#F4F0DB] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#262626] mb-1">ƏRAZİ / ÜNVAN:</label>
                <input
                  type="text"
                  placeholder="[Ərazini daxil edin]"
                  value={newLoc}
                  onChange={(e) => setNewLoc(e.target.value)}
                  className="w-full p-2.5 border-2 border-[#262626] bg-[#F4F0DB] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#262626] mb-1">ŞƏKİL SEÇİN:</label>
                <label className="border-2 border-dashed border-[#262626] bg-[#F4F0DB] p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-[#EAE5D8]">
                  <Upload className="w-6 h-6 text-[#C85A32] mb-1" />
                  <span className="font-bold text-[#262626]">Faylı seçin</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUserAdd}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
