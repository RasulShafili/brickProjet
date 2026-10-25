'use client';

import React, { useEffect, useState } from 'react';

const BRICK_COLORS = ['#C84B28', '#D96B27', '#C85A32', '#B83E1E', '#D0562B'];

/**
 * Bütün saytın arxa fonunda Aşağı Scroll Etdikcə Tikilən Kərpic və Sement Divarı:
 * - Həm Mobildə (5 sütun x 26 sətir), həm də PC-də (11 sütun x 22 sətir) kərpiclər kvadrat deyil,
 *   əsl üfüqi kubik/kərpic nisbətindədir (~2.5 : 1).
 * - Hörüldükcə kərpiclərin arasındakı tikişlərə boz sement (#7A828A) dolur.
 */
export default function ScrollBrickWallBackground() {
  const [scrollProgress, setScrollProgress] = useState(0.14);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const updateAll = () => {
      setIsMobile(window.innerWidth < 768);
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const raw = Math.min(1, Math.max(0, scrollTop / maxScroll));
      // Səhifə açıldıqda yuxarıdakı 15% hörülü olur, aşağı scroll etdikcə 100% tam hörülür
      setScrollProgress(0.15 + raw * 0.85);
      rafId = null;
    };

    const onScrollOrResize = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateAll);
      }
    };

    updateAll();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Mobildə kvadrat görünməməsi üçün 5 sütun və 26 sətir (üfüqi düzbucaqlı kubik nisbəti)
  // PC-də 10 sütun və 22 sətir
  const totalRows = isMobile ? 26 : 22;
  const colsPerRow = isMobile ? 5 : 10;

  const totalBricks = totalRows * colsPerRow;
  const builtBrickCount = Math.floor(scrollProgress * totalBricks);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none flex flex-col justify-stretch opacity-[0.42] sm:opacity-[0.45]"
    >
      {Array.from({ length: totalRows }).map((_, rIdx) => {
        const isOddRow = rIdx % 2 === 1;
        const rowFirstBrickIndex = rIdx * colsPerRow;
        const rowLastBrickIndex = rowFirstBrickIndex + colsPerRow - 1;
        // Bu sətirdəki kərpiclər düzüldükdə aralarına boz sement (#7A828A) dolur
        const hasCementInRow = builtBrickCount >= rowFirstBrickIndex;
        const isRowFullyCemented = builtBrickCount >= rowLastBrickIndex;

        return (
          <div
            key={rIdx}
            className="flex-1 w-[108%] -ml-[4%] grid gap-[3px] sm:gap-[4px] px-[2px] py-[1.5px] sm:py-[2px] transition-colors duration-300"
            style={{
              gridTemplateColumns: `repeat(${colsPerRow}, minmax(0, 1fr))`,
              // Şahmat qaydasında (Running Bond) kərpic düzülüşü
              transform: isOddRow ? 'translateX(4.5%)' : 'translateX(0%)',
              // Kərpiclərin arasındakı sement təbəqəsi
              backgroundColor: isRowFullyCemented
                ? '#788088'
                : hasCementInRow
                ? '#8B939B'
                : 'transparent',
              borderBottom: hasCementInRow ? '1.5px solid #262626' : 'none',
            }}
          >
            {Array.from({ length: colsPerRow }).map((__, cIdx) => {
              const brickLinearIndex = rIdx * colsPerRow + cIdx;
              const isBuilt = brickLinearIndex <= builtBrickCount;
              const brickColor = BRICK_COLORS[(rIdx * 3 + cIdx) % BRICK_COLORS.length];

              return (
                <div
                  key={cIdx}
                  style={{
                    transform: isBuilt
                      ? 'translate3d(0, 0px, 0) scale(1)'
                      : 'translate3d(0, -18px, 0) scale(0.85)',
                    opacity: isBuilt ? 1 : 0,
                    backgroundColor: brickColor,
                    transition:
                      'transform 260ms cubic-bezier(0.2, 0.95, 0.3, 1.05), opacity 200ms ease-out',
                  }}
                  className="w-full h-full rounded-[2px] border-[1.5px] sm:border-[2px] border-[#1A1A1A] relative overflow-hidden will-change-transform"
                >
                  {/* Kərpic üzərindəki işıq və kölgə teksturası */}
                  <div className="absolute top-[2px] left-1 right-1 h-[2px] bg-white/30 rounded-full" />
                  <div className="absolute bottom-[2px] left-1 right-1 h-[2px] bg-black/25 rounded-full" />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
