import React, { useEffect, useState } from 'react';
import { GameRecord } from '../types/game';
import { soundManager } from '../utils/audio';
import { Sparkles, RefreshCw, Share2, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LifeSummaryModalProps {
  record: GameRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

export const LifeSummaryModal: React.FC<LifeSummaryModalProps> = ({
  record,
  isOpen,
  onClose,
  onRestart
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && record) {
      soundManager.playKarmaReward();
      if (['SSS', 'SS', 'S', 'A'].includes(record.rating)) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    }
  }, [isOpen, record]);

  if (!isOpen || !record) return null;

  const handleShare = () => {
    soundManager.playClick();
    const fateDirectiveText = record.fateDirective
      ? `\n天命敕令：${record.fateDirective.icon} ${record.fateDirective.title}（${record.fateDirectiveCompleted ? '已达成' : '未达成'}）`
      : '';
    const shareText = `【投胎模拟器·生平纪要】\n我在【${record.location.name}】投胎出生于【${record.family.title}】。\n享年：${record.finalAge} 岁\n死因：${record.deathReason}\n综合评级：${record.rating}（总分 ${record.score}）${fateDirectiveText}\n获得功德：+${record.karmaEarned}\n墓志铭：${record.epitaph}\n来测测你能活几岁？`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const ratingColor = getRatingColor(record.rating);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-item-entry">
      <div className="relative w-full max-w-xl bg-underworld-900 border-2 border-underworld-gold/60 rounded-2xl p-5 sm:p-7 shadow-diyu-panel overflow-hidden max-h-[92vh] overflow-y-auto talisman-box custom-scrollbar">
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

        {/* 顶部生死簿标题 */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-underworld-950 text-underworld-gold border border-underworld-gold/40 text-xs font-serif mb-2">
            <span>🏮</span>
            <span>幽冥阴曹地府 · 生死簿结案判牒</span>
            <span>🏮</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-underworld text-slate-100 tracking-wider">
            一生浮沉 · 阎罗定谳总评
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-serif">
            前尘往事俱往矣 · 六道因果定论时
          </p>
        </div>

        {/* 评级徽章大展示（带醒目朱砂官印） */}
        <div className="relative flex flex-col items-center justify-center p-5 rounded-xl bg-underworld-950/90 border-2 border-underworld-800/80 mb-5 overflow-hidden shadow-inner">
          {/* 大号阎罗朱砂法印章 */}
          <div className="absolute right-4 top-2 sm:top-3 pointer-events-none select-none">
            <div className="seal-stamp text-xs sm:text-sm font-black px-2 py-1 rotate-12 bg-red-950/90 border-2 border-red-500 text-red-400 shadow-glow-blood">
              <div>阎罗天子印</div>
              <div className="text-[10px] tracking-widest">准予转生</div>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-serif mb-1">因果善恶综合评级</div>
          <div className={`text-6xl sm:text-7xl font-black font-underworld tracking-wider ${ratingColor.text} drop-shadow-[0_0_20px_currentColor]`}>
            {record.rating}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            阎罗朱批总分：<span className="font-bold text-underworld-gold text-sm">{record.score}</span> 分
          </div>
        </div>

        {/* 核心生平指标卡 */}
        <div className="grid grid-cols-2 gap-2.5 mb-5 text-xs font-serif">
          <div className="p-3 rounded-xl bg-underworld-950/70 border border-underworld-800">
            <span className="text-slate-400 text-[11px]">降生地界：</span>
            <div className="font-bold text-slate-200 mt-0.5 text-sm">{record.location.flag} {record.location.name}</div>
          </div>

          <div className="p-3 rounded-xl bg-underworld-950/70 border border-underworld-800">
            <span className="text-slate-400 text-[11px]">六道出身：</span>
            <div className="font-bold text-slate-200 mt-0.5 text-sm">{record.family.icon} {record.family.title}</div>
          </div>

          <div className="p-3 rounded-xl bg-underworld-950/70 border border-underworld-800">
            <span className="text-slate-400 text-[11px]">终老阳寿：</span>
            <div className="font-bold text-underworld-ghost mt-0.5 font-mono text-sm">{record.finalAge} 载</div>
          </div>

          <div className="p-3 rounded-xl bg-underworld-950/70 border border-underworld-800">
            <span className="text-slate-400 text-[11px]">凝结功德：</span>
            <div className="font-bold text-underworld-gold mt-0.5 font-mono text-sm flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-underworld-gold" />
              +{record.karmaEarned} 点
            </div>
          </div>
        </div>

        {record.fateDirective && (
          <div className={`mb-5 p-3 rounded-xl border font-serif ${
            record.fateDirectiveCompleted
              ? 'bg-emerald-950/30 border-emerald-500/50'
              : 'bg-underworld-950/70 border-underworld-800'
          }`}>
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-underworld-gold flex items-center gap-1.5">
                <span>{record.fateDirective.icon}</span>
                <span>天命敕令 · {record.fateDirective.title}</span>
              </span>
              <span className={record.fateDirectiveCompleted ? 'text-emerald-300' : 'text-slate-500'}>
                {record.fateDirectiveCompleted ? `达成 · +${record.fateDirective.karmaReward} 功德` : '未能达成'}
              </span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{record.fateDirective.description}</p>
          </div>
        )}

        {/* 终老死因 */}
        <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 mb-5">
          <div className="flex items-center gap-1.5 text-[11px] text-red-400 font-bold mb-0.5 font-serif">
            <span>⚰️</span>
            <span>终局卒因</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-serif">{record.deathReason}</p>
        </div>

        {/* 墓铭碑记（石碑雕刻质感） */}
        <div className="p-4 rounded-xl bg-gradient-to-b from-stone-900 via-underworld-950 to-stone-950 border-2 border-stone-700/80 shadow-inner mb-5 relative">
          <div className="flex items-center justify-between mb-1.5 border-b border-stone-800 pb-1">
            <span className="text-[11px] text-underworld-gold font-bold font-serif flex items-center gap-1">
              <span>🪦</span>
              <span>一生浮沉 · 墓铭碑记</span>
            </span>
            <span className="seal-stamp text-[9px] py-0 px-1">阴曹立石</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed font-serif tracking-wide py-1 text-center">
            “{record.epitaph}”
          </p>
        </div>

        {/* 终局六维资质速览 */}
        <div className="mb-6 p-3 rounded-xl bg-underworld-950/80 border border-underworld-800">
          <div className="text-[11px] text-slate-400 font-serif mb-2">终生六维资质</div>
          <div className="grid grid-cols-6 gap-1 text-center font-mono text-xs">
            <div className="p-1 rounded bg-underworld-900 border border-underworld-800">
              <div className="text-[10px] text-slate-400 font-serif">骨相</div>
              <div className="text-pink-300 font-bold">{record.finalAttributes.beauty}</div>
            </div>
            <div className="p-1 rounded bg-underworld-900 border border-underworld-800">
              <div className="text-[10px] text-slate-400 font-serif">宿慧</div>
              <div className="text-cyan-300 font-bold">{record.finalAttributes.intelligence}</div>
            </div>
            <div className="p-1 rounded bg-underworld-900 border border-underworld-800">
              <div className="text-[10px] text-slate-400 font-serif">气血</div>
              <div className="text-emerald-300 font-bold">{record.finalAttributes.strength}</div>
            </div>
            <div className="p-1 rounded bg-underworld-900 border border-underworld-800">
              <div className="text-[10px] text-slate-400 font-serif">福禄</div>
              <div className="text-underworld-gold font-bold">{record.finalAttributes.money}</div>
            </div>
            <div className="p-1 rounded bg-underworld-900 border border-underworld-800">
              <div className="text-[10px] text-slate-400 font-serif">功德</div>
              <div className="text-purple-300 font-bold">{record.finalAttributes.karma}</div>
            </div>
            <div className="p-1 rounded bg-underworld-900 border border-underworld-800">
              <div className="text-[10px] text-slate-400 font-serif">命数</div>
              <div className="text-underworld-ghost font-bold">{record.finalAttributes.luck}</div>
            </div>
          </div>
        </div>

        {/* 底部按钮栏 */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleShare}
            className="w-full sm:w-auto sm:flex-1 py-3 px-4 rounded-xl bg-underworld-950 hover:bg-underworld-800 border border-underworld-700 hover:border-underworld-gold text-slate-200 text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">已拓印生平判牒</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>📜 拓印此生判牒</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              soundManager.playGong();
              soundManager.playSealStamp();
              onRestart();
            }}
            className="w-full sm:w-auto sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-800 via-underworld-cinnabar to-red-900 text-white hover:brightness-110 shadow-glow-cinnabar text-xs sm:text-sm font-underworld font-black transition-all flex items-center justify-center gap-2 border border-red-400"
          >
            <RefreshCw className="w-4 h-4" />
            <span>🍶 饮尽孟婆汤 · 再入轮回！</span>
          </button>
        </div>
      </div>
    </div>
  );
};

function getRatingColor(rating: GameRecord['rating']): { text: string } {
  switch (rating) {
    case 'SSS':
      return { text: 'text-amber-400 animate-pulse' };
    case 'SS':
    case 'S':
      return { text: 'text-yellow-300' };
    case 'A':
      return { text: 'text-purple-400' };
    case 'B':
      return { text: 'text-cyan-400' };
    case 'C':
      return { text: 'text-emerald-400' };
    case 'D':
      return { text: 'text-slate-400' };
    case 'F':
    default:
      return { text: 'text-red-400' };
  }
}
