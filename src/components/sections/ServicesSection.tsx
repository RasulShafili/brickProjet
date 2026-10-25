'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, Truck } from 'lucide-react';

const SERVICES = [
  {
    code: '01',
    title: '[1-ci Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 1-ci xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '02',
    title: '[2-ci Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 2-ci xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '03',
    title: '[3-cü Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 3-cü xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '04',
    title: '[4-cü Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 4-cü xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '05',
    title: '[5-ci Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 5-ci xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '06',
    title: '[6-cı Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 6-cı xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
];

// Şəkil 1-dəki pilləli kərpic divar düzülüşü (7 sıra, running-bond)
interface WallBrick {
  id: number;
  row: number;
  col: number;
  colsInRow: number;
  color: string;
  delayMs: number;
  startX: number;
  startY: number;
  startRot: number;
}

const BRICK_ROWS = [3, 4, 5, 4, 5, 4, 3]; // Şəkil 1-dəki kontur forması (28 iri kərpic bloku)
const BRICK_COLORS = ['#C84B28', '#D96B27', '#C84B28', '#B83E1E', '#D96B27'];

const WALL_BRICKS: WallBrick[] = (() => {
  const list: WallBrick[] = [];
  let idCounter = 0;
  // Aşağı sıradan yuxarıya doğru hörülür
  for (let r = BRICK_ROWS.length - 1; r >= 0; r--) {
    const count = BRICK_ROWS[r];
    for (let c = 0; c < count; c++) {
      const orderIndex = idCounter++;
      list.push({
        id: orderIndex,
        row: r,
        col: c,
        colsInRow: count,
        color: BRICK_COLORS[(r + c) % BRICK_COLORS.length],
        // Maşın kuzasını qaldırdıqdan sonra sürətlə ard-arda tökülüb hörülür
        delayMs: orderIndex * 38,
        // Maşının arxa kuzasından çıxış koordinatları (nisbi piksel sürüşməsi)
        startX: -240 - c * 85,
        startY: -160 - r * 55,
        startRot: -35 + ((orderIndex * 19) % 55),
      });
    }
  }
  return list;
})();

/**
 * Animasiya Mərhələləri (Stages):
 * 0 = İlkin gözləmə (scroll edilməyib)
 * 1 = Maşın arxa-arxa (geriyə) daxil olur (0ms - 900ms)
 * 2 = Maşın dayanır və kuzasını (yük hissəsini) yuxarı qaldırır, kubiklər tökülüb divarı hörür (900ms - 2450ms)
 * 3 = Hörülən kərpic divarın üzərində Xidmət pəncərələri açılır (2450ms+)
 */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [animKey, setAnimKey] = useState(0);
  const hasTriggeredRef = useRef(false);

  const runAnimationSequence = () => {
    setStage(0);
    setAnimKey((prev) => prev + 1);

    requestAnimationFrame(() => {
      setTimeout(() => setStage(1), 40);     // Maşın arxa-arxa gəlir
      setTimeout(() => setStage(2), 900);    // Kuza qalxır və kərpiclər tökülərək divarı hörür
      setTimeout(() => setStage(3), 2450);   // Xidmət pəncərələri divarın üzərində yaranır
    });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          runAnimationSequence();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="px-4 sm:px-8 py-16 lg:py-20 bg-[#FFFFFF] border-b-2 border-[#262626] relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Bölmə Başlığı və Təkrar İzlə Düyməsi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b-2 border-[#262626] pb-5">
          <div>
            <div className="font-mono text-xs text-[#C85A32] font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>[Bölmə üst etiketi]</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#262626] uppercase tracking-tight">
              [Bura Xidmətlər bölməsinin başlığı yazılacaq]
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runAnimationSequence}
              className="brick-btn bg-[#F4F0DB] text-[#262626] hover:bg-[#C85A32] hover:text-white px-3.5 py-2 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
              title="Maşın və hörgü animasiyasını yenidən başlat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Animasiyanı Təkrar İzlə</span>
            </button>
          </div>
        </div>

        {/* =====================================================================
            1. YÜK MAŞINI (SAMOSVAL) VƏ KƏRPİC BOŞALTMA SƏHNƏSİ (60 FPS GPU SVG)
           ===================================================================== */}
        <div
          key={`truck-scene-${animKey}`}
          className="relative w-full h-44 sm:h-56 mb-4 border-b-4 border-dashed border-[#262626]/30 flex items-end overflow-visible select-none"
        >
          {/* Yol / Tikinti Meydançası Xətti */}
          <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-[#262626]" />
          <div className="absolute bottom-2.5 left-0 right-0 h-1 bg-[#C85A32]" />

          {/* Maşın Konteyneri: Soldan arxa-arxa (geriyə) daxil olur */}
          <div
            className="relative z-20 transition-transform duration-[850ms] ease-out will-change-transform"
            style={{
              transform:
                stage === 0
                  ? 'translate3d(-420px, 0px, 0px)'
                  : 'translate3d(12px, 0px, 0px)',
            }}
          >
            {/* Samosval SVG (Şəkil 2 və Şəkil 3-ün dəqiq vektorial modeli - 8 KB, 60 FPS) */}
            <svg
              viewBox="0 0 520 300"
              className="w-[250px] sm:w-[370px] h-auto overflow-visible drop-shadow-[4px_4px_0px_rgba(38,38,38,1)]"
            >
              {/* --- HİDRAVLİK PİSTON (Şəkil 3-dəki qalxan porşen) --- */}
              <g>
                <rect x="235" y="160" width="16" height="75" rx="2" fill="#22252A" stroke="#111" strokeWidth="2" />
                <line
                  x1="243"
                  y1="215"
                  x2={stage >= 2 ? '268' : '243'}
                  y2={stage >= 2 ? '105' : '195'}
                  stroke="#D1D5DB"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-in-out"
                />
                <line
                  x1="243"
                  y1="215"
                  x2={stage >= 2 ? '268' : '243'}
                  y2={stage >= 2 ? '105' : '195'}
                  stroke="#4B5563"
                  strokeWidth="12"
                  strokeDasharray="18 120"
                  className="transition-all duration-700 ease-in-out"
                />
              </g>

              {/* --- QALXAN YÜK KUZASI (Şəkil 2: 0 dərəcə -> Şəkil 3: 33 dərəcə) --- */}
              <g
                style={{
                  transformOrigin: '455px 215px',
                  transform: stage >= 2 ? 'rotate(33deg)' : 'rotate(0deg)',
                  transition: 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* Kuzanın içindən sürüşüb tökülən kərpic topası */}
                <g
                  style={{
                    transform: stage >= 2 ? 'translate(90px, 24px) rotate(28deg)' : 'translate(0px, 0px)',
                    opacity: stage >= 3 ? 0 : 1,
                    transition: 'all 700ms ease-in',
                  }}
                >
                  <rect x="330" y="115" width="44" height="22" rx="3" fill="#C84B28" stroke="#1A1A1A" strokeWidth="3" transform="rotate(-8 330 115)" />
                  <rect x="375" y="112" width="44" height="22" rx="3" fill="#D96B27" stroke="#1A1A1A" strokeWidth="3" transform="rotate(6 375 112)" />
                  <rect x="415" y="118" width="44" height="22" rx="3" fill="#B83E1E" stroke="#1A1A1A" strokeWidth="3" transform="rotate(14 415 118)" />
                  <rect x="285" y="118" width="44" height="22" rx="3" fill="#D96B27" stroke="#1A1A1A" strokeWidth="3" transform="rotate(-4 285 118)" />
                </g>

                {/* Sarı Kuza Gövdəsi */}
                <path
                  d="M 145 82 L 205 82 L 222 132 L 485 132 L 485 215 L 185 215 L 185 102 L 145 102 Z"
                  fill="#F3C13A"
                  stroke="#262626"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <line x1="224" y1="136" x2="482" y2="136" stroke="#FDE68A" strokeWidth="3" />
                <rect x="188" y="203" width="295" height="10" fill="#D99B26" />

                {/* Kuzanın yanındakı 5 çökək panel (Şəkil 2 və 3) */}
                <polygon
                  points="222,148 260,148 260,196 232,196"
                  fill="#E0A82E"
                  stroke="#C68B1C"
                  strokeWidth="2.5"
                />
                <rect x="275" y="148" width="38" height="48" rx="3" fill="#E0A82E" stroke="#C68B1C" strokeWidth="2.5" />
                <rect x="328" y="148" width="38" height="48" rx="3" fill="#E0A82E" stroke="#C68B1C" strokeWidth="2.5" />
                <rect x="381" y="148" width="38" height="48" rx="3" fill="#E0A82E" stroke="#C68B1C" strokeWidth="2.5" />
                <rect x="434" y="148" width="38" height="48" rx="3" fill="#E0A82E" stroke="#C68B1C" strokeWidth="2.5" />
              </g>

              {/* --- ŞASSİ, KABİNA VƏ YAN ÇƏN --- */}
              <g>
                <path
                  d="M 168 112 L 185 112 L 195 220 L 490 220 L 490 245 L 168 245 Z"
                  fill="#26282A"
                  stroke="#111"
                  strokeWidth="2.5"
                />
                <rect x="485" y="224" width="9" height="14" rx="1" fill="#EF4444" stroke="#111" strokeWidth="1.5" />
                <path
                  d="M 55 115 Q 55 102 72 100 L 164 100 Q 172 100 172 110 L 172 218 L 42 218 L 42 165 Z"
                  fill="#F3C13A"
                  stroke="#262626"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <rect x="38" y="215" width="60" height="42" rx="3" fill="#E5AE2C" stroke="#262626" strokeWidth="3" />
                <rect x="52" y="226" width="30" height="22" rx="2" fill="#26282A" stroke="#111" strokeWidth="2" />
                <line x1="55" y1="232" x2="79" y2="232" stroke="#555" strokeWidth="2" />
                <line x1="55" y1="238" x2="79" y2="238" stroke="#555" strokeWidth="2" />
                <line x1="55" y1="244" x2="79" y2="244" stroke="#555" strokeWidth="2" />

                <path
                  d="M 64 118 L 116 118 L 116 164 L 54 168 Z"
                  fill="#94A3B8"
                  stroke="#262626"
                  strokeWidth="3"
                />
                <path
                  d="M 122 118 L 152 118 L 152 156 L 122 162 Z"
                  fill="#64748B"
                  stroke="#262626"
                  strokeWidth="3"
                />
                <line x1="72" y1="164" x2="88" y2="145" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                <line x1="78" y1="138" x2="96" y2="152" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

                <rect x="195" y="222" width="110" height="36" rx="4" fill="#3A3D42" stroke="#1A1A1A" strokeWidth="2.5" />
                <line x1="202" y1="234" x2="300" y2="234" stroke="#1F2124" strokeWidth="4" />
                <line x1="202" y1="246" x2="300" y2="246" stroke="#1F2124" strokeWidth="4" />
                <rect x="222" y="218" width="8" height="42" fill="#18191B" />
                <rect x="268" y="218" width="8" height="42" fill="#18191B" />

                <path
                  d="M 92 255 L 106 215 L 178 215 L 190 255 Z"
                  fill="#3A3D42"
                  stroke="#1A1A1A"
                  strokeWidth="2.5"
                />
                <path
                  d="M 308 248 L 325 215 L 472 215 L 486 248 Z"
                  fill="#3A3D42"
                  stroke="#1A1A1A"
                  strokeWidth="2.5"
                />
              </g>

              {/* --- 3 ƏDƏD FIRLANAN TƏKƏR --- */}
              {[140, 355, 435].map((cx, i) => (
                <g
                  key={i}
                  style={{
                    transformOrigin: `${cx}px 256px`,
                    transform: stage === 0 ? 'rotate(-360deg)' : 'rotate(0deg)',
                    transition: 'transform 850ms ease-out',
                  }}
                >
                  <circle
                    cx={cx}
                    cy={256}
                    r={34}
                    fill="#1E2022"
                    stroke="#111"
                    strokeWidth="4"
                    strokeDasharray="9 4"
                  />
                  <circle cx={cx} cy={256} r={29} fill="#25282A" />
                  <circle cx={cx} cy={256} r={19} fill="#D1D5DB" stroke="#4B5563" strokeWidth="2" />
                  <circle cx={cx} cy={242} r={2.5} fill="#1E2022" />
                  <circle cx={cx} cy={270} r={2.5} fill="#1E2022" />
                  <circle cx={cx - 14} cy={256} r={2.5} fill="#1E2022" />
                  <circle cx={cx + 14} cy={256} r={2.5} fill="#1E2022" />
                  <circle cx={cx - 10} cy={246} r={2.5} fill="#1E2022" />
                  <circle cx={cx + 10} cy={266} r={2.5} fill="#1E2022" />
                  <circle cx={cx} cy={256} r={9} fill="#9CA3AF" stroke="#374151" strokeWidth="2" />
                </g>
              ))}
            </svg>
          </div>

          {/* Mərhələ İnfo Etiketi */}
          <div className="hidden md:flex ml-auto mb-5 bg-[#262626] text-[#F4F0DB] px-3 py-1.5 border-2 border-[#262626] shadow-[3px_3px_0px_#C85A32] font-mono text-xs items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-ping" />
            <span>
              {stage === 0 && 'GÖZLƏMƏ REJİMİ...'}
              {stage === 1 && '01 // YÜK MAŞINI ARXA-ARXA YAXINLAŞIR...'}
              {stage === 2 && '02 // KUZA QALXIR — KUBİKLƏR HÖRÜLÜR...'}
              {stage === 3 && '03 // DİVAR HÖRÜLDÜ — XİDMƏT PƏNCƏRƏLƏRİ AKTİVDİR'}
            </span>
          </div>
        </div>

        {/* =====================================================================
            2. ŞƏKİL 1 ÜSLUBUNDA HÖRÜLƏN KƏRPİC DİVAR VƏ XİDMƏT PƏNCƏRƏLƏRİ
           ===================================================================== */}
        <div
          key={`wall-scene-${animKey}`}
          className="relative py-8 sm:py-12 px-3 sm:px-8"
        >
          {/* Şəkil 1-dəki Halftone (Nöqtəli) Kölgə Effekti */}
          <div
            className="absolute inset-3 sm:inset-6 pointer-events-none transition-opacity duration-700"
            style={{
              opacity: stage >= 2 ? 0.35 : 0,
              backgroundImage: 'radial-gradient(#1A1A1A 2.5px, transparent 2.5px)',
              backgroundSize: '12px 12px',
              transform: 'translate(12px, 12px)',
            }}
          />

          {/* ARXA FONDA YIĞILAN PİLLƏLİ KƏRPİC DİVAR (Şəkil 1-in dəqiq struktur forması) */}
          <div className="absolute inset-0 z-0 flex flex-col justify-between items-center gap-1.5 sm:gap-2 pointer-events-none select-none py-2">
            {BRICK_ROWS.map((colsCount, rowIndex) => {
              const rowBricks = WALL_BRICKS.filter((b) => b.row === rowIndex);
              const widthMap: Record<number, string> = {
                3: 'w-[78%] sm:w-[70%]',
                4: 'w-[92%] sm:w-[86%]',
                5: 'w-[100%]',
              };

              return (
                <div
                  key={rowIndex}
                  className={`${widthMap[colsCount]} flex-1 grid gap-1.5 sm:gap-2`}
                  style={{
                    gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))`,
                  }}
                >
                  {rowBricks.map((brick) => {
                    const isPouring = stage >= 2;
                    return (
                      <div
                        key={brick.id}
                        className="w-full h-full rounded-[4px] border-[3px] sm:border-[4px] border-[#1A1A1A] relative overflow-hidden will-change-transform"
                        style={{
                          backgroundColor: brick.color,
                          boxShadow: '0 4px 0 #1A1A1A',
                          transform: isPouring
                            ? 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)'
                            : `translate3d(${brick.startX}px, ${brick.startY}px, 0px) rotate(${brick.startRot}deg) scale(0.3)`,
                          opacity: isPouring ? 1 : 0,
                          transition: `transform 520ms cubic-bezier(0.2, 0.9, 0.3, 1.12) ${brick.delayMs}ms, opacity 200ms ease-out ${brick.delayMs}ms`,
                        }}
                      >
                        {/* Şəkil 1-dəki kərpicin daxili işıq və kölgə haşiyəsi (bevel) */}
                        <div className="absolute top-1 left-1.5 right-2 h-1.5 bg-white/25 rounded-full" />
                        <div className="absolute bottom-1 left-2 right-1.5 h-2 bg-black/25 rounded-full" />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* =====================================================================
              3. HÖRÜLƏN DİVARIN ÜZƏRİNDƏ AÇILAN XİDMƏT PƏNCƏRƏLƏRİ (6 KART)
             ===================================================================== */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {SERVICES.map((srv, idx) => {
              const isVisible = stage >= 3;
              return (
                <div
                  key={idx}
                  style={{
                    transform: isVisible
                      ? 'translate3d(0, 0, 0) scale(1)'
                      : 'translate3d(0, 24px, 0) scale(0.88)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 450ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 85}ms`,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                  className="bg-[#FFFFFF]/95 backdrop-blur-sm border-[3px] border-[#1A1A1A] rounded-[4px] shadow-[6px_6px_0px_#1A1A1A] p-5 sm:p-6 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[8px_8px_0px_#C85A32] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs mb-3 border-b-2 border-[#262626]/20 pb-2">
                      <span className="font-black text-[#C85A32]">{srv.code} //</span>
                      <span className="px-2 py-0.5 bg-[#262626] text-[#F4F0DB] text-[10px] font-bold">
                        {srv.tag}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[#262626] mb-2 group-hover:text-[#C85A32] transition-colors">
                      {srv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#262626]/80 leading-relaxed mb-4">
                      {srv.desc}
                    </p>

                    {/* Qısa Texniki Vurğular */}
                    <div className="grid grid-cols-2 gap-2 border-t border-[#262626]/15 pt-3 mb-4 font-mono text-[11px]">
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
                    className="pt-3 border-t-2 border-[#262626]/15 font-mono text-xs font-bold text-[#C85A32] hover:text-[#262626] flex items-center justify-between"
                  >
                    <span>[Keçid mətni]</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
