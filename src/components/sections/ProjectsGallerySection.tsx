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
    location: '[Ərazi adı]',
    duration: '18 Gün',
    isBeforeAfter: true,
  },
  {
    id: 'p2',
    title: 'Alçipan Patalok, Pol və Laminat İşi',
    category: 'before-after',
    location: '[Ərazi adı]',
    duration: '9 Gün',
    isBeforeAfter: true,
  },
  {
    id: 'p3',
    title: 'Oboy, Boya və Daxili Təmir',
    category: 'before-after',
    location: '[Ərazi adı]',
    duration: '12 Gün',
    isBeforeAfter: true,
  },
  {
    id: 'p4',
    title: 'Sıfırdan 1 Mərtəbəli Həyət Evi',
    category: 'full',
    location: '[Ərazi adı]',
    duration: '45 Gün',
    isBeforeAfter: false,
  },
  {
    id: 'p5',
    title: 'Həyət Daş Hasar və Darvaza Hörgüsü',
    category: 'full',
    location: '[Ərazi adı]',
    duration: '10 Gün',
    isBeforeAfter: false,
  },
  {
    id: 'p6',
    title: 'Yeni Dam Konstruksiyasının Yığılması',
    category: 'roof',
    location: '[Ərazi adı]',
    duration: '11 Gün',
    isBeforeAfter: false,
  },
];

function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-[#262626] bg-[#262626] select-none rounded-[2px]">
      
      {/* SAĞ TƏRƏF: SONRA */}
      <div className="absolute inset-0 bg-[#E6EFE9] flex flex-col items-center justify-center p-3 text-center">
        <span className="px-2 py-0.5 bg-emerald-800 text-white text-[10px] font-bold rounded-[2px] mb-1.5">
          SONRA
        </span>
        <div className="text-xs font-black text-[#1F2421]">
          [Hazır Şəkil Yeri]
        </div>
      </div>

      {/* SOL TƏRƏF: ƏVVƏL */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden bg-[#E5DEC9] border-r-2 border-[#262626]"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="w-[300px] sm:w-[360px] h-full flex flex-col items-center justify-center p-3 text-center">
          <span className="px-2 py-0.5 bg-[#262626] text-[#F4F0DB] text-[10px] font-bold rounded-[2px] mb-1.5">
            ƏVVƏL
          </span>
          <div className="text-xs font-black text-[#262626]">
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
      className="px-4 sm:px-8 py-12 lg:py-16 bg-[#F4F0DB] border-b-2 border-[#262626] relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Qısa Başlıq və Filtrlər */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 border-b-2 border-[#262626] pb-4">
          <div>
            <div className="text-xs text-[#C85A32] font-extrabold uppercase tracking-wider mb-1">
              QALEREYA
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#262626]">
              Görülən İşlər (Əvvəl / Sonra)
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: 'all', label: 'Hamısı' },
              { id: 'before-after', label: 'Əvvəl / Sonra' },
              { id: 'full', label: 'Ev və Hörgü' },
              { id: 'roof', label: 'Dam' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`min-h-[38px] px-3.5 py-1.5 border-2 border-[#262626] rounded-[4px] font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#C85A32] text-white shadow-[2px_2px_0px_#262626]'
                    : 'bg-[#FFFFFF] text-[#262626] hover:bg-[#EAE5D0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sade və Yığcam Qalereya Şəbəkəsi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="brick-card bg-[#FFFFFF] p-3 flex flex-col justify-between"
            >
              {proj.isBeforeAfter ? (
                <BeforeAfterSlider />
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden border-2 border-[#262626] bg-[#EAE5D0] flex flex-col items-center justify-center p-4 text-center rounded-[2px]">
                  <div className="text-xs font-black text-[#262626]">
                    [Layihə Şəkli Yeri]
                  </div>
                </div>
              )}

              <div className="pt-3 px-1">
                <h3 className="font-black text-sm sm:text-base text-[#262626] mb-1.5">
                  {proj.title}
                </h3>
                <div className="flex items-center justify-between text-xs font-bold text-[#262626]/75">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                    {proj.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
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
