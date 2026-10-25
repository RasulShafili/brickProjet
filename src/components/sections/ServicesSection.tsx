'use client';

import React from 'react';
import { Hammer, Home, Layers, Shield, Wrench, PaintBucket, MessageCircle, Check } from 'lucide-react';

const SERVICES = [
  {
    icon: Home,
    title: 'Sıfırdan Fərdi Ev Tikintisi',
    badge: 'Bünövrədən Dama',
    priceNote: '[Başlanğıc qiymət aralığı və ya razılaşma yolu ilə]',
    desc: 'Torpaq sahəsində bünövrənin qazılmasından və betonlanmasından başlayaraq, divarların hörülməsi və damın bağlanmasına qədər tam tikinti.',
    specs: [
      'Lentvari və monolit dəmir-beton bünövrə',
      '1 və 2 mərtəbəli fərdi evlərin tikintisi',
      'Mərtəbəarası kəmər və sütun qəlibləmə',
      'Materiallı və ya yalnız usta işçiliyi seçimi',
    ],
    whatsappQuery: 'Salam usta, sıfırdan fərdi ev tikintisi haqqında qiymət öyrənmək istəyirəm.',
  },
  {
    icon: Layers,
    title: 'Kubik Hörgü və Suvaq İşləri',
    badge: 'Tərəzi Dəqiqliyi',
    priceNote: '[M² üzrə başlanğıc işçilik qiyməti yazılacaq]',
    desc: 'Miysar daşı (kubik), kərpic və qazoblokla lazer tərəzi dəqiqliyində düz divar hörgüsü, qara və ağ suvaq (mala) işləri.',
    specs: [
      'Qoşa və tək kubiklə xarici divar hörgüsü',
      'Daxili arakəsmə divarların bölünməsi',
      'Mayakla (tərəzi ilə) ideal düz suvaq vurulması',
      'Sement-qum məhlulunun normaya uyğun hazırlanması',
    ],
    whatsappQuery: 'Salam usta, kubik hörgü və suvaq işləri üçün m² qiymətini öyrənmək istəyirəm.',
  },
  {
    icon: Shield,
    title: 'Dam Örtüklərinin Quraşdırılması və Təmiri',
    badge: 'Su və İstilik İzolyasiyası',
    priceNote: '[M² üzrə dam işçilik qiyməti yazılacaq]',
    desc: 'Yeni tikilən evlərin dam konstruksiyasının yığılması, köhnə damların sökülüb yenilənməsi və su sızmalarının tam aradan qaldırılması.',
    specs: [
      'Taxta karkas (atmalar və стропила) qurulması',
      'Çerepitsa, profnastil və şifer vurulması',
      'Buxar və istilik izolyasiya qatının döşənməsi',
      'Novçaların (su borularının) və karnizlərin yığılması',
    ],
    whatsappQuery: 'Salam usta, dam örtüyünün quraşdırılması / təmiri üçün qiymət öyrənmək istəyirəm.',
  },
  {
    icon: PaintBucket,
    title: 'Daxili Təmir, Kafel və Metlax',
    badge: 'Təmiz İşçilik',
    priceNote: '[Otaq / M² üzrə təmir qiyməti yazılacaq]',
    desc: 'Ev daxilində otaqların, hamam və mətbəxin əsaslı təmiri, döşəmə şapı (styajka), kafel-metlax və tavan işləri.',
    specs: [
      'Hamam və sanitar qovşaqların kafel-metlax işi',
      'Döşəmənin hamarlanması (styajka) və isti döşəmə',
      'Alçipan tavan, şpaklyovka və boya işləri',
      'Köhnə təmirin sökülməsi və yenidən yığılması',
    ],
    whatsappQuery: 'Salam usta, daxili təmir və kafel-metlax işləri üzrə qiymət öyrənmək istəyirəm.',
  },
  {
    icon: Hammer,
    title: 'Fasad, Hasar və Həyət İşləri',
    badge: 'Xarici Görünüş',
    priceNote: '[M² üzrə fasad / hasar qiyməti yazılacaq]',
    desc: 'Həyətyanı sahənin daş hasara alınması, darvaza sütunlarının hörülməsi, həyətə tamet/daş döşənməsi və fasad üzləmə.',
    specs: [
      'Həyət hasarlarının bünövrəsi və daş hörgüsü',
      'Fasadın dekorativ suvağı və rənglənməsi',
      'Həyətə tamet, bardür və beton meydança salınması',
      'Manqalxana, besedka və köməkçi tikililər',
    ],
    whatsappQuery: 'Salam usta, hasar hörgüsü və həyət-fasad işləri üçün qiymət soruşmaq istəyirəm.',
  },
  {
    icon: Wrench,
    title: 'Kiçik Ev Təmiri və Bərpa Xidmətləri',
    badge: 'Sürətli Müdaxilə',
    priceNote: '[İşin həcminə görə münasib qiymət]',
    desc: 'Yalnız böyük tikintilərə deyil, evdə yaranmış kiçik və orta həcmli təmir-bərpa işlərinə də eyni diqqət və məsuliyyətlə yanaşılır.',
    specs: [
      'Divar çatlarının və nəmişliyin bərpası',
      'Qapı-pəncərə yerlərinin açılması və ya hörülməsi',
      'Damda lokal su axıntılarının təmiri',
      'Digər xırda hörgü, beton və suvaq təmiri',
    ],
    whatsappQuery: 'Salam usta, evdə təmir-bərpa işi var, şəklini göndərib qiymət öyrənmək istəyirəm.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="px-4 sm:px-8 py-14 lg:py-20 bg-[#FFFFFF] border-b-2 border-[#262626] relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Bölmə Başlığı */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b-2 border-[#262626] pb-5">
          <div>
            <div className="text-xs text-[#C85A32] font-extrabold uppercase tracking-wider mb-1 flex items-center gap-2">
              <Hammer className="w-4 h-4" />
              <span>GÖRDÜYÜMÜZ İŞLƏR VƏ İXTİSAS SAHƏLƏRİ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#262626] tracking-tight">
              Fərdi Ev Tikintisi və Təmir Xidmətləri
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#262626]/80 max-w-md font-medium">
            Həm böyük həcmli ev tikintisi, həm də kiçik təmir işləri — materiallı və ya yalnız usta işçiliyi ilə.
          </p>
        </div>

        {/* 6 Aydın və Oxunaqlı Xidmət Kartı (Ağır arxa fon animasiyası olmadan, təmiz və sürətli) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((srv, idx) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={idx}
                className="brick-card bg-[#F4F0DB]/60 hover:bg-[#FFFFFF] p-5 sm:p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  {/* Üst İkon və Etiket */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-[#262626]/15">
                    <div className="w-10 h-10 bg-[#C85A32] text-white border-2 border-[#262626] shadow-[2px_2px_0px_#262626] flex items-center justify-center rounded-[4px] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 bg-[#262626] text-[#F4F0DB] text-[11px] font-bold rounded-[2px]">
                      {srv.badge}
                    </span>
                  </div>

                  {/* Xidmət Başlığı və İzahı */}
                  <h3 className="text-lg sm:text-xl font-black text-[#262626] mb-2 leading-snug">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#262626]/85 leading-relaxed mb-4">
                    {srv.desc}
                  </p>

                  {/* 4 Konkret İş Özəlliyi */}
                  <ul className="space-y-2 border-t border-[#262626]/15 pt-3.5 mb-4 text-xs text-[#262626]">
                    {srv.specs.map((sp, i) => (
                      <li key={i} className="flex items-start gap-2 font-medium">
                        <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                        <span>{sp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Qiymət Qeydi və Birbaşa WhatsApp Düyməsi */}
                <div className="pt-3 border-t-2 border-[#262626]/15 space-y-2.5">
                  <div className="text-[11px] font-bold text-[#262626]/75 bg-[#FFFFFF] px-2.5 py-1.5 border border-[#262626]/30 rounded-[2px]">
                    Qiymət: <span className="text-[#262626]">{srv.priceNote}</span>
                  </div>

                  <a
                    href="#contact"
                    className="w-full min-h-[44px] bg-[#262626] hover:bg-[#C85A32] text-[#FFFFFF] font-bold text-xs px-4 py-2.5 rounded-[4px] flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span>WhatsApp ilə Qiymət Soruş</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
