'use client';

import React from 'react';
import { Phone, MessageCircle, Hammer } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative z-40 bg-[#F4F0DB] border-b-2 border-[#262626] px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Usta Adı və İxtisas */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-[#C85A32] border-2 border-[#262626] text-white flex items-center justify-center shadow-[2px_2px_0px_#262626] shrink-0 rounded-[4px]">
            <Hammer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-extrabold text-[#C85A32] uppercase tracking-wider">
              Fərdi Tikinti Ustası
            </div>
            <div className="text-sm sm:text-base font-black text-[#262626]">
              [Ustanın Adı]
            </div>
          </div>
        </a>

        {/* Qısa və Aydın Menyu */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-[#262626]">
          <a href="#services" className="hover:text-[#C85A32] transition-colors">
            Xidmətlər
          </a>
          <a href="#gallery" className="hover:text-[#C85A32] transition-colors">
            Görülən İşlər
          </a>
          <a href="#trust" className="hover:text-[#C85A32] transition-colors">
            Necə İşləyirik
          </a>
          <a href="#contact" className="hover:text-[#C85A32] transition-colors">
            Əlaqə
          </a>
        </nav>

        {/* Birbaşa Düymələr */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 bg-[#25D366] text-[#1A1A1A] border-2 border-[#262626] shadow-[2px_2px_0px_#262626] text-xs font-extrabold rounded-[4px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#contact"
            className="brick-btn min-h-[42px] bg-[#C85A32] text-white hover:bg-[#B84A27] px-3.5 py-2 text-xs font-bold"
          >
            <Phone className="w-4 h-4 mr-1.5" />
            <span>[Nömrə]</span>
          </a>
        </div>

      </div>
    </header>
  );
}
