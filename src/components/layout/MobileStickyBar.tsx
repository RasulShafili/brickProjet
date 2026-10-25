'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/994515480300?text=' +
  encodeURIComponent('Salam usta, tikinti və təmir xidmətləriniz üzrə qiymət öyrənmək istəyirəm.');

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#F4F0DB] border-t-2 border-[#262626] p-2.5 flex items-center justify-between gap-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.12)]">
      {/* Birbaşa WhatsApp Düyməsi (+994515480300) */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[48px] flex items-center justify-center gap-2 bg-[#25D366] text-[#1A1A1A] border-2 border-[#262626] shadow-[2px_2px_0px_#262626] py-2.5 px-3 rounded-[4px] text-xs font-black active:translate-y-0.5 transition-all"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span>WhatsApp Qiymət Soruş</span>
      </a>

      {/* Birbaşa Zəng Düyməsi (+994515480300) */}
      <a
        href="tel:+994515480300"
        className="flex-1 min-h-[48px] flex items-center justify-center gap-2 bg-[#C85A32] text-white border-2 border-[#262626] shadow-[2px_2px_0px_#262626] py-2.5 px-3 rounded-[4px] text-xs font-black active:translate-y-0.5 transition-all"
      >
        <Phone className="w-4 h-4 shrink-0" />
        <span>Zəng Et</span>
      </a>
    </div>
  );
}
