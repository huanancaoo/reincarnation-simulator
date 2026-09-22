import { Achievement } from '../types/game';

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'ach_centenarian',
    title: '期颐之年',
    description: '成功存活到 100 岁及以上。',
    icon: '🐢',
    rarity: 'epic',
    karmaReward: 50
  },
  {
    id: 'ach_immortal_ascend',
    title: '白日飞升',
    description: '度过九重天劫，褪去凡胎肉身，修成真仙！',
    icon: '⚡',
    rarity: 'mythic',
    karmaReward: 200
  },
  {
    id: 'ach_cyber_singularity',
    title: '意识上传',
    description: '完成脑机终极进化，意识与星际量子网络永久共生。',
    icon: '🦾',
    rarity: 'mythic',
    karmaReward: 150
  },
  {
    id: 'ach_billionaire_life',
    title: '富可敌国',
    description: '个人财富属性突破 15 点，登上全球财富排行榜榜首。',
    icon: '💰',
    rarity: 'legendary',
    karmaReward: 80
  },
  {
    id: 'ach_nobel_prize',
    title: '人类灯塔',
    description: '在科学或哲学领域做出跨时代贡献，荣获至高荣誉。',
    icon: '🏅',
    rarity: 'legendary',
    karmaReward: 100
  },
  {
    id: 'ach_peerless_idol',
    title: '万民之星',
    description: '容貌惊艳时代，成为风靡全球的超级偶像。',
    icon: '✨',
    rarity: 'epic',
    karmaReward: 60
  },
  {
    id: 'ach_born_in_rome',
    title: '直接出生在罗马',
    description: '抽取到北欧/瑞士高福利地区且生于富商/财阀家庭。',
    icon: '🏰',
    rarity: 'rare',
    karmaReward: 40
  },
  {
    id: 'ach_early_grave',
    title: '半途折戟',
    description: '在 18 岁成年之前意外夭折离世。',
    icon: '🥀',
    rarity: 'common',
    karmaReward: 20
  },
  {
    id: 'ach_ordinary_happiness',
    title: '平安顺遂',
    description: '平平淡淡过完一生，寿终正寝于儿孙环绕中。',
    icon: '🍵',
    rarity: 'common',
    karmaReward: 30
  },
  {
    id: 'ach_cat_cuddle',
    title: '喵星救赎',
    description: '在人生低谷时收养了一只猫咪，获得一生的慰藉。',
    icon: '🐱',
    rarity: 'rare',
    karmaReward: 35
  },
  {
    id: 'ach_ten_reincarnations',
    title: '轮回常客',
    description: '累计完成 10 次投胎转世。',
    icon: '🌀',
    rarity: 'rare',
    karmaReward: 50
  }
];
