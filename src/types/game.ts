// 投胎模拟器类型定义

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export type Realm = 'human' | 'animal' | 'fantasy';

export interface Attributes {
  beauty: number;       // 颜值 / 容貌
  intelligence: number; // 智力 / 悟性
  strength: number;     // 体魄 / 健康
  money: number;        // 家境 / 财力
  karma: number;        // 功德 / 福报
  luck: number;         // 气运 / 机缘
}

export type AttributeKey = keyof Attributes;

export interface Talent {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  cost?: number; // 功德商店购买或先天需求
  effect?: {
    stats?: Partial<Attributes>;
    exclusiveWith?: string[]; // 互斥天赋
    specialTag?: 'immortal' | 'cyber' | 'animal' | 'rich' | 'luck' | 'unlucky' | 'meme';
  };
}

export interface BirthLocation {
  id: string;
  name: string;
  flag: string;
  continent: string;
  probability: number; // 投胎概率权重
  difficulty: '地狱' | '困难' | '普通' | '简单' | '极乐';
  description: string;
  buffs: Partial<Attributes>;
  realm?: Realm[];
}

export interface FamilyBackground {
  id: string;
  title: string;
  icon: string;
  probability: number;
  statModifiers: Partial<Attributes>;
  description: string;
  realm?: Realm[];
}

export interface AnimalSpecies {
  id: string;
  name: string;
  icon: string;
  rarity: Rarity;
  description: string;
  maxAge: number;
  probability: number;
  initialBuffs: Partial<Attributes>;
  specialTrait: string;
}

export interface ChoiceOption {
  label: string;
  outcomeText: string;
  effects?: {
    statChanges?: Partial<Attributes>;
    isDeath?: boolean;
    deathReason?: string;
    achievementId?: string;
  };
}

export interface InteractiveChoice {
  id: string;
  title: string;
  dilemma: string;
  options: ChoiceOption[];
}

export interface LifeEvent {
  id: string;
  ageMin: number;
  ageMax: number;
  content: string;
  realm?: Realm[];
  conditions?: {
    minStats?: Partial<Attributes>;
    maxStats?: Partial<Attributes>;
    requiredTalents?: string[];
    excludeTalents?: string[];
    locationIds?: string[];
    animalIds?: string[];
    gender?: 'male' | 'female';
  };
  effects?: {
    statChanges?: Partial<Attributes>;
    isDeath?: boolean;
    deathReason?: string;
    achievementId?: string;
    specialUnlock?: string;
  };
  choice?: InteractiveChoice; // 关键人生命运岔路抉择
  weight?: number; // 触发概率权重 (默认 10)
}

export interface YearLog {
  age: number;
  text: string;
  statChanges?: Partial<Attributes>;
  isMilestone?: boolean;
  highlightColor?: string;
  tags?: string[];
  choiceMade?: {
    title: string;
    chosen: string;
    outcome: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: Rarity;
  unlockedAt?: number;
  karmaReward: number;
}

export type GamePhase =
  | 'welcome'           // 阎王殿大厅
  | 'talent_selection'  // 天赋十连抽
  | 'attribute_alloc'   // 属性加点
  | 'birth_roll'        // 投胎大转盘
  | 'simulating'        // 人生推演中
  | 'settlement';       // 结算轮回

export interface GameRecord {
  id: string;
  timestamp: number;
  realm: Realm;
  finalAge: number;
  deathReason: string;
  location: BirthLocation;
  family: FamilyBackground;
  animalSpecies?: AnimalSpecies;
  talents: Talent[];
  finalAttributes: Attributes;
  score: number;
  rating: 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
  epitaph: string;
  achievementsUnlocked: string[];
  karmaEarned: number;
}

export interface PlayerProfile {
  totalReincarnations: number;
  karmaBalance: number; // 当前可用功德
  totalKarmaEarned: number;
  unlockedAchievements: string[]; // id 列表
  highestAge: number;
  bestRating: string;
  history: GameRecord[];
}
