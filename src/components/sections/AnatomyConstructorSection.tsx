'use client';

import React, { useState } from 'react';
import { Layers, ShieldCheck, CheckCircle2, ArrowRight, Activity, Wrench } from 'lucide-react';
import { useConstructionStore } from '@/store/useConstructionStore';

const ANATOMY_NODES = [
  {
    id: 'foundation',
    title: '01. Bünövrə və Kürsülük Qovşağı',
    category: 'QRUNT & SEFARATİV BAZA',
    badge: 'B25 M350 MONOLİT',
    summary: 'Qrunt sularının və rütubətin divarlara keçməsinin qarşısını alan çoxqatlı dəmir-beton kürsülük sistemi.',
    layers: [
      { name: 'Qat 1: Qrunt hazırlığı', desc: '150mm sıxılmış qum-çınqıl yastığı və 80mm B10 arıq beton (padşibka)' },
      { name: 'Qat 2: Hidroizolyasiya', desc: '2 qat bitum-polimer rulo material (SBS modifikasiyalı) qaynaq üsulu ilə' },
      { name: 'Qat 3: Əsas Armatur', desc: 'Ø16mm A500C armaturdan 200x200mm addımlı qoşa toxunma karkas' },
      { name: 'Qat 4: Monolit Dəmir-Beton', desc: 'B25 (M350) markalı zavod betonu, daxili dərinlik vibrasiyası ilə tökmə' },
    ],
    timeline: '10–14 iş günü',
    guarantee: '15 il rəsmi zəmanət',
  },
  {
    id: 'masonry',
    title: '02. Daşıyıcı Termos-Hörgü & Armopoyas',
    category: 'DAŞIYICI DİVARLAR',
    badge: '380MM QOŞA BAĞLAMA',
    summary: 'Seysmik silkələnmələrə qarşı bütöv bir monolit qutu kimi işləyən kərpic hörgü və dəmir-beton kəmər.',
    layers: [
      { name: 'Qat 1: Daşıyıcı Hörgü', desc: '380mm qoşa qırmızı kərpic və ya Abşeron əhəngdaşı (running-bond bağlama)' },
      { name: 'Qat 2: Hörgü Şəbəkəsi', desc: 'Hər 4 sırada bir 50x50mm polad armatur hörgüsü toru sement məhlulunda' },
      { name: 'Qat 3: İstilik Qatı', desc: 'Daxili 50mm bazalt daş yunu təbəqəsi ilə termos hava boşluğu' },
      { name: 'Qat 4: Seysmik Kəmər', desc: 'Mərtəbə başında 400x300mm monolit dəmir-beton armopoyas qurşağı' },
    ],
    timeline: '15–20 iş günü',
    guarantee: '10 il rəsmi zəmanət',
  },
  {
    id: 'roof',
    title: '03. Dam Örtükləri & Mansard Karkası',
    category: 'DAM MÜHƏNDİSLİYİ',
    badge: 'ANTİSEPTİK EMALLI ŞAM',
    summary: 'Külək burulğanlarına və güclü yağıntılara qarşı xüsusi statik ferma və nəfəsalan dam tortu.',
    layers: [
      { name: 'Qat 1: Mauerlat & Bağlantı', desc: '150x150mm şam tiri, seysmik kəmərə kimyəvi şpilkalarla polad bərkidilmə' },
      { name: 'Qat 2: Stropil Ayaqları', desc: '50x200mm şam taxtaları, 600mm ox addımı, polad künclük bəndləri' },
      { name: 'Qat 3: Membran & İzolyasiya', desc: 'Tyvek superdiffuziya nəfəsalan membran + 150mm kəsişən daş yunu qatı' },
      { name: 'Qat 4: Dam Örtüyü', desc: '0.50mm polimer örtüklü metal kirəmit və ya təbii keramo-kirəmit' },
    ],
    timeline: '12–16 iş günü',
    guarantee: '10 il rəsmi zəmanət',
  },
  {
    id: 'stairs',
    title: '04. Monolit Pilləkənlər & Artırmalar',
    category: 'MÜRƏKKƏB QOVŞAQLAR',
    badge: 'RIYAZİ ADDIM ERQONOMİKASI',
    summary: 'Köhnə evlərə çatsız calaq bağlama və heç vaxt yellənməyən monolit pilləkən memarlığı.',
    layers: [
      { name: 'Qat 1: Bünövrə Əlaqəsi', desc: 'Mövcud bünövrəyə kimyəvi qatranla ankerlənmiş Ø14mm birləşdirici armaturlar' },
      { name: 'Qat 2: Riyazi Taxta Qəlib', desc: '2h + b = 63 sm rahatlıq düsturu ilə millimetrik pillə qəlibləməsi' },
      { name: 'Qat 3: Toxunma Karkas', desc: 'Alt və üst tor Ø12mm A500C armaturdan təzyiq paylayıcı karkas' },
      { name: 'Qat 4: Monolit Tökmə', desc: 'B25 markalı qranit qatqılı beton, monolit vibrasiya və cilalama' },
    ],
    timeline: '7–10 iş günü',
    guarantee: 'Məhdudiyyətsiz davamlılıq',
  },
];

