import React, { useState } from 'react';
import { Talent } from '../types/game';
import { getRarityColor } from '../data/talents';
import { soundManager } from '../utils/audio';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface TalentSelectProps {
  availableTalents: Talent[];
  selectedTalents: Talent[];
  onToggleTalent: (talent: Talent) => void;
  onReroll: () => void;
  onConfirm: () => void;
}

export const TalentSelect: React.FC<TalentSelectProps> = ({
  availableTalents,
  selectedTalents,
  onToggleTalent,
  onReroll,
  onConfirm
}) => {
  const [isRerolling, setIsRerolling] = useState(false);
  const MAX_SELECTION = 3;

  const handleToggle = (talent: Talent) => {
    soundManager.playCardFlip();
    onToggleTalent(talent);
  };

  const handleRerollClick = () => {
    soundManager.playClick();
    setIsRerolling(true);
    setTimeout(() => {
      onReroll();
      setIsRerolling(false);
    }, 200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 animate-item-entry">
      {/* 阶段标题栏 */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-underworld-900/90 text-underworld-ghost border border-underworld-ghost/40 text-xs font-serif mb-2 shadow-glow-ghost-sm">
          <span>📜 阎罗殿前第一勘 · 生死簿十连批命</span>
        </div>
        <h2 className="font-underworld text-2xl sm:text-4xl font-black text-slate-100 tracking-wider">
          批选入世之 <span className="text-underworld-gold text-glow-gold">三道先天命格符箓</span>
        </h2>
        <p className="text-slate-400 font-serif text-xs sm:text-sm mt-2">
          天地因果，生死注定。已圈选命格：{' '}
          <span className="font-bold text-underworld-ghost font-mono text-base">
            {selectedTalents.length} / {MAX_SELECTION}
          </span>{' '}
          道符令
        </p>
      </div>

      {/* 天赋卡片 10 选 3 网格：道门朱砂符箓风 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
        {availableTalents.map((talent) => {
          const isSelected = selectedTalents.some((t) => t.id === talent.id);
          const style = getRarityColor(talent.rarity);
          const isFull = selectedTalents.length >= MAX_SELECTION && !isSelected;

          const rarityLabel =
            talent.rarity === 'mythic' ? '赤金神符' :
            talent.rarity === 'legendary' ? '紫霄天符' :
            talent.rarity === 'epic' ? '碧落玄符' :
            talent.rarity === 'rare' ? '朱砂黄符' : '素帛凡符';

          return (
            <div
              key={talent.id}
              onClick={() => !isFull && handleToggle(talent)}
              className={`relative rounded-xl p-3.5 flex flex-col justify-between border-2 transition-all duration-200 cursor-pointer select-none overflow-hidden ${
                isSelected
                  ? 'border-underworld-cinnabar bg-red-950/30 scale-[1.02] shadow-glow-cinnabar ring-1 ring-red-400/40'
                  : isFull
                  ? 'border-underworld-800 bg-underworld-950/40 opacity-40 cursor-not-allowed'
                  : 'border-underworld-700/70 bg-underworld-900/70 hover:border-underworld-ghost/60 hover:bg-underworld-850 hover:scale-[1.01]'
              }`}
            >
              {/* 符头与敕令标志 */}
              <div className="flex items-center justify-between border-b border-underworld-700/60 pb-1.5 mb-2">
                <span className="text-[10px] font-serif font-bold text-underworld-gold tracking-widest flex items-center gap-0.5">
                  <span>☯️</span>
                  <span>敕令</span>
                </span>
                <span className={`text-[10px] font-serif font-bold px-1.5 py-0.2 rounded border ${style.badge}`}>
                  {rarityLabel}
                </span>
              </div>

              {/* 选中时盖下的朱砂印章 */}
              {isSelected && (
                <div className="absolute -bottom-1 -right-1 z-10">
                  <span className="seal-stamp text-[9px] py-0 px-1 bg-red-950/90">
                    准予入魂
                  </span>
                </div>
              )}

              <div>
                {/* 天赋名称 */}
                <h3 className={`font-underworld font-bold text-sm mb-1.5 ${style.text}`}>
                  {talent.name}
                </h3>

                {/* 天赋描述 */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {talent.description}
                </p>
              </div>

              {/* 特殊属性加成微标 */}
              {talent.effect?.stats && (
                <div className="mt-3 pt-2 border-t border-underworld-700/50 flex flex-wrap gap-1">
                  {Object.entries(talent.effect.stats).map(([k, v]) => (
                    <span
                      key={k}
                      className="text-[10px] font-serif px-1.5 py-0.5 rounded bg-underworld-800 border border-underworld-600/50 text-slate-200"
                    >
                      {formatStatShort(k)} {(v || 0) > 0 ? `+${v}` : v}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 底部操作栏 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl talisman-box border-underworld-700/80">
        <button
          onClick={handleRerollClick}
          disabled={isRerolling}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-underworld-600 hover:border-underworld-gold/60 bg-underworld-900 hover:bg-underworld-800 text-slate-300 hover:text-underworld-gold text-xs sm:text-sm font-serif transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 text-underworld-gold ${isRerolling ? 'animate-spin' : ''}`} />
          <span>冥币洗练 · 换一批命格十连抽</span>
        </button>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
          {selectedTalents.length < MAX_SELECTION && (
            <span className="text-xs text-amber-400 font-serif flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              还需勾选 {MAX_SELECTION - selectedTalents.length} 道符令
            </span>
          )}

          <button
            onClick={() => {
              soundManager.playSealStamp();
              onConfirm();
            }}
            disabled={selectedTalents.length !== MAX_SELECTION}
            className={`w-full sm:w-auto px-7 py-3 rounded-lg font-underworld font-black text-sm tracking-wider transition-all flex items-center justify-center gap-2 ${
              selectedTalents.length === MAX_SELECTION
                ? 'bg-gradient-to-r from-red-700 via-underworld-cinnabar to-red-800 text-white hover:brightness-110 shadow-glow-cinnabar hover:scale-105 border border-red-400/60'
                : 'bg-underworld-900 text-slate-600 cursor-not-allowed border border-underworld-800'
            }`}
          >
            <span>判官落笔 · 朱批定命</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

function formatStatShort(statKey: string): string {
  const map: Record<string, string> = {
    beauty: '颜',
    intelligence: '智',
    strength: '体',
    money: '家',
    karma: '德',
    luck: '运'
  };
  return map[statKey] || statKey;
}
