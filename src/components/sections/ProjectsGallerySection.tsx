'use client';

import React, { useState } from 'react';
import { MapPin, Clock, MoveHorizontal } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'all' | 'before-after' | 'full' | 'roof';
  location: string;
  duration: string;
  isBeforeAfter?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: '2 Mərtəbəli Evin Hörgü və Fasad İşi',
    category: 'before-after',
    location: 'Qəbələ',
    duration: '18 Gün',
    isBeforeAfter: true,
  },
  {
    id: 'p2',
    title: 'Alçipan Patalok, Pol və Laminat İşi',
    category: 'before-after',
    location: 'Qəbələ',
    duration: '9 Gün',
    isBeforeAfter: true,
  },
  {
    id: 'p3',
    title: 'Oboy, Boya və Daxili Təmir',
    category: 'before-after',
    location: 'Qəbələ',
    duration: '12 Gün',
    isBeforeAfter: true,
  },
  {
    id: 'p4',
    title: 'Sıfırdan 1 Mərtəbəli Həyət Evi',
    category: 'full',
    location: 'Qəbələ',
    duration: '45 Gün',
    isBeforeAfter: false,
  },
  {
    id: 'p5',
    title: 'Həyət Daş Hasar və Darvaza Hörgüsü',
    category: 'full',
    location: 'Qəbələ',
    duration: '10 Gün',
    isBeforeAfter: false,
  },
  {
    id: 'p6',
    title: 'Yeni Dam Konstruksiyasının Yığılması',
    category: 'roof',
    location: 'Qəbələ',
    duration: '11 Gün',
    isBeforeAfter: false,
  },
];

function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border-[3px] border-[#2D1E16] bg-[#262626] select-none">
      
      {/* SAĞ TƏRƏF: SONRA */}
      <div className="absolute inset-0 bg-[#E6EFE9] flex flex-col items-center justify-center p-3 text-center">
        <span className="font-display px-2.5 py-0.5 bg-emerald-800 text-white text-[11px] font-black rounded-[2px] mb-1.5">
          SONRA
        </span>
        <div className="font-display text-xs sm:text-sm font-black text-[#1A110B]">
          [Hazır Şəkil Yeri]
        </div>
      </div>

      {/* SOL TƏRƏF: ƏVVƏL */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden bg-[#E5DEC9] border-r-2 border-[#262626]"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="w-[300px] sm:w-[360px] h-full flex flex-col items-center justify-center p-3 text-center">
          <span className="font-display px-2.5 py-0.5 bg-[#1A110B] text-[#F4F0DB] text-[11px] font-black rounded-[2px] mb-1.5">
            ƏVVƏL
          </span>
          <div className="font-display text-xs sm:text-sm font-black text-[#1A110B]">
            [Əvvəlki Şəkil Yeri]
          </div>
        </div>
      </div>

      {/* Sürüşdürmə Düyməsi */}
      <div
        className="absolute inset-y-0 w-0.5 bg-[#C85A32] pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#C85A32] text-white border-2 border-[#262626] shadow-[2px_2px_0px_#262626] flex items-center justify-center">
          <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>

      <input
        type="range"
        min={10}
        max={90}
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        aria-label="Əvvəl və Sonra"
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
    </div>
  );
}

export default function ProjectsGallerySection() {
  const [filter, setFilter] = useState<'all' | 'before-after' | 'full' | 'roof'>('all');

  const filtered = PROJECTS.filter((p) => (filter === 'all' ? true : p.category === filter));

  return (
    <section
      id="gallery"
      className="px-4 sm:px-8 py-12 lg:py-16 bg-transparent border-b-2 border-[#262626] relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Asılmış Tabela Başlıq və Filtrlər */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="hanging-sign px-6 py-4">
            <div className="sign-kicker">QALEREYA</div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1A110B]">
              Görülən İşlər (Əvvəl / Sonra)
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5 text-xs sm:text-sm">
            {[
              { id: 'all', label: 'Hamısı' },
              { id: 'before-after', label: 'Əvvəl / Sonra' },
              { id: 'full', label: 'Ev və Hörgü' },
              { id: 'roof', label: 'Dam' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`hanging-badge font-display min-h-[40px] px-4 py-1.5 font-black uppercase tracking-wide transition-all cursor-pointer ${
                  filter === tab.id
                    ? '!bg-[#C85A32] !bg-none text-white'
                    : 'text-[#1A110B] hover:bg-[#EAE5D0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ev Pəncərəsi Görünüşlü Qalereya Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="brick-card bg-[#FFFDF7] p-4 flex flex-col justify-between"
            >
              {proj.isBeforeAfter ? (
                <BeforeAfterSlider />
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-[#2D1E16] bg-[#EAE5D0] flex flex-col items-center justify-center p-4 text-center">
                  <div className="font-display text-xs sm:text-sm font-black text-[#1A110B]">
                    [Layihə Şəkli Yeri]
                  </div>
                </div>
              )}

              <div className="pt-3.5 px-1">
                <h3 className="window-title text-base sm:text-lg font-black text-[#1A110B] mb-2">
                  {proj.title}
                </h3>
                <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#1A110B]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#C85A32]" />
                    {proj.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#C85A32]" />
                    {proj.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
