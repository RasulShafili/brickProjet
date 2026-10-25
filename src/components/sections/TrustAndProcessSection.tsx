'use client';

import React from 'react';
import { Camera, SearchCheck, FileCheck2, ShieldCheck, Star } from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    num: '01',
    icon: Camera,
    title: 'Şəkil Göndərin',
    desc: 'Görüləcək işin şəklini və ərazini WhatsApp-la göndərin.',
  },
  {
    num: '02',
    icon: SearchCheck,
    title: 'Pulsuz Baxış',
    desc: 'Eyni gün geri dönüş edilir və yerində pulsuz ölçü götürülür.',
  },
  {
    num: '03',
    icon: FileCheck2,
    title: 'Dəqiq Qiymət',
    desc: 'Materiallı və ya yalnız işçilik olaraq dəqiq büdcə danışılır.',
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Zəmanətli Təhvil',
    desc: 'İş söz verilən tarixdə təmiz və zəmanətlə təhvil verilir.',
  },
];

const REVIEWS = [
  {
    name: '[Müştəri Adı 1]',
    location: '[Ərazi]',
    workType: 'Hörgü və Dam',
    comment: 'Divarlar lazer tərəzi ilə çox səliqəli hörüldü və vaxtında təhvil verildi.',
  },
  {
    name: '[Müştəri Adı 2]',
    location: '[Ərazi]',
    workType: 'Pol, Alçipan və Laminat',
    comment: 'Evin bütün pol, patalok-alçipan və laminat işlərini çox səliqəli görüb təhvil verdi.',
  },
  {
    name: '[Müştəri Adı 3]',
    location: '[Ərazi]',
    workType: 'Oboy və Daxili Təmir',
    comment: 'Material siyahısını dəqiq çıxartdı, oboy və daxili təmiri təmiz işlədi.',
  },
];

export default function TrustAndProcessSection() {
  return (
    <section
      id="trust"
      className="px-4 sm:px-8 py-12 lg:py-16 bg-[#FFFFFF] border-b-2 border-[#262626] relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 1. 4 Qısa Addımda İş Prosesi */}
        <div>
          <div className="mb-6 border-b-2 border-[#262626] pb-4">
            <div className="text-xs text-[#C85A32] font-extrabold uppercase tracking-wider mb-1">
              İŞ PROSESİ
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#262626]">
              4 Addımda Rahat Tikinti
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {WORKFLOW_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="brick-card bg-[#F4F0DB]/60 p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-full bg-[#C85A32] text-white border-2 border-[#262626] font-black text-xs flex items-center justify-center">
                        {step.num}
                      </span>
                      <StepIcon className="w-4 h-4 text-[#262626]" />
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-[#262626] mb-1">
                      {step.title}
                    </h3>

                    <p className="text-xs text-[#262626]/80 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Qısa Müştəri Rəyləri */}
        <div>
          <div className="mb-5">
            <div className="text-xs text-[#C85A32] font-extrabold uppercase tracking-wider mb-1">
              MÜŞTƏRİ RƏYLƏRİ
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#262626]">
              Ev Sahiplərinin Fikirləri
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="brick-card bg-[#FFFFFF] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-0.5 text-[#F59E0B] mb-2">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#262626]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#262626]/90 leading-relaxed mb-3">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#262626]/15 flex items-center justify-between text-xs">
                  <span className="font-black text-[#262626]">{rev.name}</span>
                  <span className="text-[11px] font-bold text-[#C85A32]">{rev.workType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
