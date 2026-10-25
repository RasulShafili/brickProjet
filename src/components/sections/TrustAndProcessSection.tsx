'use client';

import React from 'react';
import { Camera, SearchCheck, FileCheck2, ShieldCheck, Star, HelpCircle, CheckCircle2 } from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    num: '01',
    icon: Camera,
    badge: 'Gərəksiz Baxışı Önlər',
    badgeColor: 'bg-blue-700 text-white',
    title: 'Şəkil və Konum Göndərimi',
    desc: 'Müştəri görüləcək işin geniş və yaxın plan şəklini, qısa videosunu və ərazini WhatsApp və ya telefon vasitəsilə birbaşa ustaya göndərir.',
  },
  {
    num: '02',
    icon: SearchCheck,
    badge: 'Sürətli Diaqnoz',
    badgeColor: 'bg-[#262626] text-[#F4F0DB]',
    title: 'İlkin Qiymətləndirmə və Yerində Baxış',
    desc: 'Usta eyni gün ərzində geri dönüş edir; standart kiçik işlərdə dərhal təxmini qiymət deyilir, əsaslı tikinti işlərində isə pulsuz yerində baxış təyin olunur.',
  },
  {
    num: '03',
    icon: FileCheck2,
    badge: 'Sürpriz Xərc Yoxdur',
    badgeColor: 'bg-[#C85A32] text-white',
    title: 'Dəqiq Qiymət və Material Qərarı',
    desc: 'Xidmətin materiallı, yoxsa yalnız usta işçiliyi (material ev sahibi tərəfindən alınan) olacağı, dəqiq büdcə və təhvil müddəti öncədən razılaşdırılır.',
  },
  {
    num: '04',
    icon: ShieldCheck,
    badge: 'Güvənli Təhvil',
    badgeColor: 'bg-emerald-800 text-white',
    title: 'Vaxtında Təhvil və İşçilik Zəmanəti',
    desc: 'Təyin olunan dəqiq tarixdə işə başlanır, mərhələ-mərhələ ev sahibinə məlumat verilir və ərazi təmizlənərək zəmanətlə təhvil verilir.',
  },
];

const FAQS = [
  {
    q: 'Materialı usta alır, yoxsa ev sahibi?',
    a: 'Hər iki variant mümkündür. İstəsəniz materialı özünüz ala bilərsiniz (hansı marka və nə qədər lazım olduğunu dəqiq siyahı ilə verirəm), istəsəniz də topdansatış qiymətinə keyfiyyətli materiallarla tam təhvil ("açar təhvil") işləyirik.',
  },
  {
    q: 'Yerində baxış və ölçü götürmək ödənişlidirmi?',
    a: 'Xeyr. Əvvəlcə WhatsApp-la şəkil göndərirsiniz, ilkin qiymət sizə uyğun olarsa, əraziyə gəlib yerində ölçü götürmək və smeta çıxarmaq tamamilə pulsuzdur.',
  },
  {
    q: 'Kiçik təmir və bərpa işlərinə gedirsinizmi?',
    a: 'Bəli. Yalnız sıfırdan ev tikintisi deyil, otaq bölmə, suvaq, dam sızması, hasar hörgüsü və kafel-metlax kimi kiçik və orta həcmli işləri də qəbul edirəm.',
  },
  {
    q: 'İş başlayan kimi sonradan əlavə sürpriz qiymət çıxırmı?',
    a: 'Xeyr. İşə başlamazdan əvvəl görüləcək işin həcmi və qiyməti dəqiq danışılır. Əlavə bir iş sifariş edilmədiyi müddətcə razılaşdırılmış qiymət dəyişmir.',
  },
];

