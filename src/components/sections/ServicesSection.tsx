'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, Truck } from 'lucide-react';

const SERVICES = [
  {
    code: '01',
    title: '[1-ci Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya]',
    desc: '[Bura 1-ci xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '02',
    title: '[2-ci Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya]',
    desc: '[Bura 2-ci xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '03',
    title: '[3-cü Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya]',
    desc: '[Bura 3-cü xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '04',
    title: '[4-cü Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya]',
    desc: '[Bura 4-cü xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '05',
    title: '[5-ci Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya]',
    desc: '[Bura 5-ci xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '06',
    title: '[6-cı Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya]',
    desc: '[Bura 6-cı xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
];

const BRICK_COLORS = ['#C84B28', '#D96B27', '#C84B28', '#B83E1E', '#D96B27'];

// Deterministik psevdo-təsadüfi funksiya (qarışıq tökülmə üçün)
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9999.91) * 10000;
  return x - Math.floor(x);
}

interface BrickItem {
  id: number;
  row: number;
  col: number;
  colsInRow: number;
  rowWidthRatio: number;
  color: string;
  // Qarışıq tökülmə (təpəcik) parametrləri
  pileOffsetX: number;
  pileOffsetY: number;
  pileRot: number;
  dumpDelayMs: number;
  buildDelayMs: number;
}

// Hörülmə hissəsindəki kubik düzülüşü (PC üçün)
const DESKTOP_ROWS: { cols: number; widthRatio: number }[] = [
  { cols: 8, widthRatio: 0.86 },
  { cols: 9, widthRatio: 0.93 },
  { cols: 10, widthRatio: 0.98 },
  { cols: 9, widthRatio: 0.95 },
  { cols: 10, widthRatio: 0.98 },
  { cols: 9, widthRatio: 0.95 },
  { cols: 10, widthRatio: 0.98 },
  { cols: 9, widthRatio: 0.95 },
  { cols: 10, widthRatio: 0.98 },
  { cols: 9, widthRatio: 0.95 },
  { cols: 9, widthRatio: 0.93 },
  { cols: 8, widthRatio: 0.86 },
];

// Mobil üçün PC-dən ~4 dəfə az (29 ədəd) və 100% üfüqi kubik düzülüşü
const MOBILE_ROWS: { cols: number; widthRatio: number }[] = [
  { cols: 3, widthRatio: 0.84 },
  { cols: 3, widthRatio: 0.92 },
  { cols: 4, widthRatio: 0.98 },
  { cols: 3, widthRatio: 0.94 },
  { cols: 4, widthRatio: 0.98 },
  { cols: 3, widthRatio: 0.94 },
  { cols: 4, widthRatio: 0.98 },
  { cols: 3, widthRatio: 0.92 },
  { cols: 2, widthRatio: 0.78 },
];

function generateBricks(rowsConfig: { cols: number; widthRatio: number }[], isMobile: boolean): BrickItem[] {
  const list: BrickItem[] = [];
  let idCounter = 0;

  for (let r = 0; r < rowsConfig.length; r++) {
    const { cols, widthRatio } = rowsConfig[r];
    for (let c = 0; c < cols; c++) {
      const id = idCounter++;
      const rand1 = pseudoRandom(id * 3 + 1);
      const rand2 = pseudoRandom(id * 7 + 2);
      const rand3 = pseudoRandom(id * 13 + 3);
      const rand4 = pseudoRandom(id * 17 + 4);
      const rand5 = pseudoRandom(id * 23 + 5);

      // Tökülən kubiklər 1/4 ölçüdə olduğu üçün sıx və təbii təpəcik yaradır
      const spreadX = isMobile ? 82 : 175;
      const offsetNorm = (rand1 - 0.5) * 2; // -1 .. +1
      const pileOffsetX = offsetNorm * (spreadX / 2);

      const maxHeapHeight = isMobile ? 36 : 58;
      const heightFactor = Math.max(0.15, 1 - Math.abs(offsetNorm) * 0.82);
      const pileOffsetY = -8 - rand2 * maxHeapHeight * heightFactor;

      const pileRot = (rand3 - 0.5) * 115; // -57 deg .. +57 deg qarışıq bucaq

      const dumpDelayMs = 100 + Math.floor(rand4 * 480);
      const buildDelayMs = Math.floor(rand5 * 520);

      list.push({
        id,
        row: r,
        col: c,
        colsInRow: cols,
        rowWidthRatio: widthRatio,
        color: BRICK_COLORS[(r + c) % BRICK_COLORS.length],
        pileOffsetX,
        pileOffsetY,
        pileRot,
        dumpDelayMs,
        buildDelayMs,
      });
    }
  }
  return list;
}

