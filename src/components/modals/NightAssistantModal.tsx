'use client';

import React, { useState } from 'react';
import { Moon, Send, X, Bot, CheckCircle2, Phone } from 'lucide-react';
import { useConstructionStore } from '@/store/useConstructionStore';

const KNOWLEDGE_BASE: Record<string, string> = {
  brick_vs_stone: 'Bakı və Abşeron iqlimi üçün bişmiş qırmızı kərpic (380mm qoşa hörgü) nəmişliyə və duzlu dəniz havasına qarşı ən dözümlü materialdır. Mişar daşı (kubik) isə daha sərfəli olsa da, xaricdən keyfiyyətli suvaq və hidroizolyasiya tələb edir. Termos-effekt üçün kərpic divarlar tövsiyə olunur.',
  foundation_time: 'B25 (M350) monolit bünövrə töküldükdən sonra beton 7 gün ərzində 70% möhkəmlik yığır. Əsas daşıyıcı kərpic hörgüsünə 10-14 gündən sonra başlamaq mühəndis standartı üzrə ən təhlükəsizidir.',
  roof_durability: 'Sahil zonalarında (Mərdəkan, Şüvəlan, Bilgəh) güclü Xəzri küləklərinə görə ən etibarlı seçim 0.50mm polimer örtüklü metal kirəmit və ya təbii keramo-kirəmitdir. Taxta stropil addımı 60 sm-dən artıq olmamalı və antiseptiklə mütləq işlənməlidir.',
  cost_estimate: 'Bizim təqdim etdiyimiz smetaya materialların dəqiq həcmi, çatdırılma, usta işçiliyi, beton pompası və zibilin daşınması daxildir. Müqavilə bağlandıqdan sonra smeta qiyməti dəyişməz qalır.',
};

export default function NightAssistantModal() {
  const { isNightAssistantOpen, setIsNightAssistantOpen } = useConstructionStore();
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: 'Salam! Mən Ustanın AI Növbətçi Köməkçisiyəm. Gecə saatlarında və ya usta tikinti sahəsində olanda texniki suallarınızı dərhal cavablandırıram. Hansı məsələ ilə maraqlanırsınız?',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isNightAssistantOpen) return null;

  const handleSelectFaq = (key: string, label: string) => {
    const answer = KNOWLEDGE_BASE[key] || 'Məlumat tapılmadı.';
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: label },
      { sender: 'ai', text: answer },
    ]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setInputVal('');

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      {
        sender: 'ai',
        text: `Sualınız qeydə alındı: "${userText}". Səhər saat 08:30-da usta briqadir bu sualla bağlı sizinlə ətraflı məlumat bölüşəcək. Zəhmət olmasa, əlaqə nömrənizi qeyd edin və ya sabah birbaşa zəng vurun.`,
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidianCad/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-obsidianCad border-2 border-terracotta shadow-brutal flex flex-col max-h-[85vh] font-mono text-xs">
        
        {/* Başlıq Paneli */}
        <div className="p-4 border-b border-stonePaper/20 flex items-center justify-between bg-stonePaper/5">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-stonePaper text-sm">
              AI GECƏ NÖVBƏTÇİSİ // BİLİK BAZASI
            </span>
          </div>
          <button
            onClick={() => setIsNightAssistantOpen(false)}
            className="text-stonePaper/70 hover:text-white font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Mesaj Sahəsi */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#11161d]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3 max-w-[85%] leading-relaxed ${
                m.sender === 'ai'
                  ? 'bg-stonePaper/10 text-stonePaper border border-stonePaper/20 mr-auto'
                  : 'bg-terracotta text-white ml-auto border border-stonePaper/30'
              }`}
            >
              <div className="text-[10px] opacity-60 mb-1">
                {m.sender === 'ai' ? 'USTA AI NÖVBƏTÇİ' : 'SİZ'}
              </div>
              <p>{m.text}</p>
            </div>
          ))}
        </div>

        {/* Tez Sual Düymələri (Pills) */}
        <div className="p-3 bg-stonePaper/5 border-t border-stonePaper/10 flex flex-wrap gap-1.5">
          <button
            onClick={() => handleSelectFaq('brick_vs_stone', 'Kərpic, yoxsa kubik?')}
            className="px-2.5 py-1 bg-stonePaper/10 text-stonePaper hover:bg-terracotta hover:text-white transition-colors border border-stonePaper/20 text-[11px]"
          >
            Kərpic, yoxsa kubik?
          </button>
          <button
            onClick={() => handleSelectFaq('foundation_time', 'Bünövrə neçə günə quruyur?')}
            className="px-2.5 py-1 bg-stonePaper/10 text-stonePaper hover:bg-terracotta hover:text-white transition-colors border border-stonePaper/20 text-[11px]"
          >
            Bünövrə quruma müddəti?
          </button>
          <button
            onClick={() => handleSelectFaq('roof_durability', 'Dam üçün hansı kirəmit yaxşıdır?')}
            className="px-2.5 py-1 bg-stonePaper/10 text-stonePaper hover:bg-terracotta hover:text-white transition-colors border border-stonePaper/20 text-[11px]"
          >
            Dam kirəmit seçimi?
          </button>
          <button
            onClick={() => handleSelectFaq('cost_estimate', 'Smetada hansı xərclər var?')}
            className="px-2.5 py-1 bg-stonePaper/10 text-stonePaper hover:bg-terracotta hover:text-white transition-colors border border-stonePaper/20 text-[11px]"
          >
            Smetaya nə daxildir?
          </button>
        </div>

        {/* Yazı Girişi */}
        <form onSubmit={handleSendCustom} className="p-3 border-t border-stonePaper/20 flex gap-2 bg-obsidianCad">
          <input
            type="text"
            placeholder="Sualınızı yazın və ya nömrənizi qeyd edin..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 p-2 bg-stonePaper/10 border border-stonePaper/30 text-stonePaper focus:outline-none focus:border-terracotta"
          />
          <button
            type="submit"
            className="px-4 bg-terracotta text-white font-bold hover:bg-[#b84a27] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
