'use client';

import React, { useEffect, useState } from 'react';

/**
 * Kənarlarda və fonda asta-asta hərəkət edən kərpic blokları,
 * süzülən tikinti ölçü xətləri və lazer nivelir şüası.
 */
export default function FloatingBricksBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // Çox yüngül paralaks
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* 1. Lazer Nivelir Üfüqi Skan Şüası */}
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-laserScan" />

      {/* 2. Sol Kənarda Süzülən Kərpic Blokları */}
      <div
        className="absolute top-24 -left-6 flex flex-col gap-3 transition-transform duration-700 ease-out opacity-25 lg:opacity-40"
        style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
      >
        <div className="w-24 h-9 bg-[#C85A32] border-2 border-[#262626] shadow-[3px_3px_0px_#262626] rotate-[-6deg] flex items-center justify-center font-mono text-[9px] font-bold text-white">
          KƏRPİC 250x120
        </div>
        <div className="w-28 h-9 bg-[#9E3F20] border-2 border-[#262626] shadow-[3px_3px_0px_#262626] ml-4 rotate-[-3deg]" />
        <div className="w-20 h-9 bg-[#E3C1AA] border-2 border-[#262626] shadow-[3px_3px_0px_#262626] -ml-2 rotate-[4deg]" />
      </div>

      {/* 3. Sağ Kənarda Süzülən Kərpic və Tikinti Koordinatları */}
      <div
        className="absolute bottom-32 -right-8 flex flex-col gap-3 transition-transform duration-700 ease-out opacity-25 lg:opacity-40"
        style={{ transform: `translate(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px)` }}
      >
        <div className="w-28 h-10 bg-[#C85A32] border-2 border-[#262626] shadow-[4px_4px_0px_#262626] rotate-[8deg] flex items-center justify-center font-mono text-[9px] font-bold text-white">
          M-150 BÖLGÜ
        </div>
        <div className="w-24 h-9 bg-[#B84A27] border-2 border-[#262626] shadow-[3px_3px_0px_#262626] mr-4 rotate-[2deg]" />
        <div className="w-32 h-9 bg-[#3A3A3A] border-2 border-[#262626] shadow-[3px_3px_0px_#262626] rotate-[-5deg] flex items-center justify-center font-mono text-[9px] text-[#E3C1AA]">
          LAZER: ±0.00m
        </div>
      </div>

      {/* 4. Sol Tərəfdə Tikinti Şaquli Ölçü Xətkeşi */}
      <div className="hidden xl:flex absolute left-4 top-1/4 bottom-1/4 flex-col justify-between font-mono text-[10px] text-[#262626]/30 select-none border-l-2 border-dashed border-[#262626]/20 pl-2">
        <span>+6.40m [SİLSİLƏ]</span>
        <span>+3.20m [MƏRTƏBƏ]</span>
        <span>+0.60m [KÜRSÜLÜK]</span>
        <span>±0.00m [BÜNÖVRƏ]</span>
      </div>

      {/* 5. Sağ Tərəfdə Koordinat İşarəsi */}
      <div className="hidden xl:flex absolute right-4 top-1/3 flex-col items-end font-mono text-[10px] text-[#C85A32]/50 select-none">
        <span>BAKI // ABŞERON</span>
        <span className="text-[9px]">40.4093° N // 49.8671° E</span>
        <span className="w-16 h-[2px] bg-[#C85A32]/40 mt-1" />
      </div>

    </div>
  );
}
