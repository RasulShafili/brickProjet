'use client';

import React from 'react';
import { Phone, MessageCircle, Image as ImageIcon } from 'lucide-react';

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E6E2D8] p-3 flex items-center justify-between gap-3 shadow-lg">
      {/* WhatsApp */}
      <a
        href="https://wa.me/994502345678"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366]/15 text-[#128C7E] py-2.5 px-3 rounded-xl text-xs font-bold active:scale-95 transition-transform"
      >
        <MessageCircle className="w-4 h-4 text-[#25D366]" />
        <span>WhatsApp</span>
      </a>

      {/* Şəkillərə Keçid */}
      <a
        href="#gallery"
        className="flex items-center justify-center gap-1.5 bg-[#F9F7F2] text-[#1F2421] border border-[#E6E2D8] py-2.5 px-3 rounded-xl text-xs font-semibold active:scale-95 transition-transform"
      >
        <ImageIcon className="w-4 h-4 text-[#C85A32]" />
        <span>Şəkillər</span>
      </a>

      {/* Birbaşa Zəng */}
      <a
        href="tel:+994502345678"
        className="flex-1 flex items-center justify-center gap-1.5 bg-[#C85A32] text-white py-2.5 px-3 rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-transform"
      >
        <Phone className="w-4 h-4" />
        <span>Zəng Et</span>
      </a>
    </div>
  );
}
