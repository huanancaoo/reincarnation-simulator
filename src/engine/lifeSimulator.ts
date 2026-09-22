import {
  AnimalSpecies,
  Attributes,
  BirthLocation,
  FamilyBackground,
  GameRecord,
  InteractiveChoice,
  LifeEvent,
  Realm,
  Talent,
  YearLog
} from '../types/game';
import { LIFE_EVENTS } from '../data/events';
import { ANIMAL_SPECIES } from '../data/animals';

export class LifeSimulatorEngine {
  /**
   * 从天赋池中随机抽取 N 个天赋（带稀有度保底机制）
   */
  static drawTalents(pool: Talent[], count: number = 10, karmaBuff: number = 0): Talent[] {
    const shuffled = [...pool];
    
    // 功德越高，高级天赋概率权重越大
    const weightedPool = shuffled.map((talent) => {
      let weight = 10;
      if (talent.rarity === 'mythic') weight = 1 + Math.floor(karmaBuff / 50);
      else if (talent.rarity === 'legendary') weight = 4 + Math.floor(karmaBuff / 30);
      else if (talent.rarity === 'epic') weight = 12 + Math.floor(karmaBuff / 15);
      else if (talent.rarity === 'rare') weight = 30;
      else weight = 50;

      return { talent, weight };
    });

    const results: Talent[] = [];
    const usedIds = new Set<string>();

    while (results.length < count && results.length < pool.length) {
      const totalWeight = weightedPool
        .filter((item) => !usedIds.has(item.talent.id))
        .reduce((sum, item) => sum + item.weight, 0);

      let randomVal = Math.random() * totalWeight;
      for (const item of weightedPool) {
        if (usedIds.has(item.talent.id)) continue;
        randomVal -= item.weight;
        if (randomVal <= 0) {
          results.push(item.talent);
          usedIds.add(item.talent.id);
          break;
        }
      }
    }

    return results;
  }

  /**
   * 抽取出生地点（根据概率权重）
   */
  static rollBirthLocation(locations: BirthLocation[]): BirthLocation {
    const totalWeight = locations.reduce((sum, loc) => sum + loc.probability, 0);
    let rand = Math.random() * totalWeight;
    for (const loc of locations) {
      rand -= loc.probability;
      if (rand <= 0) return loc;
    }
    return locations[0];
  }

  /**
   * 抽取家庭背景（根据概率权重）
   */
  static rollFamilyBackground(families: FamilyBackground[]): FamilyBackground {
    const totalWeight = families.reduce((sum, fam) => sum + fam.probability, 0);
    let rand = Math.random() * totalWeight;
    for (const fam of families) {
      rand -= fam.probability;
      if (rand <= 0) return fam;
    }
    return families[0];
  }

  /**
   * 抽取畜生道动物物种
   */
  static rollAnimalSpecies(): AnimalSpecies {
    const totalWeight = ANIMAL_SPECIES.reduce((sum, item) => sum + item.probability, 0);
    let rand = Math.random() * totalWeight;
    for (const item of ANIMAL_SPECIES) {
      rand -= item.probability;
      if (rand <= 0) return item;
    }
    return ANIMAL_SPECIES[0];
  }

  /**
   * 计算融合了加点、天赋、道途、出生地与家庭修正后的初始属性
   */
  static calculateInitialStats(
    allocated: Attributes,
    talents: Talent[],
    location: BirthLocation,
    family: FamilyBackground,
    animalSpecies?: AnimalSpecies
  ): Attributes {
    const finalStats: Attributes = { ...allocated };

    // 叠加天赋属性
    talents.forEach((t) => {
      if (t.effect?.stats) {
        Object.entries(t.effect.stats).forEach(([k, val]) => {
          const key = k as keyof Attributes;
          finalStats[key] = (finalStats[key] || 0) + (val || 0);
        });
      }
    });

    // 叠加出生地 buff
    Object.entries(location.buffs).forEach(([k, val]) => {
      const key = k as keyof Attributes;
      finalStats[key] = (finalStats[key] || 0) + (val || 0);
    });

    // 叠加家庭背景 modifier (若为人类)
    if (!animalSpecies) {
      Object.entries(family.statModifiers).forEach(([k, val]) => {
        const key = k as keyof Attributes;
        finalStats[key] = (finalStats[key] || 0) + (val || 0);
      });
    } else {
      // 动物道物种特质修正
      Object.entries(animalSpecies.initialBuffs).forEach(([k, val]) => {
        const key = k as keyof Attributes;
        finalStats[key] = (finalStats[key] || 0) + (val || 0);
      });
    }

    // 属性保底不得低于 0
    (Object.keys(finalStats) as Array<keyof Attributes>).forEach((k) => {
      if (finalStats[k] < 0) finalStats[k] = 0;
    });

    return finalStats;
  }

