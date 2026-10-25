'use client';

import React from 'react';
import { Hammer, Home, Layers, Shield, Grid, PaintBucket, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '994515480300';

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
    title: 'Dam Örtüklərinin Yığılması',
    badge: 'Sıfırdan Quraşdırma',
    desc: 'Taxta karkasın sıfırdan qurulması, çerepitsa, profnastil və şifer dam örtüklərinin vurulması.',
  },
  {
    icon: Grid,
    title: 'Pol, Patalok, Alçipan və Laminat',
    badge: 'Döşəmə və Tavan',
    desc: 'İstənilən növ taxta pol, patalok, sadə və fiqurlu alçipan vurulması, laminat döşənməsi.',
  },
  {
    icon: PaintBucket,
    title: 'Oboy, Boya və Kafel-Metlax',
    badge: 'Daxili Təmir',
    desc: 'Divarların şpaklyovkası, oboy (divar kağızı) vurulması, rəngləmə və kafel-metlax işləri.',
  },
  {
    icon: Hammer,
    title: 'Hasar və Həyət İşləri',
    badge: 'Xarici Görünüş',
    desc: 'Daş hasarların hörülməsi, fasad suvağı və həyətə tamet-beton döşənməsi.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="px-4 sm:px-8 py-12 lg:py-16 bg-transparent border-b-2 border-[#26211D] relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Kərpic Divardan Asılmış Başlıq Tabelası */}
        <div className="hanging-sign px-6 py-3.5 mb-8">
          <div className="text-[11px] text-[#C85A32] font-semibold uppercase tracking-wider mb-0.5">
            Xidmətlərimiz
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1915]">
            Gördüyümüz Əsas İşlər
          </h2>
        </div>

        {/* 6 Ev Pəncərəsi Görünüşlü Xidmət Kartı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SERVICES.map((srv, idx) => {
            const IconComponent = srv.icon;
            const textMsg = `Salam usta, "${srv.title}" xidməti üzrə qiymət öyrənmək istəyirəm.`;
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(textMsg)}`;

            return (
              <div
                key={idx}
                className="brick-card bg-[#FFFDF9] p-5 sm:p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="w-10 h-10 bg-[#C85A32] text-white border-2 border-[#26211D] shadow-[2px_2px_0px_#26211D] flex items-center justify-center rounded-[4px] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="hanging-badge px-2.5 py-0.5 text-[#4E443C] text-[11px] font-medium">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1F1915] mb-1.5">
                    {srv.title}
                  </h3>

                  <p className="text-sm font-normal text-[#4E443C] leading-relaxed mb-5">
                    {srv.desc}
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[42px] bg-[#26211D] hover:bg-[#C85A32] text-[#FFFFFF] font-medium text-xs sm:text-sm px-4 py-2 rounded-[4px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>WhatsApp ilə Qiymət Soruş</span>
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