const REVIEWS = [
  {
    name: '[Müştəri Adı 1 — Məs: Rəşad bəy]',
    location: '[Ərazi / Qəsəbə — Məs: Maştağa qəs.]',
    workType: 'Həyət evi hörgüsü və dam örtüyü',
    comment:
      '[Bura müştərinin rəyi yazılacaq — Məs: Vasitəçi olmadan birbaşa usta ilə işləmək həm büdcəmizə qənaət etdi, həm də divarlar lazer tərəzi ilə çox səliqəli hörüldü. Söz verdiyi vaxtda təhvil verdi.]',
  },
  {
    name: '[Müştəri Adı 2 — Məs: İlham bəy]',
    location: '[Ərazi / Qəsəbə — Məs: Binəqədi r.]',
    workType: 'Köhnə damın yenilənməsi və fasad suvağı',
    comment:
      '[Bura müştərinin rəyi yazılacaq — Məs: WhatsApp-la damın şəklini göndərdim, həmin gün gəlib baxdı və 8 günə köhnə damı söküb yeni çerepitsa ilə əvəz etdi. İşçiliyinə söz ola bilməz.]',
  },
  {
    name: '[Müştəri Adı 3 — Məs: Elşən bəy]',
    location: '[Ərazi / Qəsəbə — Məs: Xırdalan ş.]',
    workType: 'Daxili təmir, styajka və kafel-metlax',
    comment:
      '[Bura müştərinin rəyi yazılacaq — Məs: Material siyahısını dəqiq çıxartdı, heç bir artıq israf olmadı. Həm təmiz işləyir, həm də hər mərhələdə videolar göndərib məlumat verir.]',
  },
];

export default function TrustAndProcessSection() {
  return (
    <section
      id="trust"
      className="px-4 sm:px-8 py-14 lg:py-20 bg-[#FFFFFF] border-b-2 border-[#262626] relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* =====================================================================
            1. 4 ADDIMLI ŞƏFFAF XİDMƏT AXIŞI ("İŞİ NECƏ TƏŞKİL EDİRİK?")
           ===================================================================== */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b-2 border-[#262626] pb-5">
            <div>
              <div className="text-xs text-[#C85A32] font-extrabold uppercase tracking-wider mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>ŞƏFFAF İŞ PROSESİ VƏ QİYMƏTLƏNDİRMƏ</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#262626] tracking-tight">
                4 Addımda Rahat və Sürprizsiz Tikinti
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#262626]/80 max-w-md font-medium">
              Müraciət etdiyiniz andan işin təhvilinə qədər hər bir mərhələ əvvəlcədən bəllidir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORKFLOW_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="brick-card bg-[#F4F0DB]/70 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-9 h-9 rounded-full bg-[#C85A32] text-white border-2 border-[#262626] font-black text-xs flex items-center justify-center shadow-[2px_2px_0px_#262626]">
                          {step.num}
                        </span>
                        <StepIcon className="w-4 h-4 text-[#262626]" />
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-[2px] ${step.badgeColor}`}>
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-[#262626] mb-2 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#262626]/85 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            2. EV SAHİBLƏRİNİN REAL RƏYLƏRİ (MÜŞTƏRİ REFERANSLARI)
           ===================================================================== */}
        <div>
          <div className="mb-7">
            <div className="text-xs text-[#C85A32] font-extrabold uppercase tracking-wider mb-1">
              SOSİAL SÜBUT VƏ MÜŞTƏRİ MƏMNUNİYYƏTİ
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-[#262626]">
              Ev Sahiplərinin Haqqımızda Dedikləri
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="brick-card bg-[#FFFFFF] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-[#F59E0B] text-[#262626]" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#262626]/90 leading-relaxed mb-4 italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#262626]/15 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-black text-[#262626]">{rev.name}</div>
                    <div className="text-[11px] font-bold text-[#C85A32]">{rev.workType}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-[#F4F0DB] border border-[#262626]/30 text-[10px] font-bold text-[#262626] rounded-[2px]">
                    {rev.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            3. ŞƏFFAF QİYMƏTLƏNDİRMƏ MƏNTİQİ VƏ TEZ-TEZ VERİLƏN SUALLAR (FAQ)
           ===================================================================== */}
        <div className="bg-[#F4F0DB] border-2 border-[#262626] shadow-[4px_4px_0px_#262626] rounded-[4px] p-5 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#C85A32] uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>MÜŞTƏRİLƏRİN ƏN ÇOX SORUŞDUĞU SUALLAR</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#262626] mb-6">
            Zəng Etməzdən Əvvəl Bilməli Olduqlarınız
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] border-2 border-[#262626] p-4 rounded-[4px] space-y-1.5"
              >
                <h4 className="font-black text-sm sm:text-base text-[#262626]">
                  {item.q}
                </h4>
                <p className="text-xs sm:text-sm text-[#262626]/85 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
