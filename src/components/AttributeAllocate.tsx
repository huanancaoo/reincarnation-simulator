import React from 'react';
import { Attributes, Talent } from '../types/game';
import { soundManager } from '../utils/audio';
import { Dices, RotateCcw, ArrowRight } from 'lucide-react';

interface AttributeAllocateProps {
  attributes: Attributes;
  availablePoints: number;
  selectedTalents: Talent[];
  onChange: (attrs: Attributes, remaining: number) => void;
  onBack: () => void;
  onConfirm: () => void;
}

const TOTAL_POINTS = 20;

const STAT_CONFIG = [
  { key: 'beauty' as const, label: '骨相皮囊（颜值）', icon: '✨', desc: '影响三千红尘容貌与世间众生眼缘' },
  { key: 'intelligence' as const, label: '宿慧悟性（智力）', icon: '🧠', desc: '影响文曲学道、机变谋略与参悟天机' },
  { key: 'strength' as const, label: '气血根骨（体魄）', icon: '💪', desc: '影响病煞百邪不侵、武道气力与阳寿' },
  { key: 'money' as const, label: '宿世福禄（家境）', icon: '💰', desc: '影响降生门阀底蕴、祖荫与盘缠银钱' },
  { key: 'luck' as const, label: '天地命数（气运）', icon: '🍀', desc: '影响逢凶化吉、贵人庇佑与天降奇遇' },
];

