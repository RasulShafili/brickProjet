'use client';

import React from 'react';
import { MapPin, MessageCircle, ShieldCheck, UserCheck, Images } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-8 py-10 lg:py-16 bg-transparent border-b-2 border-[#262626] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
        
        {/* Sol 7 Sütun: Evin Əsas Pəncərəsi Görünüşlü Böyük Blok */}
        <div className="col-span-12 lg:col-span-7 space-y-5 brick-window bg-[#FFFDF7] p-6 sm:p-8">
          
          {/* Kiçik Asılmış Tabela (Üst Nişan) */}
          <div className="hanging-badge inline-flex items-center gap-2 px-3.5 py-1.5 text-[#1A110B] font-display text-xs sm:text-sm font-black uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4 text-[#C85A32] shrink-0" />
            <span>Vasitəçisiz • Birbaşa Usta İlə İşləyin</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#1A110B] tracking-tight leading-[1.12]">
            Fərdi Ev Tikintisi,{' '}
            <span
              style={{ textShadow: 'none' }}
              className="inline-block bg-[#C85A32] text-white px-3 py-0.5 border-2 border-[#1A110B] shadow-[3px_3px_0px_#1A110B] rounded-[2px] mt-1"
            >
              Hörgü və Təmir
            </span>
          </h1>

          <p className="text-base sm:text-lg font-bold text-[#1A110B] max-w-xl leading-relaxed bg-[#F4ECDD] p-3.5 border-l-4 border-[#C85A32]">
            Bünövrədən dama ev tikintisi, kubik hörgüsü, suvaq, pol-patalok, alçipan, laminat və oboy işləri.
          </p>

          {/* 4 Kiçik Asılmış Tabela (Göstərici Lövhələri) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="hanging-badge p-3">
              <div className="font-display font-black text-[#C85A32] text-lg sm:text-xl">[15+ İl]</div>
              <div className="text-xs text-[#1A110B] font-extrabold">Usta Təcrübəsi</div>
            </div>
            <div className="hanging-badge p-3">
              <div className="font-display font-black text-[#1A110B] text-lg sm:text-xl">[120+ Ev]</div>
              <div className="text-xs text-[#1A110B] font-extrabold">Hazır Layihə</div>
            </div>
            <div className="hanging-badge p-3">
              <div className="font-display font-black text-[#C85A32] text-lg sm:text-xl">0%</div>
              <div className="text-xs text-[#1A110B] font-extrabold">Vasitəçi Faizi</div>
            </div>
            <div className="hanging-badge p-3">
              <div className="font-display font-black text-emerald-700 text-lg sm:text-xl">100%</div>
              <div className="text-xs text-[#1A110B] font-extrabold">İşçilik Zəmanəti</div>
            </div>
          </div>

          {/* Ərazi Tabelası */}
          <div>
            <div className="hanging-badge inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#1A110B] px-4 py-2">
              <MapPin className="w-4 h-4 text-[#C85A32] shrink-0" />
              <span>Xidmət ərazisi: Qəbələ və ətraf ərazilər</span>
            </div>
          </div>

          {/* 2 Əsas Düymə */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
            <a
              href="#contact"
              className="brick-btn min-h-[50px] bg-[#C85A32] text-white hover:bg-[#B84A27] px-6 py-3 text-sm sm:text-base font-black flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp ilə Qiymət Al</span>
            </a>
            <a
              href="#gallery"
              className="brick-btn min-h-[50px] bg-[#FFFFFF] text-[#1A110B] hover:bg-[#EAE5D0] px-5 py-3 text-sm sm:text-base font-black flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <Images className="w-5 h-5 text-[#C85A32]" />
              <span>Görülən İşlərə Bax</span>
            </a>
          </div>

        </div>

        {/* Sağ 5 Sütun: Ev Pəncərəsi Çərçivəsində Usta / Ev Foto Yeri */}
        <div className="col-span-12 lg:col-span-5">
          <div className="brick-window bg-[#FFFFFF] p-4">
            <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-[#2D1E16] bg-[#EAE5D0] flex flex-col items-center justify-center p-6 text-center">
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full border-2 border-[#9E4724]/30" />
              </div>

              <div className="relative z-10 w-14 h-14 rounded-full bg-[#C85A32] text-white border-2 border-[#1A110B] flex items-center justify-center mb-3 shadow-[2px_2px_0px_#1A110B]">
                <UserCheck className="w-7 h-7" />
              </div>
              <div className="relative z-10 font-display font-black text-base sm:text-lg text-[#1A110B]">
                [Zəfər Ustanın və ya Tikdiyi Evin Şəkli]
              </div>
            </div>

            <div className="hanging-badge mt-4 px-3.5 py-2.5 flex items-center justify-between text-xs sm:text-sm font-black">
              <span className="font-display text-[#1A110B]">Zəfər Usta — Qəbələ</span>
              <span className="text-emerald-900 bg-emerald-100 px-2.5 py-0.5 border-2 border-emerald-800 rounded-[2px] font-extrabold text-xs">
                Birbaşa İcraçı
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
