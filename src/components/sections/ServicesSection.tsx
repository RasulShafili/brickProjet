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
  pileOffsetX: number;
  pileOffsetY: number;
  pileRot: number;
  dumpDelayMs: number;
  buildDelayMs: number;
}

/**
 * PC üçün sıx və bir-birinə yapışıq hörgü divarı (uzun taxta kimi deyil, yığcam kubik nisbətində):
 * 13 sətir, hər sətirdə 11-12 kubik (şahmat qaydasında növbələşir).
 */
const DESKTOP_ROWS: { cols: number; widthRatio: number }[] = [
  { cols: 10, widthRatio: 0.90 },
  { cols: 11, widthRatio: 0.96 },
  { cols: 12, widthRatio: 1.00 },
  { cols: 11, widthRatio: 0.98 },
  { cols: 12, widthRatio: 1.00 },
  { cols: 11, widthRatio: 0.98 },
  { cols: 12, widthRatio: 1.00 },
  { cols: 11, widthRatio: 0.98 },
  { cols: 12, widthRatio: 1.00 },
  { cols: 11, widthRatio: 0.98 },
  { cols: 12, widthRatio: 1.00 },
  { cols: 11, widthRatio: 0.96 },
  { cols: 10, widthRatio: 0.90 },
];

/**
 * Mobil üçün sıx və bir-birinə yapışıq hörgü divarı:
 * Kubiklər uzun taxta kimi görünməsin deyə hər sətirdə 7-8 ədəd yığcam kubik var
 * və 15 sətir bir-birinə tam yapışıq şəkildə düzülür (aralarında boşluq qalmır).
 */
