import React, { useRef, useEffect } from 'react';
import { AnimalSpecies, Attributes, BirthLocation, FamilyBackground, InteractiveChoice, Realm, Talent, YearLog } from '../types/game';
import { soundManager } from '../utils/audio';
import { Play, Pause, SkipForward, ArrowDownCircle, Heart, Brain, Dumbbell, Coins, Sparkles, Clover } from 'lucide-react';

interface LifeStreamProps {
  realm: Realm;
  animalSpecies?: AnimalSpecies;
  currentAge: number;
  logs: YearLog[];
  attributes: Attributes;
  location: BirthLocation;
  family: FamilyBackground;
  talents: Talent[];
  isAutoPlaying: boolean;
  speedMs: number;
  isDead: boolean;
  deathReason?: string;
  pendingChoice?: InteractiveChoice;
  onResolveChoice: (optionIndex: number) => void;
  onToggleAutoPlay: () => void;
  onSetSpeed: (speedMs: number) => void;
  onNextYear: () => void;
  onFastForwardToEnd: () => void;
  onOpenSettlement: () => void;
}

export const LifeStream: React.FC<LifeStreamProps> = ({
  realm,
  animalSpecies,
  currentAge,
  logs,
  attributes,
  location,
  family,
  talents,
  isAutoPlaying,
  speedMs,
  isDead,
  deathReason,
  pendingChoice,
  onResolveChoice,
  onToggleAutoPlay,
  onSetSpeed,
  onNextYear,
  onFastForwardToEnd,
  onOpenSettlement
}) => {
  const streamBottomRef = useRef<HTMLDivElement>(null);

  // 自动平滑滚动到底部
  useEffect(() => {
    streamBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs.length, pendingChoice]);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-[calc(100vh-70px)] p-2 sm:p-4">
      {/* 顶部简明 HUD：生死簿实时监察法镜 */}
      <div className="bg-underworld-900/95 border-2 border-underworld-700/80 rounded-xl p-3 mb-3 backdrop-blur-md shadow-diyu-panel relative overflow-hidden">
        {/* 顶部装饰暗纹 */}
        <div className="flex items-center justify-between border-b border-underworld-800/80 pb-2 mb-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-underworld font-bold text-underworld-gold flex items-center gap-1.5">
              <span className="animate-spin-slow inline-block">☯️</span>
              <span>生死簿 · 实时因果录</span>
            </span>
            <span className="text-underworld-700">|</span>
            <span className="text-xl">{location.flag}</span>
            <span className="font-serif font-bold text-slate-200">{location.name}</span>
            <span className="text-underworld-700">|</span>
            {realm === 'animal' && animalSpecies ? (
              <span className="text-underworld-gold font-bold flex items-center gap-1 font-serif">
                <span>{animalSpecies.icon}</span>
                <span>畜生道 · {animalSpecies.name}</span>
              </span>
            ) : (
              <span className="text-slate-300 font-serif">{family.icon} {family.title}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-slate-400 font-serif">阳寿刻度:</span>
            <span className="font-black text-underworld-ghost font-mono text-base tracking-wider">{currentAge} 载</span>
            <span className="seal-stamp-ghost text-[9px] py-0 px-1 hidden sm:inline-block">推演中</span>
          </div>
        </div>

        {/* 携带天赋神符徽章 */}
        {talents.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span className="text-[10px] text-underworld-gold/80 font-serif">宿命神符:</span>
            {talents.map((t) => (
              <span
                key={t.id}
                className="text-[10px] px-2 py-0.5 rounded bg-underworld-950/80 text-underworld-parchment border border-underworld-gold/40 shadow-sm flex items-center gap-1 font-serif"
              >
                <span>☯️</span>
                <span>{t.name}</span>
              </span>
            ))}
          </div>
        )}

        {/* 动态六维资质栏 */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center">
          <AttributeWidget icon={<Sparkles className="w-3 h-3 text-pink-400" />} label="骨相皮囊" value={attributes.beauty} />
          <AttributeWidget icon={<Brain className="w-3 h-3 text-cyan-400" />} label="宿慧悟性" value={attributes.intelligence} />
          <AttributeWidget icon={<Dumbbell className="w-3 h-3 text-emerald-400" />} label="气血根骨" value={attributes.strength} />
          <AttributeWidget icon={<Coins className="w-3 h-3 text-underworld-gold" />} label="宿世福禄" value={attributes.money} />
          <AttributeWidget icon={<Heart className="w-3 h-3 text-underworld-cinnabar" />} label="阴骘功德" value={attributes.karma} />
          <AttributeWidget icon={<Clover className="w-3 h-3 text-purple-400" />} label="天地命数" value={attributes.luck} />
        </div>
      </div>

      {/* 核心演进事件流区域（带滚动容器） */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 rounded-xl bg-underworld-950/90 border-2 border-underworld-800/80 p-3 sm:p-4 relative backdrop-blur-md shadow-inner custom-scrollbar">
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs sm:text-sm font-serif space-y-2">
            <span className="text-3xl animate-bounce">📜</span>
            <p>判官朱笔未落，因果齿轮静候...</p>
            <p className="text-underworld-ghost text-xs">点击下方「自动推进」或「翻阅来年」开启轮回！</p>
          </div>
        ) : (
          logs.map((log, index) => {
            const isLatest = index === logs.length - 1;
            const isMilestone = log.isMilestone || log.age % 10 === 0;

            return (
              <div
                key={log.age + '-' + index}
                className={`animate-item-entry p-3 rounded-xl border transition-all ${
                  isMilestone
                    ? 'bg-gradient-to-r from-red-950/40 via-underworld-900 to-underworld-950 border-underworld-cinnabar/60 shadow-[0_0_15px_rgba(255,42,75,0.15)]'
                    : 'bg-underworld-900/60 border-underworld-800/70 hover:border-underworld-700'
                } ${isLatest ? 'ring-1 ring-underworld-ghost/50' : ''}`}
              >
                <div className="flex items-start gap-2.5">
                  {/* 年份法印徽章 */}
                  <span
                    className={`shrink-0 font-serif text-xs px-2.5 py-0.5 rounded font-bold border ${
                      isMilestone
                        ? 'bg-underworld-cinnabar text-white border-red-300 shadow-glow-cinnabar'
                        : 'bg-underworld-950 text-underworld-ghost border-underworld-700'
                    }`}
                  >
                    第 {log.age} 载
                  </span>

                  {/* 特殊里程碑印章 */}
                  {isMilestone && (
                    <span className="seal-stamp text-[9px] py-0 px-1 hidden sm:inline-block">
                      {log.age >= 60 ? '命逢大限' : '命遇大劫'}
                    </span>
                  )}

                  {/* 事件主文本 */}
                  <div className="flex-1 text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
                    {log.text.replace(/^\d+\s*岁：/, '')}
                  </div>
                </div>

                {/* 属性增减标签 */}
                {log.statChanges && Object.keys(log.statChanges).length > 0 && (
                  <div className="mt-2 pt-1.5 border-t border-underworld-800/60 flex flex-wrap gap-1.5 pl-8 sm:pl-10">
                    {Object.entries(log.statChanges).map(([key, val]) => {
                      const num = val || 0;
                      if (num === 0) return null;
                      const isPositive = num > 0;
                      return (
                        <span
                          key={key}
                          className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium border ${
                            isPositive
                              ? 'bg-emerald-950/40 text-underworld-ghost border-emerald-500/30'
                              : 'bg-red-950/40 text-red-400 border-red-500/30'
                          }`}
                        >
                          {formatStatName(key)} {isPositive ? `+${num}` : num}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* 关键人生命运岔路口（三生石前 · 命运岔口） */}
        {pendingChoice && !isDead && (
          <div className="animate-item-entry p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-underworld-950 via-underworld-900 to-red-950/60 border-2 border-underworld-cinnabar shadow-glow-cinnabar my-3 talisman-box">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-underworld-cinnabar font-bold text-sm font-underworld">
                <span className="animate-ghost-flame text-base">🔥</span>
                <span>三生石前 · 命途重大抉择</span>
              </div>
              <span className="seal-stamp text-[9px] py-0 px-1">天机暂定</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4 font-serif">
              {pendingChoice.dilemma}
            </p>

            {/* 选项按钮组 */}
            <div className="space-y-2.5">
              {pendingChoice.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundManager.playSealStamp();
                    onResolveChoice(idx);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-underworld-950/80 hover:bg-underworld-900 border border-underworld-700/80 hover:border-underworld-cinnabar hover:shadow-glow-cinnabar transition-all text-xs sm:text-sm text-slate-100 font-serif flex items-center justify-between group"
                >
                  <span className="flex-1">
                    <span className="text-underworld-gold mr-1.5 font-bold">【抉择 {idx + 1}】</span>
                    {opt.label}
                  </span>
                  <span className="text-underworld-cinnabar opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0 font-underworld font-bold text-xs">
                    朱批勾决 🖋️
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 寿终正寝/意外死亡通知横幅 */}
        {isDead && (
          <div className="animate-item-entry p-5 rounded-xl bg-gradient-to-b from-red-950/60 via-underworld-950 to-underworld-900 border-2 border-underworld-cinnabar text-center shadow-glow-blood">
            <div className="text-4xl mb-2 flex items-center justify-center gap-3">
              <span className="animate-ghost-flame">🏮</span>
              <span>⚰️</span>
              <span className="animate-ghost-flame">🏮</span>
            </div>
            <h3 className="font-underworld font-black text-underworld-cinnabar text-lg tracking-widest">
              大限已至 · 魂归幽冥阎罗殿
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-serif">
              享阳寿 <span className="font-bold text-underworld-ghost text-sm">{currentAge}</span> 载 · 卒因：【{deathReason || '寿终正寝'}】
            </p>
            <button
              onClick={() => {
                soundManager.playGong();
                soundManager.playSealStamp();
                onOpenSettlement();
              }}
              className="mt-4 px-8 py-3 rounded-xl font-underworld font-bold text-sm bg-gradient-to-r from-red-800 via-underworld-cinnabar to-red-900 text-white hover:brightness-110 shadow-glow-cinnabar transition-all inline-flex items-center gap-2 border border-red-400"
            >
              <span>📜 判官升堂 · 翻阅生死簿终局牒文</span>
              <span className="seal-stamp text-[10px] py-0 px-1 bg-red-950 border-white/60 text-white">定谳</span>
            </button>
          </div>
        )}

        <div ref={streamBottomRef} />
      </div>

      {/* 底部控制台（幽冥轮转控制台） */}
      <div className="bg-underworld-900/95 border-2 border-underworld-700/80 rounded-xl p-3 mt-3 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 shadow-diyu-panel talisman-box">
        {/* 速度控制 */}
        <div className="flex items-center gap-1.5 text-xs font-serif">
          <span className="text-slate-400 mr-1 text-[11px] hidden sm:inline">推演步速:</span>
          {[
            { label: '一倍刻', ms: 700 },
            { label: '二倍刻', ms: 350 },
            { label: '疾速推演', ms: 120 }
          ].map((sp) => (
            <button
              key={sp.label}
              onClick={() => {
                soundManager.playClick();
                onSetSpeed(sp.ms);
              }}
              className={`px-2.5 py-1 rounded font-serif text-xs transition-colors border ${
                speedMs === sp.ms
                  ? 'bg-underworld-ghost text-slate-950 font-bold border-underworld-ghost shadow-glow-ghost'
                  : 'bg-underworld-950/60 text-slate-300 border-underworld-800 hover:border-underworld-700'
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* 核心驱动控制按钮 */}
        <div className="flex items-center gap-2">
          {!isDead ? (
            <>
              {/* 下一年 (手动模式) */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  onNextYear();
                }}
                disabled={isAutoPlaying || !!pendingChoice}
                className="px-3.5 py-1.5 rounded-lg border border-underworld-700 hover:border-underworld-gold bg-underworld-950/80 text-slate-200 text-xs font-serif font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                翻阅来年
              </button>

              {/* 自动播放/暂停 */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  onToggleAutoPlay();
                }}
                disabled={!!pendingChoice}
                className={`px-4 py-1.5 rounded-lg font-underworld font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed border ${
                  isAutoPlaying
                    ? 'bg-underworld-gold text-slate-950 hover:bg-amber-400 shadow-glow-gold border-amber-300'
                    : 'bg-underworld-ghost text-slate-950 hover:bg-emerald-300 shadow-glow-ghost border-emerald-400'
                }`}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>暂定因果</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{pendingChoice ? '等待天机' : '幽冥轮转'}</span>
                  </>
                )}
              </button>

              {/* 瞬移至终局 */}
              <button
                onClick={() => {
                  soundManager.playGong();
                  onFastForwardToEnd();
                }}
                disabled={!!pendingChoice}
                className="p-1.5 rounded-lg bg-underworld-950/60 hover:bg-underworld-800 border border-underworld-700 text-slate-300 hover:text-underworld-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="逆转光阴 · 瞬至大限"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                soundManager.playGong();
                soundManager.playSealStamp();
                onOpenSettlement();
              }}
              className="px-5 py-2 rounded-lg font-underworld font-bold text-xs bg-underworld-gold text-slate-950 hover:brightness-110 shadow-glow-gold transition-all flex items-center gap-1.5 border border-amber-300"
            >
              <span>翻阅生死簿生平</span>
              <ArrowDownCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function AttributeWidget({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-underworld-950/80 border border-underworld-800 rounded-lg p-1.5 flex flex-col items-center">
      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-serif">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-mono font-bold text-xs text-underworld-ghost mt-0.5">{value}</span>
    </div>
  );
}

function formatStatName(key: string): string {
  const map: Record<string, string> = {
    beauty: '骨相',
    intelligence: '宿慧',
    strength: '气血',
    money: '福禄',
    karma: '功德',
    luck: '气运'
  };
  return map[key] || key;
}
