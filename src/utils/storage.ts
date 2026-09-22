import { GameRecord, PlayerProfile } from '../types/game';

const STORAGE_KEY = 'reincarnation_sim_profile_v1';

const DEFAULT_PROFILE: PlayerProfile = {
  totalReincarnations: 0,
  karmaBalance: 0,
  totalKarmaEarned: 0,
  unlockedAchievements: [],
  highestAge: 0,
  bestRating: 'F',
  history: []
};

export const storage = {
  getProfile(): PlayerProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return DEFAULT_PROFILE;
      return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: PlayerProfile) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  },

  addGameRecord(record: GameRecord): PlayerProfile {
    const profile = this.getProfile();
    const isNewBest = compareRating(record.rating, profile.bestRating);

    // 计算已解锁成就（避免重复）
    const newAchievements = new Set([
      ...profile.unlockedAchievements,
      ...record.achievementsUnlocked
    ]);

    const updated: PlayerProfile = {
      totalReincarnations: profile.totalReincarnations + 1,
      karmaBalance: profile.karmaBalance + record.karmaEarned,
      totalKarmaEarned: profile.totalKarmaEarned + record.karmaEarned,
      unlockedAchievements: Array.from(newAchievements),
      highestAge: Math.max(profile.highestAge, record.finalAge),
      bestRating: isNewBest ? record.rating : profile.bestRating,
      history: [record, ...profile.history].slice(0, 30) // 保留最近 30 条记录
    };

    this.saveProfile(updated);
    return updated;
  },

  spendKarma(amount: number): boolean {
    const profile = this.getProfile();
    if (profile.karmaBalance < amount) return false;
    profile.karmaBalance -= amount;
    this.saveProfile(profile);
    return true;
  }
};

function compareRating(newRate: string, oldRate: string): boolean {
  const ranks = ['F', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS'];
  return ranks.indexOf(newRate) > ranks.indexOf(oldRate);
}
