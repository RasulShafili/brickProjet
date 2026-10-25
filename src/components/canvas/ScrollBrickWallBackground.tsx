'use client';

import React, { useMemo } from 'react';

/**
 * Deterministik psevdo-təsadüfi ədəd generatoru (SSR və Client-də eyni nəticə verir,
 * lakin insan gözü üçün tamamilə təbii və təsadüfi görünür).
 */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// Şəkildəki təbii bişmiş qırmızı-terrakota kərpic çalarları
const TERRACOTTA_PALETTE = [
  '#B84321',
  '#C64E29',
  '#A53819',
  '#D05A31',
  '#963015',
  '#BE4824',
  '#AD3C1C',
  '#C9532C',
  '#8C2B12',
  '#D56238',
];

interface GeneratedBrick {
  id: string;
  pathD: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  charSpot?: { cx: number; cy: number; rx: number; ry: number; rot: number; opacity: number };
  secondCharSpot?: { cx: number; cy: number; rx: number; ry: number; opacity: number };
  limeSmudge?: { x: number; y: number; w: number; h: number; opacity: number };
  crevicePath?: string;
  crackPath?: string;
  topShadePath: string;
}

/**
 * Təbii əl qəlibi kərpic konturu (kənarları robot kimi düz deyil, şəkildəki kimi yüngül nahamar və təbiidir)
 */
function createOrganicBrickPath(x: number, y: number, w: number, h: number, seed: number): string {
  const r = (offset: number, amp = 1.3) => (seededRandom(seed + offset) - 0.5) * amp;

  const x1 = (x + 1 + r(1, 1.2)).toFixed(1);
  const y1 = (y + 1 + r(2, 1.0)).toFixed(1);

  const xTopMid1 = (x + w * 0.33).toFixed(1);
  const yTopMid1 = (y + 0.6 + r(3, 1.3)).toFixed(1);
  const xTopMid2 = (x + w * 0.67).toFixed(1);
  const yTopMid2 = (y + 0.6 + r(4, 1.3)).toFixed(1);

  const x2 = (x + w - 1 + r(5, 1.2)).toFixed(1);
  const y2 = (y + 1 + r(6, 1.0)).toFixed(1);

  const xRightMid = (x + w - 0.5 + r(7, 1.1)).toFixed(1);
  const yRightMid = (y + h * 0.5).toFixed(1);

  const x3 = (x + w - 1 + r(8, 1.2)).toFixed(1);
  const y3 = (y + h - 1 + r(9, 1.0)).toFixed(1);

  const xBotMid1 = (x + w * 0.67).toFixed(1);
  const yBotMid1 = (y + h - 0.6 + r(10, 1.3)).toFixed(1);
  const xBotMid2 = (x + w * 0.33).toFixed(1);
  const yBotMid2 = (y + h - 0.6 + r(11, 1.3)).toFixed(1);

  const x4 = (x + 1 + r(12, 1.2)).toFixed(1);
  const y4 = (y + h - 1 + r(13, 1.0)).toFixed(1);

  const xLeftMid = (x + 0.5 + r(14, 1.1)).toFixed(1);
  const yLeftMid = (y + h * 0.5).toFixed(1);

  return `M ${x1} ${y1} L ${xTopMid1} ${yTopMid1} L ${xTopMid2} ${yTopMid2} L ${x2} ${y2} L ${xRightMid} ${yRightMid} L ${x3} ${y3} L ${xBotMid1} ${yBotMid1} L ${xBotMid2} ${yBotMid2} L ${x4} ${y4} L ${xLeftMid} ${yLeftMid} Z`;
}

