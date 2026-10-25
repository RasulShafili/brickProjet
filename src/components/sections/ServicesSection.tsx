'use client';

import React from 'react';
import { Home, Layers, Hammer, Shield, DraftingCompass, Check, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    code: '01',
    title: 'Bütöv Fərdi Ev Tikintisi',
    tag: 'AÇAR TƏHVİLİ',
    desc: 'Torpaq qazıntısından bünövrəyə, kərpic hörgüsündən dam örtüyünə qədər bütöv yaşayış villalarının inşası.',
    specs: ['B25 monolit karkas', '380mm kərpic divarlar', 'İzolyasiyalı dam', '10 il rəsmi zəmanət'],
  },
  {
    code: '02',
    title: 'Dəmir-Beton Bünövrə & Kürsülük',
    tag: 'B25 M350 MONOLİT',
    desc: 'Qrunt sularına qarşı 2 qat hidroizolyasiyalı, lazer niveliri ilə düzlənmiş möhkəm seysmik baza.',
    specs: ['Ø14–Ø16mm A500C armatur', 'Monolit plitə / lentvari', 'Bitum-polimer qoruma', '9 bal seysmik dayanıqlıq'],
  },
  {
    code: '03',
    title: '380mm Termos-Hörgü Divarlar',
    tag: 'LAZER TARAZLIĞI',
    desc: 'Bişmiş qırmızı kərpic və Abşeron daşı ilə qoşa bağlama. Qışda isti, yayda sərin saxlayan hava yastığı.',
    specs: ['Running-bond bağlama', 'Hər 4 sırada armatur toru', 'Monolit pəncərə lintelləri', 'Sıfır xətalı vertikallıq'],
  },
  {
    code: '04',
    title: 'Dam Karkası & Mansard',
    tag: 'ANTİSEPTİKLİ ŞAM',
    desc: 'Güclü külək və yağıntılara qarşı xüsusi ferma karkası, nəfəsalan diffuziya membranı və kirəmit.',
    specs: ['50x200mm quru şam tirlər', 'Tyvek nəfəsalan membran', '150mm daş yunu qatı', 'Ral 7024 metal kirəmit'],
  },
  {
    code: '05',
    title: 'Monolit Pilləkən & Artırmalar',
    tag: 'ÇATSIZ CALAQ',
    desc: 'Mövcud evlərə kimyəvi ankerlərlə monolit otaq artırması və heç vaxt yellənməyən erqonomik pillələr.',
    specs: ['2h + b rahatlıq düsturu', 'Monolit dəmir-beton tökmə', 'Dəqiq taxta qəlib', 'Kimyəvi calaq ankeri'],
  },
  {
    code: '06',
    title: 'Memarlıq Sxemi & CAD Çertyoju',
    tag: 'MÜHƏNDİS ZƏKASI',
    desc: 'Torpaq sahənizdə günəş bucağına və küləyə uyğun erqonomik otaq bölgüsü və kəsik sxemləri.',
    specs: ['Mərtəbə və kəsik planları', 'Dəqiq kərpic/beton həcmi', 'Statik yük hesablaması', 'İcazə üçün sxem paketi'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="px-4 sm:px-8 py-16 bg-[#FFFFFF] border-b-2 border-[#262626] relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Bölmə Başlığı */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b-2 border-[#262626] pb-5">
          <div>
            <div className="font-mono text-xs text-[#C85A32] font-bold uppercase tracking-widest mb-1">
              [İXTİSAS SAHƏLƏRİMİZ]
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#262626] uppercase tracking-tight">
              Nə Edirik? Tikinti Xidmətlərimiz
            </h2>
          </div>
          <p className="font-mono text-xs text-[#262626]/80 max-w-md">
            Subpodratçısız, birbaşa daimi peşəkar briqada və lazer dəqiqliyi ilə.
          </p>
        </div>

        {/* 6 Kəskin Kərpic Kartı */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="brick-card p-6 flex flex-col justify-between group hover:border-[#C85A32]"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-3 border-b border-[#262626]/20 pb-2">
                  <span className="font-bold text-[#C85A32]">{srv.code} //</span>
                  <span className="px-2 py-0.5 bg-[#262626] text-[#F4F0DB] text-[10px] font-bold">
                    {srv.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#262626] mb-2 group-hover:text-[#C85A32] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#262626]/80 leading-relaxed mb-5">
                  {srv.desc}
                </p>

                {/* Qısa Texniki Vurğular */}
                <div className="grid grid-cols-2 gap-2 border-t border-[#262626]/10 pt-3 mb-5 font-mono text-[11px]">
                  {srv.specs.map((sp, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[#262626]">
                      <span className="w-1.5 h-1.5 bg-[#C85A32] shrink-0" />
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="pt-3 border-t border-[#262626]/20 font-mono text-xs font-bold text-[#C85A32] hover:text-[#262626] flex items-center justify-between"
              >
                <span>Əlaqə Saxla</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
