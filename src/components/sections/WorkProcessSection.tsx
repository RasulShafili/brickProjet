'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Hammer, RotateCcw, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    stageLabel: 'BÜNÖVRƏ VƏ BETON',
    measure: '25%',
    title: '[1-ci Mərhələnin Başlığı]',
    desc: '[Bura 1-ci iş mərhələsi haqqında qısa açıqlama yazılacaq.]',
  },
  {
    num: '02',
    stageLabel: 'KUBİK DİVAR HÖRGÜSÜ',
    measure: '50%',
    title: '[2-ci Mərhələnin Başlığı]',
    desc: '[Bura 2-ci iş mərhələsi haqqında qısa açıqlama yazılacaq.]',
  },
  {
    num: '03',
    stageLabel: 'KRANLA DAM ÖRTÜYÜ',
    measure: '75%',
    title: '[3-cü Mərhələnin Başlığı]',
    desc: '[Bura 3-cü iş mərhələsi haqqında qısa açıqlama yazılacaq.]',
  },
  {
    num: '04',
    stageLabel: 'TAM TƏHVİL // 100%',
    measure: '100%',
    title: '[4-cü Mərhələnin Başlığı]',
    desc: '[Bura 4-cü iş mərhələsi haqqında qısa açıqlama yazılacaq.]',
  },
];

/**
 * İŞ PROSESİ BÖLMƏSİ ANİMASİYASI (Bölmə 3):
 * "Bünövrədən Dama 4 Mərhələli Canlı Ev Tikintisi + Sarı-Qara Tikinti Ruletkası (Ölçü Lenti)"
 * - Mərhələ 1: Beton bünövrə və armatur dirəklər tökülür (1-ci kart açılır).
 * - Mərhələ 2: Kubiklər sürətlə üst-üstə yığılaraq 1-ci və 2-ci mərtəbənin divarlarını hörür (2-ci kart açılır).
 * - Mərhələ 3: Yuxarıdan qülləli kran qarmağı enir və kirəmit dam örtüyünü evin üstünə oturdur (3-cü kart açılır).
 * - Mərhələ 4: Evin pəncərələrində isti işıqlar yanır, "100% HAZIR" möhürü vurulur (4-cü kart açılır).
 */
