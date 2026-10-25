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
      className="px-4 sm:px-8 py-12 lg:py-16 bg-transparent border-b-2 border-[#262626] relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 1. 4 Qısa Addımda İş Prosesi */}
        <div>
          {/* Asılmış Tabela Başlıq */}
          <div className="hanging-sign px-6 py-4 mb-7">
            <div className="sign-kicker">İŞ PROSESİ</div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1A110B]">
              4 Addımda Rahat Tikinti
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {WORKFLOW_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="brick-card bg-[#FFFDF7] p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="font-display w-9 h-9 rounded-full bg-[#C85A32] text-white border-2 border-[#1A110B] font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#1A110B]">
                        {step.num}
                      </span>
                      <StepIcon className="w-5 h-5 text-[#1A110B]" />
                    </div>

                    <h3 className="window-title text-base sm:text-lg font-black text-[#1A110B] mb-2">
                      {step.title}
                    </h3>

                    <p className="text-sm font-semibold text-[#221710] leading-relaxed">
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
          {/* Asılmış Tabela Başlıq */}
          <div className="hanging-sign px-6 py-4 mb-6">
            <div className="sign-kicker">MÜŞTƏRİ RƏYLƏRİ</div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1A110B]">
              Ev Sahiplərinin Fikirləri
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="brick-card bg-[#FFFDF7] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-0.5 text-[#F59E0B] mb-2.5">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-[#F59E0B] text-[#1A110B]" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-[#1A110B] leading-relaxed mb-3.5">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-2.5 border-t-2 border-[#1A110B]/15 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-display font-black text-[#1A110B]">{rev.name}</span>
                  <span className="font-display text-xs font-black text-[#C85A32] uppercase">{rev.workType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
