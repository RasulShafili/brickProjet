import React from 'react';
import { Phone, MapPin, Hammer, Clock, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1F2421] text-[#E6E2D8] border-t border-[#343C37] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Kolon 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C85A32] text-white flex items-center justify-center font-bold">
              <Hammer className="w-4 h-4" />
            </div>
            <span className="font-bold text-base text-white">
              Usta & Mühəndis Briqadası
            </span>
          </div>
          <p className="text-[#A4AAA6] leading-relaxed text-xs">
            18 illik inşaat təcrübəsi. Hər bir layihə peşəkar daimi briqadamız və 
            10 illik rəsmi müqavilə zəmanəti ilə icra olunur.
          </p>
        </div>

        {/* Kolon 2 */}
        <div>
          <h3 className="font-bold text-sm text-white mb-3">XİDMƏT ƏRAZİLƏRİMİZ</h3>
          <ul className="space-y-1.5 text-[#A4AAA6]">
            <li>• Mərdəkan & Şüvəlan Qəsəbələri</li>
            <li>• Bilgəh & Zaqulba Bağları</li>
            <li>• Novxanı, Goradil & Pirşağı</li>
            <li>• Badamdar & Səbail Ərazisi</li>
            <li>• Xırdalan, Masazır & Saray</li>
            <li>• Bütün Bakı və Abşeron</li>
          </ul>
        </div>

        {/* Kolon 3 */}
        <div>
          <h3 className="font-bold text-sm text-white mb-3">NƏ EDİRİK?</h3>
          <ul className="space-y-1.5 text-[#A4AAA6]">
            <li>• Bütöv Fərdi Evlər (Açar təhvili)</li>
            <li>• Dəmir-Beton Bünövrə və Kürsülük</li>
            <li>• Qoşa Kərpic və Daş Hörgü Divarları</li>
            <li>• Dam Stropil Karkası və Mansard</li>
            <li>• Monolit Pilləkənlər və Otaq Artırmaları</li>
            <li>• Memarlıq Cizgiləri və Layihələndirmə</li>
          </ul>
        </div>

        {/* Kolon 4 */}
        <div>
          <h3 className="font-bold text-sm text-white mb-3">BİRBAŞA ƏLAQƏ</h3>
          <div className="space-y-2.5 text-[#A4AAA6]">
            <a href="tel:+994502345678" className="flex items-center gap-2 hover:text-[#C85A32] transition-colors font-bold text-white">
              <Phone className="w-4 h-4 text-[#C85A32]" />
              <span>+994 (50) 234-56-78</span>
            </a>
            <a href="https://wa.me/994502345678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp ilə əlaqə</span>
            </a>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-[#C85A32]" />
              <span>Hər gün: 08:00 – 20:00</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-4 h-4 text-[#C85A32]" />
              <span>Bakı şəhəri və Abşeron rayonu</span>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-[#343C37] px-4 sm:px-8 py-4 text-[#7A827E] text-[11px] max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          © {new Date().getFullYear()} Usta & Mühəndis Briqadası. Bütün hüquqlar qorunur.
        </div>
        <div>
          Fərdi Ev Tikintisi və Konstruksiya İşləri
        </div>
      </div>
    </footer>
  );
}
