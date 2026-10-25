'use client';

import React from 'react';
import { MapPin, MessageCircle, ShieldCheck, UserCheck, Images } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-8 py-10 lg:py-16 bg-transparent border-b-2 border-[#262626] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
        
        {/* Sol 7 Sütun: Evin Əsas Pəncərəsi Görünüşlü Böyük Blok */}
        <div className="col-span-12 lg:col-span-7 space-y-5 brick-window bg-[#F4F0DB]/95 p-6 sm:p-8">
          
          {/* Kiçik Asılmış Tabela (Üst Nişan) */}
          <div className="hanging-badge inline-flex items-center gap-2 px-3.5 py-1.5 text-[#262626] text-xs font-extrabold">
            <ShieldCheck className="w-4 h-4 text-[#C85A32]" />
            <span>Vasitəçisiz • Birbaşa Usta İlə İşləyin</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#262626] tracking-tight leading-[1.1]">
            Fərdi Ev Tikintisi, Hörgü və Təmir
          </h1>

          <p className="text-sm sm:text-base font-medium text-[#262626]/85 max-w-xl leading-relaxed">
            Bünövrədən dama ev tikintisi, kubik hörgüsü, suvaq, pol-patalok, alçipan, laminat və oboy işləri.
          </p>

          {/* 4 Kiçik Asılmış Tabela (Göstərici Lövhələri) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs">
            <div className="hanging-badge p-3">
              <div className="font-black text-[#C85A32] text-base">[15+ İl]</div>
              <div className="text-[11px] text-[#262626]/80 font-bold">Usta Təcrübəsi</div>
            </div>
            <div className="hanging-badge p-3">
              <div className="font-black text-[#262626] text-base">[120+ Ev]</div>
              <div className="text-[11px] text-[#262626]/80 font-bold">Hazır Layihə</div>
            </div>
            <div className="hanging-badge p-3">
              <div className="font-black text-[#C85A32] text-base">0%</div>
              <div className="text-[11px] text-[#262626]/80 font-bold">Vasitəçi Faizi</div>
            </div>
            <div className="hanging-badge p-3">
              <div className="font-black text-emerald-700 text-base">100%</div>
              <div className="text-[11px] text-[#262626]/80 font-bold">İşçilik Zəmanəti</div>
            </div>
          </div>

          {/* Ərazi Tabelası */}
          <div>
            <div className="hanging-badge inline-flex items-center gap-2 text-xs font-bold text-[#262626] px-3.5 py-2">
              <MapPin className="w-4 h-4 text-[#C85A32] shrink-0" />
              <span>Xidmət ərazisi: Qəbələ və ətraf ərazilər</span>
            </div>
          </div>

          {/* 2 Əsas Düymə */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <a
              href="#contact"
              className="brick-btn min-h-[48px] bg-[#C85A32] text-white hover:bg-[#B84A27] px-6 py-3 text-sm font-extrabold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp ilə Qiymət Al</span>
            </a>
            <a
              href="#gallery"
              className="brick-btn min-h-[48px] bg-[#FFFFFF] text-[#262626] hover:bg-[#EAE5D0] px-5 py-3 text-sm font-bold flex items-center justify-center gap-2"
            >
              <Images className="w-4 h-4 text-[#C85A32]" />
              <span>Görülən İşlərə Bax</span>
            </a>
          </div>

        </div>

        {/* Sağ 5 Sütun: Ev Pəncərəsi Çərçivəsində Usta / Ev Foto Yeri */}
        <div className="col-span-12 lg:col-span-5">
          <div className="brick-window bg-[#FFFFFF] p-4">
            <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-[#2D1E16] bg-[#EAE5D0] flex flex-col items-center justify-center p-6 text-center">
              {/* Pəncərə Şüşə Bölgüsü (İncə Çarpaz Pəncərə Xətləri) */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full border-2 border-[#9E4724]/30" />
              </div>

              <div className="relative z-10 w-14 h-14 rounded-full bg-[#C85A32] text-white border-2 border-[#262626] flex items-center justify-center mb-3 shadow-[2px_2px_0px_#262626]">
                <UserCheck className="w-7 h-7" />
              </div>
              <div className="relative z-10 font-black text-sm sm:text-base text-[#262626]">
                [Zəfər Ustanın və ya Tikdiyi Evin Şəkli]
              </div>
            </div>

            <div className="hanging-badge mt-4 px-3.5 py-2.5 flex items-center justify-between text-xs font-bold">
              <span className="text-[#262626]">Zəfər Usta — Qəbələ</span>
              <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 border border-emerald-700 rounded-[2px]">
                Birbaşa İcraçı
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
