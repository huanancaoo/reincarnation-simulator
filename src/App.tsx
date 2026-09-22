import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { AnimalSpecies, Attributes, BirthLocation, FamilyBackground, GamePhase, GameRecord, InteractiveChoice, PlayerProfile, Realm, Talent, YearLog } from './types/game';
import { TALENTS_POOL } from './data/talents';
import {
  ALL_BIRTH_LOCATIONS,
  ALL_FAMILY_BACKGROUNDS,
  getLocationsByRealm,
  getFamiliesByRealm
} from './data/locations';
import { ANIMAL_SPECIES } from './data/animals';
import { LifeSimulatorEngine } from './engine/lifeSimulator';
import { soundManager } from './utils/audio';
import { storage } from './utils/storage';

import { Header } from './components/Header';
import { TalentSelect } from './components/TalentSelect';
import { AttributeAllocate } from './components/AttributeAllocate';
import { BirthSlotMachine } from './components/BirthSlotMachine';
import { LifeStream } from './components/LifeStream';
import { LifeSummaryModal } from './components/LifeSummaryModal';
import { AchievementGallery } from './components/AchievementGallery';
import { CyberWoodFish } from './components/CyberWoodFish';
import { DanmakuOverlay } from './components/DanmakuOverlay';

import { Award, Play } from 'lucide-react';

