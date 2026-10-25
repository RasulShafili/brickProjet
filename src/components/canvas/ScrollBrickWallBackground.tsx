'use client';

import React, { useEffect, useState } from 'react';

const TOTAL_ROWS = 18;
const COLS_PER_ROW = 8;

/**
 * Səhifənin arxa planında solğun (faded) kərpic hörgü animasiyası:
 * İstifadəçi aşağı scroll etdikcə kərpic sətirləri ardıcıllıqla yerinə oturur və hörülür.
 */
export default function ScrollBrickWallBackground() {
  const [scrollProgress, setScrollProgress] = useState(0.08);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      // Başlanğıcda yuxarı hissə (0.12) görünür, aşağı düşdükcə 1.0-a qədər tam hörülür
      const raw = Math.min(1, Math.max(0, scrollTop / maxScroll));
      const mapped = 0.12 + raw * 0.88;
      setScrollProgress(mapped);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Neçə kərpicin artıq hörüldüyünü hesablayırıq
  const totalBricks = TOTAL_ROWS * COLS_PER_ROW;
  const builtBrickCount = Math.floor(scrollProgress * totalBricks);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none flex flex-col justify-between p-1.5 sm:p-3 opacity-[0.14] sm:opacity-[0.16]"
    >
      {Array.from({ length: TOTAL_ROWS }).map((_, rIdx) => {
        const isOddRow = rIdx % 2 === 1;

        return (
          <div
            key={rIdx}
            className="flex-1 w-full flex items-stretch gap-1.5 sm:gap-2 my-[2px] sm:my-[3px]"
            style={{
              // Şahmat qaydasında (Running Bond) hörgü sürüşməsi
              transform: isOddRow ? 'translateX(3%)' : 'translateX(-1%)',
            }}
          >
            {Array.from({ length: COLS_PER_ROW }).map((__, cIdx) => {
              const brickLinearIndex = rIdx * COLS_PER_ROW + cIdx;
              const isBuilt = brickLinearIndex <= builtBrickCount;
              const isJustBuilding =
                brickLinearIndex > builtBrickCount - 4 &&
                brickLinearIndex <= builtBrickCount;

              return (
                <div
                  key={cIdx}
                  style={{
                    transform: isBuilt
                      ? 'translate3d(0, 0px, 0) scale(1)'
                      : 'translate3d(0, 26px, 0) scale(0.88)',
                    opacity: isBuilt ? 1 : 0,
                    backgroundColor: isJustBuilding
                      ? '#D96B27'
                      : (rIdx + cIdx) % 2 === 0
                      ? '#C85A32'
                      : '#9E3F20',
                    transition:
                      'transform 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out, background-color 300ms ease',
                  }}
                  className="flex-1 h-full rounded-[3px] border-2 border-[#262626] shadow-[2px_2px_0px_#262626] relative will-change-transform"
                >
                  {/* Solğun kərpic içi cizgi */}
                  <div className="absolute top-1 left-1.5 right-1.5 h-[2px] bg-white/30 rounded-full" />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