const MOBILE_ROWS: { cols: number; widthRatio: number }[] = [
  { cols: 6, widthRatio: 0.88 },
  { cols: 7, widthRatio: 0.95 },
  { cols: 8, widthRatio: 1.00 },
  { cols: 7, widthRatio: 0.97 },
  { cols: 8, widthRatio: 1.00 },
  { cols: 7, widthRatio: 0.97 },
  { cols: 8, widthRatio: 1.00 },
  { cols: 7, widthRatio: 0.97 },
  { cols: 8, widthRatio: 1.00 },
  { cols: 7, widthRatio: 0.97 },
  { cols: 8, widthRatio: 1.00 },
  { cols: 7, widthRatio: 0.97 },
  { cols: 8, widthRatio: 1.00 },
  { cols: 7, widthRatio: 0.95 },
  { cols: 6, widthRatio: 0.88 },
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

      // Tökülən kubiklər maşınların üstünə çıxmasın deyə yalnız iki maşının arasındakı açıq sahəyə yığılır
      const spreadX = isMobile ? 42 : 110;
      const offsetNorm = (rand1 - 0.5) * 2; // -1 .. +1
      const pileOffsetX = offsetNorm * (spreadX / 2);

      // Təpəcik hündürlüyü alçaq və yığcam saxlanılır ki, maşınların təkər səviyyəsini keçməsin
      const maxHeapHeight = isMobile ? 16 : 32;
      const heightFactor = Math.max(0.18, 1 - Math.abs(offsetNorm) * 0.82);
      const pileOffsetY = -4 - rand2 * maxHeapHeight * heightFactor;

      // Qarışıq bucaq altında tökülmə (-50 dərəcə .. +50 dərəcə)
      const pileRot = (rand3 - 0.5) * 100;

      const dumpDelayMs = 80 + Math.floor(rand4 * 440);
      const buildDelayMs = Math.floor(rand5 * 450);

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
 * Ardıcıl 5 Mərhələli Tikinti Xoreoqrafiyası:
 * 0 = Gözləmə
 * 1 = Hər iki maşın (75-80% yığcam ölçüdə) arxa-arxaya yaxınlaşır (40ms - 880ms)
 * 2 = Sol maşın kuzasını qaldırır və balaca kubiklər iki maşının arasına qarışıq tökülür (880ms - 2050ms)
 * 3 = Tökülən kubiklər qalxıb bir-birinə tam yapışıq DİVAR kimi düzülür (2050ms - 3150ms)
 * 4 = Kubiklər düzüləndən SONRA sağdakı Sement Maşınından sement tökülür və kubiklərin arasına dolur (3150ms - 4350ms)
 * 5 = Bərkidilmiş divarın üzərində Xidmət Pəncərələri açılır (4350ms+)
 */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wallContainerRef = useRef<HTMLDivElement>(null);

  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [animKey, setAnimKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [wallSize, setWallSize] = useState({ width: 360, height: 420 });
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
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
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
      setTimeout(() => setStage(2), 880);    // 2. Xırda kubiklər maşının arxasına qarışıq tökülür
      setTimeout(() => setStage(3), 2050);   // 3. Kubiklər bir-birinə yapışıq divar kimi düzülür
      setTimeout(() => setStage(4), 3150);   // 4. Kubiklər düzüləndən SONRA sement tökülür və aralarına dolur
      setTimeout(() => setStage(5), 4350);   // 5. Xidmət pəncərələri açılır
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

  // Maşınlar 75-80% ölçüyə salındığı üçün kuzanın arxa nöqtəsi və tökülmə mərkəzi:
  // Mobildə sol maşın 115px enindədir, kubiklər düz iki maşının arasındakı boşluğa (x ≈ 140px) tökülür
  const tailgateX = isMobile ? 102 : 230;
  const tailgateY = isMobile ? -38 : -68;

  const pileCenterX = isMobile ? Math.min(142, wallSize.width * 0.42) : 315;
  const pileBaseY = isMobile ? -10 : -14;

  // Sement YALNIZ kubiklər düzüləndən sonra (Stage 4-də) tökülür
  const isPouringCement = stage === 4;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="px-3 sm:px-8 py-12 lg:py-20 bg-[#FFFFFF] border-b-2 border-[#262626] relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Bölmə Başlığı və Təkrar İzlə Düyməsi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-5 border-b-2 border-[#262626] pb-4">
          <div>
            <div className="font-mono text-xs text-[#C85A32] font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>[Bölmə üst etiketi]</span>
            </div>
            <h2 className="text-xl sm:text-4xl font-black text-[#262626] uppercase tracking-tight">
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
            1. İKİ TƏRƏFLİ MAŞIN SƏHNƏSİ (75-80% YIĞCAM ÖLÇÜDƏ):
               SOLDA: Kubik Samosvalı (w-[115px] sm:w-[250px])
               SAĞDA: Sement Maşını (w-[135px] sm:w-[290px])
           ===================================================================== */}
        <div
          key={`truck-scene-${animKey}`}
          className="relative w-full h-28 sm:h-44 mb-3 sm:mb-4 border-b-4 border-dashed border-[#262626]/30 flex items-end justify-between overflow-visible select-none"
        >
          {/* Yol / Tikinti Meydançası Xətti */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#262626]" />
          <div className="absolute bottom-2 left-0 right-0 h-1 bg-[#C85A32]" />

          {/* -----------------------------------------------------------------
              SOL TƏRƏF: KUBİK GƏTİRƏN MAŞIN (SAMOSVAL — 77% ÖLÇÜDƏ)
             ----------------------------------------------------------------- */}
          <div
            className="relative z-20 transition-transform duration-[850ms] ease-out will-change-transform"
            style={{
              transform:
                stage === 0
                  ? 'translate3d(-340px, 0px, 0px)'
                  : 'translate3d(2px, 0px, 0px)',
            }}
          >
            <svg
              viewBox="0 0 520 300"
              className="w-[115px] sm:w-[250px] h-auto overflow-visible drop-shadow-[2px_2px_0px_rgba(38,38,38,1)] sm:drop-shadow-[3px_3px_0px_rgba(38,38,38,1)]"
            >
              {/* Hidravlik Piston */}
              <g>
                <rect x="235" y="160" width="16" height="75" rx="2" fill="#22252A" stroke="#111" strokeWidth="2" />
                <line
                  x1="243"
                  y1="215"
                  x2={stage === 2 || stage === 3 ? '268' : '243'}
                  y2={stage === 2 || stage === 3 ? '105' : '195'}
                  stroke="#D1D5DB"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="transition-all duration-600 ease-in-out"
                />
                <line
                  x1="243"
                  y1="215"
                  x2={stage === 2 || stage === 3 ? '268' : '243'}
                  y2={stage === 2 || stage === 3 ? '105' : '195'}
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
                  transform: stage === 2 || stage === 3 ? 'rotate(34deg)' : 'rotate(0deg)',
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
          <div className="hidden xl:flex mb-5 bg-[#262626] text-[#F4F0DB] px-3 py-1.5 border-2 border-[#262626] shadow-[3px_3px_0px_#C85A32] font-mono text-[11px] items-center gap-2 z-20">
            <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-ping" />
            <span>
              {stage === 0 && 'GÖZLƏMƏ REJİMİ...'}
              {stage === 1 && '01 // KUBİK VƏ SEMENT MAŞINLARI YAXINLAŞIR...'}
              {stage === 2 && '02 // KİÇİK KUBİKLƏR YERƏ QARIŞIQ TÖKÜLÜR...'}
              {stage === 3 && '03 // KUBİKLƏR BİR-BİRİNƏ YAPIŞIQ DİVAR KİMİ DÜZÜLÜR...'}
              {stage === 4 && '04 // KUBİKLƏR DÜZÜLDÜ — İNDİ SEMENT TÖKÜLÜR...'}
              {stage === 5 && '05 // HÖRGÜ VƏ SEMENT TAMAMLANDI — XİDMƏTLƏR AKTİVDİR'}
            </span>
          </div>

          {/* -----------------------------------------------------------------
              SAĞ TƏRƏF: SEMENT MAŞINI (BETONQARIŞDIRAN MİKSER — 77% ÖLÇÜDƏ)
             ----------------------------------------------------------------- */}
          <div
            className="relative z-20 transition-transform duration-[880ms] ease-out will-change-transform"
            style={{
              transform:
                stage === 0
                  ? 'translate3d(360px, 0px, 0px)'
                  : 'translate3d(-2px, 0px, 0px)',
            }}
          >
            <svg
              viewBox="0 28 600 242"
              className="w-[135px] sm:w-[290px] h-auto overflow-visible drop-shadow-[2px_2px_0px_rgba(38,38,38,1)] sm:drop-shadow-[3px_3px_0px_rgba(38,38,38,1)]"
            >
              {/* --- ARXA SEMENT TÖKÜLƏN NOV (CHUTE) VƏ REALİSTİK SEMENT AXINI --- */}
              <g>
                {/* Novun ucundan yalnız kubiklər düzüləndən sonra (Stage 4) tökülən sement şırnağı */}
                <g
                  style={{
                    transformOrigin: '16px 224px',
                    transform: isPouringCement ? 'scaleY(1)' : 'scaleY(0)',
                    opacity: isPouringCement ? 1 : 0,
                    transition: 'transform 380ms ease-out, opacity 250ms ease-in-out',
                  }}
                >
                  <path
                    d="M 13 222 L 22 222 L 28 310 L 2 310 Z"
                    fill="#788088"
                    stroke="#262626"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="17"
                    y1="224"
                    x2="15"
                    y2="308"
                    stroke="#9CA3AF"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="14 10"
                    className="animate-cementFlow"
                  />
                  <line
                    x1="13"
                    y1="228"
                    x2="9"
                    y2="308"
                    stroke="#525860"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="10 14"
                    className="animate-cementFlow"
                  />
                  <path
                    d="M -8 265 Q 5 250 16 250 Q 27 250 38 265 Z"
                    fill="#6C747C"
                    stroke="#262626"
                    strokeWidth="2"
                  />
                </g>

                <path
                  d="M 80 186 L 12 218 L 18 228 L 86 196 Z"
                  fill="#2B2E33"
                  stroke="#111"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <line x1="48" y1="206" x2="72" y2="195" stroke="#64748B" strokeWidth="3" />
              </g>

              {/* --- ARXA DAYAQ KONSTRUKSİYASI (A-FRAME) --- */}
              <g>
                <polygon
                  points="64,62 94,62 128,192 64,192"
                  fill="#2B2E33"
                  stroke="#111"
                  strokeWidth="2.5"
                />
                <polygon
                  points="95,125 148,162 148,192 95,192"
                  fill="#26282C"
                  stroke="#111"
                  strokeWidth="2"
                />
              </g>

              {/* --- BÖYÜK SARI-NARINCI SEMENT ÇƏNİ (MİKSER BARABANI) --- */}
              <g>
                <path
                  d="M 68 82 L 155 58 Q 275 48 415 102 L 420 158 Q 285 198 150 165 L 68 135 Z"
                  fill="#F59E0B"
                  stroke="#262626"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M 72 86 L 156 62 Q 275 52 412 105 L 414 128 Q 275 88 155 102 L 72 106 Z"
                  fill="#FACC15"
                />
                <path
                  d="M 70 124 L 152 148 Q 285 182 418 145 L 420 158 Q 285 198 150 165 L 68 135 Z"
                  fill="#D97706"
                />

                <line
                  x1={isPouringCement ? '195' : '185'}
                  y1="57"
                  x2={isPouringCement ? '170' : '160'}
                  y2="166"
                  stroke="#B45309"
                  strokeWidth="3"
                  className="transition-all duration-300"
                />
                <line
                  x1={isPouringCement ? '295' : '282'}
                  y1="65"
                  x2={isPouringCement ? '268' : '255'}
                  y2="176"
                  stroke="#B45309"
                  strokeWidth="3"
                  className="transition-all duration-300"
                />

                <line x1="124" y1="52" x2="106" y2="165" stroke="#1E2022" strokeWidth="6" strokeLinecap="round" />
                <line x1="120" y1="52" x2="102" y2="165" stroke="#FACC15" strokeWidth="2.5" />
              </g>

              {/* --- ARXA GÜMÜŞÜ NƏRDİVAN --- */}
              <g>
                <rect x="74" y="68" width="22" height="118" fill="none" stroke="#94A3B8" strokeWidth="3.5" />
                {[82, 98, 114, 130, 146, 162, 178].map((ry) => (
                  <line key={ry} x1="74" y1={ry} x2="96" y2={ry} stroke="#CBD5E1" strokeWidth="2.5" />
                ))}
              </g>

              {/* --- KABİNA ARXASI SU ÇƏNİ VƏ REDUKTOR --- */}
              <g>
                <rect x="415" y="132" width="36" height="48" rx="3" fill="#EA580C" stroke="#262626" strokeWidth="2.5" />
                <circle cx="430" cy="112" r="18" fill="#F97316" stroke="#262626" strokeWidth="2.5" />
                <line x1="430" y1="98" x2="430" y2="126" stroke="#262626" strokeWidth="3" />
                <rect x="448" y="88" width="9" height="105" fill="#1E2022" stroke="#111" strokeWidth="2" />
                <path d="M 452 88 L 452 62 Q 452 52 442 50" fill="none" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
              </g>

              {/* --- ŞASSİ, TƏKƏR QANADLARI VƏ AVADANLIQ QUTUSU --- */}
              <g>
                <rect x="85" y="175" width="350" height="12" fill="#F59E0B" stroke="#262626" strokeWidth="2" />
                <rect x="78" y="186" width="388" height="32" fill="#2B2E33" stroke="#111" strokeWidth="2.5" />
                {[135, 218, 385, 495].map((wx, idx) => (
                  <path
                    key={idx}
                    d={`M ${wx - 40} 232 A 40 40 0 0 1 ${wx + 40} 232 Z`}
                    fill="#1E2022"
                    stroke="#374151"
                    strokeWidth="3"
                  />
                ))}
                <rect x="268" y="198" width="68" height="36" rx="2" fill="#374151" stroke="#111" strokeWidth="2.5" />
                <rect x="430" y="202" width="28" height="30" rx="2" fill="#64748B" stroke="#111" strokeWidth="2" />
                <line x1="432" y1="212" x2="456" y2="212" stroke="#1E2022" strokeWidth="2.5" />
                <line x1="432" y1="222" x2="456" y2="222" stroke="#1E2022" strokeWidth="2.5" />
                <rect x="122" y="156" width="54" height="22" rx="2" fill="#F59E0B" stroke="#262626" strokeWidth="2" />
                <rect x="200" y="156" width="54" height="22" rx="2" fill="#F59E0B" stroke="#262626" strokeWidth="2" />
              </g>

              {/* --- SAĞDAKI SARI KABİNA --- */}
              <g>
                <path
                  d="M 460 88 L 532 88 Q 545 88 552 105 L 564 162 L 564 226 L 460 226 Z"
                  fill="#FACC15"
                  stroke="#262626"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path d="M 460 165 L 564 165 L 564 226 L 460 226 Z" fill="#EAB308" stroke="#262626" strokeWidth="2.5" />
                <path d="M 455 232 A 40 40 0 0 1 535 232 Z" fill="#1E2022" stroke="#262626" strokeWidth="2.5" />
                <path
                  d="M 482 102 L 538 102 L 548 150 L 482 150 Z"
                  fill="#1E3A5F"
                  stroke="#262626"
                  strokeWidth="3"
                />
                <polygon points="490,106 515,106 498,146 486,146" fill="#38BDF8" opacity="0.35" />
                <rect x="544" y="102" width="8" height="34" rx="2" fill="#1E2022" stroke="#111" strokeWidth="1.5" />
                <rect x="488" y="168" width="16" height="5" rx="1" fill="#1E2022" />
                <rect x="554" y="182" width="12" height="24" rx="2" fill="#E2E8F0" stroke="#262626" strokeWidth="2" />
                <rect x="536" y="208" width="32" height="26" rx="2" fill="#CBD5E1" stroke="#262626" strokeWidth="2.5" />
              </g>

              {/* --- 4 ƏDƏD FIRLANAN TƏKƏR --- */}
              {[135, 218, 385, 495].map((cx, i) => (
                <g
                  key={i}
                  style={{
                    transformOrigin: `${cx}px 232px`,
                    transform: stage === 0 ? 'rotate(360deg)' : 'rotate(0deg)',
                    transition: 'transform 880ms ease-out',
                  }}
                >
                  <circle cx={cx} cy={232} r={34} fill="#1E2022" stroke="#111" strokeWidth="4" strokeDasharray="9 4" />
                  <circle cx={cx} cy={232} r={28} fill="#25282A" />
                  <circle cx={cx} cy={232} r={18} fill="#D1D5DB" stroke="#4B5563" strokeWidth="2" />
                  <circle cx={cx} cy={219} r={2.5} fill="#1E2022" />
                  <circle cx={cx} cy={245} r={2.5} fill="#1E2022" />
                  <circle cx={cx - 13} cy={232} r={2.5} fill="#1E2022" />
                  <circle cx={cx + 13} cy={232} r={2.5} fill="#1E2022" />
                  <circle cx={cx} cy={232} r={8} fill="#64748B" stroke="#1E2022" strokeWidth="2" />
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* =====================================================================
            2. BİR-BİRİNƏ TAM YAPIŞIQ HÖRÜLƏN KUBİK DİVAR VƏ ARALARINA DOLAN SEMENT
           ===================================================================== */}
        <div
          key={`wall-scene-${animKey}`}
          ref={wallContainerRef}
          className="relative py-2.5 sm:py-5 px-1 sm:px-5 overflow-visible"
        >
          {/* Halftone (Nöqtəli) Kölgə Effekti */}
          <div
            className="absolute inset-1.5 sm:inset-4 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: stage >= 3 ? 0.28 : 0,
              backgroundImage: 'radial-gradient(#1A1A1A 2px, transparent 2px)',
              backgroundSize: '10px 10px',
              transform: 'translate(8px, 8px)',
            }}
          />

          {/* ARXA FONDA YIĞILAN KUBİK DİVAR:
              - Sətirlər arasında boşluq YOXDUR (gap-0, sətir daxilində yalnız 2px tikiş xətti).
              - Kubiklər taxta kimi uzun deyil, əsl kubik nisbətində və bir-birinə tam yapışıqdır.
              - Stage 4-də həmin sıx tikişlərin arasına boz sement rəngi (#7A828A) dolur. */}
          <div className="absolute inset-0 z-30 pointer-events-none select-none flex flex-col items-center justify-stretch gap-0 overflow-visible">
            {rowsConfig.map((rowCfg, rowIndex) => {
              const rowBricks = bricks.filter((b) => b.row === rowIndex);
              const totalRows = rowsConfig.length;

              return (
                <div
                  key={rowIndex}
                  className="flex-1 w-full grid gap-[1.5px] sm:gap-[2.5px] px-[1.5px] sm:px-[2.5px] py-[0.75px] sm:py-[1.25px] overflow-visible relative"
                  style={{
                    width: `${rowCfg.widthRatio * 100}%`,
                    gridTemplateColumns: `repeat(${rowCfg.cols}, minmax(0, 1fr))`,
                    // Stage 3-də kubiklər bir-birinə sıx yapışıq düzülür, Stage 4-də aradakı tikişlərə boz sement dolur
                    backgroundColor: stage >= 4 ? '#788088' : 'transparent',
                    boxShadow: stage >= 4 ? '0 0 0 2px #1A1A1A' : 'none',
                    transition: `background-color 450ms ease-in-out ${80 + rowIndex * 35}ms, box-shadow 400ms ease ${80 + rowIndex * 35}ms`,
                  }}
                >
                  {rowBricks.map((brick) => {
                    const rowLeftPx = ((1 - brick.rowWidthRatio) / 2) * wallSize.width;
                    const rowWidthPx = brick.rowWidthRatio * wallSize.width;
                    const finalX = rowLeftPx + ((brick.col + 0.5) / brick.colsInRow) * rowWidthPx;
                    const finalY = ((brick.row + 0.5) / totalRows) * wallSize.height;

                    const toTruckX = tailgateX - finalX;
                    const toTruckY = tailgateY - finalY;

                    const toPileX = pileCenterX + brick.pileOffsetX - finalX;
                    const toPileY = pileBaseY + brick.pileOffsetY - finalY;

                    // Stage 0 & 1: Maşının kuzası daxilində çox kiçik (scale 0.18)
                    let transformStr = `translate3d(${toTruckX}px, ${toTruckY}px, 0px) rotate(-15deg) scale(0.18)`;
                    let opacityVal = 0;
                    let transitionStr = 'none';

                    if (stage === 2) {
                      // Stage 2: Yerə tökülən kubiklər kiçik ölçüdədir (scale 0.25), maşınların üstünə çıxmır
                      const dumpScale = isMobile ? 0.26 : 0.28;
                      transformStr = `translate3d(${toPileX}px, ${toPileY}px, 0px) rotate(${brick.pileRot}deg) scale(${dumpScale})`;
                      opacityVal = 1;
                      transitionStr = `transform 460ms cubic-bezier(0.22, 0.85, 0.36, 1) ${brick.dumpDelayMs}ms, opacity 120ms ease-out ${brick.dumpDelayMs}ms`;
                    } else if (stage >= 3) {
                      // Stage 3+: Divarda bir-birinə tam yapışıq şəkildə yerini alır
                      transformStr = 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)';
                      opacityVal = 1;
                      transitionStr = `transform 540ms cubic-bezier(0.2, 0.92, 0.28, 1.08) ${brick.buildDelayMs}ms, opacity 150ms ease-out`;
                    }

                    return (
                      <div
                        key={brick.id}
                        className="w-full h-full rounded-[2px] border-[1.5px] sm:border-[2px] border-[#1A1A1A] relative overflow-hidden will-change-transform"
                        style={{
                          backgroundColor: brick.color,
                          transform: transformStr,
                          opacity: opacityVal,
                          transition: transitionStr,
                        }}
                      >
                        {/* Kubik üzərindəki işıq və kölgə cizgiləri */}
                        <div className="absolute top-[2px] left-1 right-1 h-[2px] bg-white/25 rounded-full" />
                        <div className="absolute bottom-[2px] left-1 right-1 h-[2px] bg-black/25 rounded-full" />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* =====================================================================
              3. SEMENT DOLANDAN SONRA (Stage 5) AÇILAN XİDMƏT PƏNCƏRƏLƏRİ (6 KART)
             ===================================================================== */}
          <div className="relative z-40 grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 px-1.5 sm:px-5 py-1.5 sm:py-2">
            {SERVICES.map((srv, idx) => {
              const isVisible = stage >= 5;
              return (
                <div
                  key={idx}
                  style={{
                    transform: isVisible
                      ? 'translate3d(0, 0, 0) scale(1)'
                      : 'translate3d(0, 16px, 0) scale(0.92)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 420ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 75}ms`,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                  className="bg-[#FFFFFF]/95 backdrop-blur-sm border-[2px] sm:border-[2.5px] border-[#1A1A1A] rounded-[4px] shadow-[3px_3px_0px_#1A1A1A] sm:shadow-[5px_5px_0px_#1A1A1A] p-2.5 sm:p-5 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[7px_7px_0px_#C85A32] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[9px] sm:text-xs mb-1 sm:mb-2 border-b border-[#262626]/20 pb-1">
                      <span className="font-black text-[#C85A32]">{srv.code} //</span>
                      <span className="px-1.5 py-0.5 bg-[#262626] text-[#F4F0DB] text-[8px] sm:text-[10px] font-bold truncate max-w-[80px] sm:max-w-none">
                        {srv.tag}
                      </span>
                    </div>

                    <h3 className="text-[11px] sm:text-lg font-black text-[#262626] mb-1 sm:mb-1.5 group-hover:text-[#C85A32] transition-colors leading-tight sm:leading-snug">
                      {srv.title}
                    </h3>

                    <p className="text-[10px] sm:text-xs text-[#262626]/80 leading-snug sm:leading-relaxed mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-none">
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
                    className="pt-1 sm:pt-2 border-t border-[#262626]/15 font-mono text-[9px] sm:text-xs font-bold text-[#C85A32] hover:text-[#262626] flex items-center justify-between"
                  >
                    <span>[Keçid mətni]</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