export const AttributeAllocate: React.FC<AttributeAllocateProps> = ({
  attributes,
  availablePoints,
  selectedTalents,
  onChange,
  onBack,
  onConfirm
}) => {
  const handleAdjust = (key: keyof Attributes, delta: number) => {
    soundManager.playClick();
    const current = attributes[key];
    if (delta > 0 && availablePoints <= 0) return;
    if (delta < 0 && current <= 0) return;

    const nextAttrs = {
      ...attributes,
      [key]: current + delta
    };
    onChange(nextAttrs, availablePoints - delta);
  };

  const handleQuickPreset = (preset: 'balanced' | 'random' | 'rich' | 'smart') => {
    soundManager.playClick();
    let newAttrs: Attributes = {
      beauty: 0,
      intelligence: 0,
      strength: 0,
      money: 0,
      karma: 0,
      luck: 0
    };

    if (preset === 'balanced') {
      newAttrs = { beauty: 4, intelligence: 4, strength: 4, money: 4, karma: 0, luck: 4 };
    } else if (preset === 'rich') {
      newAttrs = { beauty: 2, intelligence: 3, strength: 3, money: 10, karma: 0, luck: 2 };
    } else if (preset === 'smart') {
      newAttrs = { beauty: 2, intelligence: 10, strength: 4, money: 2, karma: 0, luck: 2 };
    } else if (preset === 'random') {
      let remaining = TOTAL_POINTS;
      const keys = ['beauty', 'intelligence', 'strength', 'money', 'luck'] as const;
      keys.forEach((k, idx) => {
        if (idx === keys.length - 1) {
          newAttrs[k] = remaining;
        } else {
          const alloc = Math.floor(Math.random() * Math.min(8, remaining + 1));
          newAttrs[k] = alloc;
          remaining -= alloc;
        }
      });
    }

    onChange(newAttrs, 0);
  };

  const handleReset = () => {
    soundManager.playClick();
    onChange(
      { beauty: 0, intelligence: 0, strength: 0, money: 0, karma: 0, luck: 0 },
      TOTAL_POINTS
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 animate-item-entry">
      {/* 标题栏 */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-underworld-900/90 text-underworld-ghost border border-underworld-ghost/40 text-xs font-serif mb-2 shadow-glow-ghost-sm">
          <span>⚖️ 阎罗殿前第二勘 · 六道因果天平</span>
        </div>
        <h2 className="font-underworld text-2xl sm:text-4xl font-black text-slate-100 tracking-wider">
          孽镜台前 · 权衡先天六维资质
        </h2>
        <p className="text-slate-400 font-serif text-xs sm:text-sm mt-2">
          阎罗殿前无虚妄，孽镜台下照生前。拨动阴阳天平，重塑来世根骨。
        </p>

        {/* 剩余点数令牌 */}
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg talisman-box border-underworld-ghost/40 shadow-glow-ghost-sm">
          <span className="text-xs font-serif text-slate-300">剩余转生灵韵：</span>
          <span className={`font-black font-mono text-xl ${availablePoints > 0 ? 'text-underworld-ghost text-glow-ghost' : 'text-slate-400'}`}>
            {availablePoints}
          </span>
          <span className="text-slate-500 text-xs">/ {TOTAL_POINTS} 铢</span>
        </div>
      </div>

      {/* 已定命格展示卷轴 */}
      <div className="mb-6 p-3 rounded-xl talisman-box border-underworld-700/80 flex flex-wrap items-center gap-2">
        <span className="text-xs font-serif text-underworld-gold flex items-center gap-1">
          <span>📜</span>
          <span>已奉定命格符箓:</span>
        </span>
        {selectedTalents.map((t) => (
          <span
            key={t.id}
            className="text-xs font-serif px-2.5 py-1 rounded-md bg-underworld-950/80 border border-underworld-gold/40 text-underworld-gold font-semibold shadow-sm"
          >
            ☯️ {t.name}
          </span>
        ))}
      </div>

      {/* 快捷法印配置预设 */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickPreset('balanced')}
            className="px-3 py-1.5 rounded-lg bg-underworld-900 hover:bg-underworld-850 border border-underworld-700 hover:border-underworld-ghost/60 text-slate-200 text-xs font-serif transition-all"
          >
            ☯️ 六合中庸
          </button>
          <button
            onClick={() => handleQuickPreset('smart')}
            className="px-3 py-1.5 rounded-lg bg-underworld-900 hover:bg-underworld-850 border border-underworld-700 hover:border-underworld-ghost/60 text-slate-200 text-xs font-serif transition-all"
          >
            🧠 宿慧通天
          </button>
          <button
            onClick={() => handleQuickPreset('rich')}
            className="px-3 py-1.5 rounded-lg bg-underworld-900 hover:bg-underworld-850 border border-underworld-700 hover:border-underworld-ghost/60 text-slate-200 text-xs font-serif transition-all"
          >
            💰 富贵滔天
          </button>
          <button
            onClick={() => handleQuickPreset('random')}
            className="px-3 py-1.5 rounded-lg bg-underworld-900 hover:bg-underworld-850 border border-underworld-700 hover:border-underworld-ghost/60 text-slate-200 text-xs font-serif transition-all flex items-center gap-1"
          >
            <Dices className="w-3.5 h-3.5 text-underworld-ghost" />
            <span>天机莫测</span>
          </button>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg hover:bg-red-950/40 text-slate-400 hover:text-underworld-cinnabar text-xs font-serif transition-colors flex items-center gap-1 border border-transparent hover:border-red-900/50"
        >
          <RotateCcw className="w-3 h-3" />
          <span>重铸灵根</span>
        </button>
      </div>

      {/* 属性加点滑块/按钮列表 */}
      <div className="space-y-3 mb-8">
        {STAT_CONFIG.map(({ key, label, icon, desc }) => {
          const value = attributes[key];
          const percentage = Math.min(100, (value / 10) * 100);

          return (
            <div
              key={key}
              className="p-3.5 rounded-xl talisman-box border-underworld-700/60 hover:border-underworld-ghost/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-underworld font-bold text-slate-200 text-sm">{label}</span>
                    <span className="text-xs text-underworld-ghost font-mono">[{value} 点]</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-serif">{desc}</p>
                </div>
              </div>

              {/* 进度条与操作按键 */}
              <div className="flex items-center gap-3 w-full sm:w-56 justify-end">
                <div className="flex-1 h-2 bg-underworld-950 rounded-full overflow-hidden border border-underworld-700/50">
                  <div
                    className="h-full bg-gradient-to-r from-underworld-ghostDim to-underworld-ghost shadow-glow-ghost-sm transition-all duration-200"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleAdjust(key, -1)}
                    disabled={value <= 0}
                    className="w-7 h-7 rounded-lg bg-underworld-800 hover:bg-underworld-700 disabled:opacity-20 disabled:cursor-not-allowed text-slate-200 font-bold flex items-center justify-center transition-colors border border-underworld-600/60"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-mono font-bold text-sm text-underworld-ghost">
                    {value}
                  </span>
                  <button
                    onClick={() => handleAdjust(key, 1)}
                    disabled={availablePoints <= 0}
                    className="w-7 h-7 rounded-lg bg-underworld-ghost/25 hover:bg-underworld-ghost/40 disabled:opacity-20 disabled:cursor-not-allowed text-underworld-ghost font-bold flex items-center justify-center transition-colors border border-underworld-ghost/50 shadow-glow-ghost-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部按钮 */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="px-4 py-2.5 rounded-lg border border-underworld-700 text-slate-400 hover:text-slate-200 hover:bg-underworld-900 font-serif text-sm transition-colors"
        >
          ← 返回重选命格
        </button>

        <button
          onClick={() => {
            soundManager.playSealStamp();
            onConfirm();
          }}
          className="px-7 py-3 rounded-lg font-underworld font-black text-sm tracking-wider bg-gradient-to-r from-red-700 via-underworld-cinnabar to-red-800 text-white hover:brightness-110 shadow-glow-cinnabar hover:scale-105 border border-red-400/60 transition-all flex items-center gap-2"
        >
          <span>盖下法印 · 步入六道摇号司</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
