'use client';

import React from 'react';
import { MapPin, MessageCircle, ShieldCheck, CheckCircle2, UserCheck, Images } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-8 py-10 lg:py-16 bg-[#F4F0DB] border-b-2 border-[#262626] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Sol 7 Sütun: Birbaşa Usta Güvəni və Dönüşüm Mərkəzi */}
        <div className="col-span-12 lg:col-span-7 space-y-5">
          
          {/* Vasitəçisiz Birbaşa Usta Güvən Nişanı */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#262626] text-[#F4F0DB] border-2 border-[#262626] text-xs font-bold shadow-[3px_3px_0px_#C85A32] rounded-[4px]">
            <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0" />
            <span>Şirkət və ya Vasitəçi Komissiyası Yoxdur — İşi Şəxsən Özüm Görürəm</span>
          </div>

          {/* Əsas Başlıq (Aydın Dəyər Təklifi) */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#262626] tracking-tight leading-[1.12]">
            [Bura əsas başlıq yazılacaq — Məs: Bünövrədən Dama Fərdi Ev Tikintisi, Hörgü və Təmir İşləri]
          </h1>

          {/* Samimi və Dəqiq Usta Açıqlaması (Mobil üçün 16px rahat oxunan ölçü) */}
          <p className="text-base sm:text-lg font-medium text-[#262626]/90 max-w-2xl leading-relaxed">
            [Bura ustanın öz adından qısa təqdimat mətni yazılacaq — Məs: Vasitəçi şirkətlərə əlavə faiz ödəmədən, evinizin tikintisini və təmirini birbaşa işi görən ustaya həvalə edin. Materiallı və ya yalnız işçilik seçimi ilə, söz verilən tarixdə təmiz təhvil.]
          </p>

          {/* 4 Əsas Güvən Göstəricisi */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#FFFFFF] border-2 border-[#262626] shadow-[3px_3px_0px_#262626] rounded-[4px]">
              <div className="font-black text-[#C85A32] text-base sm:text-lg">[Məs: 15+ İl]</div>
              <div className="text-[11px] text-[#262626]/80 font-bold mt-0.5">Fərdi Usta Təcrübəsi</div>
            </div>
            <div className="p-3 bg-[#FFFFFF] border-2 border-[#262626] shadow-[3px_3px_0px_#262626] rounded-[4px]">
              <div className="font-black text-[#262626] text-base sm:text-lg">[Məs: 120+ Ev]</div>
              <div className="text-[11px] text-[#262626]/80 font-bold mt-0.5">Tamamlanmış İş</div>
            </div>
            <div className="p-3 bg-[#FFFFFF] border-2 border-[#262626] shadow-[3px_3px_0px_#262626] rounded-[4px]">
              <div className="font-black text-[#C85A32] text-base sm:text-lg">0% Komissiya</div>
              <div className="text-[11px] text-[#262626]/80 font-bold mt-0.5">Birbaşa Usta Qiyməti</div>
            </div>
            <div className="p-3 bg-[#FFFFFF] border-2 border-[#262626] shadow-[3px_3px_0px_#262626] rounded-[4px]">
              <div className="font-black text-emerald-700 text-base sm:text-lg">Pulsuz Baxış</div>
              <div className="text-[11px] text-[#262626]/80 font-bold mt-0.5">Dəqiq Smeta və Zəmanət</div>
            </div>
          </div>

          {/* Xidmət Göstərilən Ərazilər */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#262626] bg-[#FFFFFF] px-3.5 py-2 border-2 border-[#262626] rounded-[4px]">
            <MapPin className="w-4 h-4 text-[#C85A32] shrink-0" />
            <span>Xidmət əraziləri: [Bura xidmət göstərilən şəhər, rayon və qəsəbələr yazılacaq]</span>
          </div>

          {/* Düzəldilmiş Vizual İyerarxiya:
              1-ci (Əsas Narıncı Düymə) -> Birbaşa Qiymət Al / WhatsApp ilə Şəkil Göndər
              2-ci (İkincil Ağ Düymə) -> Görülən İşlərə Bax (Qalereya) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <a
              href="#contact"
              className="brick-btn min-h-[50px] bg-[#C85A32] text-white hover:bg-[#B84A27] px-6 py-3.5 text-sm sm:text-base font-extrabold flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>Pulsuz Baxış və WhatsApp Qiymət Al</span>
            </a>
            <a
              href="#gallery"
              className="brick-btn min-h-[50px] bg-[#FFFFFF] text-[#262626] hover:bg-[#EAE5D0] px-5 py-3.5 text-sm font-bold flex items-center justify-center gap-2"
            >
              <Images className="w-4 h-4 text-[#C85A32] shrink-0" />
              <span>Əvvəl / Sonra İşlərə Bax</span>
            </a>
          </div>

        </div>

        {/* Sağ 5 Sütun: Ustanın Şəxsi Təqdimatı və Real İş Başında Foto Çərçivəsi */}
        <div className="col-span-12 lg:col-span-5">
          <div className="border-2 border-[#262626] bg-[#FFFFFF] p-3 sm:p-4 shadow-[6px_6px_0px_#262626] rounded-[4px]">
            
            {/* Ustanın Real Fotoşəkli və ya Tamamladığı Evin Foto Yeri */}
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-[#262626] bg-[#EAE5D0] flex flex-col items-center justify-center p-6 text-center rounded-[2px]">
              <div className="w-16 h-16 rounded-full bg-[#C85A32] text-white border-2 border-[#262626] flex items-center justify-center mb-3 shadow-[3px_3px_0px_#262626]">
                <UserCheck className="w-8 h-8" />
              </div>
              <div className="font-black text-sm sm:text-base text-[#262626] mb-1">
                [Bura Ustanın İş Başında və ya Tamamladığı Evin Real Fotoşəkli Qoyulacaq]
              </div>
              <p className="text-xs text-[#262626]/75 max-w-xs leading-relaxed">
                Müştəri evini əmanət edəcəyi ustanı şəxsən görmək istəyir — bura təmiz tikinti mühitində çəkilmiş real şəkil yerləşdirilir.
              </p>
            </div>

            {/* Ustanın Öz Adından Birbaşa Güvən Sözü */}
            <div className="mt-3 p-3.5 bg-[#F4F0DB] border-2 border-[#262626] rounded-[4px] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-[#262626]">
                  [Ustanın Adı və Soyadı]
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 border border-emerald-700 rounded-[2px]">
                  <CheckCircle2 className="w-3 h-3" />
                  Birbaşa İcraçı Usta
                </span>
              </div>
              <p className="text-xs text-[#262626]/90 leading-relaxed">
                &ldquo;[Bura ustanın qısa bioqrafiyası və sözü yazılacaq — Məs: Zəng etdikdə operatorla deyil, birbaşa işi görəcək usta ilə danışırsınız. Hər bir hörgünün tərəzisinə və suvağın keyfiyyətinə şəxsən cavabdehəm.]&rdquo;
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
