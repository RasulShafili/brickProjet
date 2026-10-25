'use client';

import React, { useState } from 'react';
import { Layers, Eye, Compass, Download, ZoomIn, Check, Info } from 'lucide-react';
import { useConstructionStore } from '@/store/useConstructionStore';

export default function BlueprintLabSection() {
  const { activeCadLayers, toggleCadLayer } = useConstructionStore();
  const [lensPos, setLensPos] = useState({ x: 350, y: 220, isHovering: false });
  const [activeFloor, setActiveFloor] = useState<'ground' | 'first'>('ground');

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLensPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true,
    });
  };

  return (
    <section id="blueprint" className="px-[4%] py-20 border-b border-graphiteText bg-blueprint text-stonePaper">
      <div className="max-w-7xl mx-auto">
        
        {/* Bölmə Başlığı */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-stonePaper/20 pb-6">
          <div>
            <div className="font-mono text-xs text-terracottaLight font-bold tracking-widest uppercase mb-2">
              [MODUL 03 // MÜHƏNDİS ÇERTYOJ LABORATORİYASI]
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stonePaper">
              Canlanan Sxemlər və Memarlıq Çertyojları
            </h2>
          </div>
          <p className="font-mono text-xs max-w-md text-stonePaper/80 leading-relaxed">
            Statik şəkillər deyil, hər kvadratmetri düşünülmüş real mühəndis həlləri. 
            Qatları açıb-bağlayaraq divarların içindəki dəmir-beton və kərpic skeletini araşdırın.
          </p>
        </div>

        {/* Laboratoriya Şəbəkəsi: Sol 4 sütun idarəetmə / Sağ 8 sütun SVG lövhə */}
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* SOL 4 SÜTUN: Qat Açarları və Planın Həyat Məntiqi */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            
            {/* Mərtəbə Seçimi */}
            <div className="bg-obsidianCad/80 border border-stonePaper/30 p-4 shadow-brutalSm">
              <span className="font-mono text-xs text-terracottaLight font-bold block mb-3 uppercase">
                MƏRTƏBƏ SEÇİMİ:
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <button
                  onClick={() => setActiveFloor('ground')}
                  className={`py-2 px-3 border transition-colors ${
                    activeFloor === 'ground'
                      ? 'bg-stonePaper text-graphiteText border-stonePaper font-bold'
                      : 'bg-transparent text-stonePaper border-stonePaper/30 hover:border-stonePaper'
                  }`}
                >
                  1-ci Mərtəbə (Giriş)
                </button>
                <button
                  onClick={() => setActiveFloor('first')}
                  className={`py-2 px-3 border transition-colors ${
                    activeFloor === 'first'
                      ? 'bg-stonePaper text-graphiteText border-stonePaper font-bold'
                      : 'bg-transparent text-stonePaper border-stonePaper/30 hover:border-stonePaper'
                  }`}
                >
                  Mansard / 2-ci Mərtəbə
                </button>
              </div>
            </div>

            {/* Qat Açarları (Layer Toggles) */}
            <div className="bg-obsidianCad/80 border border-stonePaper/30 p-4 shadow-brutalSm">
              <span className="font-mono text-xs text-terracottaLight font-bold block mb-3 uppercase">
                KONSTRUKTİV QATLAR (LAYERS):
              </span>
              <div className="space-y-2 font-mono text-xs">
                <button
                  onClick={() => toggleCadLayer('masonry')}
                  className="w-full border border-stonePaper/40 px-3 py-2 text-left flex items-center justify-between hover:bg-stonePaper/10 transition-colors"
                >
                  <span>Qat 01: Daşıyıcı Kərpic Hörgü (380mm)</span>
                  <span className={`w-4 h-4 border flex items-center justify-center ${activeCadLayers.masonry ? 'bg-terracotta text-white border-terracotta' : 'border-stonePaper/50'}`}>
                    {activeCadLayers.masonry && <Check className="w-3 h-3" />}
                  </span>
                </button>

                <button
                  onClick={() => toggleCadLayer('foundation')}
                  className="w-full border border-stonePaper/40 px-3 py-2 text-left flex items-center justify-between hover:bg-stonePaper/10 transition-colors"
                >
                  <span>Qat 02: Lentvari Monolit Bünövrə</span>
                  <span className={`w-4 h-4 border flex items-center justify-center ${activeCadLayers.foundation ? 'bg-amber-500 text-graphiteText border-amber-500' : 'border-stonePaper/50'}`}>
                    {activeCadLayers.foundation && <Check className="w-3 h-3" />}
                  </span>
                </button>

                <button
                  onClick={() => toggleCadLayer('roofTruss')}
                  className="w-full border border-stonePaper/40 px-3 py-2 text-left flex items-center justify-between hover:bg-stonePaper/10 transition-colors"
                >
                  <span>Qat 03: Dam Stropil Fermaları</span>
                  <span className={`w-4 h-4 border flex items-center justify-center ${activeCadLayers.roofTruss ? 'bg-emerald-500 text-graphiteText border-emerald-500' : 'border-stonePaper/50'}`}>
                    {activeCadLayers.roofTruss && <Check className="w-3 h-3" />}
                  </span>
                </button>

                <button
                  onClick={() => toggleCadLayer('dimensions')}
                  className="w-full border border-stonePaper/40 px-3 py-2 text-left flex items-center justify-between hover:bg-stonePaper/10 transition-colors"
                >
                  <span>Qat 04: Ölçü Oxları & Kotlar</span>
                  <span className={`w-4 h-4 border flex items-center justify-center ${activeCadLayers.dimensions ? 'bg-blue-400 text-graphiteText border-blue-400' : 'border-stonePaper/50'}`}>
                    {activeCadLayers.dimensions && <Check className="w-3 h-3" />}
                  </span>
                </button>
              </div>
            </div>

            {/* Planın Həyat Məntiqi (Ustanın Qeydləri) */}
            <div className="bg-obsidianCad/80 border border-stonePaper/30 p-4 shadow-brutalSm font-mono text-xs">
              <div className="flex items-center gap-2 text-terracottaLight font-bold mb-2">
                <Info className="w-4 h-4" />
                <span>PLANIN HƏYAT MƏNTİQİ:</span>
              </div>
              <p className="text-stonePaper/80 leading-relaxed mb-3">
                «Bu layihədə daşıyıcı 380mm kərpic divarlar şimal tərəfdən gələn Xəzri küləyinə qarşı qapalı qalxan yaradır. 
                Geniş qonaq otağı və mətbəx cənub-şərq günəşini maksimum tutacaq şəkildə yönləndirilib. 
                Qarajdan birbaşa mətbəx anbarına keçid isə yağışlı günlərdə hərəkət marşrutunu 45% qısaldır.»
              </p>
              <div className="p-2 bg-stonePaper/5 border border-stonePaper/10 text-[11px] text-terracottaLight">
                Ümumi Sahə: <strong>186.4 m²</strong> // Hündürlük: <strong>3.20m</strong>
              </div>
            </div>

          </div>

          {/* SAĞ 8 SÜTUN: İnteraktiv SVG Blueprint & Kərpic Linza Lövhəsi */}
          <div className="col-span-12 lg:col-span-8 bg-obsidianCad border-2 border-stonePaper/40 p-4 lg:p-6 shadow-brutal relative overflow-hidden">
            
            {/* Lövhənin Yuxarı Statusu */}
            <div className="flex items-center justify-between font-mono text-xs border-b border-stonePaper/20 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping" />
                <span className="font-bold text-stonePaper">CAD BLUEPRINT MÜHİTİ // 1:50 MIQYAS</span>
              </div>
              <div className="text-[11px] text-stonePaper/60">
                * Kursoru çertyojun üzərində gəzdirərək kərpic linzasını yoxlayın
              </div>
            </div>

            {/* SVG İnteraktiv Cizgi */}
            <div className="relative w-full aspect-[16/10] bg-[#14233c] border border-blue-500/30 overflow-hidden">
              {/* Millimetr toru fonu */}
              <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none" />

              <svg
                viewBox="0 0 800 500"
                className="w-full h-full cursor-crosshair relative z-10"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setLensPos((p) => ({ ...p, isHovering: false }))}
              >
                {/* 1. Lentvari Bünövrə Qatı (Qırıq xətlər) */}
                {activeCadLayers.foundation && (
                  <g stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 4" fill="none">
                    <rect x="70" y="50" width="660" height="380" />
                    <line x1="320" y1="50" x2="320" y2="430" />
                    <line x1="320" y1="260" x2="730" y2="260" />
                    <line x1="520" y1="50" x2="520" y2="260" />
                  </g>
                )}

                {/* 2. Daşıyıcı Kərpic Divarlar Qatı (Möhkəm ağ/krem konturlar) */}
                {activeCadLayers.masonry && (
                  <g stroke="#FDF2DE" strokeWidth="6" strokeLinejoin="miter" fill="none">
                    {/* Xarici Kontur */}
                    <rect x="80" y="60" width="640" height="360" />
                    {/* Əsas Daxili Daşıyıcı Bölücü */}
                    <line x1="330" y1="60" x2="330" y2="420" />
                    {/* Qonaq Otağı / Mətbəx Arakəsməsi */}
                    <line x1="330" y1="250" x2="720" y2="250" />
                    {/* Yataq otaqları arakəsməsi */}
                    <line x1="530" y1="60" x2="530" y2="250" />
                    {/* Giriş Qapısı Oyuqu */}
                    <line x1="170" y1="420" x2="250" y2="420" stroke="#14233c" strokeWidth="8" />
                  </g>
                )}

                {/* 3. Dam Stropil Fermaları Qatı */}
                {activeCadLayers.roofTruss && (
                  <g stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" fill="none">
                    {[120, 200, 280, 360, 440, 520, 600, 680].map((x) => (
                      <line key={x} x1={x} y1="40" x2={x} y2="440" />
                    ))}
                    <line x1="80" y1="240" x2="720" y2="240" stroke="#10B981" strokeWidth="2.5" />
                  </g>
                )}

                {/* Otaq Adları və Sahələri (Semantic SVG & HTML) */}
                <g fill="#FDF2DE" className="font-mono text-xs select-none">
                  {/* Qonaq Otağı */}
                  <text x="140" y="160" fontWeight="bold">01. QONAQ OTAĞI</text>
                  <text x="140" y="185" fill="#E3C1AA" fontSize="11">42.5 m² // Parket</text>

                  {/* Mətbəx */}
                  <text x="140" y="320" fontWeight="bold">02. MƏTBƏX & YEMƏK</text>
                  <text x="140" y="345" fill="#E3C1AA" fontSize="11">24.0 m² // Metlax</text>

                  {/* Əsas Yataq Otağı */}
                  <text x="360" y="140" fontWeight="bold">03. YATAQ OTAĞI</text>
                  <text x="360" y="165" fill="#E3C1AA" fontSize="11">22.8 m² // Şərq</text>

                  {/* Uşaq Otağı */}
                  <text x="560" y="140" fontWeight="bold">04. UŞAQ OTAĞI</text>
                  <text x="560" y="165" fill="#E3C1AA" fontSize="11">19.2 m²</text>

                  {/* Sanitar Qovşağı */}
                  <text x="360" y="320" fontWeight="bold">05. SANQOVŞAQ</text>
                  <text x="360" y="345" fill="#E3C1AA" fontSize="11">8.5 m²</text>

                  {/* Terras */}
                  <text x="560" y="320" fontWeight="bold">06. AÇIQ TERRAS</text>
                  <text x="560" y="345" fill="#E3C1AA" fontSize="11">28.0 m²</text>
                </g>

                {/* 4. Ölçü Oxları & Kotlar */}
                {activeCadLayers.dimensions && (
                  <g stroke="#60A5FA" strokeWidth="1" fill="#60A5FA" className="font-mono text-[10px]">
                    {/* Üfüqi Ölçü Xətti */}
                    <line x1="80" y1="460" x2="720" y2="460" />
                    <line x1="80" y1="450" x2="80" y2="470" />
                    <line x1="720" y1="450" x2="720" y2="470" />
                    <text x="380" y="475" textAnchor="middle" fill="#93C5FD">
                      ◄ 16.00 m ►
                    </text>

                    {/* Şaquli Ölçü Xətti */}
                    <line x1="40" y1="60" x2="40" y2="420" />
                    <line x1="30" y1="60" x2="50" y2="60" />
                    <line x1="30" y1="420" x2="50" y2="420" />
                    <text x="25" y="245" textAnchor="middle" transform="rotate(-90 25 245)" fill="#93C5FD">
                      ◄ 11.50 m ►
                    </text>
                  </g>
                )}

                {/* İnteraktiv Kursor Linza Halqası */}
                {lensPos.isHovering && (
                  <g pointerEvents="none">
                    <circle
                      cx={lensPos.x}
                      cy={lensPos.y}
                      r="45"
                      fill="#C85A32"
                      fillOpacity="0.25"
                      stroke="#E3C1AA"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                    <text
                      x={lensPos.x + 50}
                      y={lensPos.y - 10}
                      fill="#E3C1AA"
                      className="font-mono text-[10px] font-bold"
                    >
                      KƏRPİC DÜYÜNÜ
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Lövhənin Alt Paneli */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-4 text-stonePaper/80">
                <span>Layihə Kodu: <strong>VK-2026-ABSHERON</strong></span>
                <span>Müəllif: <strong>Usta Briqadası</strong></span>
              </div>
              <a
                href="#lead"
                className="brutal-btn bg-stonePaper text-graphiteText px-3.5 py-1.5 flex items-center gap-1.5 hover:bg-terracotta hover:text-white"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Bu Layihənin Sxemini Sifariş Et</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
