import React from 'react';
import { Phone, MapPin, Hammer, Clock, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1F2421] text-[#E6E2D8] border-t-2 border-[#262626] text-xs relative z-10 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Sütun 1: Fərdi Usta Kimliyi */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[4px] bg-[#C85A32] border border-[#E6E2D8]/30 text-white flex items-center justify-center font-bold shrink-0">
              <Hammer className="w-4 h-4" />
            </div>
            <div>
              <span className="font-black text-base text-white block">
                [Ustanın Adı və Soyadı]
              </span>
              <span className="text-[11px] text-[#C85A32] font-bold">
                Fərdi Ev Tikintisi və Təmir Ustası
              </span>
            </div>
          </div>
          <p className="text-[#A4AAA6] leading-relaxed text-xs">
            Vasitəçi şirkət komissiyası olmadan, fərdi evlərin bünövrədən dama tikintisi, kubik hörgüsü, suvaq, dam örtüyü və daxili təmir işləri.
          </p>
        </div>

        {/* Sütun 2: Xidmət Bölgələri (Yerli SEO üçün) */}
        <div>
          <h3 className="font-bold text-sm text-white mb-3">XİDMƏT ƏRAZİLƏRİ</h3>
          <ul className="space-y-1.5 text-[#A4AAA6]">
            <li>• [Ərazi / Rayon / Qəsəbə 1]</li>
            <li>• [Ərazi / Rayon / Qəsəbə 2]</li>
            <li>• [Ərazi / Rayon / Qəsəbə 3]</li>
            <li>• [Ərazi / Rayon / Qəsəbə 4]</li>
          </ul>
        </div>

        {/* Sütun 3: Əsas Xidmətlər */}
        <div>
          <h3 className="font-bold text-sm text-white mb-3">ƏSAS XİDMƏTLƏR</h3>
          <ul className="space-y-1.5 text-[#A4AAA6]">
            <li>• Sıfırdan Fərdi Ev Tikintisi</li>
            <li>• Kubik Hörgü və Mayak Suvaq</li>
            <li>• Dam Örtüklərinin Quraşdırılması</li>
            <li>• Daxili Təmir, Kafel və Metlax</li>
          </ul>
        </div>

        {/* Sütun 4: Birbaşa Əlaqə */}
        <div>
          <h3 className="font-bold text-sm text-white mb-3">BİRBAŞA USTA İLƏ ƏLAQƏ</h3>
          <div className="space-y-2.5 text-[#A4AAA6]">
            <a href="tel:+994000000000" className="flex items-center gap-2 hover:text-[#C85A32] transition-colors font-bold text-white">
              <Phone className="w-4 h-4 text-[#C85A32]" />
              <span>[Telefon nömrəsi]</span>
            </a>
            <a href="#contact" className="flex items-center gap-2 hover:text-[#25D366] transition-colors font-bold text-white">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp ilə Şəkil Göndər</span>
            </a>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-[#C85A32]" />
              <span>Hər gün: 08:00 – 20:00</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-4 h-4 text-[#C85A32]" />
              <span>[Xidmət göstərilən şəhər və ərazilər]</span>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-[#343C37] px-4 sm:px-8 py-4 text-[#A4AAA6] text-[11px] max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          © {new Date().getFullYear()} [Ustanın Adı və Soyadı]. Fərdi Ev Tikintisi və Təmir Xidmətləri.
        </div>
        <div>
          Vasitəçisiz • Vaxtında Təhvil • İşçilik Zəmanəti
        </div>
      </div>
    </footer>
  );
}
