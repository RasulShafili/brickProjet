'use client';

import React, { useEffect, useState } from 'react';

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

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

/**
 * Təbii kərpic divarı YALNIZ 1 DƏFƏ yaddaşda (Offscreen Canvas) 600x360px şəkil (bitmap)
 * kimi çəkir və şəffaflığı (opacity) birbaşa piksellərin içinə həkk edir.
 * Nəticə:
 * 1) Səhifədə 0 ədəd SVG DOM elementi olur (əvvəl ~750 SVG elementi var idi).
 * 2) Tam-səhifə alpha-blending (opacity qatları) yoxdur — 100% mat GPU bitmap teksturasıdır.
 * 3) Sürətli aşağı-yuxarı skrol zamanı gecikmə və ya ağ/boş qalma 0 ms-dir.
 */
function generateBrickTileDataUrl(): string {
  const TILE_W = 600;
  const TILE_H = 360;
  const ROWS = 12;
  const ROW_H = 30;
  const MORTAR_GAP = 5;
  const BRICK_H = ROW_H - MORTAR_GAP;

  const canvas = document.createElement('canvas');
  canvas.width = TILE_W;
  canvas.height = TILE_H;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return '';

  // 1. Qumlu boz-qəhvəyi sement fonu
  ctx.fillStyle = '#6E6258';
  ctx.fillRect(0, 0, TILE_W, TILE_H);

  // 2. Sement üzərində xırda qum dənəcikləri
  for (let i = 0; i < 120; i++) {
    const s = i * 37 + 11;
    const cx = seededRandom(s + 1) * TILE_W;
    const cy = seededRandom(s + 2) * TILE_H;
    const r = 0.7 + seededRandom(s + 3) * 1.1;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(78, 68, 60, 0.45)' : 'rgba(150, 137, 126, 0.45)';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

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

  const traceOrganicBrick = (x: number, y: number, w: number, h: number, seed: number) => {
    const r = (offset: number, amp = 1.3) => (seededRandom(seed + offset) - 0.5) * amp;
    ctx.beginPath();
    ctx.moveTo(x + 1 + r(1, 1.2), y + 1 + r(2, 1.0));
    ctx.lineTo(x + w * 0.33, y + 0.6 + r(3, 1.3));
    ctx.lineTo(x + w * 0.67, y + 0.6 + r(4, 1.3));
    ctx.lineTo(x + w - 1 + r(5, 1.2), y + 1 + r(6, 1.0));
    ctx.lineTo(x + w - 0.5 + r(7, 1.1), y + h * 0.5);
    ctx.lineTo(x + w - 1 + r(8, 1.2), y + h - 1 + r(9, 1.0));
    ctx.lineTo(x + w * 0.67, y + h - 0.6 + r(10, 1.3));
    ctx.lineTo(x + w * 0.33, y + h - 0.6 + r(11, 1.3));
    ctx.lineTo(x + 1 + r(12, 1.2), y + h - 1 + r(13, 1.0));
    ctx.lineTo(x + 0.5 + r(14, 1.1), y + h * 0.5);
    ctx.closePath();
  };

  let globalIndex = 0;

  for (let r = 0; r < ROWS; r++) {
    const widths = rowWidthLayouts[r];
    const y = r * ROW_H + 2;
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

      // Kərpicin alt kölgəsi
      ctx.save();
      ctx.translate(1, 1.4);
      traceOrganicBrick(x, y, w, BRICK_H, seed);
      ctx.fillStyle = 'rgba(43, 33, 27, 0.65)';
      ctx.fill();
      ctx.restore();

      // Əsas kərpic gövdəsi
      traceOrganicBrick(x, y, w, BRICK_H, seed);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#3A2218';
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // Üst kənar işıq vurğusu
      ctx.beginPath();
      ctx.moveTo(x + 3, y + 3);
      ctx.lineTo(x + w - 3, y + 3);
      ctx.strokeStyle = 'rgba(245, 184, 149, 0.24)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Qara ocaq yanığı / kömür ləkələri
      if (seededRandom(seed + 20) < 0.36) {
        const cx = x + w * (0.22 + seededRandom(seed + 21) * 0.56);
        const cy = y + BRICK_H * (0.28 + seededRandom(seed + 22) * 0.46);
        const rx = 4 + seededRandom(seed + 23) * 9;
        const ry = 2.2 + seededRandom(seed + 24) * 4.5;
        const rot = ((seededRandom(seed + 25) - 0.5) * 28 * Math.PI) / 180;
        const op = 0.25 + seededRandom(seed + 26) * 0.38;

        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 22, 18, ${op})`;
        ctx.fill();

        if (seededRandom(seed + 27) < 0.45) {
          const cx2 = x + w * (0.2 + seededRandom(seed + 28) * 0.6);
          const cy2 = y + BRICK_H * (0.3 + seededRandom(seed + 29) * 0.45);
          const rx2 = 2.5 + seededRandom(seed + 30) * 5;
          const ry2 = 1.8 + seededRandom(seed + 31) * 3;
          const op2 = 0.22 + seededRandom(seed + 32) * 0.3;
          ctx.beginPath();
          ctx.ellipse(cx2, cy2, rx2, ry2, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(42, 29, 23, ${op2})`;
          ctx.fill();
        }
      }

      // Ağ əhəng / sement bulaşığı
      if (seededRandom(seed + 40) < 0.18) {
        const lx = x + (seededRandom(seed + 41) < 0.5 ? 2 : w - 11);
        const ly = y + 2 + seededRandom(seed + 42) * (BRICK_H - 9);
        const lw = 4 + seededRandom(seed + 43) * 6;
        const lh = 2.5 + seededRandom(seed + 44) * 4;
        const lop = 0.45 + seededRandom(seed + 45) * 0.35;
        ctx.fillStyle = `rgba(229, 224, 213, ${lop})`;
        ctx.fillRect(lx, ly, lw, lh);
      }

      // Xırda gil oyuğu
      if (seededRandom(seed + 50) < 0.42) {
        const cxStart = x + 6 + seededRandom(seed + 51) * (w - 18);
        const cyStart = y + 6 + seededRandom(seed + 52) * (BRICK_H - 12);
        const cxMid = cxStart + 4 + seededRandom(seed + 53) * 7;
        const cyMid = cyStart + (seededRandom(seed + 54) - 0.5) * 5;
        const cxEnd = cxMid + 3 + seededRandom(seed + 55) * 6;
        const cyEnd = cyMid + (seededRandom(seed + 56) - 0.5) * 5;
        ctx.beginPath();
        ctx.moveTo(cxStart, cyStart);
        ctx.lineTo(cxMid, cyMid);
        ctx.lineTo(cxEnd, cyEnd);
        ctx.strokeStyle = 'rgba(56, 26, 14, 0.48)';
        ctx.lineWidth = 1.1;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Təsadüfi təbii çat (~20 kərpicdən birində)
      const isCracked = globalIndex % 19 === 0 || (globalIndex % 23 === 0 && r % 3 === 1);
      if (isCracked) {
        const crX1 = x + w * (0.25 + seededRandom(seed + 61) * 0.5);
        const crY1 = y + 1;
        const crX2 = crX1 + (seededRandom(seed + 62) - 0.5) * 8;
        const crY2 = y + BRICK_H * 0.42;
        const crX3 = crX2 + (seededRandom(seed + 63) - 0.5) * 8;
        const crY3 = y + BRICK_H * 0.78;
        const crX4 = crX3 + (seededRandom(seed + 64) - 0.5) * 6;
        const crY4 = y + BRICK_H - 1;
        ctx.beginPath();
        ctx.moveTo(crX1, crY1);
        ctx.lineTo(crX2, crY2);
        ctx.lineTo(crX3, crY3);
        ctx.lineTo(crX4, crY4);
        ctx.strokeStyle = 'rgba(28, 18, 14, 0.82)';
        ctx.lineWidth = 1.35;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
    }
  }

  // Yumşaq fon çalarını (əvvəlki opacity-[0.58] effektini) birbaşa şəkil piksellərinə həkk edirik
  // ki, brauzer skrol zamanı şəffaflıq (alpha blending) hesablamasın!
  ctx.fillStyle = 'rgba(244, 240, 219, 0.38)';
  ctx.fillRect(0, 0, TILE_W, TILE_H);

  return canvas.toDataURL('image/jpeg', 0.92);
}

let cachedTileUrl: string | null = null;

export default function ScrollBrickWallBackground() {
  const [tileUrl, setTileUrl] = useState<string>('');

  useEffect(() => {
    if (!cachedTileUrl) {
      cachedTileUrl = generateBrickTileDataUrl();
    }
    setTileUrl(cachedTileUrl);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 select-none"
      style={{
        backgroundColor: '#CE8564',
        backgroundImage: tileUrl ? `url(${tileUrl})` : undefined,
        backgroundRepeat: 'repeat',
        backgroundSize: '600px 360px',
      }}
    />
  );
}
