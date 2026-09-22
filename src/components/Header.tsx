import React, { useState } from 'react';
import { Volume2, VolumeX, Award, MessageSquare } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  karma: number;
  reincarnations: number;
  danmakuEnabled: boolean;
  onToggleDanmaku: () => void;
  onOpenWoodFish: () => void;
  onOpenAchievements: () => void;
  onResetToTitle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  karma,
  reincarnations,
  danmakuEnabled,
  onToggleDanmaku,
  onOpenWoodFish,
  onOpenAchievements,
  onResetToTitle
}) => {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.enabled);

  const handleToggleSound = () => {
    const nextState = soundManager.toggleSound();
    setSoundEnabled(nextState);
    if (nextState) {
      soundManager.playClick();
    }
  };

  return (
    <header className="w-full bg-underworld-950/95 backdrop-blur-md border-b-2 border-underworld-700/60 border-t-2 border-t-underworld-ghost/30 sticky top-0 z-40 px-3 sm:px-6 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* 标题与LOGO：阎罗殿牌匾 */}
        <div
          onClick={onResetToTitle}
          className="flex min-w-0 items-center gap-2.5 cursor-pointer group select-none"
          title="返回地府大厅"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-underworld-800 to-underworld-950 border-2 border-underworld-ghost/50 flex items-center justify-center shadow-glow-ghost-sm group-hover:shadow-glow-ghost transition-all">
              <span className="text-2xl animate-spin-slow">☯️</span>
            </div>
            {/* 魂灯幽光 */}
            <span className="absolute -top-1 -right-1 text-xs animate-ghost-flame">🔥</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="whitespace-nowrap font-underworld font-black text-base sm:text-xl text-slate-100 tracking-widest text-glow-ghost flex items-center">
                幽冥投胎司
              </h1>
              <span className="seal-stamp text-[10px] py-0 px-1 hidden sm:inline-block">
                阎罗准许
              </span>
            </div>
            <p className="text-[10px] text-underworld-ghost/80 font-serif tracking-wider">
              阴曹地府 · 六道轮回随机降世处
            </p>
          </div>
        </div>

        {/* 状态栏：功德值、转世次数、赛博木鱼、弹幕、成就入口、声音 */}
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-3">
          {/* 功德池与木鱼入口 */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenWoodFish();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-underworld-900/90 hover:bg-underworld-850 border border-underworld-gold/40 hover:border-underworld-gold text-underworld-gold text-xs sm:text-sm font-medium transition-all shadow-[0_0_15px_rgba(243,202,82,0.15)] group"
            title="点击打开赛博木鱼积功德"
          >
            <span className="group-hover:scale-125 transition-transform text-sm">🪵</span>
            <span className="font-serif text-[11px] text-underworld-gold/80 hidden md:inline">功德池:</span>
            <span className="font-bold text-underworld-gold font-mono tracking-tight">{karma}</span>
            <span className="text-[9px] text-amber-200 bg-amber-950/80 border border-amber-600/40 px-1 rounded ml-0.5">
              叩木鱼
            </span>
          </button>

          {/* 转世印记 */}
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-underworld-900/80 border border-underworld-cinnabar/40 text-slate-300 text-xs font-serif">
            <span className="text-underworld-cinnabar font-bold">印</span>
            <span>第 <span className="text-underworld-cinnabar font-mono font-bold">{reincarnations + 1}</span> 世因果</span>
          </div>

          {/* 游魂弹幕 */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleDanmaku();
            }}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-serif transition-all flex items-center gap-1 ${
              danmakuEnabled
                ? 'bg-underworld-ghost/15 border-underworld-ghost/50 text-underworld-ghost shadow-glow-ghost-sm'
                : 'bg-underworld-900/80 border-underworld-700 text-slate-500'
            }`}
            title={danmakuEnabled ? '关闭游魂窃语' : '开启游魂窃语'}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{danmakuEnabled ? '幽魂私语' : '私语已闭'}</span>
          </button>

          {/* 阴德功德榜 */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAchievements();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-underworld-purple/20 hover:bg-underworld-purple/30 border border-underworld-purple/50 text-purple-200 text-xs sm:text-sm font-serif transition-all shadow-[0_0_15px_rgba(157,78,221,0.2)]"
            title="查看阴德造化图鉴"
          >
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">功德簿</span>
          </button>

          {/* 阴阳法音开关 */}
          <button
            onClick={handleToggleSound}
            className="p-1.5 sm:p-2 rounded-lg bg-underworld-900 hover:bg-underworld-850 border border-underworld-700 text-slate-300 transition-colors"
            title={soundEnabled ? '法音静息' : '唤醒法音'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-underworld-ghost" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
