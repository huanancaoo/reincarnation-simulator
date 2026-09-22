import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import { Sparkles, X } from 'lucide-react';

interface CyberWoodFishProps {
  karma: number;
  onAddKarma: (amount: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface FloatingKarma {
  id: number;
  x: number;
  y: number;
}

export const CyberWoodFish: React.FC<CyberWoodFishProps> = ({
  karma,
  onAddKarma,
  isOpen,
  onClose
}) => {
  const [floatings, setFloatings] = useState<FloatingKarma[]>([]);
  const [isStriking, setIsStriking] = useState(false);

  if (!isOpen) return null;

  const handleTap = (e: React.MouseEvent) => {
    soundManager.playWoodFish();
    setIsStriking(true);
    setTimeout(() => setIsStriking(false), 120);

    onAddKarma(1);

    const rect = e.currentTarget.getBoundingClientRect();
    const newFloating: FloatingKarma = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left + (Math.random() * 40 - 20),
      y: e.clientY - rect.top - 20
    };

    setFloatings((prev) => [...prev.slice(-10), newFloating]);

    setTimeout(() => {
      setFloatings((prev) => prev.filter((item) => item.id !== newFloating.id));
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-item-entry">
      <div className="relative w-full max-w-sm bg-underworld-900 border-2 border-underworld-gold/60 rounded-2xl p-6 shadow-diyu-panel text-center select-none overflow-hidden talisman-box diyu-panel">
        {/* 关闭按钮 */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-underworld-950/80 hover:bg-underworld-800 text-slate-400 hover:text-underworld-gold border border-underworld-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-underworld-950 text-underworld-gold border border-underworld-gold/40 text-xs font-serif mb-2">
          <Sparkles className="w-3.5 h-3.5 text-underworld-gold animate-pulse" />
          <span>幽冥往生 · 超度渡劫法器</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black font-underworld text-slate-100 mb-1 tracking-wider">
          幽冥功德木鱼 · 涤罪除障
        </h3>
        <p className="text-xs text-slate-400 mb-5 font-serif leading-relaxed">
          敲击玄木神鱼，消弥前尘罪业，每击一声可增一缕幽冥功德！
        </p>

        {/* 功德实时看板 */}
        <div className="mb-5 p-3.5 rounded-xl bg-underworld-950/90 border border-underworld-800 relative">
          <div className="flex items-center justify-between text-xs text-slate-400 font-serif mb-0.5">
            <span>当前幽冥蓄积功德：</span>
            <span className="seal-stamp text-[9px] py-0 px-1">功德无量</span>
          </div>
          <div className="text-3xl font-black text-underworld-gold font-mono text-glow-gold tracking-wider">
            {karma}
          </div>
        </div>

        {/* 木鱼主体点击区 */}
        <div
          onClick={handleTap}
          className={`relative mx-auto w-44 h-44 rounded-3xl bg-gradient-to-br from-amber-900 via-stone-900 to-underworld-950 border-4 border-amber-600/70 shadow-2xl flex flex-col items-center justify-center cursor-pointer transition-transform duration-75 active:scale-95 ${
            isStriking ? 'scale-95 border-underworld-gold shadow-glow-gold' : 'hover:scale-105'
          }`}
        >
          <span className="text-6xl select-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">🪵</span>
          <span className="text-xs font-serif font-bold text-underworld-gold mt-2 tracking-widest">
            【叩击修德】
          </span>

          {/* 浮动“功德+1”特效 */}
          {floatings.map((f) => (
            <span
              key={f.id}
              className="absolute pointer-events-none font-black text-underworld-gold text-base animate-bounce font-serif"
              style={{
                left: `${f.x}px`,
                top: `${f.y}px`,
                textShadow: '0 0 12px rgba(243,202,82,0.9)'
              }}
            >
              🪷 功德 +1
            </span>
          ))}
        </div>

        <div className="mt-5 text-[11px] text-slate-400 font-serif leading-relaxed">
          地府判官提示：狂叩可快速积攒功德，供转生前兑换额外造化点！
        </div>
      </div>
    </div>
  );
};