  /**
   * 匹配当年符合条件的所有候选事件
   */
  static getEligibleEvents(
    age: number,
    stats: Attributes,
    talents: Talent[],
    location: BirthLocation,
    historyEventIds: Set<string>,
    realm: Realm = 'human',
    animalSpecies?: AnimalSpecies
  ): LifeEvent[] {
    const talentIds = new Set(talents.map((t) => t.id));

    return LIFE_EVENTS.filter((ev) => {
      // 已经触发过的非通用事件不再重复
      if (historyEventIds.has(ev.id)) return false;

      // 道途匹配
      if (ev.realm && !ev.realm.includes(realm)) {
        return false;
      }

      // 年龄区间校验
      if (age < ev.ageMin || age > ev.ageMax) return false;

      // 条件校验
      if (ev.conditions) {
        const { minStats, maxStats, requiredTalents, excludeTalents, locationIds, animalIds } = ev.conditions;

        if (requiredTalents && !requiredTalents.every((tid) => talentIds.has(tid))) {
          return false;
        }

        if (excludeTalents && excludeTalents.some((tid) => talentIds.has(tid))) {
          return false;
        }

        if (locationIds && !locationIds.includes(location.id)) {
          return false;
        }

        if (animalIds && (!animalSpecies || !animalIds.includes(animalSpecies.id))) {
          return false;
        }

        if (minStats) {
          for (const [k, v] of Object.entries(minStats)) {
            if ((stats[k as keyof Attributes] || 0) < (v || 0)) return false;
          }
        }

        if (maxStats) {
          for (const [k, v] of Object.entries(maxStats)) {
            if ((stats[k as keyof Attributes] || 0) > (v || 0)) return false;
          }
        }
      }

      return true;
    });
  }

  /**
   * 演化单一年份
   */
  static simulateYear(
    age: number,
    currentStats: Attributes,
    talents: Talent[],
    location: BirthLocation,
    _family: FamilyBackground,
    historyEventIds: Set<string>,
    realm: Realm = 'human',
    animalSpecies?: AnimalSpecies
  ): {
    log: YearLog;
    newStats: Attributes;
    isDead: boolean;
    deathReason?: string;
    achievementId?: string;
    pendingChoice?: InteractiveChoice;
  } {
    const newStats = { ...currentStats };
    const eligible = this.getEligibleEvents(age, newStats, talents, location, historyEventIds, realm, animalSpecies);

    let chosenEvent: LifeEvent | null = null;

    if (eligible.length > 0) {
      // 加权随机挑选一个事件
      const totalWeight = eligible.reduce((sum, ev) => sum + (ev.weight || 10), 0);
      let rand = Math.random() * totalWeight;
      for (const ev of eligible) {
        rand -= ev.weight || 10;
        if (rand <= 0) {
          chosenEvent = ev;
          break;
        }
      }
    }

    // 默认兜底事件文本
    let eventText = `${age} 岁：平平淡淡，安然度过了一岁春秋。`;
    if (!chosenEvent) {
      if (realm === 'animal' && animalSpecies) {
        const animalActions = [
          `${age} 岁：今天阳光甚好，你在领地里伸了个大大的懒腰，惬意地打了滚。`,
          `${age} 岁：饱餐一顿后进入深层梦乡，梦里满是美味与嬉戏。`,
          `${age} 岁：警惕地巡视了一圈自己的领地，一切安好无虞。`,
          `${age} 岁：静静地看着游客和自然四季交替，岁月静好。`
        ];
        eventText = animalActions[Math.floor(Math.random() * animalActions.length)];
      } else if (realm === 'fantasy') {
        const fantasyActions = [
          `${age} 岁：洞中方一日，世上已千年。你闭关苦修，体内真元滚滚如江河奔涌。`,
          `${age} 岁：在百草峰采得一株通灵仙芝，炼成一炉养气灵丹，修为精进。`,
          `${age} 岁：御剑巡游九霄云海，吞吐朝霞紫气，道心愈发通透澄澈。`,
          `${age} 岁：在藏经阁静心研读上古无字残碑，偶有所悟，周身隐现道韵仙光。`,
          `${age} 岁：下山游历人间斩妖除魔，护佑一方黎民，暗中累积了一份无上功德。`
        ];
        eventText = fantasyActions[Math.floor(Math.random() * fantasyActions.length)];
      }
    }
    let isDead = false;
    let deathReason = '';
    let achievementId: string | undefined;
    let statChanges: Partial<Attributes> | undefined;
    let pendingChoice: InteractiveChoice | undefined;

    if (chosenEvent) {
      historyEventIds.add(chosenEvent.id);
      eventText = `${age} 岁：${chosenEvent.content}`;

      // 若有互动抉择，直接抛出，等待玩家决策
      if (chosenEvent.choice) {
        pendingChoice = chosenEvent.choice;
      }

      if (chosenEvent.effects) {
        const { statChanges: changes, isDeath, deathReason: reason, achievementId: achId } = chosenEvent.effects;
        if (changes) {
          statChanges = changes;
          Object.entries(changes).forEach(([k, val]) => {
            const key = k as keyof Attributes;
            newStats[key] = Math.max(0, (newStats[key] || 0) + (val || 0));
          });
        }
        if (isDeath) {
          isDead = true;
          deathReason = reason || '意外离世';
        }
        if (achId) {
          achievementId = achId;
        }
      }
    }

    // 动物道自然寿命检查
    if (!isDead && realm === 'animal' && animalSpecies) {
      if (age >= animalSpecies.maxAge) {
        isDead = true;
        deathReason = `${animalSpecies.name}寿命已尽，圆满归西`;
      }
    }

    // 人类自然健康与衰老死亡概率
    if (!isDead && realm === 'human' && age >= 65) {
      const baseDeathChance = Math.max(0.02, (age - 60) * 0.02 - (newStats.strength * 0.005));
      if (Math.random() < baseDeathChance) {
        isDead = true;
        deathReason = age >= 85 ? '高寿安详辞世，寿终正寝' : '因年迈并发症不幸病逝';
      }
    }

    // 极高寿限（120岁以上强制圆满飞升或离世）
    if (!isDead && realm === 'human' && age >= 120) {
      isDead = true;
      deathReason = '跨越两个甲子，功德圆满归位天界';
    }

    // 异界修仙道自然寿元与飞升/坐化检查
    if (!isDead && realm === 'fantasy') {
      // 150岁以后有概率渡劫飞升
      if (age >= 150) {
        const ascendChance = Math.min(0.25, (age - 140) * 0.03 + (newStats.strength + newStats.intelligence) * 0.005);
        if (Math.random() < ascendChance) {
          isDead = true;
          deathReason = '度尽万重九九天劫，白日飞升三十三重天，位列仙班！';
          achievementId = 'ach_immortal_ascend';
        }
      }
      // 寿元上限（200岁强制坐化或飞升）
      if (!isDead && age >= 200) {
        isDead = true;
        deathReason = newStats.strength >= 15 ? '九重大乘天劫已过，白日飞升位列仙班' : '大限已至，天人五衰，于洞府含笑坐化归墟';
        if (newStats.strength >= 15) {
          achievementId = 'ach_immortal_ascend';
        }
      }
    }

    return {
      log: {
        age,
        text: eventText,
        statChanges,
        isMilestone: isDead || !!chosenEvent?.effects?.achievementId || !!pendingChoice
      },
      newStats,
      isDead,
      deathReason,
      achievementId,
      pendingChoice
    };
  }

