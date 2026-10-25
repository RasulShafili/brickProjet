'use client';

import React from 'react';
import { Hammer, Home, Layers, Shield, Wrench, PaintBucket, MessageCircle } from 'lucide-react';

const SERVICES = [
  {
    icon: Home,
    title: 'Sıfırdan Ev Tikintisi',
    badge: 'Bünövrədən Dama',
    desc: '1 və 2 mərtəbəli fərdi həyət evlərinin bünövrədən dama qədər tam tikintisi.',
  },
  {
    icon: Layers,
    title: 'Kubik Hörgü və Suvaq',
    badge: 'Tərəzi Dəqiqliyi',
    desc: 'Miysar daşı (kubik) və kərpiclə düz divar hörgüsü, qara və ağ suvaq işləri.',
  },
  {
    icon: Shield,
    title: 'Dam Örtükləri',
    badge: 'Quraşdırma və Təmir',
    desc: 'Taxta karkasın yığılması, çerepitsa, şifer vurulması və dam sızmalarının təmiri.',
  },
  {
    icon: PaintBucket,
    title: 'Daxili Təmir və Kafel',
    badge: 'Təmiz İşçilik',
    desc: 'Otaqların əsaslı təmiri, döşəmə styajkası, hamam-mətbəx kafel və metlax işləri.',
  },
  {
    icon: Hammer,
    title: 'Hasar və Həyət İşləri',
    badge: 'Xarici Görünüş',
    desc: 'Daş hasarların hörülməsi, fasad suvağı və həyətə tamet-beton döşənməsi.',
  },
  {
    icon: Wrench,
    title: 'Kiçik Ev Təmiri',
    badge: 'Sürətli Bərpa',
    desc: 'Divar çatlarının bərpası, otaq bölmə və digər xırda təmir-bərpa işləri.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="px-4 sm:px-8 py-12 lg:py-16 bg-[#FFFFFF] border-b-2 border-[#262626] relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Qısa Başlıq */}
        <div className="flex items-center justify-between gap-4 mb-8 border-b-2 border-[#262626] pb-4">
          <div>
            <div className="text-xs text-[#C85A32] font-extrabold uppercase tracking-wider mb-1">
              XİDMƏTLƏRİMİZ
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#262626]">
              Gördüyümüz Əsas İşlər
            </h2>
          </div>
        </div>

        {/* 6 Yığcam və Aydın Xidmət Kartı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((srv, idx) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={idx}
                className="brick-card bg-[#F4F0DB]/60 hover:bg-[#FFFFFF] p-5 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 bg-[#C85A32] text-white border-2 border-[#262626] shadow-[2px_2px_0px_#262626] flex items-center justify-center rounded-[4px] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 bg-[#262626] text-[#F4F0DB] text-[10px] font-bold rounded-[2px]">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-[#262626] mb-1.5">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-[#262626]/80 leading-relaxed mb-4">
                    {srv.desc}
                  </p>
                </div>

                <a
                  href="#contact"
                  className="w-full min-h-[42px] bg-[#262626] hover:bg-[#C85A32] text-[#FFFFFF] font-bold text-xs px-4 py-2 rounded-[4px] flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Qiymət Soruş</span>
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
