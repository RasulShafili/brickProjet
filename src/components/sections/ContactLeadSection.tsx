'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle2, Phone, Send, FileText, MapPin, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useConstructionStore } from '@/store/useConstructionStore';

export default function ContactLeadSection() {
  const { calculator } = useConstructionStore();
  const [routeType, setRouteType] = useState<'NEW_PLOT' | 'EXTENSION' | 'HAVE_BLUEPRINT'>('NEW_PLOT');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Mərdəkan',
    notes: '',
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <section id="lead" className="px-[4%] py-20 border-b border-graphiteText bg-cad-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Başlıq */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-graphiteText pb-6">
          <div>
            <div className="font-mono text-xs text-terracotta font-bold tracking-widest uppercase mb-2">
              [MODUL 07 // BİRBAŞA MÜRACİƏT VƏ ESKİZ QƏBULU]
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-graphiteText">
              Usta ilə Birbaşa Əlaqə və Sxem Sifarişi
            </h2>
          </div>
          <p className="font-mono text-xs max-w-md text-graphiteText/80 leading-relaxed">
            Arada heç bir vasitəçi yoxdur. Birbaşa briqadir və layihəçi usta ilə danışırsınız. 
            Eskizinizi yükləyin və ya əraziyə baxış təyin edin.
          </p>
        </div>

        {/* 3 Marşrutlu Seçici (Stage-Matched Funnel) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 font-mono text-xs">
          <button
            type="button"
            onClick={() => setRouteType('NEW_PLOT')}
            className={`p-4 text-left border transition-all ${
              routeType === 'NEW_PLOT'
                ? 'bg-terracotta text-white border-graphiteText shadow-brutal font-bold'
                : 'bg-stonePaper text-graphiteText border-graphiteText hover:bg-stonePaperLight'
            }`}
          >
            <div className="text-[10px] uppercase opacity-80 mb-1">MARŞRUT 01</div>
            <div className="text-sm font-bold mb-1">Torpaq Sahəm Var, Ev İstəyirəm</div>
            <div className="text-[11px] opacity-85">Əl eskizi və ya sahə şəkli ilə fərdi sxem tərtibi</div>
          </button>

          <button
            type="button"
            onClick={() => setRouteType('EXTENSION')}
            className={`p-4 text-left border transition-all ${
              routeType === 'EXTENSION'
                ? 'bg-blueprint text-white border-graphiteText shadow-brutal font-bold'
                : 'bg-stonePaper text-graphiteText border-graphiteText hover:bg-stonePaperLight'
            }`}
          >
            <div className="text-[10px] uppercase opacity-80 mb-1">MARŞRUT 02</div>
            <div className="text-sm font-bold mb-1">Mövcud Evə Əlavə / Dam / Hörgü</div>
            <div className="text-[11px] opacity-85">Əraziyə yerində baxış və texniki qovşaq smetası</div>
          </button>

          <button
            type="button"
            onClick={() => setRouteType('HAVE_BLUEPRINT')}
            className={`p-4 text-left border transition-all ${
              routeType === 'HAVE_BLUEPRINT'
                ? 'bg-graphiteText text-stonePaper border-graphiteText shadow-brutal font-bold'
                : 'bg-stonePaper text-graphiteText border-graphiteText hover:bg-stonePaperLight'
            }`}
          >
            <div className="text-[10px] uppercase opacity-80 mb-1">MARŞRUT 03</div>
            <div className="text-sm font-bold mb-1">Hazır CAD Çertyojum Var</div>
            <div className="text-[11px] opacity-85">Mövcud layihə üzrə sabit podrat müqaviləsi smetası</div>
          </button>
        </div>

        {/* Əsas Forma və Etibar Kartı */}
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* Sol 7 Sütun: Ağıllı Sifariş Forması */}
          <div className="col-span-12 lg:col-span-7 brutal-card bg-stonePaper p-6 lg:p-8">
            {isSubmitted ? (
              <div className="text-center py-10 font-mono">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 border border-graphiteText shadow-brutalSm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-graphiteText mb-2">MÜRACİƏTİNİZ QƏBUL EDİLDİ!</h3>
                <p className="text-xs sm:text-sm text-graphiteText/80 max-w-md mx-auto mb-6">
                  Hörmətli <strong>{formData.name || 'Sifarişçi'}</strong>, usta briqadir sizinlə 
                  <strong> {formData.phone || '+994 xx xxx xx xx'}</strong> nömrəsi üzərindən 
                  ən geci 2 saat ərzində əlaqə saxlayacaq.
                </p>
                <div className="p-3 bg-stonePaperLight border border-graphiteText/30 inline-block text-xs">
                  Qeyd edilən ərazi: <strong>{formData.location}</strong> // Seçilən layihə: <strong>{calculator.areaM2} m²</strong>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Ad / Soyad */}
                  <div>
                    <label className="block text-graphiteText font-bold mb-1.5 uppercase">
                      ADINIZ VƏ YA MÜRACİƏT EDƏN ŞƏXS:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Məs: Rəşad Əliyev"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 bg-stonePaperLight border border-graphiteText text-graphiteText focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>

                  {/* Telefon Nömrəsi */}
                  <div>
                    <label className="block text-graphiteText font-bold mb-1.5 uppercase">
                      BİRBAŞA ƏLAQƏ TELEFONU:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+994 (50) 000-00-00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-stonePaperLight border border-graphiteText text-graphiteText focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                </div>

                {/* Ərazi Seçimi */}
                <div>
                  <label className="block text-graphiteText font-bold mb-1.5 uppercase">
                    TİKİNTİ SAHƏSİNİN YERLƏŞDİYİ ƏRAZİ:
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-3 bg-stonePaperLight border border-graphiteText text-graphiteText focus:outline-none focus:ring-1 focus:ring-terracotta"
                  >
                    <option value="Mərdəkan">Mərdəkan Qəsəbəsi</option>
                    <option value="Şüvəlan">Şüvəlan Bağları</option>
                    <option value="Bilgəh">Bilgəh & Zaqulba</option>
                    <option value="Novxanı">Novxanı & Goradil</option>
                    <option value="Badamdar">Badamdar & Səbail</option>
                    <option value="Xırdalan-Masazır">Xırdalan, Masazır & Saray</option>
                    <option value="Digər Abşeron">Digər Abşeron / Bakı Ərazisi</option>
                  </select>
                </div>

                {/* Eskiz / Çertyoj Yükləmə Sahəsi */}
                <div>
                  <label className="block text-graphiteText font-bold mb-1.5 uppercase">
                    ESKİZ, ÇERTYOJ VƏ YA TORPAQ ŞƏKLİ (VARSA):
                  </label>
                  <label className="border-2 border-dashed border-graphiteText/40 bg-stonePaperLight p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-[#FAF6E6] transition-colors">
                    <Upload className="w-6 h-6 text-terracotta mb-2" />
                    <span className="font-bold text-graphiteText">
                      {fileName ? `Yükləndi: ${fileName}` : 'Faylı seçin və ya bura sürükləyin (JPG, PNG, PDF, DWG)'}
                    </span>
                    <span className="text-[10px] text-graphiteText/60 mt-1">
                      Telefonla çəkilmiş əl eskizi də kifayətdir
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf,.dwg,.dxf"
                    />
                  </label>
                </div>

                {/* Əlavə Qeyd */}
                <div>
                  <label className="block text-graphiteText font-bold mb-1.5 uppercase">
                    ƏLAVƏ TƏLƏBLƏR VƏ YA QEYDLƏR:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Məsələn: 2 mərtəbəli kərpic ev, şimal tərəfi qapalı, torpaq maillidir..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 bg-stonePaperLight border border-graphiteText text-graphiteText focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>

                {/* Göndər Düyməsi */}
                <button
                  type="submit"
                  className="brutal-btn w-full bg-terracotta text-stonePaper py-4 px-6 text-sm flex items-center justify-center gap-2 hover:bg-[#b84a27]"
                >
                  <Send className="w-4 h-4" />
                  <span>MÜRACİƏTİ BİRBAŞA USTAYA GÖNDƏR</span>
                </button>
              </form>
            )}
          </div>

          {/* Sağ 5 Sütun: Birbaşa Əlaqə və Ustanın Sözü */}
          <div className="col-span-12 lg:col-span-5 space-y-6 font-mono text-xs">
            
            {/* Birbaşa Zəng Kartı */}
            <div className="brutal-card bg-obsidianCad text-stonePaper p-6">
              <span className="text-terracottaLight font-bold uppercase block mb-2">
                TƏCİLİ MƏSLƏHƏTLƏŞMƏ:
              </span>
              <p className="text-stonePaper/80 mb-4 leading-relaxed">
                Forma doldurmaq istəmirsinizsə, birbaşa zəng edərək işin həcmini və təxmini qiyməti öyrənə bilərsiniz:
              </p>
              <a
                href="tel:+994502345678"
                className="brutal-btn bg-terracotta text-stonePaper p-3.5 flex items-center justify-center gap-2 text-sm font-bold hover:bg-[#b84a27] mb-3"
              >
                <Phone className="w-4 h-4" />
                <span>+994 (50) 234-56-78</span>
              </a>
              <div className="text-[10px] text-stonePaper/60 text-center">
                İş günləri: 08:00 – 21:00 // Sahədə olduqda WhatsApp aktivdir
              </div>
            </div>

            {/* Briqadirin Zəmanət Bəyannaməsi */}
            <div className="brutal-card bg-stonePaper p-6">
              <div className="flex items-center gap-2 font-bold text-graphiteText mb-3 border-b border-graphiteText/20 pb-2">
                <ShieldCheck className="w-4 h-4 text-forest" />
                <span>BRİQADİRİN PEŞƏ ANDI:</span>
              </div>
              <p className="text-graphiteText/85 italic leading-relaxed mb-4">
                «Biz tikinti işlərinə sadəcə qazanc yeri kimi baxmırıq. Tikdiyimiz hər bir ev ailələrin ömürlük 
                sığınacağıdır. Ona görə də gizli qatların — armaturun addımının, betonun vibrasiyasının və 
                hidroizolyasiyanın keyfiyyətinə öz şərəfimizlə zəmanət veririk.»
              </p>
              <div className="text-[11px] font-bold text-terracotta">
                — Baş Usta & Konstruktor Briqadası
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
