'use client';

import React, { useState } from 'react';
import { Plus, X, ZoomIn, MapPin, Upload, Image as ImageIcon } from 'lucide-react';

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
    title: 'Mərdəkan Müasir Bağ Evi',
    category: 'full',
    location: 'Mərdəkan Qəsəbəsi',
    tag: 'AÇAR TƏHVİLİ',
  },
  {
    id: 'h2',
    url: '/images/projects/house-2.png',
    title: 'Şüvəlan Mansard Villa',
    category: 'roof',
    location: 'Şüvəlan Bağları',
    tag: 'DAM FERMALARI',
  },
  {
    id: 'h3',
    url: '/images/projects/house-3.png',
    title: 'Bilgəh Monolit Kürsülü Ev',
    category: 'masonry',
    location: 'Bilgəh Ərazisi',
    tag: 'B25 BÜNÖVRƏ',
  },
  {
    id: 'h4',
    url: '/images/projects/house-4.png',
    title: 'Novxanı Həyət Evi & Terras',
    category: 'full',
    location: 'Novxanı Bağları',
    tag: 'QOŞA KƏRPİC',
  },
  {
    id: 'h5',
    url: '/images/projects/house-5.png',
    title: 'Badamdar Fərdi Yaşayış Evi',
    category: 'full',
    location: 'Badamdar Qəsəbəsi',
    tag: 'KƏRPİC TAĞLAR',
  },
  {
    id: 'h6',
    url: '/images/projects/house-6.png',
    title: 'Xırdalan Otaq & Dam Artırması',
    category: 'roof',
    location: 'Xırdalan Ərazisi',
    tag: 'ÇATSIZ CALAQ',
  },
  {
    id: 'h7',
    url: '/images/projects/house-7.png',
    title: 'Masazır Daşıyıcı Termos Hörgü',
    category: 'masonry',
    location: 'Masazır Bağları',
    tag: '380MM HÖRGÜ',
  },
  {
    id: 'h8',
    url: '/images/projects/house-8.png',
    title: 'Mərdəkan Qonaq Evi & Pilləkən',
    category: 'full',
    location: 'Mərdəkan Ərazisi',
    tag: 'MONOLİT PİLLƏ',
  },
];

