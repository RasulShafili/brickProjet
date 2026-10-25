'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Send, CheckCircle2, Clock, Shield } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Mərdəkan',
    notes: '',
  });
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <section id="contact" className="px-4 sm:px-8 py-16 bg-brick-grid relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* Sol 5 Sütun: Birbaşa Zəng & Usta Qərargahı */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div>
              <div className="font-mono text-xs text-[#C85A32] font-bold uppercase tracking-widest mb-1">
                [BİRBAŞA ƏLAQƏ]
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#262626] uppercase tracking-tight mb-2">
                Usta ilə Birbaşa Danışın
              </h2>
              <p className="font-mono text-xs text-[#262626]/80 leading-relaxed">
                Vasitəçi yoxdur. Birbaşa briqadir və mühəndislə əlaqə saxlayaraq tikinti sahəsinə baxış təyin edin.
              </p>
            </div>

            {/* Zəng Bloku */}
            <div className="brick-card p-5 bg-[#FFFFFF] space-y-3 font-mono">
              <span className="text-[10px] text-[#262626]/70 uppercase font-bold block">
                BİRBAŞA ZƏNG XƏTTİ:
              </span>
              <a
                href="tel:+994502345678"
                className="flex items-center gap-3 text-lg sm:text-xl font-black text-[#C85A32] hover:text-[#262626] transition-colors"
              >
                <div className="w-10 h-10 bg-[#C85A32] text-white flex items-center justify-center border-2 border-[#262626] shadow-[2px_2px_0px_#262626] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+994 (50) 234-56-78</span>
              </a>

              <div className="border-t-2 border-[#262626]/20 pt-3">
                <a
                  href="https://wa.me/994502345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-bold text-[#262626] hover:text-[#25D366] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#25D366] text-[#262626] flex items-center justify-center border-2 border-[#262626] shadow-[2px_2px_0px_#262626] shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span>WhatsApp ilə Eskiz və Şəkil Göndər</span>
                </a>
              </div>
            </div>

            {/* Nişanlar */}
            <div className="space-y-2 font-mono text-xs text-[#262626]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C85A32]" />
                <span>İş saatları: 08:00 – 20:00 (Hər gün)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C85A32]" />
                <span>Bakı, Mərdəkan, Şüvəlan, Bilgəh, Novxanı və bütün Abşeron</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">10 il rəsmi müqavilə zəmanəti</span>
              </div>
            </div>
          </div>

          {/* Sağ 7 Sütun: Kəskin Kərpic Forması */}
          <div className="col-span-12 lg:col-span-7 brick-card p-6 sm:p-8 bg-[#FFFFFF]">
            {done ? (
              <div className="text-center py-8 font-mono">
                <div className="w-12 h-12 bg-[#262626] text-white border-2 border-[#262626] flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0px_#C85A32]">
                  <CheckCircle2 className="w-6 h-6 text-[#C85A32]" />
                </div>
                <h3 className="text-xl font-black text-[#262626] uppercase mb-1">MÜRACİƏTİNİZ ALINDI!</h3>
                <p className="text-xs text-[#262626]/80 mb-4">
                  Hörmətli <strong>{formData.name || 'Sifarişçi'}</strong>, usta ən qısa müddətdə sizinlə əlaqə saxlayacaq.
                </p>
                <button
                  onClick={() => setDone(false)}
                  className="brick-btn bg-[#F4F0DB] text-[#262626] px-4 py-2 text-xs"
                >
                  Yenidən Yaz
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <h3 className="text-base font-black text-[#262626] uppercase mb-2 border-b-2 border-[#262626] pb-2">
                  [USTA İLƏ GÖRÜŞ TƏYİN ET]
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#262626] mb-1">ADINIZ:</label>
                    <input
                      type="text"
                      required
                      placeholder="Məs: Rauf bəy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 border-2 border-[#262626] bg-[#F4F0DB] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#262626] mb-1">TELEFON NÖMRƏNİZ:</label>
                    <input
                      type="tel"
                      required
                      placeholder="+994 (50) 000-00-00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 border-2 border-[#262626] bg-[#F4F0DB] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#262626] mb-1">TİKİNTİ ƏRAZİSİ:</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 border-2 border-[#262626] bg-[#F4F0DB] focus:outline-none"
                  >
                    <option value="Mərdəkan">Mərdəkan Qəsəbəsi</option>
                    <option value="Şüvəlan">Şüvəlan Bağları</option>
                    <option value="Bilgəh">Bilgəh & Zaqulba</option>
                    <option value="Novxanı">Novxanı & Goradil</option>
                    <option value="Badamdar">Badamdar & Səbail</option>
                    <option value="Xırdalan">Xırdalan, Masazır & Saray</option>
                    <option value="Digər">Digər Bakı və Abşeron Ərazisi</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#262626] mb-1">GÖRÜLƏCƏK İŞ QEYDİ:</label>
                  <textarea
                    rows={3}
                    placeholder="Məsələn: Sıfırdan fərdi ev tikintisi və ya dam karkası..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-2.5 border-2 border-[#262626] bg-[#F4F0DB] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="brick-btn w-full bg-[#C85A32] text-white hover:bg-[#B84A27] py-3 text-xs font-bold"
                >
                  MÜRACİƏTİ BİRBAŞA USTAYA GÖNDƏR
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