export default function ScrollBrickWallBackground() {
  const { bricks, mortarSpeckles } = useMemo(() => {
    const TILE_W = 600;
    const ROWS = 12;
    const ROW_H = 30; // 12 * 30 = 360px
    const MORTAR_GAP = 5;
    const BRICK_H = ROW_H - MORTAR_GAP; // 25px

    // Hər sətirdə uzun (stretcher) və qısa (header) kərpiclərin təbii düzülüşü (cəmi 600px)
    const rowWidthLayouts: number[][] = [
      [74, 46, 78, 52, 72, 48, 80, 54, 52, 44],
      [48, 76, 50, 74, 46, 78, 52, 72, 58, 46],
      [80, 50, 72, 48, 76, 54, 70, 46, 60, 44],
      [56, 74, 48, 78, 50, 72, 46, 76, 52, 48],
      [72, 52, 76, 46, 80, 50, 74, 48, 56, 46],
      [44, 78, 52, 70, 48, 76, 54, 74, 54, 50],
      [76, 48, 74, 52, 78, 46, 72, 50, 58, 46],
      [52, 72, 46, 80, 48, 74, 52, 76, 50, 50],
      [78, 50, 70, 48, 76, 52, 74, 46, 60, 46],
      [46, 74, 54, 72, 50, 78, 48, 72, 56, 50],
      [74, 48, 78, 46, 72, 54, 76, 48, 56, 48],
      [50, 76, 48, 74, 52, 70, 50, 78, 52, 50],
    ];

    const list: GeneratedBrick[] = [];
    let globalIndex = 0;

    for (let r = 0; r < ROWS; r++) {
      const widths = rowWidthLayouts[r];
      const y = r * ROW_H + 2;
      // Tək sətirləri sürüşdürürük ki, şaquli sement xətləri üst-üstə düşməsin
      const rowOffset = r % 2 === 1 ? 28 : 0;
      let cursorX = -rowOffset;

      for (let c = 0; c < widths.length + 1; c++) {
        const cellW = widths[c % widths.length];
        const x = cursorX + 2;
        const w = cellW - MORTAR_GAP;
        cursorX += cellW;

        if (x >= TILE_W) break;

        globalIndex++;
        const seed = r * 1000 + c * 73 + 19;

        const colorIdx = Math.floor(seededRandom(seed + 1) * TERRACOTTA_PALETTE.length);
        const color = TERRACOTTA_PALETTE[colorIdx];

        const pathD = createOrganicBrickPath(x, y, w, BRICK_H, seed);

        // Üst kənarda təbii işıq-kölgə relyefi
        const topShadePath = `M ${x + 3} ${y + 3} L ${x + w - 3} ${y + 3}`;

        // Təxminən 35% kərpicdə şəkildəki kimi qara ocaq yanığı / kömür ləkəsi (kiln burn marks)
        const hasChar = seededRandom(seed + 20) < 0.36;
        const charSpot = hasChar
          ? {
              cx: x + w * (0.22 + seededRandom(seed + 21) * 0.56),
              cy: y + BRICK_H * (0.28 + seededRandom(seed + 22) * 0.46),
              rx: 4 + seededRandom(seed + 23) * 9,
              ry: 2.2 + seededRandom(seed + 24) * 4.5,
              rot: (seededRandom(seed + 25) - 0.5) * 28,
              opacity: 0.25 + seededRandom(seed + 26) * 0.38,
            }
          : undefined;

        const secondCharSpot =
          hasChar && seededRandom(seed + 27) < 0.45
            ? {
                cx: x + w * (0.2 + seededRandom(seed + 28) * 0.6),
                cy: y + BRICK_H * (0.3 + seededRandom(seed + 29) * 0.45),
                rx: 2.5 + seededRandom(seed + 30) * 5,
                ry: 1.8 + seededRandom(seed + 31) * 3,
                opacity: 0.22 + seededRandom(seed + 32) * 0.3,
              }
            : undefined;

        // Təxminən 18% kərpicin kənarında ağ əhəng / sement bulaşıqları (şəkildəki ağ ləkələr)
        const hasLime = seededRandom(seed + 40) < 0.18;
        const limeSmudge = hasLime
          ? {
              x: x + (seededRandom(seed + 41) < 0.5 ? 2 : w - 11),
              y: y + 2 + seededRandom(seed + 42) * (BRICK_H - 9),
              w: 4 + seededRandom(seed + 43) * 6,
              h: 2.5 + seededRandom(seed + 44) * 4,
              opacity: 0.45 + seededRandom(seed + 45) * 0.35,
            }
          : undefined;

        // Təxminən 40% kərpicin üzərində təbii gil oyuğu / cızıq izi (surface texture)
        const hasCrevice = seededRandom(seed + 50) < 0.42;
        const cxStart = x + 6 + seededRandom(seed + 51) * (w - 18);
        const cyStart = y + 6 + seededRandom(seed + 52) * (BRICK_H - 12);
        const cxMid = cxStart + 4 + seededRandom(seed + 53) * 7;
        const cyMid = cyStart + (seededRandom(seed + 54) - 0.5) * 5;
        const cxEnd = cxMid + 3 + seededRandom(seed + 55) * 6;
        const cyEnd = cyMid + (seededRandom(seed + 56) - 0.5) * 5;
        const crevicePath = hasCrevice
          ? `M ${cxStart.toFixed(1)} ${cyStart.toFixed(1)} L ${cxMid.toFixed(1)} ${cyMid.toFixed(1)} L ${cxEnd.toFixed(1)} ${cyEnd.toFixed(1)}`
          : undefined;

        // Təxminən 20 kərpicdən 1-də təsadüfi təbii çat (hər dəfə fərqli bucaq və formada)
        const isCracked = globalIndex % 19 === 0 || (globalIndex % 23 === 0 && r % 3 === 1);
        let crackPath: string | undefined;
        if (isCracked) {
          const crX1 = x + w * (0.25 + seededRandom(seed + 61) * 0.5);
          const crY1 = y + 1;
          const crX2 = crX1 + (seededRandom(seed + 62) - 0.5) * 8;
          const crY2 = y + BRICK_H * 0.42;
          const crX3 = crX2 + (seededRandom(seed + 63) - 0.5) * 8;
          const crY3 = y + BRICK_H * 0.78;
          const crX4 = crX3 + (seededRandom(seed + 64) - 0.5) * 6;
          const crY4 = y + BRICK_H - 1;
          crackPath = `M ${crX1.toFixed(1)} ${crY1.toFixed(1)} L ${crX2.toFixed(1)} ${crY2.toFixed(1)} L ${crX3.toFixed(1)} ${crY3.toFixed(1)} L ${crX4.toFixed(1)} ${crY4.toFixed(1)}`;
        }

        list.push({
          id: `b-${r}-${c}`,
          pathD,
          x,
          y,
          w,
          h: BRICK_H,
          color,
          charSpot,
          secondCharSpot,
          limeSmudge,
          crevicePath,
          crackPath,
          topShadePath,
        });
      }
    }

    // Sement aralarında qum dənəcikləri effekti
    const speckles = Array.from({ length: 140 }).map((_, idx) => {
      const s = idx * 37 + 11;
      return {
        cx: (seededRandom(s + 1) * TILE_W).toFixed(1),
        cy: (seededRandom(s + 2) * 360).toFixed(1),
        r: (0.7 + seededRandom(s + 3) * 1.1).toFixed(1),
        fill: idx % 2 === 0 ? '#4E443C' : '#96897E',
      };
    });

    return { bricks: list, mortarSpeckles: speckles };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-[0.58]"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <pattern
            id="natural-weathered-brick-wall"
            x="0"
            y="0"
            width="600"
            height="360"
            patternUnits="userSpaceOnUse"
          >
            {/* Qumlu-boz-qəhvəyi təbii sement məhlulu fonu (şəkildəki rəng) */}
            <rect x="0" y="0" width="600" height="360" fill="#6E6258" />

            {/* Sement üzərində təbii qum dənəcikləri */}
            {mortarSpeckles.map((sp, i) => (
              <circle
                key={`sp-${i}`}
                cx={sp.cx}
                cy={sp.cy}
                r={sp.r}
                fill={sp.fill}
                opacity="0.45"
              />
            ))}

            {/* Təbii Kərpiclər */}
            {bricks.map((b) => (
              <g key={b.id}>
                {/* Kərpicin alt kölgəsi (sement üzərinə düşən dərinlik) */}
                <path
                  d={b.pathD}
                  fill="#2B211B"
                  transform="translate(1, 1.4)"
                  opacity="0.65"
                />

                {/* Əsas əl qəlibi kərpic gövdəsi */}
                <path
                  d={b.pathD}
                  fill={b.color}
                  stroke="#3A2218"
                  strokeWidth="1.1"
                />

                {/* Üst kənar işıq vurğusu */}
                <path
                  d={b.topShadePath}
                  stroke="#F5B895"
                  strokeWidth="1"
                  opacity="0.24"
                />

                {/* Qara ocaq yanığı / kömür ləkələri (şəkildəki kimi təsadüfi) */}
                {b.charSpot && (
                  <ellipse
                    cx={b.charSpot.cx}
                    cy={b.charSpot.cy}
                    rx={b.charSpot.rx}
                    ry={b.charSpot.ry}
                    transform={`rotate(${b.charSpot.rot} ${b.charSpot.cx} ${b.charSpot.cy})`}
                    fill="#1E1612"
                    opacity={b.charSpot.opacity}
                  />
                )}
                {b.secondCharSpot && (
                  <ellipse
                    cx={b.secondCharSpot.cx}
                    cy={b.secondCharSpot.cy}
                    rx={b.secondCharSpot.rx}
                    ry={b.secondCharSpot.ry}
                    fill="#2A1D17"
                    opacity={b.secondCharSpot.opacity}
                  />
                )}

                {/* Ağ əhəng / sement ləkələri */}
                {b.limeSmudge && (
                  <rect
                    x={b.limeSmudge.x}
                    y={b.limeSmudge.y}
                    width={b.limeSmudge.w}
                    height={b.limeSmudge.h}
                    rx="1.2"
                    fill="#E5E0D5"
                    opacity={b.limeSmudge.opacity}
                  />
                )}

                {/* Kərpic səthindəki xırda gil oyuqları */}
                {b.crevicePath && (
                  <path
                    d={b.crevicePath}
                    fill="none"
                    stroke="#381A0E"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    opacity="0.48"
                  />
                )}

                {/* Təsadüfi çat (~20 kərpicdən birində) */}
                {b.crackPath && (
                  <path
                    d={b.crackPath}
                    fill="none"
                    stroke="#1C120E"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.82"
                  />
                )}
              </g>
            ))}
          </pattern>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#natural-weathered-brick-wall)" />
      </svg>
    </div>
  );
}