/**
 * 5 Mərhələli Sinxron Tikinti Xoreoqrafiyası (Stages):
 * 0 = Gözləmə (hər iki maşın kənardadır)
 * 1 = Soldan Kubik Maşını, Sağdan Sement Maşını arxa-arxa yaxınlaşır (0ms - 880ms)
 * 2 = Kubik maşını kuzasını qaldırır, 1/4 ölçüdə xırda kubiklər yerə qarışıq tökülür; Sement maşınının kuzası qalxmır, mikseri fırlanır (880ms - 2200ms)
 * 3 = Kubiklər divar kimi hörülür VƏ Sement maşınının novundan axan sement kubiklərin arasına dolur (2200ms - 3450ms)
 * 4 = Sementlə bərkidilmiş kərpic divarın üzərində Xidmət Pəncərələri açılır (3450ms+)
 */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wallContainerRef = useRef<HTMLDivElement>(null);

  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [animKey, setAnimKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [wallSize, setWallSize] = useState({ width: 1100, height: 480 });
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const updateDimensions = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (wallContainerRef.current) {
        const rect = wallContainerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setWallSize({ width: rect.width, height: rect.height });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const rowsConfig = isMobile ? MOBILE_ROWS : DESKTOP_ROWS;
  const bricks = useMemo(() => generateBricks(rowsConfig, isMobile), [rowsConfig, isMobile]);

  const runAnimationSequence = () => {
    if (wallContainerRef.current) {
      const rect = wallContainerRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setWallSize({ width: rect.width, height: rect.height });
      }
    }

    setStage(0);
    setAnimKey((prev) => prev + 1);

    requestAnimationFrame(() => {
      setTimeout(() => setStage(1), 40);     // 1. Soldan Kubik maşını, Sağdan Sement maşını yaxınlaşır
      setTimeout(() => setStage(2), 880);    // 2. 1/4 ölçüdə kubiklər qarışıq tökülür, sement axmağa başlayır
      setTimeout(() => setStage(3), 2200);   // 3. Kubiklər hörülür + aralarına sement dolur
      setTimeout(() => setStage(4), 3500);   // 4. Xidmət pəncərələri açılır
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

  // Sol maşının (Kubik samosvalı) arxa kuza çıxışı və tökülmə mərkəzi
  const tailgateX = isMobile ? 130 : 300;
  const tailgateY = isMobile ? -55 : -88;

  const pileCenterX = isMobile ? 175 : 415; // Sol maşının düz arxası
  const pileBaseY = isMobile ? -12 : -18;   // Yolun üzəri

  return (
    <section
      id="services"
      ref={sectionRef}
      className="px-3 sm:px-8 py-14 lg:py-20 bg-[#FFFFFF] border-b-2 border-[#262626] relative z-10 overflow-hidden"
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
            1. İKİ TƏRƏFLİ MAŞIN SƏHNƏSİ:
               SOLDA: Kubik Samosvalı (kuzası qalxır, 1/4 kubiklər tökülür)
               SAĞDA: Sement Maşını (kuzası qalxmır, novundan sement tökülür)
           ===================================================================== */}
        <div
          key={`truck-scene-${animKey}`}
          className="relative w-full h-36 sm:h-56 mb-4 border-b-4 border-dashed border-[#262626]/30 flex items-end justify-between overflow-visible select-none"
        >
          {/* Yol / Tikinti Meydançası Xətti */}
          <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-[#262626]" />
          <div className="absolute bottom-2.5 left-0 right-0 h-1 bg-[#C85A32]" />

          {/* -----------------------------------------------------------------
              SOL TƏRƏF: KUBİK GƏTİRƏN MAŞIN (SAMOSVAL)
             ----------------------------------------------------------------- */}
          <div
            className="relative z-20 transition-transform duration-[850ms] ease-out will-change-transform"
            style={{
              transform:
                stage === 0
                  ? 'translate3d(-420px, 0px, 0px)'
                  : 'translate3d(4px, 0px, 0px)',
            }}
          >
            <svg
              viewBox="0 0 520 300"
              className="w-[150px] sm:w-[325px] h-auto overflow-visible drop-shadow-[3px_3px_0px_rgba(38,38,38,1)]"
            >
              {/* Hidravlik Piston */}
              <g>
                <rect x="235" y="160" width="16" height="75" rx="2" fill="#22252A" stroke="#111" strokeWidth="2" />
                <line
                  x1="243"
                  y1="215"
                  x2={stage >= 2 && stage < 4 ? '268' : '243'}
                  y2={stage >= 2 && stage < 4 ? '105' : '195'}
                  stroke="#D1D5DB"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="transition-all duration-600 ease-in-out"
                />
                <line
                  x1="243"
                  y1="215"
                  x2={stage >= 2 && stage < 4 ? '268' : '243'}
                  y2={stage >= 2 && stage < 4 ? '105' : '195'}
                  stroke="#4B5563"
                  strokeWidth="12"
                  strokeDasharray="18 120"
                  className="transition-all duration-600 ease-in-out"
                />
              </g>

              {/* Qalxan Yük Kuzası */}
              <g
                style={{
                  transformOrigin: '455px 215px',
                  transform: stage >= 2 && stage < 4 ? 'rotate(34deg)' : 'rotate(0deg)',
                  transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <path
                  d="M 145 82 L 205 82 L 222 132 L 485 132 L 485 215 L 185 215 L 185 102 L 145 102 Z"
                  fill="#F3C13A"
                  stroke="#262626"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <line x1="224" y1="136" x2="482" y2="136" stroke="#FDE68A" strokeWidth="3" />
                <rect x="188" y="203" width="295" height="10" fill="#D99B26" />
                <polygon points="222,148 260,148 260,196 232,196" fill="#E0A82E" stroke="#C68B1C" strokeWidth="2.5" />
                <rect x="275" y="148" width="38" height="48" rx="3" fill="#E0A82E" stroke="#C68B1C" strokeWidth="2.5" />
                <rect x="328" y="148" width="38" height="48" rx="3" fill="#E0A82E" stroke="#C68B1C" strokeWidth="2.5" />
                <rect x="381" y="148" width="38" height="48" rx="3" fill="#E0A82E" stroke="#C68B1C" strokeWidth="2.5" />
                <rect x="434" y="148" width="38" height="48" rx="3" fill="#E0A82E" stroke="#C68B1C" strokeWidth="2.5" />
              </g>

              {/* Şassi və Kabina */}
              <g>
                <path d="M 168 112 L 185 112 L 195 220 L 490 220 L 490 245 L 168 245 Z" fill="#26282A" stroke="#111" strokeWidth="2.5" />
                <rect x="485" y="224" width="9" height="14" rx="1" fill="#EF4444" stroke="#111" strokeWidth="1.5" />
                <path d="M 55 115 Q 55 102 72 100 L 164 100 Q 172 100 172 110 L 172 218 L 42 218 L 42 165 Z" fill="#F3C13A" stroke="#262626" strokeWidth="3.5" strokeLinejoin="round" />
                <rect x="38" y="215" width="60" height="42" rx="3" fill="#E5AE2C" stroke="#262626" strokeWidth="3" />
                <rect x="52" y="226" width="30" height="22" rx="2" fill="#26282A" stroke="#111" strokeWidth="2" />
                <line x1="55" y1="232" x2="79" y2="232" stroke="#555" strokeWidth="2" />
                <line x1="55" y1="238" x2="79" y2="238" stroke="#555" strokeWidth="2" />
                <line x1="55" y1="244" x2="79" y2="244" stroke="#555" strokeWidth="2" />
                <path d="M 64 118 L 116 118 L 116 164 L 54 168 Z" fill="#94A3B8" stroke="#262626" strokeWidth="3" />
                <path d="M 122 118 L 152 118 L 152 156 L 122 162 Z" fill="#64748B" stroke="#262626" strokeWidth="3" />
                <line x1="72" y1="164" x2="88" y2="145" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                <line x1="78" y1="138" x2="96" y2="152" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                <rect x="195" y="222" width="110" height="36" rx="4" fill="#3A3D42" stroke="#1A1A1A" strokeWidth="2.5" />
                <line x1="202" y1="234" x2="300" y2="234" stroke="#1F2124" strokeWidth="4" />
                <line x1="202" y1="246" x2="300" y2="246" stroke="#1F2124" strokeWidth="4" />
                <rect x="222" y="218" width="8" height="42" fill="#18191B" />
                <rect x="268" y="218" width="8" height="42" fill="#18191B" />
                <path d="M 92 255 L 106 215 L 178 215 L 190 255 Z" fill="#3A3D42" stroke="#1A1A1A" strokeWidth="2.5" />
                <path d="M 308 248 L 325 215 L 472 215 L 486 248 Z" fill="#3A3D42" stroke="#1A1A1A" strokeWidth="2.5" />
              </g>

              {/* 3 Fırlanan Təkər */}
              {[140, 355, 435].map((cx, i) => (
                <g
                  key={i}
                  style={{
                    transformOrigin: `${cx}px 256px`,
                    transform: stage === 0 ? 'rotate(-360deg)' : 'rotate(0deg)',
                    transition: 'transform 850ms ease-out',
                  }}
                >
                  <circle cx={cx} cy={256} r={34} fill="#1E2022" stroke="#111" strokeWidth="4" strokeDasharray="9 4" />
                  <circle cx={cx} cy={256} r={29} fill="#25282A" />
                  <circle cx={cx} cy={256} r={19} fill="#D1D5DB" stroke="#4B5563" strokeWidth="2" />
                  <circle cx={cx} cy={242} r={2.5} fill="#1E2022" />
                  <circle cx={cx} cy={270} r={2.5} fill="#1E2022" />
                  <circle cx={cx - 14} cy={256} r={2.5} fill="#1E2022" />
                  <circle cx={cx + 14} cy={256} r={2.5} fill="#1E2022" />
                  <circle cx={cx} cy={256} r={9} fill="#9CA3AF" stroke="#374151" strokeWidth="2" />
                </g>
              ))}
            </svg>
          </div>

          {/* Mərkəzi Mərhələ İnfo Etiketi */}
          <div className="hidden xl:flex mb-6 bg-[#262626] text-[#F4F0DB] px-3 py-1.5 border-2 border-[#262626] shadow-[3px_3px_0px_#C85A32] font-mono text-[11px] items-center gap-2 z-20">
            <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-ping" />
            <span>
              {stage === 0 && 'GÖZLƏMƏ REJİMİ...'}
              {stage === 1 && '01 // KUBİK VƏ SEMENT MAŞINLARI YAXINLAŞIR...'}
              {stage === 2 && '02 // XIRDA KUBİKLƏR VƏ SEMENT TÖKÜLÜR...'}
              {stage === 3 && '03 // DİVAR HÖRÜLÜR VƏ ARALARINA SEMENT DOLUR...'}
              {stage === 4 && '04 // HÖRGÜ VƏ SEMENT TAMAMLANDI — XİDMƏTLƏR AKTİVDİR'}
            </span>
          </div>

          {/* -----------------------------------------------------------------
              SAĞ TƏRƏF: SEMENT MAŞINI (BETONQARIŞDIRAN MİKSER)
              Sağdan arxa-arxa yaxınlaşır, kuzası (çəni) QALXMIR, novundan sement tökülür!
             ----------------------------------------------------------------- */}
          <div
            className="relative z-20 transition-transform duration-[880ms] ease-out will-change-transform"
            style={{
              transform:
                stage === 0
                  ? 'translate3d(440px, 0px, 0px)'
                  : 'translate3d(-4px, 0px, 0px)',
            }}
          >
            {/* Sement Maşını SVG (Göndərdiyiniz şəklin dəqiq vektorial modeli - arxası mərkəzə baxır) */}
            <svg
              viewBox="0 0 600 300"
              className="w-[175px] sm:w-[375px] h-auto overflow-visible drop-shadow-[3px_3px_0px_rgba(38,38,38,1)]"
            >
              {/* --- ARXA SEMENT TÖKÜLƏN NOV (CHUTE) VƏ AXAN SEMENT --- */}
              <g>
                {/* Sement novundan (olukdan) aşağı kubiklərin arasına axan boz sement axını */}
                <g
                  style={{
                    opacity: stage === 2 || stage === 3 ? 1 : 0,
                    transition: 'opacity 300ms ease-in-out',
                  }}
                >
                  {/* Əsas axan sement şırnağı */}
                  <path
                    d="M 18 228 Q 6 265 -12 325 L 12 325 Q 22 268 28 228 Z"
                    fill="#7C858E"
                    stroke="#262626"
                    strokeWidth="2"
                  />
                  {/* Sement axını üzərində hərəkətli açıq-boz dalğa xətləri */}
                  <line
                    x1="20"
                    y1="235"
                    x2="0"
                    y2="315"
                    stroke="#CBD5E1"
                    strokeWidth="3.5"
                    strokeDasharray="10 8"
                    className="animate-pulse"
                  />
                  {/* Yerdə yaranan təzə sement qarışığı */}
                  <ellipse
                    cx="-2"
                    cy="292"
                    rx={stage >= 3 ? '36' : '22'}
                    ry={stage >= 3 ? '10' : '7'}
                    fill="#6E7680"
                    stroke="#262626"
                    strokeWidth="2"
                    className="transition-all duration-500"
                  />
                </g>

                {/* Maşının arxasındakı maili dəmir sement novu (Chute - şəkildəki sağ-aşağı çıxıntı) */}
                <path
                  d="M 78 192 L 14 224 L 20 233 L 84 202 Z"
                  fill="#2B2E33"
                  stroke="#111"
                  strokeWidth="2.5"
                />
                <circle cx="17" cy="228" r="4" fill="#1F2421" stroke="#111" strokeWidth="1.5" />
              </g>

              {/* --- ARXA DAYAQ KONSTRUKSİYASI (A-FRAME) --- */}
              <g>
                <polygon
                  points="64,62 94,62 128,195 64,195"
                  fill="#2B2E33"
                  stroke="#111"
                  strokeWidth="2.5"
                />
                <polygon
                  points="95,125 148,165 148,195 95,195"
                  fill="#26282C"
                  stroke="#111"
                  strokeWidth="2"
                />
              </g>

              {/* --- BÖYÜK SARI-NARINCI SEMENT ÇƏNİ (MİKSER BARABANI — KUZASI QALXMIR!) --- */}
              <g>
                {/* Mikser çəninin əsas armudvari həndəsi gövdəsi */}
                <path
                  d="M 68 82 L 155 58 Q 275 48 415 102 L 420 158 Q 285 198 150 165 L 68 135 Z"
                  fill="#F59E0B"
                  stroke="#262626"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                {/* Çənin üst parlaq sarı işıq hissəsi */}
                <path
                  d="M 72 86 L 156 62 Q 275 52 412 105 L 414 128 Q 275 88 155 102 L 72 106 Z"
                  fill="#FACC15"
                />
                {/* Çənin alt tünd narıncı kölgə hissəsi */}
                <path
                  d="M 70 124 L 152 148 Q 285 182 418 145 L 420 158 Q 285 198 150 165 L 68 135 Z"
                  fill="#D97706"
                />

                {/* Çən fırlanarkən görünən daxili spiral seqment xətləri */}
                <line
                  x1={stage === 2 || stage === 3 ? '195' : '185'}
                  y1="57"
                  x2={stage === 2 || stage === 3 ? '170' : '160'}
                  y2="166"
                  stroke="#B45309"
                  strokeWidth="3"
                  className="transition-all duration-300"
                />
                <line
                  x1={stage === 2 || stage === 3 ? '295' : '282'}
                  y1="65"
                  x2={stage === 2 || stage === 3 ? '268' : '255'}
                  y2="176"
                  stroke="#B45309"
                  strokeWidth="3"
                  className="transition-all duration-300"
                />

                {/* Çənin arxa hissəsindəki qara/sarı fırlanma halqası (Ring Band) */}
                <line x1="124" y1="52" x2="106" y2="165" stroke="#1E2022" strokeWidth="6" strokeLinecap="round" />
                <line x1="120" y1="52" x2="102" y2="165" stroke="#FACC15" strokeWidth="2.5" />
              </g>

              {/* --- ARXA GÜMÜŞÜ NƏRDİVAN (LADDER) --- */}
              <g>
                <rect x="74" y="68" width="22" height="118" fill="none" stroke="#94A3B8" strokeWidth="3.5" />
                {[82, 98, 114, 130, 146, 162, 178].map((ry) => (
                  <line key={ry} x1="74" y1={ry} x2="96" y2={ry} stroke="#CBD5E1" strokeWidth="2.5" />
                ))}
              </g>

              {/* --- KABİNA ARXASI SU ÇƏNİ VƏ REDUKTOR (NARINCI BLOK) --- */}
              <g>
                <rect x="415" y="132" width="36" height="48" rx="3" fill="#EA580C" stroke="#262626" strokeWidth="2.5" />
                <circle cx="430" cy="112" r="18" fill="#F97316" stroke="#262626" strokeWidth="2.5" />
                <line x1="430" y1="98" x2="430" y2="126" stroke="#262626" strokeWidth="3" />
                {/* Egzoz borusu (Exhaust Stack) */}
                <rect x="448" y="88" width="9" height="105" fill="#1E2022" stroke="#111" strokeWidth="2" />
                <path d="M 452 88 L 452 62 Q 452 52 442 50" fill="none" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
              </g>

              {/* --- ŞASSİ, YAN QORUYUCULAR VƏ 4 TƏKƏR QANADI --- */}
              <g>
                {/* Uzun sarı şassi zolağı */}
                <rect x="85" y="176" width="350" height="12" fill="#F59E0B" stroke="#262626" strokeWidth="2" />
                {/* Tünd boz əsas şassi */}
                <rect x="78" y="188" width="385" height="24" fill="#2B2E33" stroke="#111" strokeWidth="2.5" />
                {/* Orta alət qutusu */}
                <rect x="275" y="206" width="62" height="36" rx="2" fill="#374151" stroke="#111" strokeWidth="2.5" />
                {/* Təkər üstü narıncı-sarı qoruyucu bloklar */}
                <rect x="128" y="155" width="54" height="24" rx="2" fill="#F59E0B" stroke="#262626" strokeWidth="2" />
                <rect x="205" y="155" width="54" height="24" rx="2" fill="#F59E0B" stroke="#262626" strokeWidth="2" />
              </g>

              {/* --- SAĞDAKI SARI KABİNA (Şəkildəki müasir yük maşını kabinası) --- */}
              <g>
                <path
                  d="M 460 88 L 532 88 Q 545 88 552 105 L 564 162 L 564 222 L 460 222 Z"
                  fill="#FACC15"
                  stroke="#262626"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                {/* Kabina alt narıncı-qızılı kölgə hissəsi */}
                <path d="M 460 165 L 564 165 L 564 222 L 460 222 Z" fill="#EAB308" stroke="#262626" strokeWidth="2.5" />
                {/* Kabina yan pəncərəsi (Mavi-boz şüşə) */}
                <path
                  d="M 482 102 L 538 102 L 548 150 L 482 150 Z"
                  fill="#1E3A5F"
                  stroke="#262626"
                  strokeWidth="3"
                />
                {/* Şüşə parıltısı */}
                <polygon points="490,106 515,106 498,146 486,146" fill="#38BDF8" opacity="0.35" />
                {/* Yan güzgü */}
                <rect x="544" y="102" width="8" height="34" rx="2" fill="#1E2022" stroke="#111" strokeWidth="1.5" />
                {/* Qapı tutacağı */}
                <rect x="488" y="168" width="16" height="5" rx="1" fill="#1E2022" />
                {/* Ön fara və gümüşü bamper */}
                <rect x="554" y="182" width="12" height="24" rx="2" fill="#E2E8F0" stroke="#262626" strokeWidth="2" />
                <rect x="536" y="212" width="32" height="28" rx="2" fill="#CBD5E1" stroke="#262626" strokeWidth="2.5" />
                {/* Yan pillələr */}
                <rect x="442" y="210" width="28" height="28" fill="#475569" stroke="#111" strokeWidth="2" />
                <line x1="445" y1="220" x2="467" y2="220" stroke="#CBD5E1" strokeWidth="3" />
                <line x1="445" y1="230" x2="467" y2="230" stroke="#CBD5E1" strokeWidth="3" />
              </g>

              {/* --- 4 ƏDƏD FIRLANAN TƏKƏR (Şəkildəki 4 oxlu şassi) --- */}
              {[135, 218, 385, 495].map((cx, i) => (
                <g
                  key={i}
                  style={{
                    transformOrigin: `${cx}px 252px`,
                    transform: stage === 0 ? 'rotate(360deg)' : 'rotate(0deg)',
                    transition: 'transform 880ms ease-out',
                  }}
                >
                  <circle cx={cx} cy={252} r={34} fill="#1E2022" stroke="#111" strokeWidth="4" strokeDasharray="9 4" />
                  <circle cx={cx} cy={252} r={28} fill="#25282A" />
                  <circle cx={cx} cy={252} r={18} fill="#D1D5DB" stroke="#4B5563" strokeWidth="2" />
                  <circle cx={cx} cy={239} r={2.5} fill="#1E2022" />
                  <circle cx={cx} cy={265} r={2.5} fill="#1E2022" />
                  <circle cx={cx - 13} cy={252} r={2.5} fill="#1E2022" />
                  <circle cx={cx + 13} cy={252} r={2.5} fill="#1E2022" />
                  <circle cx={cx} cy={252} r={8} fill="#64748B" stroke="#1E2022" strokeWidth="2" />
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* =====================================================================
            2. HÖRÜLƏN KUBİKLƏR, ARALARINA DOLAN SEMENT MƏHLULU VƏ XİDMƏT PƏNCƏRƏLƏRİ
           ===================================================================== */}
        <div
          key={`wall-scene-${animKey}`}
          ref={wallContainerRef}
          className="relative py-4 sm:py-8 px-1 sm:px-6 overflow-visible"
        >
          {/* Şəkil 1-dəki Halftone (Nöqtəli) Kölgə Effekti */}
          <div
            className="absolute inset-2 sm:inset-5 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: stage >= 3 ? 0.32 : 0,
              backgroundImage: 'radial-gradient(#1A1A1A 2px, transparent 2px)',
              backgroundSize: '11px 11px',
              transform: 'translate(10px, 10px)',
            }}
          />

          {/* ARXA FONDA YIĞILAN KUBİK DİVAR VƏ ARALARINA DOLAN SEMENT MƏHLULU */}
          <div className="absolute inset-0 z-30 pointer-events-none select-none flex flex-col justify-between items-center gap-1 sm:gap-1.5 py-1 overflow-visible">
            {rowsConfig.map((rowCfg, rowIndex) => {
              const rowBricks = bricks.filter((b) => b.row === rowIndex);
              const totalRows = rowsConfig.length;

              return (
                <div
                  key={rowIndex}
                  className="flex-1 max-h-[38px] sm:max-h-[42px] grid gap-1 sm:gap-1.5 overflow-visible relative rounded-[4px] p-[2px] sm:p-[3px]"
                  style={{
                    width: `${rowCfg.widthRatio * 100}%`,
                    gridTemplateColumns: `repeat(${rowCfg.cols}, minmax(0, 1fr))`,
                    // SEMENTİN KUBİKLƏRİN ARASINA DOLMASI:
                    // Mərhələ 3-də sağdakı sement maşınından axan boz sement kubiklərin arasındakı bütün boşluqlara (tikişlərə) dolur!
                    backgroundColor: stage >= 3 ? '#7D858D' : 'transparent',
                    border: stage >= 3 ? '2.5px solid #1A1A1A' : '2.5px solid transparent',
                    boxShadow: stage >= 3 ? 'inset 0 2px 4px rgba(255,255,255,0.35), 0 3px 0 #1A1A1A' : 'none',
                    transition: `background-color 650ms ease-in-out ${320 + rowIndex * 45}ms, border-color 450ms ease ${320 + rowIndex * 45}ms, box-shadow 450ms ease ${320 + rowIndex * 45}ms`,
                  }}
                >
                  {rowBricks.map((brick) => {
                    const rowLeftPx = ((1 - brick.rowWidthRatio) / 2) * wallSize.width;
                    const rowWidthPx = brick.rowWidthRatio * wallSize.width;
                    const finalX = rowLeftPx + ((brick.col + 0.5) / brick.colsInRow) * rowWidthPx;
                    const finalY = ((brick.row + 0.5) / totalRows) * wallSize.height;

                    // 1) Sol maşının kuzasının içindəki başlanğıc nöqtə
                    const toTruckX = tailgateX - finalX;
                    const toTruckY = tailgateY - finalY;

                    // 2) Sol maşının arxasında 1/4 ölçüdə QARIŞIQ TÖKÜLMƏ nöqtəsi
                    const toPileX = pileCenterX + brick.pileOffsetX - finalX;
                    const toPileY = pileBaseY + brick.pileOffsetY - finalY;

                    let transformStr = `translate3d(${toTruckX}px, ${toTruckY}px, 0px) rotate(-15deg) scale(0.28)`;
                    let opacityVal = 0;
                    let transitionStr = 'none';

                    if (stage === 2) {
                      // Mərhələ 2: Tökülən hissədəki kubiklər DÖRDDƏ BİR (1/4) ölçüdədir (scale(0.46) => sahəsi ~1/4)
                      transformStr = `translate3d(${toPileX}px, ${toPileY}px, 0px) rotate(${brick.pileRot}deg) scale(0.46)`;
                      opacityVal = 1;
                      transitionStr = `transform 460ms cubic-bezier(0.22, 0.85, 0.36, 1) ${brick.dumpDelayMs}ms, opacity 120ms ease-out ${brick.dumpDelayMs}ms`;
                    } else if (stage >= 3) {
                      // Mərhələ 3 & 4: Hörülmə hissəsindəki kubiklər öz bəyəndiyiniz ölçüsündə (scale(1)) yerinə oturur
                      transformStr = 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)';
                      opacityVal = 1;
                      transitionStr = `transform 580ms cubic-bezier(0.2, 0.92, 0.28, 1.08) ${brick.buildDelayMs}ms, opacity 150ms ease-out`;
                    }

                    return (
                      <div
                        key={brick.id}
                        className="w-full h-full min-h-[22px] max-h-[34px] sm:min-h-[28px] sm:max-h-[38px] rounded-[3px] border-[2px] border-[#1A1A1A] relative overflow-hidden will-change-transform"
                        style={{
                          backgroundColor: brick.color,
                          boxShadow: '0 2px 0 #1A1A1A',
                          transform: transformStr,
                          opacity: opacityVal,
                          transition: transitionStr,
                        }}
                      >
                        <div className="absolute top-0.5 left-1 right-1.5 h-1 bg-white/25 rounded-full" />
                        <div className="absolute bottom-0.5 left-1.5 right-1 h-1 bg-black/25 rounded-full" />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* =====================================================================
              3. SEMENTLƏ BƏRKİDİLMİŞ DİVARIN ÜZƏRİNDƏ AÇILAN XİDMƏT PƏNCƏRƏLƏRİ (6 KART)
             ===================================================================== */}
          <div className="relative z-40 grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 px-1 sm:px-5 py-1">
            {SERVICES.map((srv, idx) => {
              const isVisible = stage >= 4;
              return (
                <div
                  key={idx}
                  style={{
                    transform: isVisible
                      ? 'translate3d(0, 0, 0) scale(1)'
                      : 'translate3d(0, 18px, 0) scale(0.9)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 420ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 75}ms`,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                  className="bg-[#FFFFFF]/95 backdrop-blur-sm border-[2px] sm:border-[2.5px] border-[#1A1A1A] rounded-[4px] shadow-[4px_4px_0px_#1A1A1A] sm:shadow-[5px_5px_0px_#1A1A1A] p-3 sm:p-5 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[7px_7px_0px_#C85A32] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs mb-1.5 sm:mb-2.5 border-b border-[#262626]/20 pb-1.5">
                      <span className="font-black text-[#C85A32]">{srv.code} //</span>
                      <span className="px-1.5 py-0.5 bg-[#262626] text-[#F4F0DB] text-[8px] sm:text-[10px] font-bold truncate max-w-[90px] sm:max-w-none">
                        {srv.tag}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-lg font-black text-[#262626] mb-1 sm:mb-1.5 group-hover:text-[#C85A32] transition-colors leading-snug">
                      {srv.title}
                    </h3>

                    <p className="text-[10px] sm:text-xs text-[#262626]/80 leading-relaxed mb-2.5 sm:mb-3.5 line-clamp-2 sm:line-clamp-none">
                      {srv.desc}
                    </p>

                    <div className="hidden sm:grid grid-cols-2 gap-1.5 border-t border-[#262626]/15 pt-2.5 mb-3 font-mono text-[11px]">
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
                    className="pt-1.5 sm:pt-2.5 border-t border-[#262626]/15 font-mono text-[10px] sm:text-xs font-bold text-[#C85A32] hover:text-[#262626] flex items-center justify-between"
                  >
                    <span>[Keçid mətni]</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
