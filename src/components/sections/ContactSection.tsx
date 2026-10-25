'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Phone, MessageCircle, MapPin, CheckCircle2, Clock, Shield, RotateCcw, Stamp } from 'lucide-react';

/**
 * ƏLAQƏ BÖLMƏSİ ANİMASİYASI (Bölmə 4):
 * "Sarı-Qara Tikinti Ruletkası Açılışı, Yuxarıdan Aşağıya Sürətli Blok Düzülüşü və Təsdiq Möhürü (Ştamp)"
 * - Bölmə ekrana gəldikdə üst hissədəki sarı-qara tikinti ruletkası (ölçü lenti) sürətlə sağa doğru açılır.
 * - Ardınca 1 -> 2 -> 3 ardıcıllığı ilə Zəng Kartı, Məlumat Nişanları və Müraciət Forması yuxarıdan aşağıya açılır.
 * - Forma göndərildikdə (və ya "Möhürü Yoxla" düyməsinə basıldıqda) ekrana kəskin "QƏBUL EDİLDİ" tikinti ştampı vurulur.
 */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    notes: '',
  });
  const [done, setDone] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [animCycle, setAnimCycle] = useState(0);
  const hasTriggeredRef = useRef(false);

  const triggerContactReveal = () => {
    setRevealed(false);
    setAnimCycle((prev) => prev + 1);
    requestAnimationFrame(() => {
      setTimeout(() => {
        setRevealed(true);
      }, 50);
    });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          triggerContactReveal();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  // Doldurulmuş xanalara görə mini tikinti ruletkası göstəricisi
  const filledCount = [formData.name, formData.phone, formData.location, formData.notes].filter(
    (v) => v.trim().length > 0
  ).length;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="px-3 sm:px-8 py-14 lg:py-20 bg-brick-grid relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div
          key={`contact-grid-${animCycle}`}
          className="grid grid-cols-12 gap-6 sm:gap-8 items-start"
        >
          
          {/* =================================================================
              SOL 5 SÜTUN: YUXARIDAN AŞAĞIYA 1 -> 2 -> 3 ARDICILLIĞI İLƏ AÇILAN BLOKLAR
             ================================================================= */}
          <div className="col-span-12 lg:col-span-5 space-y-4 sm:space-y-5">
            
            {/* 1-ci Blok: Başlıq (0ms) */}
            <div
              style={{
                transform: revealed ? 'translate3d(0, 0, 0)' : 'translate3d(0, -14px, 0)',
                opacity: revealed ? 1 : 0,
                transition: 'transform 260ms cubic-bezier(0.2, 0.95, 0.3, 1.05) 0ms, opacity 200ms ease 0ms',
              }}
            >
              <div className="font-mono text-xs text-[#C85A32] font-bold uppercase tracking-widest mb-1">
                [Əlaqə üst etiketi]
              </div>
              <h2 className="text-xl sm:text-4xl font-black text-[#262626] uppercase tracking-tight mb-2">
                [Bura Əlaqə bölməsinin başlığı yazılacaq]
              </h2>
              <p className="font-mono text-xs text-[#262626]/80 leading-relaxed">
                [Bura əlaqə və müraciət üçün qısa açıqlama mətni yazılacaq.]
              </p>
            </div>

            {/* 2-ci Blok: Birbaşa Zəng və WhatsApp Kartı (110ms) */}
            <div
              style={{
                transform: revealed
                  ? 'translate3d(0, 0, 0) scale(1)'
                  : 'translate3d(0, -14px, 0) scale(0.94)',
                opacity: revealed ? 1 : 0,
                transition: 'transform 260ms cubic-bezier(0.2, 0.95, 0.3, 1.05) 110ms, opacity 200ms ease 110ms',
              }}
              className="brick-card p-4 sm:p-5 bg-[#FFFFFF] space-y-3 font-mono relative overflow-hidden"
            >
              {/* Künc dəmir bərkidici xətti */}
              <div className="absolute top-0 right-0 w-10 h-2 bg-[#C85A32] border-b border-l border-[#262626]" />

              <span className="text-[10px] text-[#262626]/70 uppercase font-bold block">
                01 // BİRBAŞA ZƏNG XƏTTİ:
              </span>
              <a
                href="#contact"
                className="flex items-center gap-3 text-base sm:text-xl font-black text-[#C85A32] hover:text-[#262626] transition-colors group"
              >
                <div className="w-10 h-10 bg-[#C85A32] text-white flex items-center justify-center border-2 border-[#262626] shadow-[2px_2px_0px_#262626] shrink-0 group-hover:rotate-12 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <span>[Bura telefon nömrəniz yazılacaq]</span>
              </a>

              <div className="border-t-2 border-[#262626]/20 pt-3">
                <a
                  href="#contact"
                  className="flex items-center gap-3 text-xs sm:text-sm font-bold text-[#262626] hover:text-[#25D366] transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#25D366] text-[#262626] flex items-center justify-center border-2 border-[#262626] shadow-[2px_2px_0px_#262626] shrink-0 group-hover:-rotate-12 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span>[Bura WhatsApp əlaqə mətni / linki yazılacaq]</span>
                </a>
              </div>
            </div>

            {/* 3-cü Blok: Yuxarıdan Aşağıya Ardıcıl Açılan 3 Kərpic Məlumat Zolağı (220ms, 300ms, 380ms) */}
            <div className="space-y-2 font-mono text-xs text-[#262626]">
              {[
                {
                  icon: <Clock className="w-4 h-4 text-[#C85A32] shrink-0" />,
                  text: '[Bura iş saatlarınız yazılacaq]',
                  delay: 220,
                },
                {
                  icon: <MapPin className="w-4 h-4 text-[#C85A32] shrink-0" />,
                  text: '[Bura ünvan və ya xidmət əraziləri yazılacaq]',
                  delay: 300,
                },
                {
                  icon: <Shield className="w-4 h-4 text-emerald-700 shrink-0" />,
                  text: '[Bura zəmanət və ya əlavə qeyd yazılacaq]',
                  delay: 380,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    transform: revealed ? 'translate3d(0, 0, 0)' : 'translate3d(0, -10px, 0)',
                    opacity: revealed ? 1 : 0,
                    transition: `transform 240ms cubic-bezier(0.2, 0.95, 0.3, 1.05) ${item.delay}ms, opacity 180ms ease ${item.delay}ms`,
                  }}
                  className="flex items-center gap-2.5 bg-[#FFFFFF] p-2.5 border-2 border-[#262626] shadow-[2px_2px_0px_#262626]"
                >
                  {item.icon}
                  <span className="font-bold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================================
              SAĞ 7 SÜTUN: KƏSKİN KƏRPİC FORMASI VƏ "TƏSDİQ MÖHÜRÜ" (ŞTAMP) ANİMASİYASI
             ================================================================= */}
          <div
            style={{
              transform: revealed
                ? 'translate3d(0, 0, 0) scale(1)'
                : 'translate3d(0, -16px, 0) scale(0.95)',
              opacity: revealed ? 1 : 0,
              transition: 'transform 280ms cubic-bezier(0.2, 0.95, 0.3, 1.05) 200ms, opacity 220ms ease 200ms',
            }}
            className="col-span-12 lg:col-span-7 brick-card p-5 sm:p-7 bg-[#FFFFFF] relative overflow-hidden"
          >
            {done ? (
              <div className="text-center py-6 sm:py-8 font-mono relative">
                {/* YUXARIDAN ZƏRBƏ İLƏ VURULAN TİKİNTİ TƏSDİQ MÖHÜRÜ (ŞTAMP) */}
                <div
                  style={{
                    animation: 'stampImpact 320ms cubic-bezier(0.2, 0.95, 0.3, 1.2) forwards',
                  }}
                  className="inline-block border-4 border-[#15803D] bg-[#F4F0DB] px-5 py-3 mb-4 shadow-[4px_4px_0px_#262626] -rotate-3"
                >
                  <div className="flex items-center justify-center gap-2 text-[#15803D] font-black text-sm sm:text-base uppercase tracking-wider">
                    <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                    <span>[TƏSDİQ MÖHÜRÜ // QƏBUL EDİLDİ]</span>
                  </div>
                  <div className="text-[10px] text-[#262626] font-bold mt-0.5">
                    SMETA VƏ LAYİHƏ QEYDİYYATA ALINDI
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-[#262626] uppercase mb-1">
                  [Təsdiq başlığı]
                </h3>
                <p className="text-xs text-[#262626]/80 mb-5 max-w-md mx-auto">
                  [Bura müraciət göndərildikdən sonra çıxacaq təsdiq mətni yazılacaq.]
                </p>
                <button
                  onClick={() => setDone(false)}
                  className="brick-btn bg-[#F4F0DB] text-[#262626] hover:bg-[#C85A32] hover:text-white px-5 py-2.5 text-xs font-bold cursor-pointer"
                >
                  Yenidən Yaz
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#262626] pb-2.5">
                  <h3 className="text-sm sm:text-base font-black text-[#262626] uppercase">
                    [Bura müraciət formasının başlığı yazılacaq]
                  </h3>

                  {/* Möhür animasiyasını birbaşa yoxlamaq üçün düymə */}
                  <button
                    type="button"
                    onClick={() => setDone(true)}
                    className="px-2.5 py-1 bg-[#F4F0DB] border border-[#262626] text-[10px] font-bold text-[#C85A32] hover:bg-[#262626] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    title="Təsdiq möhürü animasiyasını yoxla"
                  >
                    <Stamp className="w-3 h-3" />
                    <span>Möhür Effektini Yoxla</span>
                  </button>
                </div>

                {/* Forma doldurulma indikatoru (4 kərpic pilləsi) */}
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-2 border border-[#262626] transition-colors duration-200 ${
                        filledCount >= step ? 'bg-[#C85A32]' : 'bg-[#F4F0DB]'
                      }`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block font-bold text-[#262626] mb-1">01 // ADINIZ:</label>
                    <input
                      type="text"
                      required
                      placeholder="[Müştərinin adı daxil ediləcək yer]"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 border-2 border-[#262626] bg-[#F4F0DB] focus:bg-[#FFFFFF] focus:border-[#C85A32] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#262626] mb-1">02 // TELEFON NÖMRƏNİZ:</label>
                    <input
                      type="tel"
                      required
                      placeholder="[Müştərinin telefon nömrəsi daxil ediləcək yer]"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 border-2 border-[#262626] bg-[#F4F0DB] focus:bg-[#FFFFFF] focus:border-[#C85A32] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#262626] mb-1">03 // TİKİNTİ ƏRAZİSİ:</label>
                  <input
                    type="text"
                    placeholder="[Tikinti ərazisi / ünvan daxil ediləcək yer]"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 border-2 border-[#262626] bg-[#F4F0DB] focus:bg-[#FFFFFF] focus:border-[#C85A32] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#262626] mb-1">04 // GÖRÜLƏCƏK İŞ QEYDİ:</label>
                  <textarea
                    rows={3}
                    placeholder="[Müştərinin görüləcək iş barədə qeydi daxil ediləcək yer]"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-2.5 border-2 border-[#262626] bg-[#F4F0DB] focus:bg-[#FFFFFF] focus:border-[#C85A32] focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="brick-btn w-full bg-[#C85A32] text-white hover:bg-[#B84A27] py-3 text-xs font-bold cursor-pointer"
                >
                  [Göndər düyməsinin mətni]
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
