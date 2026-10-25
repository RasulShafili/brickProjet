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
  pileOffsetX: number; // Təpəcik mərkəzindən X sürüşməsi
  pileOffsetY: number; // Yolun üstündəki Y hündürlüyü
  pileRot: number;     // Qarışıq bucaq (-50° .. +50°)
  dumpDelayMs: number; // Kuzadan qarışıq tökülmə gecikməsi
  buildDelayMs: number;// Təpəcikdən divara qarışıq yığılma gecikməsi
}

// PC üçün xırda üfüqi kubik düzülüşü (əvvəlki iri kubiklərin 1/4 sahəsi qədər, kənar boşluqları çıxmaqla bütün sahəni əhatə edir)
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
]; // Cəmi 110 xırda üfüqi kubik (~100px x 36px)

// Mobil üçün PC-dən ~4 dəfə az (29 ədəd) və 100% üfüqi (90° düzəldilmiş) kubik düzülüşü
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
]; // Cəmi 29 üfüqi kubik (~80px en x 34px hündürlük — qətiyyən şaquli uzanmır!)

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

      // Maşının arxasındakı işarələnmiş ərazidə (qırmızı dairədə) təpəcik formasında qarışıq tökülmə
      const spreadX = isMobile ? 130 : 280;
      const offsetNorm = (rand1 - 0.5) * 2; // -1 .. +1
      const pileOffsetX = offsetNorm * (spreadX / 2);

      // Təpəciyin mərkəzi daha hündür, kənarları yola yaxın
      const maxHeapHeight = isMobile ? 64 : 105;
      const heightFactor = Math.max(0.15, 1 - Math.abs(offsetNorm) * 0.8);
      const pileOffsetY = -12 - rand2 * maxHeapHeight * heightFactor;

      // Tam qarışıq bucaq altında tökülür
      const pileRot = (rand3 - 0.5) * 110; // -55 deg .. +55 deg

      // Sıra ilə deyil, tam qarışıq şəkildə tökülmə və yığılma vaxtları
      const dumpDelayMs = 120 + Math.floor(rand4 * 520);
      const buildDelayMs = Math.floor(rand5 * 540);

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
 * 4 Mərhələli Animasiya (Stages):
 * 0 = İlkin gözləmə (maşın solda kənardadır)
 * 1 = Maşın arxa-arxa (geriyə) yaxınlaşır (0ms - 850ms)
 * 2 = Maşın dayanır, kuzasını qaldırır və kubiklər maşının arxasındakı işarələnmiş əraziyə QARIŞIQ TÖKÜLÜR (850ms - 2250ms)
 * 3 = Qarışıq tökülmüş təpəcikdən kubiklər uçaraq SƏLİQƏLİ DİVAR KİMİ HÖRÜLÜR (2250ms - 3350ms)
 * 4 = Hörülən divarın üzərində Xidmət pəncərələri açılır (3350ms+)
 */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wallContainerRef = useRef<HTMLDivElement>(null);

  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [animKey, setAnimKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [wallSize, setWallSize] = useState({ width: 1100, height: 480 });
  const hasTriggeredRef = useRef(false);

  // Ekran ölçüsünü və divar konteynerinin ölçüsünü izlə
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
      setTimeout(() => setStage(1), 40);     // 1. Maşın arxa-arxa gəlir
      setTimeout(() => setStage(2), 880);    // 2. Kuza qalxır və kubiklər maşının arxasına QARIŞIQ TÖKÜLÜR
      setTimeout(() => setStage(3), 2300);   // 3. Tökülən yerdən kubiklər qalxıb DİVAR KİMİ HÖRÜLÜR
      setTimeout(() => setStage(4), 3350);   // 4. Xidmət pəncərələri açılır
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

  // Maşının arxa bortunun (kuza çıxışı) və işarələnmiş tökülmə ərazisinin (qırmızı dairə) koordinatları
  const tailgateX = isMobile ? 165 : 325;
  const tailgateY = isMobile ? -65 : -95;

  const pileCenterX = isMobile ? 240 : 495; // Maşının düz arxası (şəkildə işarələnmiş qırmızı dairə)
  const pileBaseY = isMobile ? -16 : -22;   // Yolun üzəri

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
            1. YÜK MAŞINI (SAMOSVAL) VƏ KUBİKLƏRİN TÖKÜLDÜYÜ MEYDANÇA
           ===================================================================== */}
        <div
          key={`truck-scene-${animKey}`}
          className="relative w-full h-36 sm:h-56 mb-4 border-b-4 border-dashed border-[#262626]/30 flex items-end overflow-visible select-none"
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
                  : 'translate3d(6px, 0px, 0px)',
            }}
          >
            {/* Samosval SVG */}
            <svg
              viewBox="0 0 520 300"
              className="w-[185px] sm:w-[355px] h-auto overflow-visible drop-shadow-[4px_4px_0px_rgba(38,38,38,1)]"
            >
              {/* --- HİDRAVLİK PİSTON --- */}
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

              {/* --- QALXAN YÜK KUZASI --- */}
              <g
                style={{
                  transformOrigin: '455px 215px',
                  transform: stage >= 2 && stage < 4 ? 'rotate(34deg)' : 'rotate(0deg)',
                  transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
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

                {/* Kuzanın yanındakı 5 çökək panel */}
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
          <div className="hidden lg:flex ml-auto mb-5 bg-[#262626] text-[#F4F0DB] px-3 py-1.5 border-2 border-[#262626] shadow-[3px_3px_0px_#C85A32] font-mono text-xs items-center gap-2 z-20">
            <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-ping" />
            <span>
              {stage === 0 && 'GÖZLƏMƏ REJİMİ...'}
              {stage === 1 && '01 // MAŞIN ARXA-ARXA YAXINLAŞIR...'}
              {stage === 2 && '02 // KUBİKLƏR QARIŞIQ ŞƏKİLDƏ YERƏ TÖKÜLÜR...'}
              {stage === 3 && '03 // TÖKÜLƏN KUBİKLƏR DİVAR KİMİ HÖRÜLÜR...'}
              {stage === 4 && '04 // DİVAR HÖRÜLDÜ — XİDMƏT PƏNCƏRƏLƏRİ AKTİVDİR'}
            </span>
          </div>
        </div>

        {/* =====================================================================
            2. XIRDA KUBİKLƏRDƏN HÖRÜLƏN DİVAR VƏ XİDMƏT PƏNCƏRƏLƏRİ
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

          {/* ARXA FONDA YIĞILAN XIRDA KUBİK DİVAR (1/4 ölçüdə, üfüqi kərpic nisbətində) */}
          <div className="absolute inset-0 z-30 pointer-events-none select-none flex flex-col justify-between items-center gap-1 sm:gap-1.5 py-1 overflow-visible">
            {rowsConfig.map((rowCfg, rowIndex) => {
              const rowBricks = bricks.filter((b) => b.row === rowIndex);
              const totalRows = rowsConfig.length;

              return (
                <div
                  key={rowIndex}
                  className="flex-1 max-h-[38px] sm:max-h-[42px] grid gap-1 sm:gap-1.5 overflow-visible"
                  style={{
                    width: `${rowCfg.widthRatio * 100}%`,
                    gridTemplateColumns: `repeat(${rowCfg.cols}, minmax(0, 1fr))`,
                  }}
                >
                  {rowBricks.map((brick) => {
                    // Kubikin divardakı son mərkəz koordinatları (piksel ilə)
                    const rowLeftPx = ((1 - brick.rowWidthRatio) / 2) * wallSize.width;
                    const rowWidthPx = brick.rowWidthRatio * wallSize.width;
                    const finalX = rowLeftPx + ((brick.col + 0.5) / brick.colsInRow) * rowWidthPx;
                    const finalY = ((brick.row + 0.5) / totalRows) * wallSize.height;

                    // 1) Maşının kuzasının içindəki başlanğıc nöqtəyə nisbi vektor
                    const toTruckX = tailgateX - finalX;
                    const toTruckY = tailgateY - finalY;

                    // 2) Maşının arxasındakı işarələnmiş ərazidə (qırmızı dairədə) QARIŞIQ TƏPƏCİK nöqtəsinə vektor
                    const toPileX = pileCenterX + brick.pileOffsetX - finalX;
                    const toPileY = pileBaseY + brick.pileOffsetY - finalY;

                    let transformStr = `translate3d(${toTruckX}px, ${toTruckY}px, 0px) rotate(-15deg) scale(0.35)`;
                    let opacityVal = 0;
                    let transitionStr = 'none';

                    if (stage === 2) {
                      // Mərhələ 2: Maşının kuzasından işarələnmiş yerə QARIŞIQ TÖKÜLÜR
                      transformStr = `translate3d(${toPileX}px, ${toPileY}px, 0px) rotate(${brick.pileRot}deg) scale(0.92)`;
                      opacityVal = 1;
                      transitionStr = `transform 480ms cubic-bezier(0.22, 0.85, 0.36, 1) ${brick.dumpDelayMs}ms, opacity 120ms ease-out ${brick.dumpDelayMs}ms`;
                    } else if (stage >= 3) {
                      // Mərhələ 3 & 4: Tökülən təpəcikdən qalxıb ÖZ YERİNƏ HÖRÜLÜR (üfüqi duruşda: rotate(0deg))
                      transformStr = 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)';
                      opacityVal = 1;
                      transitionStr = `transform 580ms cubic-bezier(0.2, 0.92, 0.28, 1.08) ${brick.buildDelayMs}ms, opacity 150ms ease-out`;
                    }

                    return (
                      <div
                        key={brick.id}
                        className="w-full h-full min-h-[24px] max-h-[36px] sm:min-h-[30px] sm:max-h-[42px] rounded-[3px] border-[2px] sm:border-[2.5px] border-[#1A1A1A] relative overflow-hidden will-change-transform"
                        style={{
                          backgroundColor: brick.color,
                          boxShadow: '0 2.5px 0 #1A1A1A',
                          transform: transformStr,
                          opacity: opacityVal,
                          transition: transitionStr,
                        }}
                      >
                        {/* Şəkil 1-dəki kubikin daxili işıq və kölgə cizgisi */}
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
              3. HÖRÜLƏN DİVARIN ÜZƏRİNDƏ AÇILAN XİDMƏT PƏNCƏRƏLƏRİ (6 KART)
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

                    {/* Qısa Texniki Vurğular */}
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
