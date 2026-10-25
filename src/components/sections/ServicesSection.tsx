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
      className="px-4 sm:px-8 py-12 lg:py-16 bg-transparent border-b-2 border-[#262626] relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Kərpic Divardan Asılmış Başlıq Tabelası */}
        <div className="hanging-sign px-6 py-4 mb-8">
          <div className="sign-kicker">XİDMƏTLƏRİMİZ</div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1A110B]">
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
                className="brick-card bg-[#FFFDF7] p-5 sm:p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="w-11 h-11 bg-[#C85A32] text-white border-2 border-[#1A110B] shadow-[2px_2px_0px_#1A110B] flex items-center justify-center rounded-[4px] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="hanging-badge px-2.5 py-1 text-[#1A110B] font-display text-[11px] font-black uppercase">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="window-title text-lg sm:text-xl font-black text-[#1A110B] mb-2.5">
                    {srv.title}
                  </h3>

                  <p className="text-sm font-semibold text-[#221710] leading-relaxed mb-5">
                    {srv.desc}
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brick-btn w-full min-h-[44px] bg-[#1A110B] hover:bg-[#C85A32] text-[#FFFFFF] text-xs sm:text-sm font-black px-4 py-2.5 uppercase tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
