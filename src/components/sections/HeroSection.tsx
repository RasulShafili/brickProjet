'use client';

import React from 'react';
import { MapPin, ArrowRight, Image as ImageIcon } from 'lucide-react';

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

        {/* Sağ 5 Sütun: Kəskin Kərpic Çərçivəsində Əsas Şəkil */}
        <div className="col-span-12 lg:col-span-5 relative">
          <div className="relative border-4 border-[#262626] bg-[#FFFFFF] p-2 shadow-[8px_8px_0px_#C85A32] group">
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-[#262626] bg-[#262626]">
              <img
                src="/images/projects/house-1.png"
                alt="Əsas təqdimat şəkli"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
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
