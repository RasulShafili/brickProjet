'use client';

import React from 'react';
import { MapPin, CheckCircle2, ArrowRight, Image as ImageIcon, Ruler, Award, Phone } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-8 py-10 lg:py-14 bg-brick-grid border-b-2 border-[#262626] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
        
        {/* Sol 7 Sütun: Kəskin Kərpic Etibar Bloku (Yazılar az və kəsərli) */}
        <div className="col-span-12 lg:col-span-7 space-y-5">
          
          {/* Tikinti Koordinat Nişanı */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#262626] text-[#F4F0DB] border border-[#262626] font-mono text-xs font-bold shadow-[3px_3px_0px_#C85A32]">
            <span className="w-2 h-2 bg-[#C85A32] animate-pulse" />
            <span>USTA-KONSTRUKTOR // ABŞERON BRİQADASI</span>
          </div>

          {/* Əsas Kəsərli Başlıq */}
          <h1 className="text-3xl sm:text-5xl font-black text-[#262626] tracking-tight leading-[1.08] uppercase">
            Fərdi Ev Tikintisi, Kərpic Hörgü və Dam Karkası
          </h1>

          {/* Qısa Mənalı Mətn */}
          <p className="text-sm sm:text-base font-medium text-[#262626]/85 max-w-xl leading-relaxed">
            Sıfırdan açar təhvili fərdi villalar və mürəkkəb konstruksiyalar: 
            dəmir-beton bünövrə, 380mm qoşa kərpic divarlar, antiseptikli dam karkası və monolit pilləkənlər. 
            Lazer niveliri ilə millimetr dəqiqliyi.
          </p>

          {/* 4 Kəskin Kərpic Vurğu Bloku */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            <div className="p-2.5 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626]">
              <div className="font-bold text-[#C85A32] text-sm sm:text-base">18+ İL</div>
              <div className="text-[10px] text-[#262626]/70 uppercase font-bold">Təcrübə</div>
            </div>
            <div className="p-2.5 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626]">
              <div className="font-bold text-[#262626] text-sm sm:text-base">B25 M350</div>
              <div className="text-[10px] text-[#262626]/70 uppercase font-bold">Monolit Baza</div>
            </div>
            <div className="p-2.5 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626]">
              <div className="font-bold text-[#C85A32] text-sm sm:text-base">380 MM</div>
              <div className="text-[10px] text-[#262626]/70 uppercase font-bold">Termos Hörgü</div>
            </div>
            <div className="p-2.5 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626]">
              <div className="font-bold text-emerald-700 text-sm sm:text-base">10 İL</div>
              <div className="text-[10px] text-[#262626]/70 uppercase font-bold">Zəmanət</div>
            </div>
          </div>

          {/* Fəaliyyət Zonası */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#262626] bg-[#FFFFFF] p-2 border border-[#262626] inline-flex">
            <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Mərdəkan • Şüvəlan • Bilgəh • Novxanı • Badamdar • Xırdalan • Abşeron</span>
          </div>

          {/* İki Kəskin Kərpic Düyməsi */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#gallery"
              className="brick-btn bg-[#C85A32] text-white hover:bg-[#B84A27] px-6 py-3.5 text-xs sm:text-sm font-mono flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Tikdiyimiz Evlərin Şəkilləri</span>
            </a>
            <a
              href="#contact"
              className="brick-btn bg-[#FFFFFF] text-[#262626] hover:bg-[#F4F0DB] px-6 py-3.5 text-xs sm:text-sm font-mono flex items-center gap-2"
            >
              <span>Usta ilə Əlaqə</span>
              <ArrowRight className="w-4 h-4 text-[#C85A32]" />
            </a>
          </div>

        </div>

        {/* Sağ 5 Sütun: Kəskin Kərpic Çərçivəsində Real Ev Şəkli */}
        <div className="col-span-12 lg:col-span-5 relative">
          {/* Kərpic Çərçivəsi */}
          <div className="relative border-4 border-[#262626] bg-[#FFFFFF] p-2 shadow-[8px_8px_0px_#C85A32] group">
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-[#262626] bg-[#262626]">
              <img
                src="/images/projects/house-1.png"
                alt="Tikilmiş fərdi ev"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Lazer Nivelir Çarpaz Nişangahı */}
              <div className="absolute top-3 right-3 bg-[#262626] text-[#F4F0DB] px-2 py-0.5 font-mono text-[10px] font-bold border border-red-500/50 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                <span>LAZER TARAZLIĞI: 0.00mm</span>
              </div>
            </div>

            {/* Alt Kərpic Zolağı */}
            <div className="mt-2 p-2 bg-[#262626] text-[#F4F0DB] flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-[#E3C1AA] font-bold uppercase text-[10px] block">
                  REAL TİKİLMİŞ VİLLA
                </span>
                <span className="font-bold">Mərdəkan Bağları // Açar Təhvili</span>
              </div>
              <span className="px-2 py-0.5 bg-[#C85A32] text-white text-[10px] font-bold">
                TƏHVİL VERİLİB
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
