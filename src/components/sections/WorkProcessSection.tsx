'use client';

import React from 'react';
import { Ruler, FileCheck, Layers, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Sahəyə Lazer Baxışı',
    desc: 'Usta şəxsən sahəyə gəlir. Nivelirlə qruntun mailliyi və torpaq sıxlığı ölçülür.',
  },
  {
    num: '02',
    title: 'Sxem & Razılaşma',
    desc: 'Otaq bölgüləri, daşıyıcı kərpic və bünövrə armaturunun dəqiq sxemi çəkilir.',
  },
  {
    num: '03',
    title: 'Bünövrə & Termohörgü',
    desc: 'B25 monolit tökülür, hidroizolyasiya vurulur və 380mm kərpic lazerlə hörülür.',
  },
  {
    num: '04',
    title: 'Dam & Zəmanətli Təhvil',
    desc: 'Antiseptikli stropil fermaları yığılır, dam vurulur və 10 il zəmanətlə təhvil verilir.',
  },
];

export default function WorkProcessSection() {
  return (
    <section id="process" className="px-4 sm:px-8 py-16 bg-[#FFFFFF] border-b-2 border-[#262626] relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Başlıq */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b-2 border-[#262626] pb-5">
          <div>
            <div className="font-mono text-xs text-[#C85A32] font-bold uppercase tracking-widest mb-1">
              [İCRA STANDARTI // İŞ QAYDASI]
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#262626] uppercase tracking-tight">
              İşi Necə Təşkil Edirik?
            </h2>
          </div>
          <p className="font-mono text-xs text-[#262626]/80 max-w-md">
            Hər mərhələdə foto-video hesabat. Sifarişçidən gizli heç bir qüsur qalmır.
          </p>
        </div>

        {/* 4 Kəskin Kərpic Addımı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className="brick-card p-6 bg-[#F4F0DB] flex flex-col justify-between group hover:border-[#C85A32]"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-4">
                  <span className="text-2xl font-black text-[#C85A32]">{s.num} //</span>
                  <span className="w-3 h-3 bg-[#262626] group-hover:bg-[#C85A32] transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-[#262626] mb-2 uppercase">
                  {s.title}
                </h3>

                <p className="text-xs text-[#262626]/80 leading-relaxed font-mono">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
