import React from 'react';
import { Phone, Hammer, MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/994515480300?text=' +
  encodeURIComponent('Salam usta, tikinti və təmir xidmətləriniz üzrə qiymət öyrənmək istəyirəm.');

export default function Footer() {
  return (
    <footer className="bg-[#1F2421] text-[#E6E2D8] border-t-2 border-[#262626] text-xs relative z-10 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        
        {/* Usta Kimliyi */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[4px] bg-[#C85A32] text-white flex items-center justify-center font-bold shrink-0">
            <Hammer className="w-4 h-4" />
          </div>
          <div>
            <span className="font-black text-sm text-white block">
              Zəfər Usta — Qəbələ və ətraf ərazilər
            </span>
            <span className="text-[11px] text-[#A4AAA6]">
              Ev Tikintisi • Hörgü • Dam Örtüyü • Pol-Patalok • Alçipan • Laminat • Oboy
            </span>
          </div>
        </div>

        {/* Sürətli Əlaqə */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="tel:+994515480300"
            className="inline-flex items-center gap-2 font-bold text-white hover:text-[#C85A32] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#C85A32]" />
            <span>+994 51 548 03 00</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-[#25D366] hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
