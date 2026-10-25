'use client';

import React from 'react';
import { MapPin, MessageCircle, ShieldCheck, UserCheck, Images } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-8 py-10 lg:py-16 bg-[#F4F0DB] border-b-2 border-[#262626] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
        
        {/* Sol 7 Sütun: Qısa, Aydın və Yığcam Giriş */}
        <div className="col-span-12 lg:col-span-7 space-y-5">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#262626] text-[#F4F0DB] text-xs font-bold shadow-[3px_3px_0px_#C85A32] rounded-[4px]">
            <ShieldCheck className="w-4 h-4 text-[#25D366]" />
            <span>Vasitəçisiz • Birbaşa Usta İlə İşləyin</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#262626] tracking-tight leading-[1.1]">
            Fərdi Ev Tikintisi, Hörgü və Təmir
          </h1>

          <p className="text-sm sm:text-base font-medium text-[#262626]/85 max-w-xl leading-relaxed">
            Bünövrədən dama ev tikintisi, kubik hörgüsü, suvaq, pol-patalok, alçipan, laminat və oboy işləri.
          </p>

          {/* 4 Qısa Göstərici */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626] rounded-[4px]">
              <div className="font-black text-[#C85A32] text-base">[15+ İl]</div>
              <div className="text-[11px] text-[#262626]/75 font-bold">Usta Təcrübəsi</div>
            </div>
            <div className="p-3 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626] rounded-[4px]">
              <div className="font-black text-[#262626] text-base">[120+ Ev]</div>
              <div className="text-[11px] text-[#262626]/75 font-bold">Hazır Layihə</div>
            </div>
            <div className="p-3 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626] rounded-[4px]">
              <div className="font-black text-[#C85A32] text-base">0%</div>
              <div className="text-[11px] text-[#262626]/75 font-bold">Vasitəçi Faizi</div>
            </div>
            <div className="p-3 bg-[#FFFFFF] border-2 border-[#262626] shadow-[2px_2px_0px_#262626] rounded-[4px]">
              <div className="font-black text-emerald-700 text-base">100%</div>
              <div className="text-[11px] text-[#262626]/75 font-bold">İşçilik Zəmanəti</div>
            </div>
          </div>

          {/* Ərazi */}
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#262626] bg-[#FFFFFF] px-3 py-2 border-2 border-[#262626] rounded-[4px]">
            <MapPin className="w-4 h-4 text-[#C85A32] shrink-0" />
            <span>[Xidmət göstərilən şəhər və rayonlar]</span>
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

        {/* Sağ 5 Sütun: Sade Usta / Ev Foto Çərçivəsi */}
        <div className="col-span-12 lg:col-span-5">
          <div className="border-2 border-[#262626] bg-[#FFFFFF] p-3 shadow-[6px_6px_0px_#262626] rounded-[4px]">
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-[#262626] bg-[#EAE5D0] flex flex-col items-center justify-center p-6 text-center rounded-[2px]">
              <div className="w-14 h-14 rounded-full bg-[#C85A32] text-white border-2 border-[#262626] flex items-center justify-center mb-3 shadow-[2px_2px_0px_#262626]">
                <UserCheck className="w-7 h-7" />
              </div>
              <div className="font-black text-sm sm:text-base text-[#262626]">
                [Ustanın və ya Tikdiyi Evin Şəkli]
              </div>
            </div>

            <div className="mt-2.5 px-3 py-2.5 bg-[#F4F0DB] border-2 border-[#262626] rounded-[4px] flex items-center justify-between text-xs font-bold">
              <span className="text-[#262626]">[Ustanın Adı və Soyadı]</span>
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
