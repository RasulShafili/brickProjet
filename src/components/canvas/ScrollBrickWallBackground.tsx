'use client';

import React from 'react';

/**
 * Bütün sayt boyu uzanan, kənarlarında heç bir boşluq olmayan və aşağı scroll etdikdə
 * təbii böyük divar kimi hərəkət edən kərpic və sement arxa fonu.
 * Kərpiclərin hamısı eyni deyil: bəziləri ləkəli, bəziləri çatlaq, bəziləri isə fərqli bişmiş kərpic tonlarındadır.
 */
export default function ScrollBrickWallBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-[0.48]"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* 400x240px ölçüsündə 4 sətirlik təkrarolunmaz (müxtəlif rəngli, çatlaq və ləkəli) kərpic divar bloku */}
          <pattern
            id="realistic-brick-wall"
            x="0"
            y="0"
            width="400"
            height="240"
            patternUnits="userSpaceOnUse"
          >
            {/* Bütöv Sement Arxa Fonu (Kərpiclərin və kənarların arasında heç bir boşluq qalmır) */}
            <rect x="0" y="0" width="400" height="240" fill="#7A828A" />

            {/* Sement teksturası nöqtələri */}
            <circle cx="45" cy="58" r="1.5" fill="#5B626A" />
            <circle cx="195" cy="118" r="1.5" fill="#5B626A" />
            <circle cx="310" cy="178" r="1.5" fill="#5B626A" />
            <circle cx="120" cy="238" r="1.5" fill="#5B626A" />

            {/* =============================================================
                1-Cİ SƏTİR (y = 3 .. 55, h = 52)
               ============================================================= */}
            {/* Kərpic 1.1: Standart bişmiş kərpic + xırda ləkələr */}
            <g>
              <rect x="3" y="3" width="94" height="52" rx="2" fill="#C84B28" stroke="#1E1E1E" strokeWidth="2" />
              <line x1="7" y1="7" x2="92" y2="7" stroke="#E07A5F" strokeWidth="2" opacity="0.45" />
              <circle cx="24" cy="28" r="4" fill="#9E3518" opacity="0.55" />
              <circle cx="72" cy="38" r="2.5" fill="#8A2D14" opacity="0.5" />
            </g>

            {/* Kərpic 1.2: Çatlaq kərpic (tünd qırmızı-qəhvəyi) */}
            <g>
              <rect x="103" y="3" width="94" height="52" rx="2" fill="#B23A1A" stroke="#1E1E1E" strokeWidth="2" />
              <path
                d="M 138 4 L 144 22 L 136 35 L 148 54"
                fill="none"
                stroke="#1E1E1E"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M 144 22 L 158 29"
                fill="none"
                stroke="#1E1E1E"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <rect x="108" y="44" width="84" height="6" fill="#7D260F" opacity="0.35" />
            </g>

            {/* Kərpic 1.3: Açıq narıncı-gil tonlu ləkəli kərpic */}
            <g>
              <rect x="203" y="3" width="94" height="52" rx="2" fill="#D66031" stroke="#1E1E1E" strokeWidth="2" />
              <ellipse cx="235" cy="24" rx="12" ry="6" fill="#A83E17" opacity="0.4" />
              <ellipse cx="272" cy="36" rx="8" ry="5" fill="#788088" opacity="0.35" />
              <line x1="208" y1="8" x2="290" y2="8" stroke="#F4A261" strokeWidth="2" opacity="0.4" />
            </g>

            {/* Kərpic 1.4: Tünd yanmış kərpic + künc çatlağı */}
            <g>
              <rect x="303" y="3" width="94" height="52" rx="2" fill="#9E3316" stroke="#1E1E1E" strokeWidth="2" />
              <path d="M 372 4 L 365 18 L 382 26 L 396 22" fill="none" stroke="#1E1E1E" strokeWidth="1.6" />
              <circle cx="328" cy="32" r="5" fill="#6E200B" opacity="0.5" />
              <circle cx="342" cy="20" r="2.5" fill="#D97706" opacity="0.35" />
            </g>

            {/* =============================================================
                2-Cİ SƏTİR (Şahmat sürüşməsi: yarım kərpic solda və sağda, y = 63 .. 115)
               ============================================================= */}
            {/* Sol yarım kərpic (x = 0 .. 47) — sağ kənardakı yarım kərpiclə tam birləşir */}
            <g>
              <rect x="-3" y="63" width="50" height="52" rx="2" fill="#BE4320" stroke="#1E1E1E" strokeWidth="2" />
              <circle cx="22" cy="88" r="4" fill="#8C2D12" opacity="0.5" />
            </g>

            {/* Kərpic 2.1: Ləkəli və sement izli kərpic */}
            <g>
              <rect x="53" y="63" width="94" height="52" rx="2" fill="#CF562A" stroke="#1E1E1E" strokeWidth="2" />
              <ellipse cx="82" cy="92" rx="14" ry="7" fill="#9E3818" opacity="0.45" />
              <circle cx="122" cy="78" r="4.5" fill="#7A828A" opacity="0.45" />
              <line x1="58" y1="68" x2="140" y2="68" stroke="#F4A261" strokeWidth="2" opacity="0.35" />
            </g>

            {/* Kərpic 2.2: Ortadan çatlaq kərpic */}
            <g>
              <rect x="153" y="63" width="94" height="52" rx="2" fill="#A8381B" stroke="#1E1E1E" strokeWidth="2" />
              <path
                d="M 195 64 L 202 84 L 192 98 L 198 114"
                fill="none"
                stroke="#1E1E1E"
                strokeWidth="1.8"
              />
              <circle cx="172" cy="86" r="3.5" fill="#6E200B" opacity="0.5" />
              <circle cx="225" cy="94" r="5" fill="#D96B27" opacity="0.35" />
            </g>

            {/* Kərpic 2.3: Fərqli teksturalı qırmızı kərpic */}
            <g>
              <rect x="253" y="63" width="94" height="52" rx="2" fill="#C44925" stroke="#1E1E1E" strokeWidth="2" />
              <line x1="262" y1="88" x2="298" y2="88" stroke="#8C2D12" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
              <circle cx="322" cy="82" r="4" fill="#942F13" opacity="0.5" />
              <circle cx="312" cy="100" r="3" fill="#942F13" opacity="0.5" />
            </g>

            {/* Sağ yarım kərpic (x = 353 .. 403) — sol kənardakı ilə kəsintisiz birləşir */}
            <g>
              <rect x="353" y="63" width="50" height="52" rx="2" fill="#BE4320" stroke="#1E1E1E" strokeWidth="2" />
              <path d="M 368 64 L 375 86 L 366 102" fill="none" stroke="#1E1E1E" strokeWidth="1.5" />
            </g>

            {/* =============================================================
                3-CÜ SƏTİR (y = 123 .. 175, h = 52)
               ============================================================= */}
            {/* Kərpic 3.1: Çatlaq və tünd ləkəli */}
            <g>
              <rect x="3" y="123" width="94" height="52" rx="2" fill="#B53E1D" stroke="#1E1E1E" strokeWidth="2" />
              <path d="M 42 124 L 36 145 L 48 162" fill="none" stroke="#1E1E1E" strokeWidth="1.7" />
              <ellipse cx="72" cy="148" rx="10" ry="5" fill="#82270E" opacity="0.45" />
            </g>

            {/* Kərpic 3.2: Açıq bişmiş kərpic */}
            <g>
              <rect x="103" y="123" width="94" height="52" rx="2" fill="#D45D2F" stroke="#1E1E1E" strokeWidth="2" />
              <circle cx="128" cy="142" r="3.5" fill="#9E3518" opacity="0.45" />
              <circle cx="164" cy="156" r="5" fill="#9E3518" opacity="0.4" />
              <line x1="108" y1="128" x2="190" y2="128" stroke="#FDE68A" strokeWidth="1.5" opacity="0.3" />
            </g>

            {/* Kərpic 3.3: Tünd qəhvəyi-qırmızı ləkəli kərpic */}
            <g>
              <rect x="203" y="123" width="94" height="52" rx="2" fill="#A33417" stroke="#1E1E1E" strokeWidth="2" />
              <ellipse cx="248" cy="150" rx="16" ry="7" fill="#75210B" opacity="0.5" />
              <circle cx="220" cy="138" r="3" fill="#7A828A" opacity="0.4" />
            </g>

            {/* Kərpic 3.4: Çatlaq narıncı-qırmızı kərpic */}
            <g>
              <rect x="303" y="123" width="94" height="52" rx="2" fill="#C94E29" stroke="#1E1E1E" strokeWidth="2" />
              <path
                d="M 335 174 L 342 152 L 356 144 L 350 124"
                fill="none"
                stroke="#1E1E1E"
                strokeWidth="1.7"
              />
              <circle cx="376" cy="154" r="4" fill="#8F2D12" opacity="0.45" />
            </g>

            {/* =============================================================
                4-CÜ SƏTİR (Şahmat sürüşməsi, y = 183 .. 235)
               ============================================================= */}
            {/* Sol yarım kərpic */}
            <g>
              <rect x="-3" y="183" width="50" height="52" rx="2" fill="#CF562A" stroke="#1E1E1E" strokeWidth="2" />
              <circle cx="18" cy="210" r="3.5" fill="#8C2D12" opacity="0.45" />
            </g>

            {/* Kərpic 4.1: Tünd ləkəli kərpic */}
            <g>
              <rect x="53" y="183" width="94" height="52" rx="2" fill="#9E3316" stroke="#1E1E1E" strokeWidth="2" />
              <ellipse cx="96" cy="208" rx="15" ry="6" fill="#6E200B" opacity="0.5" />
              <circle cx="70" cy="198" r="3" fill="#D97706" opacity="0.35" />
            </g>

            {/* Kərpic 4.2: Ləkəli və cizgili kərpic */}
            <g>
              <rect x="153" y="183" width="94" height="52" rx="2" fill="#C84B28" stroke="#1E1E1E" strokeWidth="2" />
              <line x1="168" y1="212" x2="215" y2="212" stroke="#8C2D12" strokeWidth="2.5" opacity="0.45" />
              <circle cx="228" cy="198" r="4" fill="#7A828A" opacity="0.4" />
            </g>

            {/* Kərpic 4.3: Çatlaq kərpic */}
            <g>
              <rect x="253" y="183" width="94" height="52" rx="2" fill="#B83E1E" stroke="#1E1E1E" strokeWidth="2" />
              <path
                d="M 284 184 L 292 206 L 280 222 L 288 234"
                fill="none"
                stroke="#1E1E1E"
                strokeWidth="1.8"
              />
              <path d="M 292 206 L 308 212" fill="none" stroke="#1E1E1E" strokeWidth="1.3" />
              <circle cx="326" cy="202" r="4.5" fill="#82270E" opacity="0.5" />
            </g>

            {/* Sağ yarım kərpic */}
            <g>
              <rect x="353" y="183" width="50" height="52" rx="2" fill="#CF562A" stroke="#1E1E1E" strokeWidth="2" />
              <circle cx="378" cy="206" r="4" fill="#8C2D12" opacity="0.45" />
            </g>
          </pattern>
        </defs>

        {/* Bütün səhifəni kənardan-kənara boşluqsuz örtən kərpic divar */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#realistic-brick-wall)" />
      </svg>
    </div>
  );
}
