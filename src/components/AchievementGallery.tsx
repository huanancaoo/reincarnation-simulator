import React from 'react';
import { ACHIEVEMENTS_LIST } from '../data/achievements';
import { soundManager } from '../utils/audio';
import { Sparkles, X, Lock } from 'lucide-react';

interface AchievementGalleryProps {
  unlockedIds: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementGallery: React.FC<AchievementGalleryProps> = ({
  unlockedIds,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENTS_LIST.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-item-entry">
      <div className="relative w-full max-w-2xl bg-underworld-900 border-2 border-underworld-gold/60 rounded-2xl p-5 sm:p-7 shadow-diyu-panel max-h-[85vh] flex flex-col talisman-box diyu-panel">
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

        {/* 标题 */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-underworld-950 text-underworld-gold border border-underworld-gold/40 text-xs font-serif mb-2">
            <span>🏮</span>
            <span>幽冥阴曹地府 · 阎罗宝鉴</span>
            <span>🏮</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-underworld text-slate-100 tracking-wider">
            六道千秋 · 宿世因果功德谱
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-serif">
            遍历红尘万劫与造化奇遇，每一段传奇终章皆载入幽冥青史。
          </p>

          {/* 进度条 */}
          <div className="mt-3 max-w-xs mx-auto">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-serif">
              <span>图鉴录入进度</span>
              <span className="font-mono text-underworld-gold font-bold">{unlockedCount} / {totalCount} ({percentage}%)</span>
            </div>
            <div className="w-full h-2.5 bg-underworld-950 rounded-full overflow-hidden border border-underworld-800">
              <div
                className="h-full bg-gradient-to-r from-red-700 via-underworld-cinnabar to-underworld-gold transition-all duration-300 shadow-glow-gold"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 成就列表卡片 */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
          {ACHIEVEMENTS_LIST.map((ach) => {
            const isUnlocked = unlockedIds.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-underworld-950/80 border-underworld-gold/50 shadow-[0_0_12px_rgba(243,202,82,0.15)]'
                    : 'bg-underworld-950/40 border-underworld-800/60 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl border ${
                      isUnlocked
                        ? 'bg-underworld-900 border-underworld-gold/60 shadow-glow-gold'
                        : 'bg-underworld-950 border-underworld-800 grayscale'
                    }`}
                  >
                    {isUnlocked ? ach.icon : <Lock className="w-5 h-5 text-slate-500" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-100 font-serif">{ach.title}</h4>
                      {isUnlocked && (
                        <span className="seal-stamp text-[9px] py-0 px-1">
                          已载金榜
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 font-serif">{ach.description}</p>
                  </div>
                </div>

                {/* 功德奖励 */}
                <div className="text-right shrink-0">
                  <span className={`inline-flex items-center gap-1 text-xs font-serif font-bold px-2 py-1 rounded-lg border ${
                    isUnlocked
                      ? 'text-underworld-gold bg-amber-500/10 border-underworld-gold/30 shadow-sm'
                      : 'text-slate-500 bg-underworld-950 border-underworld-800'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    +{ach.karmaReward} 功德
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
