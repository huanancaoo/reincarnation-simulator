import React, { useEffect, useState } from 'react';

interface DanmakuItem {
  id: number;
  text: string;
  color: string;
  speedSec: number;
}

interface DanmakuOverlayProps {
  enabled: boolean;
  latestEventText?: string;
}

const MEME_BARRAGE = [
  '👻 阎王爷朱笔一挥：此子命里缺钱，但命硬！',
  '🍶 孟婆汤今天掺水了啊，前世记忆怎么还在！',
  '📜 判官翻开生死簿，直呼好家伙！',
  '🏮 黑白无常已在路口为您备好VIP专车',
  '☯️ 这哥们体魄只有1，怎么敢去吃华莱士的？',
  '⚖️ 功德池告急！建议速去敲木鱼补缴因果税！',
  '🐾 投胎成大熊猫了，酸死隔壁小鬼了🍋',
  '🔥 牛头马面：当年俺俩要是有这悟性，早当殿前元帅了',
  '📜 生死簿查无此人，难道当年被孙猴子划掉了？',
  '💰 宿世福禄拉满！出生直接含着金钥匙与功德金牌！',
  '⚡ 这骨骼清奇，要是去异界修仙当场引动九重玄雷！',
  '🪦 地府办事处温馨提醒：道路千万条，保命第一条',
  '🏮 奈何桥头排队中，前面十万八千只哈士奇！',
  '🍶 孟婆：再来一碗？这都第五碗了小伙子！',
  '☯️ 纯血天生牛马，这辈子也是阴阳两界的顶梁柱！'
];

const COLORS = [
  'text-underworld-ghost text-glow-ghost',
  'text-underworld-gold text-glow-gold',
  'text-underworld-cinnabar text-glow-cinnabar',
  'text-underworld-parchment',
  'text-purple-300 drop-shadow-[0_0_8px_rgba(157,78,221,0.8)]',
  'text-emerald-300 drop-shadow-[0_0_8px_rgba(13,245,177,0.7)]'
];

export const DanmakuOverlay: React.FC<DanmakuOverlayProps> = ({
  enabled,
  latestEventText
}) => {
  const [item, setItem] = useState<DanmakuItem | null>(null);

  // 定时随机发射弹幕
  useEffect(() => {
    if (!enabled) {
      setItem(null);
      return;
    }

    const interval = setInterval(() => {
      const text = MEME_BARRAGE[Math.floor(Math.random() * MEME_BARRAGE.length)];
      const newItem: DanmakuItem = {
        id: Date.now() + Math.random(),
        text,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speedSec: 4.8
      };

      setItem(newItem);
    }, 5200);

    return () => clearInterval(interval);
  }, [enabled]);

  // 当发生新事件时，有概率触发应景弹幕
  useEffect(() => {
    if (!enabled || !latestEventText) return;

    let reactionText = '';
    if (latestEventText.includes('华莱士')) {
      reactionText = '🚨 突发！华莱士喷射倒计时！';
    } else if (latestEventText.includes('高考') || latestEventText.includes('志愿')) {
      reactionText = '🎓 宇宙的尽头果然是考公！';
    } else if (latestEventText.includes('猫') || latestEventText.includes('狗')) {
      reactionText = '🐾 动物道大军发来贺电！';
    } else if (latestEventText.includes('老板') || latestEventText.includes('加班')) {
      reactionText = '⚠️ 拒绝PUA，整顿职场立大功！';
    } else if (latestEventText.includes('成仙') || latestEventText.includes('飞升')) {
      reactionText = '⚡ 全体起立！恭迎仙尊归位！';
    }

    if (reactionText) {
      const reactionItem: DanmakuItem = {
        id: Date.now(),
        text: reactionText,
        color: 'text-amber-400 font-extrabold',
        speedSec: 4.8
      };
      setItem(reactionItem);
    }
  }, [enabled, latestEventText]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-x-0 top-3 h-7 pointer-events-none z-30 overflow-hidden" aria-live="polite">
      {item && (
        <div
          key={item.id}
          className={`absolute top-0 whitespace-nowrap text-xs sm:text-sm font-bold opacity-90 select-none ${item.color}`}
          style={{
            right: '-100%',
            animation: `danmakuMove ${item.speedSec}s linear forwards`,
            textShadow: '0 1px 4px rgba(0,0,0,0.9)'
          }}
          onAnimationEnd={() => setItem((current) => current?.id === item.id ? null : current)}
        >
          {item.text}
        </div>
      )}

      <style>{`
        @keyframes danmakuMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-160vw);
          }
        }
      `}</style>
    </div>
  );
};
