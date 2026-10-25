'use client';

import React from 'react';
import { MapPin, ArrowRight, Image as ImageIcon } from 'lucide-react';

/**
 * Paint-də çəkilmiş kimi sadə 2D eskiz ev şəkli (Mokap şəkil əvəzləyicisi)
 */
function Paint2DHousePlaceholder({ label = '[Bura Ev Şəkli Qoyulacaq]' }: { label?: string }) {
  return (
    <div className="w-full h-full bg-[#FFFFFF] flex flex-col items-center justify-center p-3 select-none relative">
      <svg
        viewBox="0 0 320 220"
        className="w-full h-full max-h-[220px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sadə Paint Günəşi */}
        <circle cx="52" cy="40" r="16" fill="#FDE047" stroke="#111111" strokeWidth="2.5" />
        <line x1="52" y1="16" x2="52" y2="8" stroke="#111111" strokeWidth="2.5" />
        <line x1="52" y1="64" x2="52" y2="72" stroke="#111111" strokeWidth="2.5" />
        <line x1="28" y1="40" x2="20" y2="40" stroke="#111111" strokeWidth="2.5" />
        <line x1="76" y1="40" x2="84" y2="40" stroke="#111111" strokeWidth="2.5" />
        <line x1="35" y1="23" x2="29" y2="17" stroke="#111111" strokeWidth="2.5" />
        <line x1="69" y1="57" x2="75" y2="63" stroke="#111111" strokeWidth="2.5" />
        <line x1="69" y1="23" x2="75" y2="17" stroke="#111111" strokeWidth="2.5" />
        <line x1="35" y1="57" x2="29" y2="63" stroke="#111111" strokeWidth="2.5" />

        {/* Sadə Yer / Ot Xətti */}
        <line x1="15" y1="185" x2="305" y2="185" stroke="#16A34A" strokeWidth="3.5" />

        {/* Baca */}
        <rect x="205" y="42" width="20" height="38" fill="#E5E7EB" stroke="#111111" strokeWidth="2.5" />

        {/* Paint Üçbucaq Dam */}
        <polygon
          points="75,92 165,32 255,92"
          fill="#EF4444"
          stroke="#111111"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Paint Ev Gövdəsi (Dördbucaq) */}
        <rect
          x="95"
          y="92"
          width="140"
          height="93"
          fill="#FEF3C7"
          stroke="#111111"
          strokeWidth="3"
        />

        {/* Qapı */}
        <rect
          x="150"
          y="132"
          width="30"
          height="53"
          fill="#92400E"
          stroke="#111111"
          strokeWidth="2.5"
        />
        <circle cx="173" cy="158" r="2.5" fill="#FDE047" stroke="#111111" strokeWidth="1.5" />

        {/* Sol Pəncərə (4 gözlü Paint pəncərəsi) */}
        <rect
          x="108"
          y="108"
          width="28"
          height="28"
          fill="#93C5FD"
          stroke="#111111"
          strokeWidth="2.5"
        />
        <line x1="122" y1="108" x2="122" y2="136" stroke="#111111" strokeWidth="2" />
        <line x1="108" y1="122" x2="136" y2="122" stroke="#111111" strokeWidth="2" />

        {/* Sağ Pəncərə (4 gözlü Paint pəncərəsi) */}
        <rect
          x="194"
          y="108"
          width="28"
          height="28"
          fill="#93C5FD"
          stroke="#111111"
          strokeWidth="2.5"
        />
        <line x1="208" y1="108" x2="208" y2="136" stroke="#111111" strokeWidth="2" />
        <line x1="194" y1="122" x2="222" y2="122" stroke="#111111" strokeWidth="2" />

        {/* Alt yazı */}
        <text
          x="160"
          y="206"
          textAnchor="middle"
          fill="#111111"
          fontSize="11"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-8 py-10 lg:py-14 bg-brick-grid border-b-2 border-[#262626] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
        
        {/* Sol 7 Sütun: Kəskin Kərpic Etibar Bloku */}
        <div className="col-span-12 lg:col-span-7 space-y-5">
          
          {/* Tikinti Koordinat Nişanı */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#262626] text-[#F4F0DB] border border-[#262626] font-mono text-xs font-bold shadow-[3px_3px_0px_#C85A32]">
            <span className="w-2 h-2 bg-[#C85A32] animate-pulse" />
            <span>[Bura üst başlıq / ixtisas etiketi yazılacaq]</span>
          </div>

          {/* Əsas Kəsərli Başlıq */}
          <h1 className="text-3xl sm:text-5xl font-black text-[#262626] tracking-tight leading-[1.08] uppercase">
            [Bura əsas başlıq (H1) yazılacaq]
          </h1>

          {/* Qısa Mənalı Mətn */}
          <p className="text-sm sm:text-base font-medium text-[#262626]/85 max-w-xl leading-relaxed">
            [Bura gördüyünüz işlər haqqında qısa giriş mətni və əsas üstünlükləriniz yazılacaq.]
          </p>

          {/* 4 Kəskin Kərpic Vurğu Bloku */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            <div className="p-2.5 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626]">
              <div className="font-bold text-[#C85A32] text-sm sm:text-base">[Göstərici 1]</div>
              <div className="text-[10px] text-[#262626]/70 uppercase font-bold">[Məs: Təcrübə ili]</div>
            </div>
            <div className="p-2.5 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626]">
              <div className="font-bold text-[#262626] text-sm sm:text-base">[Göstərici 2]</div>
              <div className="text-[10px] text-[#262626]/70 uppercase font-bold">[Məs: Tamamlanmış iş]</div>
            </div>
            <div className="p-2.5 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626]">
              <div className="font-bold text-[#C85A32] text-sm sm:text-base">[Göstərici 3]</div>
              <div className="text-[10px] text-[#262626]/70 uppercase font-bold">[Məs: Material/Standart]</div>
            </div>
            <div className="p-2.5 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626]">
              <div className="font-bold text-emerald-700 text-sm sm:text-base">[Göstərici 4]</div>
              <div className="text-[10px] text-[#262626]/70 uppercase font-bold">[Məs: Zəmanət müddəti]</div>
            </div>
          </div>

          {/* Fəaliyyət Zonası */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#262626] bg-[#FFFFFF] p-2 border border-[#262626] inline-flex">
            <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>[Bura xidmət göstərilən şəhər, rayon və ya qəsəbələr yazılacaq]</span>
          </div>

          {/* İki Kəskin Kərpic Düyməsi */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#gallery"
              className="brick-btn bg-[#C85A32] text-white hover:bg-[#B84A27] px-6 py-3.5 text-xs sm:text-sm font-mono flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>[Əsas düymə mətni — Qalereya]</span>
            </a>
            <a
              href="#contact"
              className="brick-btn bg-[#FFFFFF] text-[#262626] hover:bg-[#F4F0DB] px-6 py-3.5 text-xs sm:text-sm font-mono flex items-center gap-2"
            >
              <span>[İkinci düymə mətni — Əlaqə]</span>
              <ArrowRight className="w-4 h-4 text-[#C85A32]" />
            </a>
          </div>

        </div>

        {/* Sağ 5 Sütun: Paint-də çəkilmiş kimi sadə 2D Ev Eskizi (Mokap şəkil silindi) */}
        <div className="col-span-12 lg:col-span-5 relative">
          <div className="relative border-4 border-[#262626] bg-[#FFFFFF] p-2 shadow-[8px_8px_0px_#C85A32] group">
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-[#262626] bg-[#FFFFFF]">
              <Paint2DHousePlaceholder label="[Bura əsas ev şəkli qoyulacaq]" />

              <div className="absolute top-3 right-3 bg-[#262626] text-[#F4F0DB] px-2 py-0.5 font-mono text-[10px] font-bold border border-red-500/50 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                <span>[Şəkil üstü texniki etiket]</span>
              </div>
            </div>

            {/* Alt Kərpic Zolağı */}
            <div className="mt-2 p-2 bg-[#262626] text-[#F4F0DB] flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-[#E3C1AA] font-bold uppercase text-[10px] block">
                  [Bura layihə kateqoriyası yazılacaq]
                </span>
                <span className="font-bold">[Bura seçilmiş əsas layihənin adı və ünvanı yazılacaq]</span>
              </div>
              <span className="px-2 py-0.5 bg-[#C85A32] text-white text-[10px] font-bold">
                [Status]
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
