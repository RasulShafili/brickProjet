'use client';

import React, { useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Box, Layers, Hammer, ShieldCheck } from 'lucide-react';
import { useConstructionStore, CalculatorState } from '@/store/useConstructionStore';

const PROJECT_TYPE_OPTIONS: { id: CalculatorState['projectType']; label: string; desc: string }[] = [
  { id: 'FULL_HOUSE', label: 'Bütöv Fərdi Ev', desc: 'Bünövrədən dama qədər bütöv tikinti' },
  { id: 'ROOF_MANSARD', label: 'Dam & Mansard', desc: 'Taxta stropil fermaları və kirəmit örtüyü' },
  { id: 'MASONRY_WALLS', label: 'Daşıyıcı Hörgü', desc: 'Qoşa kərpic və ya kubik divarlar' },
  { id: 'FOUNDATION', label: 'Bünövrə & Kürsülük', desc: 'Dəmir-beton monolit baza və hidroizolyasiya' },
  { id: 'BLUEPRINT_ONLY', label: 'Yalnız Sxem / CAD', desc: 'Mərtəbə planları və kəsik çertyojları' },
];

const MATERIAL_OPTIONS: { id: CalculatorState['materialType']; label: string; factor: number; desc: string }[] = [
  { id: 'red_brick', label: 'Bişmiş Qırmızı Kərpic', factor: 1.15, desc: '380mm qoşa kərpic, yüksək istilik və nəmişlik müqaviməti' },
  { id: 'sawed_stone', label: 'Abşeron Mişar Daşı (Kubik)', factor: 1.0, desc: 'Klassik Abşeron daşı, 400mm divar qalınlığı' },
  { id: 'aerated_concrete', label: 'Qazobeton Bloklar', factor: 0.95, desc: 'Yüngül çəki, sürətli quraşdırma və monolit kəmər' },
  { id: 'monolithic_concrete', label: 'Monolit Dəmir-Beton Karkas', factor: 1.25, desc: 'Maksimum seysmik dayanıqlıq (9 bal)' },
];

