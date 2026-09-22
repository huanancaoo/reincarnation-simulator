import React, { useState, useEffect } from 'react';
import { AnimalSpecies, Attributes, BirthLocation, FamilyBackground, Realm, Talent } from '../types/game';
import { soundManager } from '../utils/audio';
import { Dices, Play, Compass, Home, PawPrint, User, Zap, Castle, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthSlotMachineProps {
  realm: Realm;
  onSelectRealm: (realm: Realm) => void;
  location: BirthLocation;
  family: FamilyBackground;
  animalSpecies?: AnimalSpecies;
  allLocations: BirthLocation[];
  allFamilies: FamilyBackground[];
  allAnimals: AnimalSpecies[];
  finalAttributes: Attributes;
  selectedTalents: Talent[];
  onRoll: () => void;
  onStartLife: () => void;
}

export const BirthSlotMachine: React.FC<BirthSlotMachineProps> = ({
  realm,
  onSelectRealm,
  location,
  family,
  animalSpecies,
  allLocations,
  allFamilies,
  allAnimals,
  finalAttributes,
  selectedTalents,
  onRoll,
  onStartLife
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState<BirthLocation>(location);
  const [displayFamily, setDisplayFamily] = useState<FamilyBackground>(family);
  const [displayAnimal, setDisplayAnimal] = useState<AnimalSpecies | undefined>(animalSpecies);

  // 确保当前道途专属的地点与家庭背景候选池
  const eligibleLocations = allLocations.filter((l) => !l.realm || l.realm.includes(realm));
  const eligibleFamilies = allFamilies.filter((f) => !f.realm || f.realm.includes(realm));

  // 模拟老虎机摇奖滚动动效
  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    soundManager.playClick();

    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      soundManager.playSlotTick();

      const randLoc = eligibleLocations[Math.floor(Math.random() * eligibleLocations.length)] || allLocations[0];
      setDisplayLocation(randLoc);

      if (realm === 'animal') {
        const randAnim = allAnimals[Math.floor(Math.random() * allAnimals.length)];
        setDisplayAnimal(randAnim);
      } else {
        const randFam = eligibleFamilies[Math.floor(Math.random() * eligibleFamilies.length)] || allFamilies[0];
        setDisplayFamily(randFam);
      }

      if (counter >= 18) {
        clearInterval(interval);
        onRoll();
        setIsSpinning(false);
        soundManager.playRareChime();

        // 喷洒庆祝纸花
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 70);
  };

  useEffect(() => {
    setDisplayLocation(location);
    setDisplayFamily(family);
    setDisplayAnimal(animalSpecies);
  }, [location, family, animalSpecies]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 animate-item-entry">
      {/* 标题 */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-underworld-900/90 text-underworld-ghost border border-underworld-ghost/40 text-xs font-serif mb-2 shadow-glow-ghost-sm">
          <span>🎰 阎罗殿前第三勘 · 六道轮回摇号司</span>
        </div>
        <h2 className="font-underworld text-2xl sm:text-4xl font-black text-slate-100 tracking-wider">
          六道轮回盘 · 阴阳逆转随机降世
        </h2>
        <p className="text-slate-400 font-serif text-xs sm:text-sm mt-2">
          奈何桥畔阴风冽，三界六道任汝行。转动天机宝盘，定夺今生根苗洞天！
        </p>
      </div>

      {/* 六道轮回道途切换器 */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 mb-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onSelectRealm('human');
          }}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold flex items-center gap-1.5 border-2 transition-all ${
            realm === 'human'
              ? 'bg-underworld-ghost/15 border-underworld-ghost text-underworld-ghost shadow-glow-ghost-sm'
              : 'bg-underworld-900/80 border-underworld-700 text-slate-400 hover:text-slate-200 hover:border-underworld-600'
          }`}
        >
          <User className="w-4 h-4" />
          <span>【人道 · 红尘俗世】</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onSelectRealm('animal');
          }}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold flex items-center gap-1.5 border-2 transition-all ${
            realm === 'animal'
              ? 'bg-underworld-gold/15 border-underworld-gold text-underworld-gold shadow-glow-gold'
              : 'bg-underworld-900/80 border-underworld-700 text-slate-400 hover:text-slate-200 hover:border-underworld-600'
          }`}
        >
          <PawPrint className="w-4 h-4" />
          <span>【畜生道 · 万灵披毛 🐼】</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onSelectRealm('fantasy');
          }}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold flex items-center gap-1.5 border-2 transition-all ${
            realm === 'fantasy'
              ? 'bg-purple-900/30 border-purple-400 text-purple-300 shadow-glow-purple ring-1 ring-purple-400/40'
              : 'bg-underworld-900/80 border-underworld-700 text-slate-400 hover:text-slate-200 hover:border-underworld-600'
          }`}
        >
          <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>【异界道 · 仙魔破界 ⚡】</span>
        </button>
      </div>

      {/* 投胎摇奖机展台：古风法阵轮盘 */}
      <div className={`relative rounded-2xl border-2 p-5 sm:p-6 mb-6 transition-all duration-300 talisman-box shadow-diyu-panel ${
        realm === 'fantasy'
          ? 'border-purple-500/70 shadow-[0_0_35px_rgba(168,85,247,0.25)]'
          : realm === 'animal'
          ? 'border-underworld-gold/70 shadow-[0_0_35px_rgba(243,202,82,0.2)]'
          : 'border-underworld-ghost/60 shadow-[0_0_35px_rgba(13,245,177,0.2)]'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* 轮盘1：降生地域 */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                {realm === 'fantasy' ? <Castle className="w-3.5 h-3.5" /> : <Compass className="w-3.5 h-3.5" />}
                {realm === 'fantasy' ? '修真洞天 / 异界位面' : realm === 'animal' ? '栖息生境 / 保护区' : '降生地域'}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  displayLocation.difficulty === '极乐'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : displayLocation.difficulty === '地狱'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                难度: {displayLocation.difficulty}
              </span>
            </div>

            <div className="text-center py-3">
              <div className="text-5xl mb-2 select-none animate-bounce">
                {displayLocation.flag}
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-100">
                {displayLocation.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {displayLocation.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-700/60 text-[11px] text-slate-400 text-center">
              {realm === 'fantasy' ? '灵脉造化: ' : '地域特质: '}
              {formatBuffs(displayLocation.buffs)}
            </div>
          </div>

          {/* 轮盘2：根据道途展示家庭阶级 / 动物物种 / 仙门宗族 */}
          {realm === 'animal' && displayAnimal ? (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <PawPrint className="w-3.5 h-3.5" />
                  动物物种
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  {displayAnimal.rarity.toUpperCase()}
                </span>
              </div>

              <div className="text-center py-3">
                <div className="text-5xl mb-2 select-none">
                  {displayAnimal.icon}
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-amber-300">
                  {displayAnimal.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed line-clamp-2">
                  {displayAnimal.description}
                </p>
              </div>

              <div className="pt-2 border-t border-amber-500/30 text-[11px] text-amber-300/90 text-center font-medium">
                {displayAnimal.specialTrait}
              </div>
            </div>
          ) : (
            <div className={`p-4 rounded-xl border flex flex-col justify-between relative overflow-hidden ${
              realm === 'fantasy'
                ? 'bg-purple-950/25 border-purple-500/40'
                : 'bg-slate-800/80 border-slate-700/80'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold flex items-center gap-1 ${
                  realm === 'fantasy' ? 'text-purple-300' : 'text-amber-400'
                }`}>
                  {realm === 'fantasy' ? <Shield className="w-3.5 h-3.5" /> : <Home className="w-3.5 h-3.5" />}
                  {realm === 'fantasy' ? '仙门宗族 / 气运身世' : '家庭阶层'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-bold">
                  权重: {displayFamily.probability}%
                </span>
              </div>

              <div className="text-center py-3">
                <div className="text-5xl mb-2 select-none">
                  {displayFamily.icon}
                </div>
                <h3 className={`font-extrabold text-base sm:text-lg ${
                  realm === 'fantasy' ? 'text-purple-200' : 'text-slate-100'
                }`}>
                  {displayFamily.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed line-clamp-2">
                  {displayFamily.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-700/60 text-[11px] text-slate-400 text-center">
                {realm === 'fantasy' ? '宗族底蕴: ' : '家境修正: '}
                {formatBuffs(displayFamily.statModifiers)}
              </div>
            </div>
          )}
        </div>

        {/* 重新摇号按钮 */}
        <div className="text-center">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`px-6 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm border-2 transition-all inline-flex items-center gap-2 ${
              isSpinning
                ? 'bg-underworld-950 border-underworld-800 text-slate-600 cursor-not-allowed'
                : 'bg-underworld-900/90 hover:bg-underworld-850 border-underworld-gold/60 text-underworld-gold hover:border-underworld-gold hover:scale-105 shadow-[0_0_20px_rgba(243,202,82,0.2)]'
            }`}
          >
            <Dices className={`w-4 h-4 text-underworld-gold ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? '六道阴阳逆转中...' : '🎲 拨动天机 · 重新摇号！'}</span>
          </button>
        </div>

        {/* 携带命格速览 */}
        {selectedTalents.length > 0 && (
          <div className="mt-4 pt-3 border-t border-underworld-700/60 flex flex-wrap items-center justify-center gap-2 font-serif">
            <span className="text-xs text-underworld-gold">已奉定符令:</span>
            {selectedTalents.map((t) => (
              <span key={t.id} className="text-xs px-2.5 py-0.5 rounded bg-underworld-950 border border-underworld-gold/40 text-underworld-gold font-medium">
                ☯️ {t.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 最终合成总属性汇总 */}
      <div className="p-4 rounded-xl talisman-box border-underworld-700/80 mb-6">
        <h4 className="text-xs font-serif font-bold text-underworld-ghost uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span>📜</span>
            <span>先天造化 · 六维灵韵初成面板</span>
          </span>
          <span className="seal-stamp text-[9px] py-0 px-1">验核无误</span>
        </h4>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
          <StatBadge label="骨相皮囊" value={finalAttributes.beauty} />
          <StatBadge label="宿慧悟性" value={finalAttributes.intelligence} />
          <StatBadge label="气血根骨" value={finalAttributes.strength} />
          <StatBadge label="宿世福禄" value={finalAttributes.money} />
          <StatBadge label="阴骘功德" value={finalAttributes.karma} />
          <StatBadge label="天地命数" value={finalAttributes.luck} />
        </div>
      </div>

      {/* 开启人生大按钮 */}
      <div className="text-center">
        <button
          onClick={() => {
            soundManager.playGong();
            soundManager.playRareChime();
            onStartLife();
          }}
          disabled={isSpinning}
          className={`w-full sm:w-auto px-10 py-4 rounded-xl font-underworld font-black text-base sm:text-lg tracking-widest text-white hover:brightness-110 shadow-glow-cinnabar hover:scale-105 transition-all flex items-center justify-center gap-2.5 mx-auto border-2 ${
            realm === 'fantasy'
              ? 'bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-900 border-purple-400 shadow-glow-purple'
              : realm === 'animal'
              ? 'bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 border-amber-400 shadow-glow-gold'
              : 'bg-gradient-to-r from-red-800 via-underworld-cinnabar to-red-900 border-red-400 shadow-glow-cinnabar'
          }`}
        >
          <Play className="w-5 h-5 fill-current" />
          <span>
            {realm === 'animal'
              ? '🐾 纵身一跃 · 入畜生道成萌宠！'
              : realm === 'fantasy'
              ? '⚡ 破开虚空 · 入修仙界逆天改命！'
              : '🍶 饮尽孟婆汤 · 纵身入轮回！'}
          </span>
          <span className="seal-stamp text-[10px] py-0 px-1 bg-red-950 border-white/70 text-white ml-1">
            准入六道
          </span>
        </button>
      </div>
    </div>
  );
};

function StatBadge({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-2 rounded-lg bg-underworld-950/80 border border-underworld-700/60 shadow-sm">
      <div className="text-[11px] text-slate-400 font-serif">{label}</div>
      <div className="text-base font-extrabold text-underworld-ghost font-mono">{value}</div>
    </div>
  );
}

function formatBuffs(buffs: Partial<Attributes>): string {
  const entries = Object.entries(buffs);
  if (entries.length === 0) return '无额外增益';
  const nameMap: Record<string, string> = {
    beauty: '颜值',
    intelligence: '智力',
    strength: '体魄',
    money: '家境',
    karma: '功德',
    luck: '气运'
  };
  return entries
    .map(([k, v]) => `${nameMap[k] || k} ${(v || 0) > 0 ? `+${v}` : v}`)
    .join(', ');
}
