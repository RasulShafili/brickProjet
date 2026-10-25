'use client';

import React from 'react';
import { Phone, MessageCircle, Hammer } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/994515480300?text=' +
  encodeURIComponent('Salam usta, tikinti və təmir xidmətləriniz üzrə qiymət öyrənmək istəyirəm.');

export default function Header() {
  return (
    <header className="relative z-40 bg-[#F4F0DB] border-b-2 border-[#26211D] px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Usta Adı və İxtisas */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-[#C85A32] border-2 border-[#26211D] text-white flex items-center justify-center shadow-[2px_2px_0px_#26211D] shrink-0 rounded-[4px]">
            <Hammer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-[#C85A32]">
              Qəbələ və ətraf ərazilər
            </div>
            <div className="text-base sm:text-lg font-bold text-[#1F1915] leading-tight">
              Zəfər Usta
            </div>
          </div>
        </a>

        {/* Qısa və Aydın Menyu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#3A322C]">
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
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="brick-btn hidden sm:inline-flex min-h-[40px] px-3.5 py-2 bg-[#25D366] text-[#1A110B] text-xs font-semibold"
          >
            <MessageCircle className="w-4 h-4 mr-1.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href="tel:+994515480300"
            className="brick-btn min-h-[40px] bg-[#C85A32] text-white hover:bg-[#B84A27] px-3.5 py-2 text-xs sm:text-sm font-semibold"
          >
            <Phone className="w-4 h-4 mr-1.5" />
            <span>051 548 03 00</span>
          </a>
        </div>

      </div>
    </header>
  );
}