  /**
   * 结算玩家在「命运岔路口」的选择
   */
  static resolveChoice(
    choice: InteractiveChoice,
    optionIndex: number,
    currentStats: Attributes,
    age: number
  ): {
    log: YearLog;
    newStats: Attributes;
    isDead: boolean;
    deathReason?: string;
    achievementId?: string;
  } {
    const opt = choice.options[optionIndex] || choice.options[0];
    const newStats = { ...currentStats };
    let isDead = false;
    let deathReason = '';
    let achievementId: string | undefined;

    if (opt.effects) {
      if (opt.effects.statChanges) {
        Object.entries(opt.effects.statChanges).forEach(([k, val]) => {
          const key = k as keyof Attributes;
          newStats[key] = Math.max(0, (newStats[key] || 0) + (val || 0));
        });
      }
      if (opt.effects.isDeath) {
        isDead = true;
        deathReason = opt.effects.deathReason || '抉择导致命丧黄泉';
      }
      if (opt.effects.achievementId) {
        achievementId = opt.effects.achievementId;
      }
    }

    const log: YearLog = {
      age,
      text: `${age} 岁【抉择结果】：${opt.outcomeText}`,
      statChanges: opt.effects?.statChanges,
      isMilestone: true,
      choiceMade: {
        title: choice.title,
        chosen: opt.label,
        outcome: opt.outcomeText
      }
    };

    return {
      log,
      newStats,
      isDead,
      deathReason,
      achievementId
    };
  }