export const App: React.FC = () => {
  // 玩家档案与持久化数据
  const [profile, setProfile] = useState<PlayerProfile>(() => storage.getProfile());

  // 游戏流程状态机与道途选择
  const [phase, setPhase] = useState<GamePhase>('welcome');
  const [realm, setRealm] = useState<Realm>('human');

  // 天赋与属性状态
  const [drawnTalents, setDrawnTalents] = useState<Talent[]>([]);
  const [selectedTalents, setSelectedTalents] = useState<Talent[]>([]);
  const [allocatedAttributes, setAllocatedAttributes] = useState<Attributes>({
    beauty: 4,
    intelligence: 4,
    strength: 4,
    money: 4,
    karma: 0,
    luck: 4
  });
  const [availablePoints, setAvailablePoints] = useState<number>(0);

  const [currentLocation, setCurrentLocation] = useState<BirthLocation>(() => getLocationsByRealm('human')[0]);
  const [currentFamily, setCurrentFamily] = useState<FamilyBackground>(() => getFamiliesByRealm('human')[3] || getFamiliesByRealm('human')[0]);
  const [currentAnimal, setCurrentAnimal] = useState<AnimalSpecies | undefined>(ANIMAL_SPECIES[0]);

  // 人生演化状态
  const [currentAge, setCurrentAge] = useState<number>(0);
  const [currentStats, setCurrentStats] = useState<Attributes>({
    beauty: 0,
    intelligence: 0,
    strength: 0,
    money: 0,
    karma: 0,
    luck: 0
  });
  const [logs, setLogs] = useState<YearLog[]>([]);
  const [isDead, setIsDead] = useState<boolean>(false);
  const [deathReason, setDeathReason] = useState<string>('');
  const [historyEventIds, setHistoryEventIds] = useState<Set<string>>(new Set());
  const [unlockedThisRun, setUnlockedThisRun] = useState<string[]>([]);
  const [pendingChoice, setPendingChoice] = useState<InteractiveChoice | undefined>(undefined);

  // 播放控制与特色工具
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(400);
  const [danmakuEnabled, setDanmakuEnabled] = useState<boolean>(true);
  const [showWoodFish, setShowWoodFish] = useState<boolean>(false);

  // 模态弹窗控制
  const [currentRecord, setCurrentRecord] = useState<GameRecord | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState<boolean>(false);

  // 自动播放 Timer Ref
  const timerRef = useRef<number | null>(null);

  // 初始化一次投胎抽卡
  const startNewReincarnation = () => {
    soundManager.playGong();
    soundManager.playClick();
    const newPool = LifeSimulatorEngine.drawTalents(TALENTS_POOL, 10, profile.karmaBalance);
    setDrawnTalents(newPool);
    setSelectedTalents([]);
    setAllocatedAttributes({
      beauty: 4,
      intelligence: 4,
      strength: 4,
      money: 4,
      karma: 0,
      luck: 4
    });
    setAvailablePoints(0);
    setPendingChoice(undefined);
    setPhase('talent_selection');
  };

  // 重新抽取十连天赋
  const handleRerollTalents = () => {
    const newPool = LifeSimulatorEngine.drawTalents(TALENTS_POOL, 10, profile.karmaBalance);
    setDrawnTalents(newPool);
    setSelectedTalents([]);
  };

  // 切换选中天赋
  const handleToggleTalent = (talent: Talent) => {
    if (selectedTalents.some((t) => t.id === talent.id)) {
      setSelectedTalents((prev) => prev.filter((t) => t.id !== talent.id));
    } else if (selectedTalents.length < 3) {
      setSelectedTalents((prev) => [...prev, talent]);
    }
  };

  // 天赋选定确认 -> 属性加点
  const handleConfirmTalents = () => {
    setPhase('attribute_alloc');
  };

  // 属性分配完成 -> 摇号投胎
  const handleConfirmAttributes = () => {
    rollBirth(realm);
    setPhase('birth_roll');
  };

  // 投胎大转盘摇号
  const rollBirth = (targetRealm: Realm = realm) => {
    const realmLocations = getLocationsByRealm(targetRealm);
    const realmFamilies = getFamiliesByRealm(targetRealm);
    const loc = LifeSimulatorEngine.rollBirthLocation(realmLocations);
    // 动物道的出生信息由物种承担，没有家庭背景候选项；保留最近有效背景，避免切换道途时写入空值。
    const fam = targetRealm === 'animal'
      ? currentFamily
      : LifeSimulatorEngine.rollFamilyBackground(realmFamilies);
    const anim = LifeSimulatorEngine.rollAnimalSpecies();
    setCurrentLocation(loc);
    setCurrentFamily(fam);
    setCurrentAnimal(anim);
  };

  // 计算当前最终合成属性
  const calculateFinalStats = () => {
    return LifeSimulatorEngine.calculateInitialStats(
      allocatedAttributes,
      selectedTalents,
      currentLocation,
      currentFamily,
      realm === 'animal' ? currentAnimal : undefined
    );
  };

  // 增加功德（木鱼等途径）
  const handleAddKarma = (amount: number) => {
    const updated: PlayerProfile = {
      ...profile,
      karmaBalance: profile.karmaBalance + amount,
      totalKarmaEarned: profile.totalKarmaEarned + amount
    };
    setProfile(updated);
    storage.saveProfile(updated);
  };

  // 开启人生演化
  const handleStartLife = () => {
    const initialStats = calculateFinalStats();
    setCurrentStats(initialStats);
    setCurrentAge(0);
    setIsDead(false);
    setDeathReason('');
    setLogs([]);
    setHistoryEventIds(new Set());
    setUnlockedThisRun([]);
    setPendingChoice(undefined);
    setIsAutoPlaying(true);
    setPhase('simulating');

    // 0 岁事件直接触发
    const res = LifeSimulatorEngine.simulateYear(
      0,
      initialStats,
      selectedTalents,
      currentLocation,
      currentFamily,
      new Set(),
      realm,
      realm === 'animal' ? currentAnimal : undefined
    );

    setLogs([res.log]);
    setCurrentStats(res.newStats);
    if (res.pendingChoice) {
      setPendingChoice(res.pendingChoice);
      setIsAutoPlaying(false);
    }
    if (res.isDead) {
      setIsDead(true);
      setDeathReason(res.deathReason || '夭折');
    }
    if (res.achievementId) {
      setUnlockedThisRun([res.achievementId]);
    }
  };

  // 单步推进下一年
  const stepNextYear = () => {
    if (isDead || pendingChoice) return;

    const nextAge = currentAge + 1;
    const historySet = new Set(historyEventIds);

    const res = LifeSimulatorEngine.simulateYear(
      nextAge,
      currentStats,
      selectedTalents,
      currentLocation,
      currentFamily,
      historySet,
      realm,
      realm === 'animal' ? currentAnimal : undefined
    );

    setCurrentAge(nextAge);
    setCurrentStats(res.newStats);
    setLogs((prev) => [...prev, res.log]);
    setHistoryEventIds(historySet);

    if (res.achievementId && !unlockedThisRun.includes(res.achievementId)) {
      setUnlockedThisRun((prev) => [...prev, res.achievementId!]);
      soundManager.playAchievementUnlock();
    }

    // 若触发了关键岔路口抉择，立刻暂停自动播放等待玩家决定
    if (res.pendingChoice) {
      setPendingChoice(res.pendingChoice);
      setIsAutoPlaying(false);
      soundManager.playChoicePrompt();
    }

    if (res.isDead) {
      setIsDead(true);
      setIsAutoPlaying(false);
      setDeathReason(res.deathReason || '寿终正寝');
      soundManager.playDeathBell();

      // 执行结算
      const record = LifeSimulatorEngine.calculateSettlement(
        nextAge,
        res.deathReason || '寿终正寝',
        res.newStats,
        selectedTalents,
        currentLocation,
        currentFamily,
        res.achievementId
          ? Array.from(new Set([...unlockedThisRun, res.achievementId]))
          : unlockedThisRun,
        realm,
        realm === 'animal' ? currentAnimal : undefined
      );

      setCurrentRecord(record);
      const updatedProfile = storage.addGameRecord(record);
      setProfile(updatedProfile);
    }
  };

  // 解决玩家在岔路口做出的抉择
  const handleResolveChoice = (optionIndex: number) => {
    if (!pendingChoice) return;

    const res = LifeSimulatorEngine.resolveChoice(
      pendingChoice,
      optionIndex,
      currentStats,
      currentAge
    );

    setLogs((prev) => [...prev, res.log]);
    setCurrentStats(res.newStats);
    setPendingChoice(undefined);

    if (res.achievementId && !unlockedThisRun.includes(res.achievementId)) {
      setUnlockedThisRun((prev) => [...prev, res.achievementId!]);
      soundManager.playAchievementUnlock();
    }

    if (res.isDead) {
      setIsDead(true);
      setIsAutoPlaying(false);
      setDeathReason(res.deathReason || '抉择意外离世');
      soundManager.playDeathBell();

      const record = LifeSimulatorEngine.calculateSettlement(
        currentAge,
        res.deathReason || '抉择意外离世',
        res.newStats,
        selectedTalents,
        currentLocation,
        currentFamily,
        res.achievementId
          ? Array.from(new Set([...unlockedThisRun, res.achievementId]))
          : unlockedThisRun,
        realm,
        realm === 'animal' ? currentAnimal : undefined
      );

      setCurrentRecord(record);
      const updatedProfile = storage.addGameRecord(record);
      setProfile(updatedProfile);
    } else {
      // 抉择完毕，恢复自动播放
      setIsAutoPlaying(true);
    }
  };

  // 瞬间推演到终局
  const fastForwardToEnd = () => {
    if (isDead) return;
    setIsAutoPlaying(false);

    let age = currentAge;
    let stats = { ...currentStats };
    let dead = false;
    let reason = '';
    const newLogs: YearLog[] = [];
    const historySet = new Set(historyEventIds);
    const achievements = [...unlockedThisRun];

    // 若当前有未决的选项，先默认选择第一项
    if (pendingChoice) {
      const choiceRes = LifeSimulatorEngine.resolveChoice(pendingChoice, 0, stats, age);
      stats = choiceRes.newStats;
      newLogs.push(choiceRes.log);
      setPendingChoice(undefined);
      if (choiceRes.isDead) {
        dead = true;
        reason = choiceRes.deathReason || '抉择离世';
      }
    }

    const maxLifespan = realm === 'animal' && currentAnimal ? currentAnimal.maxAge : 130;

    while (!dead && age < maxLifespan) {
      age++;
      const res = LifeSimulatorEngine.simulateYear(
        age,
        stats,
        selectedTalents,
        currentLocation,
        currentFamily,
        historySet,
        realm,
        realm === 'animal' ? currentAnimal : undefined
      );
      stats = res.newStats;
      newLogs.push(res.log);

      if (res.pendingChoice) {
        const choiceRes = LifeSimulatorEngine.resolveChoice(res.pendingChoice, 0, stats, age);
        stats = choiceRes.newStats;
        newLogs.push(choiceRes.log);
        if (choiceRes.isDead) {
          dead = true;
          reason = choiceRes.deathReason || '抉择离世';
          break;
        }
      }

      if (res.achievementId && !achievements.includes(res.achievementId)) {
        achievements.push(res.achievementId);
      }

      if (res.isDead) {
        dead = true;
        reason = res.deathReason || '寿终正寝';
        break;
      }
    }

    // 若达到寿命上限自然离世
    if (!dead) {
      dead = true;
      reason = realm === 'animal' && currentAnimal ? `${currentAnimal.name}大限已至，安详归天` : '年逾百岁，德高望重寿终正寝';
    }

    setCurrentAge(age);
    setCurrentStats(stats);
    setLogs((prev) => [...prev, ...newLogs]);
    setIsDead(true);
    setDeathReason(reason);
    setUnlockedThisRun(achievements);
    if (achievements.length > unlockedThisRun.length) {
      soundManager.playAchievementUnlock();
    }
    soundManager.playDeathBell();

    const record = LifeSimulatorEngine.calculateSettlement(
      age,
      reason,
      stats,
      selectedTalents,
      currentLocation,
      currentFamily,
      achievements,
      realm,
      realm === 'animal' ? currentAnimal : undefined
    );

    setCurrentRecord(record);
    const updatedProfile = storage.addGameRecord(record);
    setProfile(updatedProfile);
    setShowSummaryModal(true);
  };

  // 自动播放生命推进循环
  useEffect(() => {
    if (phase === 'simulating' && isAutoPlaying && !isDead && !pendingChoice) {
      timerRef.current = window.setTimeout(() => {
        stepNextYear();
      }, speedMs);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [phase, isAutoPlaying, isDead, currentAge, speedMs, pendingChoice]);

  useLayoutEffect(() => {
    // 等待浏览器完成点击焦点带来的滚动锚定后再回顶，避免新步骤停留在上一页的滚动位置。
    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [phase]);

  return (
    <div className="min-h-screen flex flex-col ghost-ambient-bg text-slate-100 selection:bg-underworld-cinnabar selection:text-white relative overflow-hidden">
      {/* 实时地府吃瓜弹幕层 */}
      {phase === 'simulating' && (
        <DanmakuOverlay
          enabled={danmakuEnabled}
          latestEventText={logs[logs.length - 1]?.text}
        />
      )}

      {/* 顶部通栏导航 */}
      <Header
        karma={profile.karmaBalance}
        reincarnations={profile.totalReincarnations}
        danmakuEnabled={danmakuEnabled}
        onToggleDanmaku={() => setDanmakuEnabled((prev) => !prev)}
        onOpenWoodFish={() => setShowWoodFish(true)}
        onOpenAchievements={() => setShowAchievementsModal(true)}
        onResetToTitle={() => {
          soundManager.playClick();
          setIsAutoPlaying(false);
          setPendingChoice(undefined);
          setPhase('welcome');
        }}
      />

      {/* 主视图区域根据 Phase 切换 */}
      <main className="flex-1 flex flex-col justify-center items-center relative z-10 px-3 sm:px-6">
        {phase === 'welcome' && (
          <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 animate-item-entry text-center my-auto">
            {/* 顶徽：阎罗殿前横额 */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-underworld-900/90 text-underworld-ghost border border-underworld-ghost/50 text-xs sm:text-sm font-serif mb-5 shadow-glow-ghost-sm tracking-wider">
              <span>☯️ 幽冥教主地藏座下 · 阎罗天子第七殿 · 六道轮回司 ☯️</span>
            </div>

            {/* 大殿主牌匾 */}
            <h1 className="font-underworld font-black text-4xl sm:text-6xl md:text-7xl text-slate-100 tracking-[0.2em] leading-tight mb-4 text-glow-ghost select-none">
              投 胎 模 拟 器
            </h1>
            
            {/* 阎王殿对联古训 */}
            <div className="max-w-xl mx-auto mb-8 p-3 rounded-lg border border-underworld-700/60 bg-underworld-950/80 backdrop-blur-md">
              <p className="text-underworld-ghost font-serif text-xs sm:text-sm tracking-widest leading-relaxed">
                “ 生 死 有 命 · 因 果 自 承 · 莫 问 前 程 凶 吉 ”
              </p>
              <p className="text-slate-400 text-[11px] sm:text-xs mt-1 leading-relaxed">
                踏过黄泉路，登临望乡台，饮尽孟婆汤。这一世是去当躺平国宝大熊猫、拆迁哈士奇，还是在红尘俗世整顿职场，抑或渡劫飞升成仙？
              </p>
            </div>

            {/* 地府四道转生告示牒文 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8 text-left">
              <div className="p-3.5 rounded-xl talisman-box border-underworld-gold/40 hover:border-underworld-gold/80 transition-all shadow-[0_0_15px_rgba(243,202,82,0.1)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">🐾</span>
                  <span className="seal-stamp text-[9px] py-0 px-1 border-amber-500 text-amber-400">万灵道</span>
                </div>
                <h3 className="font-underworld font-bold text-sm text-amber-300 mb-1">
                  畜生道 · 披毛戴角
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  国宝大熊猫躺赢啃笋、水豚看破红尘头顶橘子、脆皮肉鸡28天光速出栏！
                </p>
              </div>

              <div className="p-3.5 rounded-xl talisman-box border-purple-500/40 hover:border-purple-500/80 transition-all shadow-[0_0_15px_rgba(157,78,221,0.1)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">⚡</span>
                  <span className="seal-stamp text-[9px] py-0 px-1 border-purple-400 text-purple-300">破界道</span>
                </div>
                <h3 className="font-underworld font-bold text-sm text-purple-300 mb-1">
                  异界道 · 仙魔修真
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  紫气东来混沌灵根，三十年河东退婚赘婿逆袭，九重大乘天劫白日飞升！
                </p>
              </div>

              <div className="p-3.5 rounded-xl talisman-box border-underworld-cinnabar/40 hover:border-underworld-cinnabar/80 transition-all shadow-[0_0_15px_rgba(255,42,75,0.1)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">🎯</span>
                  <span className="seal-stamp text-[9px] py-0 px-1">三生石</span>
                </div>
                <h3 className="font-underworld font-bold text-sm text-rose-300 mb-1">
                  三生石 · 命途抉择
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  考公还是烤淀粉肠？反手劳动仲裁还是发疯？人生关键岔路口，你亲自做主！
                </p>
              </div>

              <div className="p-3.5 rounded-xl talisman-box border-underworld-ghost/40 hover:border-underworld-ghost/80 transition-all shadow-[0_0_15px_rgba(13,245,177,0.1)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">🪵</span>
                  <span className="seal-stamp-ghost text-[9px] py-0 px-1">阴德池</span>
                </div>
                <h3 className="font-underworld font-bold text-sm text-underworld-ghost mb-1">
                  神木鱼 · 积功累德
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  狂敲赛博木鱼积攒功德，幽冥弹幕实时吐槽，更有机会抽取神品通天命格！
                </p>
              </div>
            </div>

            {/* 核心行动按钮：朱砂御令 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={startNewReincarnation}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-xl font-underworld font-black text-base sm:text-lg bg-gradient-to-r from-red-700 via-underworld-cinnabar to-red-800 text-white hover:brightness-110 shadow-glow-cinnabar hover:scale-105 transition-all flex items-center justify-center gap-2 border-2 border-red-400/80 tracking-widest group"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>踏上奈何桥 · 奉旨投胎</span>
                <span className="seal-stamp text-[10px] py-0 px-1 border-white/80 text-white bg-red-950/70 ml-1">
                  准予转生
                </span>
              </button>

              <button
                onClick={() => {
                  soundManager.playWoodFish();
                  setShowWoodFish(true);
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-serif text-sm bg-underworld-900/90 hover:bg-underworld-800 border border-underworld-gold/40 hover:border-underworld-gold text-underworld-gold transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(243,202,82,0.15)]"
              >
                <span>🪵 叩木鱼积阴德</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowAchievementsModal(true);
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-serif text-sm bg-underworld-900/90 hover:bg-underworld-800 border border-underworld-purple/40 hover:border-underworld-purple text-purple-300 transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-purple-400" />
                <span>功德图鉴 ({profile.unlockedAchievements.length} 卷)</span>
              </button>
            </div>

            {/* 历史生死簿战绩 */}
            {profile.totalReincarnations > 0 && (
              <div className="mt-8 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4 font-serif">
                <span>累计入六道: <span className="text-underworld-ghost font-mono font-bold">{profile.totalReincarnations}</span> 世</span>
                <span className="text-slate-600">|</span>
                <span>最高阳寿: <span className="text-amber-400 font-mono font-bold">{profile.highestAge}</span> 载</span>
                <span className="text-slate-600">|</span>
                <span>至高功德考评: <span className="text-underworld-cinnabar font-bold font-mono">{profile.bestRating}</span></span>
              </div>
            )}
          </div>
        )}

        {phase === 'talent_selection' && (
          <TalentSelect
            availableTalents={drawnTalents}
            selectedTalents={selectedTalents}
            onToggleTalent={handleToggleTalent}
            onReroll={handleRerollTalents}
            onConfirm={handleConfirmTalents}
          />
        )}

        {phase === 'attribute_alloc' && (
          <AttributeAllocate
            attributes={allocatedAttributes}
            availablePoints={availablePoints}
            selectedTalents={selectedTalents}
            onChange={(attrs, rem) => {
              setAllocatedAttributes(attrs);
              setAvailablePoints(rem);
            }}
            onBack={() => setPhase('talent_selection')}
            onConfirm={handleConfirmAttributes}
          />
        )}

        {phase === 'birth_roll' && (
          <BirthSlotMachine
            realm={realm}
            onSelectRealm={(r) => {
              setRealm(r);
              rollBirth(r);
            }}
            location={currentLocation}
            family={currentFamily}
            animalSpecies={currentAnimal}
            allLocations={ALL_BIRTH_LOCATIONS}
            allFamilies={ALL_FAMILY_BACKGROUNDS}
            allAnimals={ANIMAL_SPECIES}
            finalAttributes={calculateFinalStats()}
            selectedTalents={selectedTalents}
            onRoll={() => rollBirth(realm)}
            onStartLife={handleStartLife}
          />
        )}

        {phase === 'simulating' && (
          <LifeStream
            realm={realm}
            animalSpecies={currentAnimal}
            currentAge={currentAge}
            logs={logs}
            attributes={currentStats}
            location={currentLocation}
            family={currentFamily}
            talents={selectedTalents}
            isAutoPlaying={isAutoPlaying}
            speedMs={speedMs}
            isDead={isDead}
            deathReason={deathReason}
            pendingChoice={pendingChoice}
            onResolveChoice={handleResolveChoice}
            onToggleAutoPlay={() => setIsAutoPlaying((prev) => !prev)}
            onSetSpeed={(ms) => setSpeedMs(ms)}
            onNextYear={stepNextYear}
            onFastForwardToEnd={fastForwardToEnd}
            onOpenSettlement={() => setShowSummaryModal(true)}
          />
        )}
      </main>

      {/* 电子木鱼模态窗 */}
      <CyberWoodFish
        karma={profile.karmaBalance}
        onAddKarma={handleAddKarma}
        isOpen={showWoodFish}
        onClose={() => setShowWoodFish(false)}
      />

      {/* 结算弹窗 */}
      <LifeSummaryModal
        record={currentRecord}
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        onRestart={() => {
          setShowSummaryModal(false);
          startNewReincarnation();
        }}
      />

      {/* 成就图鉴弹窗 */}
      <AchievementGallery
        unlockedIds={profile.unlockedAchievements}
        isOpen={showAchievementsModal}
        onClose={() => setShowAchievementsModal(false)}
      />
    </div>
  );
};

export default App;
