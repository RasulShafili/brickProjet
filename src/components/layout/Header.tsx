'use client';

import React from 'react';
import { Phone, MessageCircle, Hammer, ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative z-40 bg-[#F4F0DB] border-b-2 border-[#262626] px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Fərdi Usta Kimliyi (Şirkət/Briqada qarışıqlığı olmadan birbaşa usta profili) */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-[#C85A32] border-2 border-[#262626] text-white flex items-center justify-center shadow-[3px_3px_0px_#262626] group-hover:bg-[#B84A27] transition-colors shrink-0">
            <Hammer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wide text-[#C85A32] uppercase">
                [Fərdi Ev Tikintisi və Təmir Ustası]
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-[#262626] text-[#F4F0DB] text-[10px] font-bold rounded-[2px]">
                <ShieldCheck className="w-3 h-3 text-[#25D366]" />
                <span>Vasitəçisiz</span>
              </span>
            </div>
            <div className="text-base sm:text-lg font-black text-[#262626] tracking-tight">
              [Bura Ustanın Adı və Soyadı yazılacaq]
            </div>
          </div>
        </a>

        {/* Sade və Aydın Menyu */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-[#262626]">
          <a href="#services" className="hover:text-[#C85A32] transition-colors py-1">
            Xidmətlər
          </a>
          <a href="#gallery" className="hover:text-[#C85A32] transition-colors py-1">
            Əvvəl / Sonra İşlər
          </a>
          <a href="#trust" className="hover:text-[#C85A32] transition-colors py-1">
            İş Prosesi və Rəylər
          </a>
          <a href="#contact" className="hover:text-[#C85A32] transition-colors py-1">
            Qiymət Al / Əlaqə
          </a>
        </nav>

        {/* Birbaşa Əlaqə Düymələri (Minimum 44x44px toxunma sahəsi) */}
        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 bg-[#25D366] text-[#1A1A1A] border-2 border-[#262626] shadow-[3px_3px_0px_#262626] text-xs font-extrabold hover:-translate-y-0.5 transition-all rounded-[4px]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>WhatsApp ilə Qiymət Al</span>
          </a>

          <a
            href="#contact"
            className="brick-btn min-h-[44px] bg-[#C85A32] text-white hover:bg-[#B84A27] px-4 py-2 text-xs sm:text-sm font-bold"
          >
            <Phone className="w-4 h-4 mr-1.5 shrink-0" />
            <span>[Əlaqə nömrəsi]</span>
          </a>
        </div>

      </div>
    </header>
  );
}