export default function ProjectsGallerySection() {
  const [projects, setProjects] = useState<ProjectImage[]>(INITIAL_PROJECTS);
  const [filter, setFilter] = useState<'all' | 'full' | 'roof' | 'masonry' | 'user'>('all');
  const [selectedImg, setSelectedImg] = useState<ProjectImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLoc, setNewLoc] = useState('Bakı');

  const handleUserAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);

      const newItem: ProjectImage = {
        id: `usr-${Date.now()}`,
        url,
        title: newTitle.trim() || 'Yeni Əlavə Edilmiş Ev',
        category: 'user',
        location: newLoc.trim() || 'Bakı',
        tag: 'YENİ LAYİHƏ',
      };

      setProjects((prev) => [newItem, ...prev]);
      setFilter('all');
      setIsModalOpen(false);
      setNewTitle('');
    }
  };

  const filtered = projects.filter((p) => (filter === 'all' ? true : p.category === filter));

  return (
    <section id="gallery" className="px-4 sm:px-8 py-16 bg-[#F4F0DB] border-b-2 border-[#262626] relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Başlıq və Əlavə Et Düyməsi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b-2 border-[#262626] pb-5">
          <div>
            <div className="font-mono text-xs text-[#C85A32] font-bold uppercase tracking-widest mb-1">
              [FOTOQALEREYA // TİKİNTİ ARXİVİ]
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#262626] uppercase tracking-tight">
              Tikdiyimiz Evlərin Şəkilləri
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="brick-btn bg-[#C85A32] text-white hover:bg-[#B84A27] px-5 py-3 text-xs sm:text-sm font-mono flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Öz Ev Şəklini Əlavə Et</span>
          </button>
        </div>

        {/* Kateqoriya Filtrləri (Kəskin Kərpic Tabları) */}
        <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 border-2 border-[#262626] font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#262626] text-[#F4F0DB] shadow-[3px_3px_0px_#C85A32]'
                : 'bg-[#FFFFFF] text-[#262626] hover:bg-[#F4F0DB]'
            }`}
          >
            BÜTÜN İŞLƏR ({projects.length})
          </button>
          <button
            onClick={() => setFilter('full')}
            className={`px-4 py-2 border-2 border-[#262626] font-bold transition-all ${
              filter === 'full'
                ? 'bg-[#C85A32] text-white shadow-[3px_3px_0px_#262626]'
                : 'bg-[#FFFFFF] text-[#262626] hover:bg-[#F4F0DB]'
            }`}
          >
            TAM EVLƏR & VİLLALAR
          </button>
          <button
            onClick={() => setFilter('roof')}
            className={`px-4 py-2 border-2 border-[#262626] font-bold transition-all ${
              filter === 'roof'
                ? 'bg-[#262626] text-[#F4F0DB] shadow-[3px_3px_0px_#C85A32]'
                : 'bg-[#FFFFFF] text-[#262626] hover:bg-[#F4F0DB]'
            }`}
          >
            DAM & MANSARD
          </button>
          <button
            onClick={() => setFilter('masonry')}
            className={`px-4 py-2 border-2 border-[#262626] font-bold transition-all ${
              filter === 'masonry'
                ? 'bg-[#C85A32] text-white shadow-[3px_3px_0px_#262626]'
                : 'bg-[#FFFFFF] text-[#262626] hover:bg-[#F4F0DB]'
            }`}
          >
            KƏRPİC HÖRGÜ & BÜNÖVRƏ
          </button>
        </div>

        {/* Qalereya Şəbəkəsi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => setSelectedImg(proj)}
              className="brick-card overflow-hidden group cursor-pointer bg-[#FFFFFF] p-2"
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
                <div className="absolute top-2 left-2 bg-[#262626] text-[#F4F0DB] px-1.5 py-0.5 font-mono text-[9px] font-bold">
                  #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>
                <div className="absolute top-2 right-2 bg-[#C85A32] text-white px-2 py-0.5 font-mono text-[9px] font-bold">
                  {proj.tag}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-9 h-9 bg-white text-[#262626] border-2 border-[#262626] flex items-center justify-center font-bold">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="pt-2 px-1 font-mono">
                <div className="flex items-center gap-1 text-[10px] text-[#C85A32] font-bold mb-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{proj.location}</span>
                </div>
                <h3 className="font-bold text-xs text-[#262626] truncate">
                  {proj.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Daimi Şəkil Bələdçisi */}
        <div className="mt-10 p-4 border-2 border-[#262626] bg-[#FFFFFF] shadow-[4px_4px_0px_#262626] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C85A32] text-white flex items-center justify-center font-bold shrink-0 border border-[#262626]">
              !
            </div>
            <div>
              <span className="font-bold text-[#262626] block">Şəkilləri daimi qovluğa necə qoymaq olar?</span>
              <span className="text-[#262626]/70 text-[11px]">
                Kompüterinizdə <strong>brick app \ public \ images \ projects</strong> qovluğuna öz şəkillərinizi atın.
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="brick-btn bg-[#262626] text-white hover:bg-[#C85A32] px-4 py-2 text-xs shrink-0"
          >
            İndi Brauzerdən Şəkil Seç
          </button>
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
              Telefon və ya kompüterinizdən şəkli seçin, dərhal qalereyada görünsün.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-[#262626] mb-1">EVİN ADI / BAŞLIQ:</label>
                <input
                  type="text"
                  placeholder="Məs: Şüvəlanda 2 mərtəbəli kərpic villa"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 border-2 border-[#262626] bg-[#F4F0DB] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#262626] mb-1">ƏRAZİ:</label>
                <input
                  type="text"
                  placeholder="Məs: Mərdəkan Qəsəbəsi"
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
