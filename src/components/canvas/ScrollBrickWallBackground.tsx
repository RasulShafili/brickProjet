'use client';

import React from 'react';

const ROW_SHADES = [
  ['#C84B28', '#B83E1E', '#D1582C', '#C24622', '#AD3819'],
  ['#B83E1E', '#CE5428', '#C44823', '#B03A1B', '#C84B28'],
  ['#D0562B', '#C04421', '#B43C1D', '#CC5227', '#BA401E'],
  ['#C24622', '#AD3819', '#C84B28', '#B83E1E', '#D1582C'],
];

/**
 * Bütün sayt boyu uzanan kiçik ölçülü (56x26px) kərpic və sement divar arxa fonu:
 * - Hər plitədə düz 20 ədəd kiçik kərpic var (4 sətir x 5 sütun = 20 kərpic).
 * - Hər 20 kərpicdən YALNIZ 1-i çatlaqdır, digər 19-u bütöv və təbii rəng keçidlidir.
 */
export default function ScrollBrickWallBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-[0.46]"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* 300x120px ölçüsündə 20 kiçik kərpiclik (4 sətir x 5 sütun) kəsintisiz hörgü bloku */}
          <pattern
            id="compact-brick-wall-20"
            x="0"
            y="0"
            width="300"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* Sement Arxa Fonu (Kərpiclər arasında 4px boz sement tikişi) */}
            <rect x="0" y="0" width="300" height="120" fill="#7A828A" />

            {ROW_SHADES.map((rowColors, rIdx) => {
              const y = rIdx * 30 + 2;
              const isShifted = rIdx % 2 === 1;

              if (!isShifted) {
                // Cüt sətirlər (rIdx = 0 və 2): 5 tam kərpic
                return (
                  <g key={`row-${rIdx}`}>
                    {rowColors.map((color, cIdx) => {
                      const x = cIdx * 60 + 2;
                      // 20 kərpicdən yalnız 1-i (rIdx === 2 && cIdx === 3) çatlaqdır!
                      const isTheOneCracked = rIdx === 2 && cIdx === 3;
                      const hasSubtleSpot = (rIdx + cIdx) % 4 === 0;

                      return (
                        <g key={`brick-${rIdx}-${cIdx}`}>
                          <rect
                            x={x}
                            y={y}
                            width="56"
                            height="26"
                            rx="1.5"
                            fill={color}
                            stroke="#1E1E1E"
                            strokeWidth="1.5"
                          />
                          <line
                            x1={x + 3}
                            y1={y + 3}
                            x2={x + 53}
                            y2={y + 3}
                            stroke="#FFFFFF"
                            strokeWidth="1"
                            opacity="0.22"
                          />
                          {hasSubtleSpot && (
                            <circle
                              cx={x + 18}
                              cy={y + 15}
                              r="2.5"
                              fill="#7D260F"
                              opacity="0.35"
                            />
                          )}
                          {isTheOneCracked && (
                            <path
                              d={`M ${x + 24} ${y + 1} L ${x + 29} ${y + 12} L ${x + 23} ${y + 20} L ${x + 27} ${y + 25}`}
                              fill="none"
                              stroke="#1E1E1E"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                          )}
                        </g>
                      );
                    })}
                  </g>
                );
              }

              // Tək sətirlər (rIdx = 1 və 3): Şahmat sürüşməsi (solda və sağda yarım kərpic + ortada 4 tam kərpic)
              return (
                <g key={`row-${rIdx}`}>
                  {/* Sol yarım kərpic */}
                  <rect
                    x="-2"
                    y={y}
                    width="30"
                    height="26"
                    rx="1.5"
                    fill={rowColors[0]}
                    stroke="#1E1E1E"
                    strokeWidth="1.5"
                  />

                  {/* Ortadakı 4 tam kərpic */}
                  {[1, 2, 3, 4].map((cIdx) => {
                    const x = (cIdx - 1) * 60 + 32;
                    const color = rowColors[cIdx];
                    const hasSubtleSpot = (rIdx + cIdx) % 3 === 0;

                    return (
                      <g key={`brick-${rIdx}-${cIdx}`}>
                        <rect
                          x={x}
                          y={y}
                          width="56"
                          height="26"
                          rx="1.5"
                          fill={color}
                          stroke="#1E1E1E"
                          strokeWidth="1.5"
                        />
                        <line
                          x1={x + 3}
                          y1={y + 3}
                          x2={x + 53}
                          y2={y + 3}
                          stroke="#FFFFFF"
                          strokeWidth="1"
                          opacity="0.22"
                        />
                        {hasSubtleSpot && (
                          <ellipse
                            cx={x + 36}
                            cy={y + 14}
                            rx="5"
                            ry="2.5"
                            fill="#7D260F"
                            opacity="0.3"
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Sağ yarım kərpic */}
                  <rect
                    x="272"
                    y={y}
                    width="30"
                    height="26"
                    rx="1.5"
                    fill={rowColors[0]}
                    stroke="#1E1E1E"
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
          </pattern>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#compact-brick-wall-20)" />
      </svg>
    </div>
  );
}
