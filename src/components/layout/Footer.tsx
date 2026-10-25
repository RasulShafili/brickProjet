import React from 'react';
import { Phone, MapPin, Hammer, Clock, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1F2421] text-[#E6E2D8] border-t border-[#343C37] text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Kolon 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C85A32] text-white flex items-center justify-center font-bold">
              <Hammer className="w-4 h-4" />
            </div>
            <span className="font-bold text-base text-white">
              [Usta / Şirkət Adı]
            </span>
          </div>
          <p className="text-[#A4AAA6] leading-relaxed text-xs">
            [Bura fəaliyyətiniz və təcrübəniz haqqında qısa yekun mətn yazılacaq.]
          </p>
        </div>

        {/* Kolon 2 */}
        <div>
          <h3 className="font-bold text-sm text-white mb-3">[SÜTUN 1 BAŞLIĞI — Məs: Ərazilər]</h3>
          <ul className="space-y-1.5 text-[#A4AAA6]">
            <li>• [Ərazi / Bölgə 1]</li>
            <li>• [Ərazi / Bölgə 2]</li>
            <li>• [Ərazi / Bölgə 3]</li>
            <li>• [Ərazi / Bölgə 4]</li>
          </ul>
        </div>

        {/* Kolon 3 */}
        <div>
          <h3 className="font-bold text-sm text-white mb-3">[SÜTUN 2 BAŞLIĞI — Məs: Xidmətlər]</h3>
          <ul className="space-y-1.5 text-[#A4AAA6]">
            <li>• [Xidmət istiqaməti 1]</li>
            <li>• [Xidmət istiqaməti 2]</li>
            <li>• [Xidmət istiqaməti 3]</li>
            <li>• [Xidmət istiqaməti 4]</li>
          </ul>
        </div>

        {/* Kolon 4 */}
        <div>
          <h3 className="font-bold text-sm text-white mb-3">BİRBAŞA ƏLAQƏ</h3>
          <div className="space-y-2.5 text-[#A4AAA6]">
            <a href="#contact" className="flex items-center gap-2 hover:text-[#C85A32] transition-colors font-bold text-white">
              <Phone className="w-4 h-4 text-[#C85A32]" />
              <span>[Telefon nömrəsi]</span>
            </a>
            <a href="#contact" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>[WhatsApp əlaqə]</span>
            </a>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-[#C85A32]" />
              <span>[İş saatları]</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-4 h-4 text-[#C85A32]" />
              <span>[Ünvan]</span>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-[#343C37] px-4 sm:px-8 py-4 text-[#7A827E] text-[11px] max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          © {new Date().getFullYear()} [Şirkət / Usta adı yazılacaq]. Bütün hüquqlar qorunur.
        </div>
        <div>
          [Alt qeyd / sloqan yazılacaq]
        </div>
      </div>
    </footer>
  );
}
