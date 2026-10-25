'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#F4F0DB]/95 backdrop-blur-md border-b-2 border-[#262626] px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Loqo & Kərpic Nişanı */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#C85A32] border-2 border-[#262626] text-white flex items-center justify-center font-mono font-bold text-xs shadow-[3px_3px_0px_#262626] group-hover:bg-[#B84A27] transition-colors">
            [LOQO]
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#C85A32] uppercase">
                [Bura fəaliyyət sahəsi yazılacaq]
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 bg-[#262626] text-[#F4F0DB] text-[9px] font-mono font-bold">
                [Status/Etiket]
              </span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-[#262626] tracking-tight">
              [Bura Usta / Briqada / Şirkət adı yazılacaq]
            </div>
          </div>
        </a>

        {/* Menyu */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs font-bold text-[#262626]">
          <a href="#services" className="hover:text-[#C85A32] transition-colors">
            01. XİDMƏTLƏR
          </a>
          <a href="#gallery" className="hover:text-[#C85A32] transition-colors text-[#C85A32]">
            02. QALEREYA
          </a>
          <a href="#contact" className="hover:text-[#C85A32] transition-colors">
            03. ƏLAQƏ
          </a>
        </nav>

        {/* Əlaqə Düymələri */}
        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-[#25D366] text-[#262626] border-2 border-[#262626] shadow-[2px_2px_0px_#262626] text-xs font-bold hover:translate-y-[-1px] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>[WhatsApp linki]</span>
          </a>

          <a
            href="#contact"
            className="brick-btn bg-[#C85A32] text-white hover:bg-[#B84A27] px-3.5 py-2 text-xs sm:text-sm font-mono"
          >
            <Phone className="w-4 h-4 mr-1.5" />
            <span>[Əlaqə nömrəsi]</span>
          </a>
        </div>

      </div>
    </header>
  );
}
