'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    code: '01',
    title: '[1-ci Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 1-ci xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '02',
    title: '[2-ci Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 2-ci xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '03',
    title: '[3-cü Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 3-cü xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '04',
    title: '[4-cü Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 4-cü xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '05',
    title: '[5-ci Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 5-ci xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
  {
    code: '06',
    title: '[6-cı Xidmətin Adı yazılacaq]',
    tag: '[Kateqoriya / Etiket]',
    desc: '[Bura 6-cı xidmət haqqında qısa izah mətni yazılacaq.]',
    specs: ['[Xüsusiyyət 1]', '[Xüsusiyyət 2]', '[Xüsusiyyət 3]', '[Xüsusiyyət 4]'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="px-4 sm:px-8 py-16 bg-[#FFFFFF] border-b-2 border-[#262626] relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Bölmə Başlığı */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b-2 border-[#262626] pb-5">
          <div>
            <div className="font-mono text-xs text-[#C85A32] font-bold uppercase tracking-widest mb-1">
              [Bölmə üst etiketi]
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#262626] uppercase tracking-tight">
              [Bura Xidmətlər bölməsinin başlığı yazılacaq]
            </h2>
          </div>
          <p className="font-mono text-xs text-[#262626]/80 max-w-md">
            [Bura xidmətlər bölməsi üçün qısa alt açıqlama yazılacaq.]
          </p>
        </div>

        {/* 6 Kəskin Kərpic Kartı */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="brick-card p-6 flex flex-col justify-between group hover:border-[#C85A32]"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-3 border-b border-[#262626]/20 pb-2">
                  <span className="font-bold text-[#C85A32]">{srv.code} //</span>
                  <span className="px-2 py-0.5 bg-[#262626] text-[#F4F0DB] text-[10px] font-bold">
                    {srv.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#262626] mb-2 group-hover:text-[#C85A32] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#262626]/80 leading-relaxed mb-5">
                  {srv.desc}
                </p>

                {/* Qısa Texniki Vurğular */}
                <div className="grid grid-cols-2 gap-2 border-t border-[#262626]/10 pt-3 mb-5 font-mono text-[11px]">
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
                className="pt-3 border-t border-[#262626]/20 font-mono text-xs font-bold text-[#C85A32] hover:text-[#262626] flex items-center justify-between"
              >
                <span>[Keçid mətni]</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