export default function AnatomyConstructorSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeNode = ANATOMY_NODES[selectedIdx];
  const { setCalculator } = useConstructionStore();

  return (
    <section id="anatomy" className="px-[4%] py-20 border-b border-graphiteText bg-stonePaperLight">
      <div className="max-w-7xl mx-auto">
        
        {/* Başlıq */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-graphiteText pb-6">
          <div>
            <div className="font-mono text-xs text-terracotta font-bold tracking-widest uppercase mb-2">
              [MODUL 04 // ANATOMİK KONSTRUKSİYA DÜYÜNLƏRİ]
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-graphiteText">
              Yalnız Bir Hissə Tikdirmək İstəyirsiniz?
            </h2>
          </div>
          <p className="font-mono text-xs max-w-md text-graphiteText/80 leading-relaxed">
            Evinizin bünövrəsi çöküb, damı dəyişməlidir, yoxsa həyətə əlavə otaq və pilləkən artırırsınız? 
            Hər qovşağın daxili anatomiyasını və texniki pasportunu incələyin.
          </p>
        </div>

        {/* 4 Ekspozisiya Tabı */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {ANATOMY_NODES.map((node, idx) => (
            <button
              key={node.id}
              onClick={() => setSelectedIdx(idx)}
              className={`p-4 text-left border font-mono transition-all ${
                selectedIdx === idx
                  ? 'bg-obsidianCad text-stonePaper border-graphiteText shadow-brutal translate-y-[-2px]'
                  : 'bg-stonePaper text-graphiteText border-graphiteText hover:bg-[#FAF6E6]'
              }`}
            >
              <div className="text-[10px] text-terracotta font-bold uppercase mb-1">
                {node.category}
              </div>
              <div className="text-xs sm:text-sm font-bold truncate">
                {node.title.replace(/^\d+\.\s*/, '')}
              </div>
            </button>
          ))}
        </div>

        {/* Seçilmiş Qovşağın Dərinlikli Texniki Pasportu */}
        <div className="brutal-card bg-stonePaper p-6 lg:p-8 grid grid-cols-12 gap-8 items-start">
          
          {/* Sol 7 Sütun: Qatlar və Anatomik Təbəqələr */}
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 font-mono text-xs mb-3">
              <span className="px-2 py-0.5 bg-terracotta text-white font-bold">
                {activeNode.badge}
              </span>
              <span className="text-graphiteText/70">{activeNode.category}</span>
            </div>

            <h3 className="text-2xl font-bold text-graphiteText mb-3">
              {activeNode.title}
            </h3>

            <p className="text-sm text-graphiteText/85 leading-relaxed mb-6">
              {activeNode.summary}
            </p>

            {/* Qat-Qat Struktur Təbəqələri */}
            <div className="space-y-3 font-mono text-xs">
              {activeNode.layers.map((layer, i) => (
                <div
                  key={i}
                  className="p-3 bg-stonePaperLight border border-graphiteText/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <span className="font-bold text-terracotta">{layer.name}</span>
                  <span className="text-graphiteText/80 text-left sm:text-right text-[11px]">
                    {layer.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ 5 Sütun: Mühəndis Zəmanəti & Hissəvi Sifariş */}
          <div className="col-span-12 lg:col-span-5 bg-obsidianCad text-stonePaper p-6 border border-graphiteText shadow-brutal flex flex-col justify-between font-mono">
            <div>
              <div className="flex items-center gap-2 text-terracottaLight text-xs font-bold mb-4 border-b border-stonePaper/20 pb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>MÜHƏNDİS ZƏMANƏT PASPORTU</span>
              </div>

              <div className="space-y-4 text-xs mb-6">
                <div>
                  <span className="text-stonePaper/60 block text-[11px]">TƏXMİNİ İCRA MÜDDƏTİ:</span>
                  <span className="text-stonePaper font-bold text-sm">{activeNode.timeline}</span>
                </div>
                <div>
                  <span className="text-stonePaper/60 block text-[11px]">RƏSMİ MÜQAVİLƏ ZƏMANƏTİ:</span>
                  <span className="text-emerald-400 font-bold text-sm">{activeNode.guarantee}</span>
                </div>
                <div>
                  <span className="text-stonePaper/60 block text-[11px]">LAZIM OLAN SƏNƏDLƏŞMƏ:</span>
                  <span className="text-stonePaper">Usta yerində torpaq və divar ölçülərini götürür, 24 saat ərzində CAD eskiz və smeta təhvil verir.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stonePaper/20 flex flex-col gap-2">
              <a
                href="#lead"
                className="brutal-btn bg-terracotta text-stonePaper py-3 px-4 text-center text-xs flex items-center justify-center gap-2 hover:bg-[#b84a27]"
              >
                <span>Yalnız Bu Hissəni Sifariş Et</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#calculator"
                onClick={() => {
                  if (activeNode.id === 'foundation') setCalculator({ projectType: 'FOUNDATION' });
                  if (activeNode.id === 'masonry') setCalculator({ projectType: 'MASONRY_WALLS' });
                  if (activeNode.id === 'roof') setCalculator({ projectType: 'ROOF_MANSARD' });
                }}
                className="text-center font-mono text-xs text-stonePaper/70 hover:text-stonePaper py-1 underline"
              >
                Bu hissənin smetasını hesabla
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
