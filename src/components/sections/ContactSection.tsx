'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, CheckCircle2 } from 'lucide-react';

const WHATSAPP_NUMBER = '994515480300';

export default function ContactSection() {
  const [senderName, setSenderName] = useState('');
  const [workType, setWorkType] = useState('Kubik Hörgü və Suvaq');
  const [materialOption, setMaterialOption] = useState('Yalnız İşçilik');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const messageLines = [
      `Salam usta, "${workType}" xidməti üzrə qiymət öyrənmək istəyirəm.`,
      senderName.trim() ? `• Müştəri: ${senderName.trim()}` : '',
      `• Material: ${materialOption}`,
      location.trim() ? `• Ərazi: ${location.trim()}` : '',
      note.trim() ? `• Qeyd: ${note.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageLines)}`,
      '_blank'
    );
  };

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Salam usta, "${workType}" xidməti üzrə qiymət öyrənmək istəyirəm.`
  )}`;

  return (
    <section
      id="contact"
      className="px-4 sm:px-8 py-12 lg:py-16 bg-[#F4F0DB]/45 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Sol 5 Sütun: Birbaşa Zəng və WhatsApp Kartı */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            <div className="inline-block bg-[#FFFFFF] border-2 border-[#262626] shadow-[4px_4px_0px_#262626] rounded-[4px] px-5 py-3">
              <div className="text-xs text-[#C85A32] font-extrabold uppercase tracking-wider mb-0.5">
                ƏLAQƏ
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#262626]">
                Birbaşa Usta İlə Əlaqə
              </h2>
            </div>

            <div className="brick-card p-5 bg-[#FFFFFF] space-y-3.5">
              <a
                href="tel:+994515480300"
                className="min-h-[48px] flex items-center gap-3 text-base sm:text-lg font-black text-[#C85A32] hover:text-[#262626] transition-colors"
              >
                <div className="w-11 h-11 bg-[#C85A32] text-white flex items-center justify-center border-2 border-[#262626] shadow-[2px_2px_0px_#262626] rounded-[4px] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#262626]/70 uppercase font-bold block">Birbaşa Zəng</span>
                  <span>+994 51 548 03 00</span>
                </div>
              </a>

              <div className="border-t border-[#262626]/15 pt-3.5">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] flex items-center gap-3 text-base sm:text-lg font-black text-[#262626] hover:text-[#15803D] transition-colors"
                >
                  <div className="w-11 h-11 bg-[#25D366] text-[#1A1A1A] flex items-center justify-center border-2 border-[#262626] shadow-[2px_2px_0px_#262626] rounded-[4px] shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#262626]/70 uppercase font-bold block">WhatsApp Xətti</span>
                    <span>+994 51 548 03 00</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-bold text-[#262626]">
              <div className="flex items-center gap-2 bg-[#FFFFFF] p-2.5 border-2 border-[#262626] rounded-[4px]">
                <Clock className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>Hər gün: 08:00 – 20:00</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FFFFFF] p-2.5 border-2 border-[#262626] rounded-[4px]">
                <MapPin className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>Qəbələ və ətraf ərazilər</span>
              </div>
            </div>
          </div>

          {/* Sağ 7 Sütun: Seçilən Xidmətin Qiymətini WhatsApp-da Soruşan Modul */}
          <div className="col-span-12 lg:col-span-7 brick-card p-5 sm:p-6 bg-[#FFFFFF]">
            <form onSubmit={handleWhatsAppSend} className="space-y-3.5 text-xs sm:text-sm">
              <h3 className="text-base sm:text-lg font-black text-[#262626] border-b-2 border-[#262626] pb-2.5">
                WhatsApp ilə Qiymət Soruş
              </h3>

              {/* 1. Seçilən Xidmət (Avtomatik mesaj hissəsinə düşür) */}
              <div>
                <label className="block font-bold text-[#262626] mb-1">Xidməti Seçin:</label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="w-full min-h-[42px] p-2.5 border-2 border-[#262626] rounded-[4px] bg-[#F4F0DB] font-bold text-[#262626] focus:outline-none"
                >
                  <option value="Sıfırdan Ev Tikintisi">Sıfırdan Ev Tikintisi</option>
                  <option value="Kubik Hörgü və Suvaq">Kubik Hörgü və Suvaq</option>
                  <option value="Dam Örtüklərinin Yığılması">Dam Örtüklərinin Yığılması</option>
                  <option value="Pol, Patalok, Alçipan və Laminat">Pol, Patalok, Alçipan və Laminat</option>
                  <option value="Oboy, Boya və Kafel-Metlax">Oboy, Boya və Kafel-Metlax</option>
                  <option value="Hasar və Həyət İşləri">Hasar və Həyət İşləri</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 2. Ad */}
                <div>
                  <label className="block font-bold text-[#262626] mb-1">Adınız (İstəyə bağlı):</label>
                  <input
                    type="text"
                    placeholder="Adınızı yazın"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full min-h-[42px] p-2.5 border-2 border-[#262626] rounded-[4px] bg-[#F4F0DB] focus:bg-[#FFFFFF] focus:outline-none"
                  />
                </div>

                {/* 3. Ərazi */}
                <div>
                  <label className="block font-bold text-[#262626] mb-1">Ərazi / Kənd (İstəyə bağlı):</label>
                  <input
                    type="text"
                    placeholder="Məs: Qəbələ, Vəndam"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full min-h-[42px] p-2.5 border-2 border-[#262626] rounded-[4px] bg-[#F4F0DB] focus:bg-[#FFFFFF] focus:outline-none"
                  />
                </div>
              </div>

              {/* 4. Material Seçimi */}
              <div className="grid grid-cols-2 gap-2.5">
                {['Yalnız İşçilik', 'Materiallı Tam Təhvil'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setMaterialOption(opt)}
                    className={`min-h-[42px] p-2 border-2 border-[#262626] rounded-[4px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      materialOption === opt
                        ? 'bg-[#262626] text-[#F4F0DB]'
                        : 'bg-[#F4F0DB] text-[#262626]'
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

              {/* 5. Qısa Qeyd */}
              <div>
                <input
                  type="text"
                  placeholder="Əlavə qeyd (məs: 120 m² ev)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full min-h-[42px] p-2.5 border-2 border-[#262626] rounded-[4px] bg-[#F4F0DB] focus:bg-[#FFFFFF] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="brick-btn w-full min-h-[48px] bg-[#25D366] hover:bg-[#20BD5A] text-[#1A1A1A] py-3 px-5 text-sm font-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>WhatsApp-da Qiymət Soruş (+994 51 548 03 00)</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