export default function CalculatorSection() {
  const { calculator, setCalculator, setIsQuickQuoteOpen } = useConstructionStore();

  // Riyazi Hesablama Mühərriki
  const calculation = useMemo(() => {
    const { projectType, areaM2, floors, materialType } = calculator;
    const effectiveArea = areaM2 * (floors > 1 ? 1.6 : 1.0);
    const materialObj = MATERIAL_OPTIONS.find((m) => m.id === materialType) || MATERIAL_OPTIONS[0];

    let baseCostPerM2 = 320; // AZN / m2 əsas baza
    let brickCount = Math.round(effectiveArea * 140); // 1 m2 ümumi sahəyə təxminən 140 kərpic
    let concreteM3 = Math.round(effectiveArea * 0.28); // m3 monolit beton
    let days = Math.round(effectiveArea * 0.45);

    if (projectType === 'FULL_HOUSE') {
      baseCostPerM2 = 380;
      days = Math.max(90, Math.round(effectiveArea * 0.65));
    } else if (projectType === 'ROOF_MANSARD') {
      baseCostPerM2 = 85;
      brickCount = 0;
      concreteM3 = Math.round(effectiveArea * 0.05);
      days = Math.max(14, Math.round(effectiveArea * 0.12));
    } else if (projectType === 'MASONRY_WALLS') {
      baseCostPerM2 = 110;
      concreteM3 = Math.round(effectiveArea * 0.08); // Yalnız seysmik kəmər və lintellər
      days = Math.max(18, Math.round(effectiveArea * 0.2));
    } else if (projectType === 'FOUNDATION') {
      baseCostPerM2 = 130;
      brickCount = 0;
      concreteM3 = Math.round(effectiveArea * 0.22);
      days = Math.max(12, Math.round(effectiveArea * 0.15));
    } else if (projectType === 'BLUEPRINT_ONLY') {
      baseCostPerM2 = 12;
      brickCount = 0;
      concreteM3 = 0;
      days = Math.max(5, Math.round(effectiveArea * 0.04));
    }

    const minCost = Math.round(effectiveArea * baseCostPerM2 * materialObj.factor);
    const maxCost = Math.round(minCost * 1.22);

    return {
      minCost,
      maxCost,
      brickCount,
      concreteM3,
      days,
    };
  }, [calculator]);

  return (
    <section id="calculator" className="px-[4%] py-20 border-b border-graphiteText bg-stonePaperLight">
      <div className="max-w-7xl mx-auto">
        
        {/* Başlıq */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-graphiteText pb-6">
          <div>
            <div className="font-mono text-xs text-terracotta font-bold tracking-widest uppercase mb-2">
              [MODUL 06 // ŞƏFFAF SMETA VƏ MATERİAL KALKULYATORU]
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-graphiteText">
              4 Addımda Tikinti Xərcinizi Hesablayın
            </h2>
          </div>
          <p className="font-mono text-xs max-w-md text-graphiteText/80 leading-relaxed">
            Gizli əlavə xərclər yoxdur. Material həcmi, tələb olunan kərpic və beton miqdarı 
            tikinti normaları (SNiP) əsasında avtomatik hesablanır.
          </p>
        </div>

        {/* 12 Sütunlu Kalkulyator: Sol 7 Sütun Seçici / Sağ 5 Sütun Nəticə */}
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* SOL 7 SÜTUN: 4 Addımlı Seçici */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            
            {/* ADDIM 1: Layihə Növü */}
            <div className="brutal-card bg-stonePaper p-5">
              <span className="font-mono text-xs text-terracotta font-bold block mb-3 uppercase">
                ADDIM 01 // NƏ TİKDİRMƏK İSTƏYİRSİNİZ?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                {PROJECT_TYPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalculator({ projectType: opt.id })}
                    className={`p-3 text-left border transition-all ${
                      calculator.projectType === opt.id
                        ? 'bg-obsidianCad text-stonePaper border-graphiteText shadow-brutalSm font-bold'
                        : 'bg-stonePaperLight text-graphiteText border-graphiteText/40 hover:border-graphiteText'
                    }`}
                  >
                    <div className="text-sm font-bold mb-0.5">{opt.label}</div>
                    <div className="text-[10px] opacity-75">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* ADDIM 2: Sahə və Mərtəbə */}
            <div className="brutal-card bg-stonePaper p-5 font-mono text-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-terracotta font-bold uppercase">
                  ADDIM 02 // TİKİNTİ SAHƏSİ VƏ MƏRTƏBƏ SAYI:
                </span>
                <span className="bg-graphiteText text-stonePaper px-2 py-0.5 font-bold text-sm">
                  {calculator.areaM2} m²
                </span>
              </div>

              {/* Sürgü */}
              <input
                type="range"
                min="40"
                max="450"
                step="5"
                value={calculator.areaM2}
                onChange={(e) => setCalculator({ areaM2: parseInt(e.target.value) })}
                className="w-full h-2 bg-graphiteText/20 accent-terracotta cursor-pointer mb-2"
              />
              <div className="flex justify-between text-[10px] text-graphiteText/60 mb-5">
                <span>40 m² (Kompakt bağ evi)</span>
                <span>200 m² (Orta villa)</span>
                <span>450 m² (Geniş mülk)</span>
              </div>

              {/* Mərtəbə Seçimi */}
              <div className="flex items-center gap-3">
                <span className="text-graphiteText/80 font-bold">Mərtəbə Sayı:</span>
                <button
                  onClick={() => setCalculator({ floors: 1 })}
                  className={`px-4 py-1.5 border ${
                    calculator.floors === 1
                      ? 'bg-terracotta text-white border-graphiteText font-bold'
                      : 'bg-stonePaperLight text-graphiteText border-graphiteText/40'
                  }`}
                >
                  1 Mərtəbə
                </button>
                <button
                  onClick={() => setCalculator({ floors: 2 })}
                  className={`px-4 py-1.5 border ${
                    calculator.floors === 2
                      ? 'bg-terracotta text-white border-graphiteText font-bold'
                      : 'bg-stonePaperLight text-graphiteText border-graphiteText/40'
                  }`}
                >
                  2 Mərtəbə / Mansard
                </button>
              </div>
            </div>

            {/* ADDIM 3: Material Növü */}
            <div className="brutal-card bg-stonePaper p-5">
              <span className="font-mono text-xs text-terracotta font-bold block mb-3 uppercase">
                ADDIM 03 // ƏSAS MATERİAL SEÇİMİ:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                {MATERIAL_OPTIONS.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setCalculator({ materialType: mat.id })}
                    className={`p-3 text-left border transition-all ${
                      calculator.materialType === mat.id
                        ? 'bg-obsidianCad text-stonePaper border-graphiteText shadow-brutalSm font-bold'
                        : 'bg-stonePaperLight text-graphiteText border-graphiteText/40 hover:border-graphiteText'
                    }`}
                  >
                    <div className="text-xs font-bold mb-0.5">{mat.label}</div>
                    <div className="text-[10px] opacity-75">{mat.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* SAĞ 5 SÜTUN: Dinamik Smeta Paneli & Material Həcmi */}
          <div className="col-span-12 lg:col-span-5 bg-obsidianCad text-stonePaper border-2 border-graphiteText p-6 shadow-brutal flex flex-col justify-between font-mono">
            <div>
              <div className="flex items-center justify-between border-b border-stonePaper/20 pb-3 mb-6">
                <span className="text-xs font-bold text-terracottaLight flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  <span>DİNAMİK SMETA NƏTİCƏSİ</span>
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 border border-emerald-500/30">
                  REAL VAXT
                </span>
              </div>

              {/* Təxmini Qiymət Aralığı */}
              <div className="mb-6 bg-white/5 p-4 border border-white/10">
                <span className="text-stonePaper/60 text-[11px] block mb-1">
                  TƏXMİNİ MATERİAL + İŞÇİLİK ARALIĞI:
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-terracottaLight">
                  {calculation.minCost.toLocaleString()} – {calculation.maxCost.toLocaleString()} ₼
                </div>
                <div className="text-[10px] text-stonePaper/60 mt-1">
                  * Dəqiq qiymət torpaq relyefi və seçilmiş dam kirəmitinə görə dəqiqləşdirilir.
                </div>
              </div>

              {/* Material Həcmi Göstəriciləri */}
              <div className="space-y-3 text-xs mb-8">
                {calculation.brickCount > 0 && (
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-stonePaper/70 flex items-center gap-1.5">
                      <Box className="w-3.5 h-3.5 text-terracotta" />
                      <span>Kərpic Həcmi:</span>
                    </span>
                    <strong className="text-stonePaper">~{calculation.brickCount.toLocaleString()} ədəd</strong>
                  </div>
                )}

                {calculation.concreteM3 > 0 && (
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-stonePaper/70 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-400" />
                      <span>B25 Monolit Beton:</span>
                    </span>
                    <strong className="text-stonePaper">~{calculation.concreteM3} m³</strong>
                  </div>
                )}

                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-stonePaper/70 flex items-center gap-1.5">
                    <Hammer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Təxmini Tikinti Müddəti:</span>
                  </span>
                  <strong className="text-stonePaper">~{calculation.days} iş günü</strong>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-stonePaper/70 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Konstruktiv Zəmanət:</span>
                  </span>
                  <strong className="text-emerald-400">10 İl Müqavilə ilə</strong>
                </div>
              </div>
            </div>

            {/* Dəqiq Smeta Üçün Əlaqə Forması */}
            <div className="pt-4 border-t border-stonePaper/20">
              <a
                href="#lead"
                className="brutal-btn w-full bg-terracotta text-stonePaper py-3.5 px-4 text-center text-xs flex items-center justify-center gap-2 hover:bg-[#b84a27]"
              >
                <span>Bu Hesablama Üzrə Rəsmi Smeta Tələb Et</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-stonePaper/60 text-center mt-2">
                Öhdəliksizdir // Usta 24 saat ərzində dəqiq çertyoj və smetanı təqdim edir
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