  /**
   * 结算人生
   */
  static calculateSettlement(
    finalAge: number,
    deathReason: string,
    finalStats: Attributes,
    talents: Talent[],
    location: BirthLocation,
    family: FamilyBackground,
    unlockedAchievements: string[],
    realm: Realm = 'human',
    animalSpecies?: AnimalSpecies
  ): GameRecord {
    // 综合评分计算公式
    const statSum =
      finalStats.beauty * 1.5 +
      finalStats.intelligence * 2.0 +
      finalStats.strength * 1.8 +
      finalStats.money * 1.5 +
      finalStats.karma * 2.5 +
      finalStats.luck * 1.5;

    const ageMultiplier = realm === 'animal' ? 10 : 2;
    const score = Math.round(statSum * 2 + finalAge * ageMultiplier);

    // 评级划分
    let rating: GameRecord['rating'] = 'C';
    if (score >= 400) rating = 'SSS';
    else if (score >= 320) rating = 'SS';
    else if (score >= 250) rating = 'S';
    else if (score >= 180) rating = 'A';
    else if (score >= 120) rating = 'B';
    else if (score >= 60) rating = 'C';
    else if (finalAge < 3 && realm === 'human') rating = 'F';
    else rating = 'D';

    // 功德获取结算（评分 + 寿命 + 成就奖励）
    const karmaEarned = Math.max(10, Math.round(score / 5) + Math.round(finalStats.karma * 2));

    // 生成个性化墓志铭
    const epitaph = this.generateEpitaph(finalAge, deathReason, rating, finalStats, realm, animalSpecies);

    return {
      id: 'rec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: Date.now(),
      realm,
      animalSpecies,
      finalAge,
      deathReason,
      location,
      family,
      talents,
      finalAttributes: finalStats,
      score,
      rating,
      epitaph,
      achievementsUnlocked: unlockedAchievements,
      karmaEarned
    };
  }

  /**
   * 生成个性化墓志铭
   */
  static generateEpitaph(
    age: number,
    deathReason: string,
    rating: string,
    stats: Attributes,
    realm: Realm = 'human',
    animalSpecies?: AnimalSpecies
  ): string {
    if (realm === 'animal' && animalSpecies) {
      if (animalSpecies.id === 'animal_panda') {
        return `【国宝天花板】享年 ${age} 岁。终生吃嫩笋、抱大腿、被全世界人类宠上天，达成熊生大圆满！`;
      }
      if (animalSpecies.id === 'animal_chicken_speedrun') {
        return `【极速成仁】享年 ${age} 岁。28天极速出栏，以喷香的脆皮烧鸡之躯造福人间，光速重开真英雄！`;
      }
      if (animalSpecies.id === 'animal_capybara') {
        return `【豚门佛尊】享年 ${age} 岁。一生情绪极其稳定，头顶橘子看破红尘，受万物生灵敬仰。`;
      }
      if (animalSpecies.id === 'animal_husky') {
        return `【拆迁办传奇】享年 ${age} 岁。一生拆毁沙发三十套、羽绒服八百件，让主人又爱又恨的哈士奇战神。`;
      }
      return `【萌宠归天】享年 ${age} 岁。作为一只快乐的${animalSpecies.name}，给世间留下了无数欢声笑语。`;
    }

    if (realm === 'fantasy') {
      if (deathReason.includes('飞升') || deathReason.includes('仙班')) {
        return `【羽化登仙】享年 ${age} 岁。褪去凡胎肉身，白日飞升，于太虚仙域得证大道，与天地同寿！`;
      }
      if (deathReason.includes('坐化')) {
        return `【得道真修】享年 ${age} 岁。参悟天地造化数百载，终悟无上大道，含笑羽化坐化归墟。`;
      }
      return `【修真豪杰】享年 ${age} 岁（${deathReason}）。仗剑三千界，快意恩仇，修真界永远流传着你的神话传说。`;
    }

    if (deathReason.includes('飞升')) {
      return `【羽化登仙】享年 ${age} 岁。褪去凡胎肉身，白日飞升，于太虚仙域得证大道！`;
    }
    if (deathReason.includes('永生')) {
      return `【数字真神】享年 ${age} 岁。意识跃迁行星网络，于数据星海中获得不朽！`;
    }
    if (rating === 'SSS') {
      return `【天人之姿·一代传奇】享年 ${age} 岁。功德无量，震烁古今，虽因“${deathReason}”离开人间，声名与浩气永存！`;
    }
    if (stats.intelligence >= 15) {
      return `【智者不惑】享年 ${age} 岁。生前深研万物奥理，以思想与智慧点亮了人间的黑夜。`;
    }
    if (stats.money >= 15) {
      return `【千金散尽】享年 ${age} 岁。商海翻江倒海，富可敌国，挥手之间风起云涌。`;
    }
    if (age < 12) {
      return `【春花未绽】享年 ${age} 岁。因“${deathReason}”如流星掠过长夜，留下一抹纯真的温柔。`;
    }
    if (age >= 90) {
      return `【仁者高寿】享年 ${age} 岁。期颐长乐，阅尽人世沧桑百年，平静如水，含笑归真。`;
    }
    return `【平凡而珍贵的一生】享年 ${age} 岁（${deathReason}）。尝遍人间烟火百味，悲欢离合尽在其中，不虚此行。`;
  }
}
