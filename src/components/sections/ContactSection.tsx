'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Shield, Camera, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [workType, setWorkType] = useState('Kubik Hörgü və Suvaq İşləri');
  const [materialOption, setMaterialOption] = useState('Yalnız Usta İşçiliyi (Material məndən)');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [photoNames, setPhotoNames] = useState<string[]>([]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setPhotoNames(names);
    }
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const messageLines = [
      'Salam usta, saytınızdan müraciət edirəm:',
      `• İşin növü: ${workType}`,
      `• Material seçimi: ${materialOption}`,
      `• Ərazi / Ünvan: ${location || 'Qeyd edilməyib'}`,
      notes ? `• Əlavə qeyd: ${notes}` : '',
      photoNames.length > 0 ? `• (${photoNames.length} ədəd şəkil göndərirəm)` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const encoded = encodeURIComponent(messageLines);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <section
      id="contact"
      className="px-4 sm:px-8 py-14 lg:py-20 bg-[#F4F0DB] relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* =================================================================
              SOL 5 SÜTUN: BİRBAŞA ƏLAQƏ VƏ "WHATSAPP İLƏ 3 ADDIMDA QİYMƏT AL" REHBƏRİ
             ================================================================= */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs text-[#C85A32] font-extrabold uppercase tracking-wider mb-1">
                VASİTƏÇİSİZ BİRBAŞA ƏLAQƏ
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#262626] tracking-tight mb-2">
                WhatsApp ilə Şəkil Göndərin, Dəqiqələr İçində Qiymət Alın
              </h2>
              <p className="text-xs sm:text-sm text-[#262626]/85 leading-relaxed font-medium">
                Gərəksiz gözləmə olmadan birbaşa işi görəcək usta ilə əlaqə saxlayın. Kiçik işlərdə dərhal qiymət, böyük işlərdə pulsuz yerində baxış.
              </p>
            </div>

            {/* 3 Addımda Sürətli Qiymət Alma Bələdçisi */}
            <div className="bg-[#FFFFFF] border-2 border-[#262626] shadow-[4px_4px_0px_#262626] rounded-[4px] p-4 sm:p-5 space-y-3">
              <div className="text-xs font-black text-[#262626] uppercase border-b border-[#262626]/15 pb-2 flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#C85A32]" />
                <span>3 Addımda Dəqiq Qiymət Necə Hesablanır?</span>
              </div>

              <ol className="space-y-2.5 text-xs text-[#262626]">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#C85A32] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    <strong>Geniş və Yaxın Plan Şəkil:</strong> Görüləcək işin və ya təmir olunacaq yerin 1–2 şəklini (və ya qısa videosunu) çəkin.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#C85A32] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    <strong>Ərazi Məlumatı:</strong> Evin yerləşdiyi rayon, qəsəbə və ya kəndin adını yazın.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#C85A32] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    <strong>Material Vəziyyəti:</strong> Materialın alınıb-alınmadığını (materiallı və ya yalnız işçilik) qeyd edin.
                  </span>
                </li>
              </ol>
            </div>

            {/* Birbaşa Zəng və WhatsApp Kartı */}
            <div className="brick-card p-5 bg-[#FFFFFF] space-y-3.5">
              <div>
                <span className="text-[11px] text-[#262626]/70 uppercase font-bold block mb-1">
                  Təcili İşlər Üçün Birbaşa Zəng:
                </span>
                <a
                  href="tel:+994000000000"
                  className="min-h-[48px] flex items-center gap-3 text-lg sm:text-xl font-black text-[#C85A32] hover:text-[#262626] transition-colors"
                >
                  <div className="w-11 h-11 bg-[#C85A32] text-white flex items-center justify-center border-2 border-[#262626] shadow-[2px_2px_0px_#262626] rounded-[4px] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>[Bura telefon nömrəniz yazılacaq]</span>
                </a>
              </div>

              <div className="border-t border-[#262626]/15 pt-3.5">
                <span className="text-[11px] text-[#262626]/70 uppercase font-bold block mb-1">
                  Şəkil və Video Göndərmək Üçün WhatsApp:
                </span>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] flex items-center gap-3 text-sm sm:text-base font-extrabold text-[#262626] hover:text-[#15803D] transition-colors"
                >
                  <div className="w-11 h-11 bg-[#25D366] text-[#1A1A1A] flex items-center justify-center border-2 border-[#262626] shadow-[2px_2px_0px_#262626] rounded-[4px] shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span>[Bura WhatsApp nömrəniz yazılacaq]</span>
                </a>
              </div>
            </div>

            {/* İş Saatları və Zəmanət Məlumatları */}
            <div className="space-y-2 text-xs text-[#262626] font-bold">
              <div className="flex items-center gap-2.5 bg-[#FFFFFF] p-2.5 border-2 border-[#262626] rounded-[4px]">
                <Clock className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>İş saatları: Hər gün 08:00 – 20:00 (Eyni gün geri dönüş)</span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#FFFFFF] p-2.5 border-2 border-[#262626] rounded-[4px]">
                <MapPin className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>Xidmət əraziləri: [Bura xidmət göstərdiyiniz ərazilər yazılacaq]</span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#FFFFFF] p-2.5 border-2 border-[#262626] rounded-[4px]">
                <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Görülən bütün hörgü, dam və təmir işlərinə zəmanət verilir</span>
              </div>
            </div>
          </div>

          {/* =================================================================
              SAĞ 7 SÜTUN: SÜRƏTLİ WHATSAPP QİYMƏT SORĞUSU VƏ ŞƏKİL ƏLAVƏ ETMƏ MODULU
              (Test/Möhür düyməsi çıxarıldı, birbaşa WhatsApp-a hazır mesaj göndərir)
             ================================================================= */}
          <div className="col-span-12 lg:col-span-7 brick-card p-5 sm:p-8 bg-[#FFFFFF]">
            <form onSubmit={handleWhatsAppSend} className="space-y-4 text-xs sm:text-sm">
              <div className="border-b-2 border-[#262626] pb-3">
                <span className="text-[11px] font-extrabold text-[#C85A32] uppercase tracking-wider block">
                  SÜRƏTLİ QİYMƏT HESABLAMA MODULU
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#262626] mt-0.5">
                  Birbaşa Ustaya Hazır WhatsApp Sorğusu Göndərin
                </h3>
              </div>

              {/* 1. Xidmət Növü Seçimi */}
              <div>
                <label className="block font-bold text-[#262626] mb-1.5">
                  Görüləcək İşin Növünü Seçin:
                </label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="w-full min-h-[46px] p-2.5 border-2 border-[#262626] rounded-[4px] bg-[#F4F0DB] font-bold text-[#262626] focus:bg-[#FFFFFF] focus:border-[#C85A32] focus:outline-none"
                >
                  <option value="Sıfırdan Fərdi Ev Tikintisi">Sıfırdan Fərdi Ev Tikintisi (Bünövrədən Dama)</option>
                  <option value="Kubik Hörgü və Suvaq İşləri">Kubik Hörgü və Suvaq İşləri</option>
                  <option value="Dam Örtüyünün Quraşdırılması və Təmiri">Dam Örtüyünün Quraşdırılması və Təmiri</option>
                  <option value="Daxili Təmir, Kafel və Metlax">Daxili Təmir, Kafel və Metlax İşləri</option>
                  <option value="Fasad, Hasar və Həyət İşləri">Fasad, Hasar və Həyət İşləri</option>
                  <option value="Kiçik Ev Təmiri və Bərpa">Kiçik Ev Təmiri və Bərpa İşi</option>
                </select>
              </div>

              {/* 2. Material Seçimi */}
              <div>
                <label className="block font-bold text-[#262626] mb-1.5">
                  Material Necə Təmin Ediləcək?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Yalnız Usta İşçiliyi (Material məndən)',
                    'Materiallı Tam Təhvil (Usta tərəfindən)',
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setMaterialOption(opt)}
                      className={`min-h-[44px] p-2.5 border-2 border-[#262626] rounded-[4px] font-bold text-left flex items-center gap-2 transition-colors cursor-pointer ${
                        materialOption === opt
                          ? 'bg-[#262626] text-[#F4F0DB]'
                          : 'bg-[#F4F0DB] text-[#262626] hover:bg-[#EAE5D0]'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          materialOption === opt ? 'text-[#25D366]' : 'text-[#262626]/40'
                        }`}
                      />
                      <span className="text-xs">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Ərazi / Qəsəbə */}
              <div>
                <label className="block font-bold text-[#262626] mb-1.5">
                  Tikinti və ya Təmir Ərazisi (Rayon / Qəsəbə):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Məs: Sabunçu r., Maştağa qəsəbəsi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full min-h-[46px] p-2.5 border-2 border-[#262626] rounded-[4px] bg-[#F4F0DB] focus:bg-[#FFFFFF] focus:border-[#C85A32] focus:outline-none"
                />
              </div>

              {/* 4. Şəkil / Video Əlavə Etmə Yeri */}
              <div>
                <label className="block font-bold text-[#262626] mb-1.5">
                  Görüləcək Yerin Şəkli və ya Videosu (İstəyə bağlı):
                </label>
                <label className="border-2 border-dashed border-[#262626] rounded-[4px] bg-[#F4F0DB] hover:bg-[#EAE5D0] p-4 flex flex-col items-center justify-center cursor-pointer text-center transition-colors">
                  <Camera className="w-6 h-6 text-[#C85A32] mb-1" />
                  <span className="font-bold text-xs text-[#262626]">
                    {photoNames.length > 0
                      ? `Seçildi: ${photoNames.join(', ')}`
                      : 'Geniş və yaxın plan şəkilləri buradan seçin'}
                  </span>
                  <span className="text-[11px] text-[#262626]/70 mt-0.5">
                    WhatsApp açıldıqda seçdiyiniz şəkilləri birbaşa söhbətə göndərə bilərsiniz
                  </span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                </label>
              </div>

              {/* 5. Qısa Qeyd */}
              <div>
                <label className="block font-bold text-[#262626] mb-1.5">
                  Təxmini Ölçü və ya Qısa Qeydiniz:
                </label>
                <textarea
                  rows={2}
                  placeholder="Məs: 100 m² ev hörgüsü, və ya damın 1 tərəfi təmir olunmalıdır..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 border-2 border-[#262626] rounded-[4px] bg-[#F4F0DB] focus:bg-[#FFFFFF] focus:border-[#C85A32] focus:outline-none"
                />
              </div>

              {/* Əsas WhatsApp Göndərmə Düyməsi */}
              <button
                type="submit"
                className="brick-btn w-full min-h-[52px] bg-[#25D366] hover:bg-[#20BD5A] text-[#1A1A1A] py-3.5 px-6 text-sm sm:text-base font-black flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>WhatsApp ilə Göndər və Qiymət Al</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