export default function WorkProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [animKey, setAnimKey] = useState(0);
  const hasTriggeredRef = useRef(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const runProcessAnimation = () => {
    clearTimers();
    setActiveStage(0);
    setAnimKey((prev) => prev + 1);

    requestAnimationFrame(() => {
      // Sürətli 1 -> 2 -> 3 -> 4 ardıcıllığı
      timersRef.current.push(setTimeout(() => setActiveStage(1), 60));    // 01: Bünövrə + 1-ci Kart
      timersRef.current.push(setTimeout(() => setActiveStage(2), 460));   // 02: Kubik Hörgü + 2-ci Kart
      timersRef.current.push(setTimeout(() => setActiveStage(3), 880));   // 03: Kranla Dam + 3-cü Kart
      timersRef.current.push(setTimeout(() => setActiveStage(4), 1300));  // 04: İşıqlar & Tam Təhvil + 4-cü Kart
    });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          runProcessAnimation();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, []);

  const tapePercent = activeStage * 25;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="px-3 sm:px-8 py-14 lg:py-20 bg-[#FFFFFF] border-b-2 border-[#262626] relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Başlıq və Təkrar İzlə Düyməsi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 border-b-2 border-[#262626] pb-4">
          <div>
            <div className="font-mono text-xs text-[#C85A32] font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
              <Hammer className="w-4 h-4" />
              <span>[İş prosesi üst etiketi]</span>
            </div>
            <h2 className="text-xl sm:text-4xl font-black text-[#262626] uppercase tracking-tight">
              [Bura İş Prosesi bölməsinin başlığı yazılacaq]
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runProcessAnimation}
              className="brick-btn bg-[#F4F0DB] text-[#262626] hover:bg-[#C85A32] hover:text-white px-3.5 py-2 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
              title="4 mərhələli ev tikintisi animasiyasını yenidən başlat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Prosesi Təkrar İzlə</span>
            </button>
          </div>
        </div>

        {/* =====================================================================
            1. CANLI 4 MƏRHƏLƏLİ EV TİKİNTİSİ SƏHNƏSİ (BÜNÖVRƏ -> HÖRGÜ -> DAM -> TƏHVİL)
           ===================================================================== */}
        <div
          key={`process-scene-${animKey}`}
          className="relative w-full bg-[#F4F0DB] border-2 border-[#262626] shadow-[4px_4px_0px_#262626] p-3 sm:p-5 mb-5 overflow-hidden select-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Sol / Mərkəz: Canlı Tikilən Ev və Kran Vektor Səhnəsi */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#FFFFFF] border-2 border-[#262626] p-2 sm:p-3 relative overflow-hidden">
              {/* Arxa fon texniki tor */}
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Mərhələ Etiketi */}
              <div className="w-full flex items-center justify-between font-mono text-[10px] sm:text-xs font-bold mb-1 z-10 px-1">
                <span className="bg-[#262626] text-[#F4F0DB] px-2 py-0.5">
                  MƏRHƏLƏ: 0{activeStage} / 04
                </span>
                <span className="text-[#C85A32] font-black">
                  {activeStage === 0 && 'HAZIRLIQ...'}
                  {activeStage === 1 && '01 // BÜNÖVRƏ BETONU TÖKÜLÜR'}
                  {activeStage === 2 && '02 // KUBİK DİVARLAR HÖRÜLÜR'}
                  {activeStage === 3 && '03 // KRANLA DAM QURAŞDIRILIR'}
                  {activeStage === 4 && '04 // TİKİNTİ TAMAMLANDI (100%)'}
                </span>
              </div>

              <svg
                viewBox="0 0 500 220"
                className="w-full max-w-[440px] h-[155px] sm:h-[195px] overflow-visible relative z-10"
              >
                {/* Torpaq / Tikinti Qrunt Xətti */}
                <line x1="20" y1="196" x2="480" y2="196" stroke="#262626" strokeWidth="4" />
                <rect x="20" y="196" width="460" height="14" fill="#D6CFC2" />
                <line x1="20" y1="202" x2="480" y2="202" stroke="#262626" strokeWidth="1.5" strokeDasharray="8 6" />

                {/* --- SOLDA QÜLLƏLİ TİKİNTİ KRANI (TOWER CRANE) --- */}
                <g>
                  {/* Kranın şaquli metal qülləsi */}
                  <rect x="44" y="16" width="16" height="180" fill="none" stroke="#262626" strokeWidth="2.5" />
                  {[30, 54, 78, 102, 126, 150, 174].map((ky) => (
                    <g key={ky}>
                      <line x1="44" y1={ky} x2="60" y2={ky + 18} stroke="#D97706" strokeWidth="2" />
                      <line x1="60" y1={ky} x2="44" y2={ky + 18} stroke="#D97706" strokeWidth="2" />
                    </g>
                  ))}
                  {/* Kranın üfüqi oxu (Boom) */}
                  <rect x="24" y="12" width="320" height="10" fill="#FACC15" stroke="#262626" strokeWidth="2.5" />
                  {/* Kran kabinası */}
                  <rect x="40" y="24" width="24" height="20" rx="2" fill="#FACC15" stroke="#262626" strokeWidth="2.5" />
                  <rect x="48" y="27" width="13" height="10" fill="#38BDF8" stroke="#262626" strokeWidth="1.5" />
                  {/* Əks-çəki bloku */}
                  <rect x="20" y="16" width="16" height="18" fill="#4B5563" stroke="#262626" strokeWidth="2" />

                  {/* Kranın hərəkətli arabacığı və qarmağı (Mərhələ 3-də damı gətirir, Mərhələ 4-də yuxarı çəkilir) */}
                  <g
                    style={{
                      transform:
                        activeStage === 3
                          ? 'translate3d(260px, 0px, 0px)'
                          : activeStage >= 4
                          ? 'translate3d(135px, 0px, 0px)'
                          : 'translate3d(180px, 0px, 0px)',
                      transition: 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <rect x="-12" y="20" width="24" height="7" fill="#262626" />
                    <line
                      x1="0"
                      y1="27"
                      x2="0"
                      y2={activeStage === 3 ? '52' : '38'}
                      stroke="#262626"
                      strokeWidth="2.5"
                      className="transition-all duration-300"
                    />
                    <circle
                      cx="0"
                      cy={activeStage === 3 ? 55 : 41}
                      r="5"
                      fill="#C85A32"
                      stroke="#262626"
                      strokeWidth="2"
                      className="transition-all duration-300"
                    />
                  </g>
                </g>

                {/* =========================================================
                    MƏRHƏLƏ 01: BETON BÜNÖVRƏ VƏ ARMATUR DİRƏKLƏR
                   ========================================================= */}
                <g
                  style={{
                    transformOrigin: '260px 196px',
                    transform: activeStage >= 1 ? 'scaleY(1)' : 'scaleY(0)',
                    opacity: activeStage >= 1 ? 1 : 0,
                    transition: 'transform 320ms cubic-bezier(0.2, 0.95, 0.3, 1.05), opacity 200ms ease',
                  }}
                >
                  {/* Armatur çıxıntıları */}
                  {[155, 195, 235, 285, 325, 365].map((rx) => (
                    <line
                      key={rx}
                      x1={rx}
                      y1="162"
                      x2={rx}
                      y2="180"
                      stroke="#4B5563"
                      strokeWidth="2.5"
                      strokeDasharray="3 2"
                    />
                  ))}
                  {/* Beton Bünövrə Plitəsi */}
                  <rect
                    x="132"
                    y="174"
                    width="256"
                    height="22"
                    fill="#788088"
                    stroke="#262626"
                    strokeWidth="3"
                  />
                  <line x1="138" y1="181" x2="382" y2="181" stroke="#9CA3AF" strokeWidth="2.5" />
                  <text x="260" y="190" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    BETON BÜNÖVRƏ M-400
                  </text>
                </g>

                {/* =========================================================
                    MƏRHƏLƏ 02: KUBİK HÖRGÜ DİVARLARI VƏ PƏNCƏRƏ ÇƏRÇİVƏLƏRİ
                   ========================================================= */}
                <g
                  style={{
                    transformOrigin: '260px 174px',
                    transform: activeStage >= 2 ? 'scaleY(1)' : 'scaleY(0)',
                    opacity: activeStage >= 2 ? 1 : 0,
                    transition: 'transform 360ms cubic-bezier(0.2, 0.95, 0.3, 1.05), opacity 220ms ease',
                  }}
                >
                  {/* Əsas kərpic fasad gövdəsi */}
                  <rect
                    x="144"
                    y="92"
                    width="232"
                    height="82"
                    fill="#C85A32"
                    stroke="#262626"
                    strokeWidth="3"
                  />

                  {/* Üfüqi kubik hörgü tikiş xətləri */}
                  {[108, 124, 140, 156].map((by) => (
                    <line key={by} x1="144" y1={by} x2="376" y2={by} stroke="#262626" strokeWidth="2" />
                  ))}

                  {/* Şaquli kubik tikiş xətləri (şahmat qaydasında) */}
                  {[172, 202, 232, 262, 292, 322, 350].map((bx, i) => (
                    <g key={bx}>
                      <line x1={bx} y1="92" x2={bx} y2="108" stroke="#262626" strokeWidth="2" />
                      <line x1={bx + (i % 2 === 0 ? 14 : -12)} y1="108" x2={bx + (i % 2 === 0 ? 14 : -12)} y2="124" stroke="#262626" strokeWidth="2" />
                      <line x1={bx} y1="124" x2={bx} y2="140" stroke="#262626" strokeWidth="2" />
                      <line x1={bx + (i % 2 === 0 ? 14 : -12)} y1="140" x2={bx + (i % 2 === 0 ? 14 : -12)} y2="156" stroke="#262626" strokeWidth="2" />
                      <line x1={bx} y1="156" x2={bx} y2="174" stroke="#262626" strokeWidth="2" />
                    </g>
                  ))}

                  {/* Sol Pəncərə (Mərhələ 4-də işığı yanır) */}
                  <rect
                    x="166"
                    y="112"
                    width="42"
                    height="36"
                    fill={activeStage >= 4 ? '#FDE047' : '#334155'}
                    stroke="#262626"
                    strokeWidth="3"
                    className="transition-colors duration-300"
                  />
                  <line x1="187" y1="112" x2="187" y2="148" stroke="#262626" strokeWidth="2.5" />
                  <line x1="166" y1="130" x2="208" y2="130" stroke="#262626" strokeWidth="2.5" />

                  {/* Mərkəzi Giriş Qapısı */}
                  <rect
                    x="240"
                    y="122"
                    width="40"
                    height="52"
                    fill="#262626"
                    stroke="#111"
                    strokeWidth="3"
                  />
                  <rect x="246" y="128" width="28" height="46" fill="#78350F" stroke="#262626" strokeWidth="2" />
                  <circle cx="268" cy="152" r="2.5" fill="#FACC15" />

                  {/* Sağ Pəncərə (Mərhələ 4-də işığı yanır) */}
                  <rect
                    x="312"
                    y="112"
                    width="42"
                    height="36"
                    fill={activeStage >= 4 ? '#FDE047' : '#334155'}
                    stroke="#262626"
                    strokeWidth="3"
                    className="transition-colors duration-300"
                  />
                  <line x1="333" y1="112" x2="333" y2="148" stroke="#262626" strokeWidth="2.5" />
                  <line x1="312" y1="130" x2="354" y2="130" stroke="#262626" strokeWidth="2.5" />
                </g>

                {/* =========================================================
                    MƏRHƏLƏ 03: KRANLA ENƏN DAM ÖRTÜYÜ (ÇEREPİTSA)
                   ========================================================= */}
                <g
                  style={{
                    transform:
                      activeStage >= 3
                        ? 'translate3d(0px, 0px, 0px)'
                        : 'translate3d(0px, -65px, 0px)',
                    opacity: activeStage >= 3 ? 1 : 0,
                    transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease',
                  }}
                >
                  {/* Baca (Chimney) */}
                  <rect x="320" y="48" width="22" height="32" fill="#9E3F20" stroke="#262626" strokeWidth="2.5" />
                  {/* Üçbucaq Dam */}
                  <polygon
                    points="126,92 260,38 394,92"
                    fill="#9E3F20"
                    stroke="#262626"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  {/* Dam kornizi və çerepitsa xətləri */}
                  <line x1="162" y1="78" x2="358" y2="78" stroke="#262626" strokeWidth="2" />
                  <line x1="198" y1="64" x2="322" y2="64" stroke="#262626" strokeWidth="2" />
                  {/* Çardaq pəncərəsi */}
                  <circle
                    cx="260"
                    cy="70"
                    r="10"
                    fill={activeStage >= 4 ? '#FDE047' : '#334155'}
                    stroke="#262626"
                    strokeWidth="2.5"
                  />
                </g>

                {/* =========================================================
                    MƏRHƏLƏ 04: TAM TƏHVİL NİŞANI (100% HAZIR MÖHÜRÜ)
                   ========================================================= */}
                <g
                  style={{
                    transformOrigin: '430px 68px',
                    transform: activeStage >= 4 ? 'scale(1) rotate(-6deg)' : 'scale(1.8) rotate(-20deg)',
                    opacity: activeStage >= 4 ? 1 : 0,
                    transition: 'transform 280ms cubic-bezier(0.2, 0.95, 0.3, 1.15), opacity 180ms ease',
                  }}
                >
                  <rect
                    x="386"
                    y="46"
                    width="90"
                    height="36"
                    rx="3"
                    fill="#15803D"
                    stroke="#262626"
                    strokeWidth="3"
                  />
                  <text x="431" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    TAM HAZIR
                  </text>
                  <text x="431" y="75" textAnchor="middle" fill="#FDE047" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    ✓ 100% TƏHVİL
                  </text>
                </g>
              </svg>
            </div>

            {/* Sağ 5 Sütun: Sarı-Qara Tikinti Ruletkası (Ölçü Lenti) və İnteraktiv Mərhələ Seçici */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
              <div className="bg-[#262626] text-[#F4F0DB] p-3 sm:p-4 border-2 border-[#262626] font-mono">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#FACC15] font-bold uppercase">TİKİNTİ RULETKASI // ÖLÇÜ XƏTTİ</span>
                  <span className="px-2 py-0.5 bg-[#C85A32] text-white font-black text-xs">
                    {tapePercent}%
                  </span>
                </div>

                {/* Sarı-Qara Ölçü Lenti (Ruletka) */}
                <div className="relative w-full h-7 bg-[#1A1A1A] border-2 border-[#F4F0DB] overflow-hidden">
                  <div
                    style={{
                      width: `${tapePercent}%`,
                      transition: 'width 340ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    className="h-full bg-[#FACC15] relative flex items-end overflow-hidden border-r-4 border-[#C85A32]"
                  >
                    {/* Ruletka santimetr cizgiləri */}
                    <div
                      className="w-full h-3"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(to right, #1A1A1A 0px, #1A1A1A 2px, transparent 2px, transparent 10px)',
                      }}
                    />
                  </div>
                </div>

                {/* Mərhələ düymələri (istifadəçi istənilən mərhələyə toxuna bilər) */}
                <div className="grid grid-cols-4 gap-1.5 mt-3">
                  {[1, 2, 3, 4].map((st) => (
                    <button
                      key={st}
                      onClick={() => setActiveStage(st as 1 | 2 | 3 | 4)}
                      className={`py-1.5 font-mono text-[10px] font-bold border transition-all cursor-pointer ${
                        activeStage >= st
                          ? 'bg-[#C85A32] text-white border-[#F4F0DB]'
                          : 'bg-[#1A1A1A] text-[#F4F0DB]/60 border-[#F4F0DB]/30'
                      }`}
                    >
                      0{st} // {st * 25}%
                    </button>
                  ))}
                </div>
              </div>

              <p className="font-mono text-xs text-[#262626]/85 leading-relaxed px-1">
                [Bura iş prosesiniz haqqında qısa alt açıqlama yazılacaq.]
              </p>
            </div>

          </div>
        </div>

        {/* =====================================================================
            2. YUXARIDAN AŞAĞIYA 1 -> 2 -> 3 -> 4 ARDICILLIĞI İLƏ AÇILAN 4 MƏRHƏLƏ KARTI
           ===================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {STEPS.map((s, idx) => {
            const stepNum = idx + 1;
            const isStepActive = activeStage >= stepNum;
            const isCurrentStep = activeStage === stepNum;

            return (
              <div
                key={idx}
                onClick={() => setActiveStage(stepNum as 1 | 2 | 3 | 4)}
                style={{
                  transform: isStepActive
                    ? 'translate3d(0, 0, 0) scale(1)'
                    : 'translate3d(0, -14px, 0) scale(0.93)',
                  opacity: isStepActive ? 1 : 0.15,
                  transition: 'transform 260ms cubic-bezier(0.2, 0.95, 0.3, 1.05), opacity 220ms ease-out',
                }}
                className={`brick-card p-3.5 sm:p-5 flex flex-col justify-between cursor-pointer transition-colors ${
                  isCurrentStep
                    ? 'bg-[#FFFFFF] border-[#C85A32] shadow-[4px_4px_0px_#C85A32]'
                    : 'bg-[#F4F0DB] hover:bg-[#FFFFFF]'
                }`}
              >
                <div>
                  {/* Üst Nömrə və Ölçü Nişanı */}
                  <div className="flex items-center justify-between font-mono text-xs mb-2.5 border-b-2 border-[#262626]/20 pb-2">
                    <span className="text-lg sm:text-2xl font-black text-[#C85A32]">{s.num} //</span>
                    <span className="px-1.5 py-0.5 bg-[#262626] text-[#FACC15] text-[9px] sm:text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#C85A32]" />
                      {s.measure}
                    </span>
                  </div>

                  {/* Mərhələ Texniki Etiketi */}
                  <div className="font-mono text-[9px] sm:text-[10px] font-bold text-[#C85A32] uppercase mb-1">
                    {s.stageLabel}
                  </div>

                  <h3 className="text-xs sm:text-base font-black text-[#262626] mb-1.5 uppercase leading-snug">
                    {s.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-[#262626]/80 leading-relaxed font-mono">
                    {s.desc}
                  </p>
                </div>

                {/* Alt Kərpic Zolağı */}
                <div className="mt-3 pt-2 border-t border-[#262626]/15 flex items-center justify-between font-mono text-[9px] sm:text-[10px] font-bold text-[#262626]/70">
                  <span>MƏRHƏLƏ 0{stepNum}</span>
                  <span className="w-2.5 h-2.5 bg-[#C85A32] border border-[#262626]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
