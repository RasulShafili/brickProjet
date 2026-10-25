'use client';

import React from 'react';
import { MapPin, MessageCircle, ShieldCheck, UserCheck, Images } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-8 py-10 lg:py-16 bg-transparent border-b-2 border-[#26211D] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
        
        {/* Sol 7 Sütun: Evin Əsas Pəncərəsi Görünüşlü Böyük Blok */}
        <div className="col-span-12 lg:col-span-7 space-y-5 brick-window bg-[#FFFDF9] p-6 sm:p-8">
          
          {/* Kiçik Asılmış Tabela (Üst Nişan) */}
          <div className="hanging-badge inline-flex items-center gap-2 px-3.5 py-1.5 text-[#3A322C] text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-[#C85A32] shrink-0" />
            <span>Vasitəçisiz • Birbaşa Usta İlə İşləyin</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[#1F1915] tracking-tight leading-[1.15]">
            Fərdi Ev Tikintisi,{' '}
            <span className="text-[#C85A32]">Hörgü və Təmir</span>
          </h1>

          <p className="text-sm sm:text-base font-normal text-[#4E443C] max-w-xl leading-relaxed">
            Bünövrədən dama ev tikintisi, kubik hörgüsü, suvaq, pol-patalok, alçipan, laminat və oboy işləri.
          </p>

          {/* 4 Kiçik Asılmış Tabela (Göstərici Lövhələri) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="hanging-badge p-3">
              <div className="font-bold text-[#C85A32] text-base sm:text-lg">[15+ İl]</div>
              <div className="text-xs text-[#574E47] font-normal">Usta Təcrübəsi</div>
            </div>
            <div className="hanging-badge p-3">
              <div className="font-bold text-[#1F1915] text-base sm:text-lg">[120+ Ev]</div>
              <div className="text-xs text-[#574E47] font-normal">Hazır Layihə</div>
            </div>
            <div className="hanging-badge p-3">
              <div className="font-bold text-[#C85A32] text-base sm:text-lg">0%</div>
              <div className="text-xs text-[#574E47] font-normal">Vasitəçi Faizi</div>
            </div>
            <div className="hanging-badge p-3">
              <div className="font-bold text-emerald-700 text-base sm:text-lg">100%</div>
              <div className="text-xs text-[#574E47] font-normal">İşçilik Zəmanəti</div>
            </div>
          </div>

          {/* Ərazi Tabelası */}
          <div>
            <div className="hanging-badge inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#3A322C] px-3.5 py-2">
              <MapPin className="w-4 h-4 text-[#C85A32] shrink-0" />
              <span>Xidmət ərazisi: Qəbələ və ətraf ərazilər</span>
            </div>
          </div>

          {/* 2 Əsas Düymə */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <a
              href="#contact"
              className="brick-btn min-h-[48px] bg-[#C85A32] text-white hover:bg-[#B84A27] px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp ilə Qiymət Al</span>
            </a>
            <a
              href="#gallery"
              className="brick-btn min-h-[48px] bg-[#FFFFFF] text-[#26211D] hover:bg-[#EAE5D0] px-5 py-3 text-sm font-medium flex items-center justify-center gap-2"
            >
              <Images className="w-4 h-4 text-[#C85A32]" />
              <span>Görülən İşlərə Bax</span>
            </a>
          </div>

        </div>

        {/* Sağ 5 Sütun: Ev Pəncərəsi Çərçivəsində Usta / Ev Foto Yeri */}
        <div className="col-span-12 lg:col-span-5">
          <div className="brick-window bg-[#FFFFFF] p-4">
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-[#2D1E16] bg-[#EAE5D0] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-13 h-13 rounded-full bg-[#C85A32] text-white border-2 border-[#26211D] flex items-center justify-center mb-3 p-3 shadow-[2px_2px_0px_#26211D]">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="font-semibold text-sm sm:text-base text-[#26211D]">
                [Zəfər Ustanın və ya Tikdiyi Evin Şəkli]
              </div>
            </div>

            <div className="hanging-badge mt-4 px-3.5 py-2.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1F1915]">Zəfər Usta — Qəbələ</span>
              <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-700/60 rounded-[2px] font-medium">
                Birbaşa İcraçı
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
