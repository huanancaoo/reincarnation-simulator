import { Talent } from '../types/game';

export const TALENTS_POOL: Talent[] = [
  // --- 神话 (Mythic / 红色) ---
  {
    id: 't_reincarnation_king',
    name: '轮回主宰',
    description: '先天获得全属性 +3，并获得 10 点自选功德。',
    rarity: 'mythic',
    effect: { stats: { beauty: 3, intelligence: 3, strength: 3, money: 3, luck: 3, karma: 10 } }
  },
  {
    id: 't_immortal_seed',
    name: '灵根觉醒',
    description: '天地灵气归于己身，体魄+4，智力+4，开启隐藏修仙路线！',
    rarity: 'mythic',
    effect: { stats: { strength: 4, intelligence: 4 }, specialTag: 'immortal' }
  },
  {
    id: 't_born_in_rome',
    name: '罗马原住民',
    description: '有人出生在罗马，有人一生是牛马。家境强制拉满 +10！',
    rarity: 'mythic',
    effect: { stats: { money: 10, luck: 2 }, specialTag: 'rich' }
  },
  {
    id: 't_cyber_god',
    name: '机械飞升者',
    description: '神经连接原生脑波，智力 +6，进入赛博时代将直接突破奇点。',
    rarity: 'mythic',
    effect: { stats: { intelligence: 6 }, specialTag: 'cyber' }
  },

  // --- 传说 (Legendary / 金色) ---
  {
    id: 't_golden_spoon',
    name: '金玉满堂',
    description: '出身豪门望族，家境 +5，颜值 +2。',
    rarity: 'legendary',
    effect: { stats: { money: 5, beauty: 2 } }
  },
  {
    id: 't_peerless_beauty',
    name: '倾国倾城',
    description: '容颜倾倒众生，颜值 +6，无论男女皆受万人瞩目。',
    rarity: 'legendary',
    effect: { stats: { beauty: 6 } }
  },
  {
    id: 't_einstein_brain',
    name: '超绝顶智商',
    description: '智商突破 200，智力 +6，天生具有学术神之光环。',
    rarity: 'legendary',
    effect: { stats: { intelligence: 6 } }
  },
  {
    id: 't_koi_luck',
    name: '万界锦鲤',
    description: '气运齐天，出门总能捡到宝贝，气运 +7。',
    rarity: 'legendary',
    effect: { stats: { luck: 7 }, specialTag: 'luck' }
  },
  {
    id: 't_titan_body',
    name: '霸王神力',
    description: '天生骨骼惊奇，百病不生，体魄 +6。',
    rarity: 'legendary',
    effect: { stats: { strength: 6 } }
  },
  {
    id: 't_cat_overlord',
    name: '猫仙化身',
    description: '传说你上一世是一只受尽万千宠爱的大橘，气运 +4，容貌 +3。',
    rarity: 'legendary',
    effect: { stats: { luck: 4, beauty: 3 }, specialTag: 'animal' }
  },

  // --- 史诗 (Epic / 紫色) ---
  {
    id: 't_high_iq_family',
    name: '书香门第',
    description: '父母皆是大学教授，智力 +3，家境 +2。',
    rarity: 'epic',
    effect: { stats: { intelligence: 3, money: 2 } }
  },
  {
    id: 't_gym_rat',
    name: '运动奇才',
    description: '奔跑如风，跳跃如羚羊，体魄 +4。',
    rarity: 'epic',
    effect: { stats: { strength: 4 } }
  },
  {
    id: 't_idol_face',
    name: '国民初恋脸',
    description: '从小被星探追逐，颜值 +4。',
    rarity: 'epic',
    effect: { stats: { beauty: 4 } }
  },
  {
    id: 't_lottery_lover',
    name: '六合彩达人',
    description: '偶尔买彩票总能中个几千块，家境 +2，气运 +3。',
    rarity: 'epic',
    effect: { stats: { money: 2, luck: 3 } }
  },
  {
    id: 't_good_deeds',
    name: '十世善人',
    description: '宿命功德深厚，功德 +5，受神明暗中庇护。',
    rarity: 'epic',
    effect: { stats: { karma: 5 } }
  },
  {
    id: 't_polyglot',
    name: '通晓万言',
    description: '两岁能诵唐诗，三岁会讲英文，智力 +3。',
    rarity: 'epic',
    effect: { stats: { intelligence: 3 } }
  },
  {
    id: 't_iron_stomach',
    name: '铁胃之躯',
    description: '路边摊地沟油从不拉肚子，体魄 +3。',
    rarity: 'epic',
    effect: { stats: { strength: 3 } }
  },

  // --- 稀有 (Rare / 蓝色) ---
  {
    id: 't_demolition_kid',
    name: '拆迁二代',
    description: '出生后老家墙上画了一个红色的“拆”字，家境 +3。',
    rarity: 'rare',
    effect: { stats: { money: 3 } }
  },
  {
    id: 't_tall_person',
    name: '大长腿',
    description: '十二岁就一米八，颜值 +2，体魄 +1。',
    rarity: 'rare',
    effect: { stats: { beauty: 2, strength: 1 } }
  },
  {
    id: 't_math_olympiad',
    name: '数理直觉',
    description: '解奥数题如饮甘霖，智力 +2。',
    rarity: 'rare',
    effect: { stats: { intelligence: 2 } }
  },
  {
    id: 't_cat_whisperer',
    name: '猫猫雷达',
    description: '流浪猫见到你都主动蹭裤腿，气运 +2。',
    rarity: 'rare',
    effect: { stats: { luck: 2 } }
  },
  {
    id: 't_sound_sleep',
    name: '秒睡神功',
    description: '沾枕头就睡，从不失眠焦躁，体魄 +2。',
    rarity: 'rare',
    effect: { stats: { strength: 2 } }
  },
  {
    id: 't_silver_tongue',
    name: '社交牛逼症',
    description: '见人说人话，见鬼说鬼话，智力 +1，颜值 +1。',
    rarity: 'rare',
    effect: { stats: { intelligence: 1, beauty: 1 } }
  },
  {
    id: 't_vegetarian_blessing',
    name: '福生无量',
    description: '少造杀业，心宽体胖，功德 +3。',
    rarity: 'rare',
    effect: { stats: { karma: 3 } }
  },

  // --- 普通 (Common / 白色) ---
  {
    id: 't_ordinary_life',
    name: '平平淡淡',
    description: '做个普通人挺好，全属性均衡微调。',
    rarity: 'common',
    effect: { stats: { beauty: 1, intelligence: 1 } }
  },
  {
    id: 't_hardworking_ox',
    name: '纯血天生牛马',
    description: '耐力惊人，吃苦耐劳。体魄 +2，但家境 -1。',
    rarity: 'common',
    effect: { stats: { strength: 2, money: -1 } }
  },
  {
    id: 't_keyboard_warrior',
    name: '键盘侠圣体',
    description: '吵架从不输，手速极快，智力 +1，颜值 -1。',
    rarity: 'common',
    effect: { stats: { intelligence: 1, beauty: -1 } }
  },
  {
    id: 't_foodie',
    name: '干饭人',
    description: '胃口极佳，心情愉悦，体魄 +1。',
    rarity: 'common',
    effect: { stats: { strength: 1 } }
  },
  {
    id: 't_stayup_pro',
    name: '修仙见习生',
    description: '经常熬夜到凌晨三点，智力 +1，体魄 -1。',
    rarity: 'common',
    effect: { stats: { intelligence: 1, strength: -1 } }
  },
  {
    id: 't_small_luck',
    name: '再来一瓶',
    description: '喝饮料偶尔能抽到再来一瓶，气运 +1。',
    rarity: 'common',
    effect: { stats: { luck: 1 } }
  },
  {
    id: 't_introvert',
    name: 'i人结界',
    description: '沉浸在自己的精神世界里，智力 +1，颜值 +1。',
    rarity: 'common',
    effect: { stats: { intelligence: 1, beauty: 1 } }
  },
  {
    id: 't_otaku',
    name: '二次元之力',
    description: '热血沸腾，心中有光，气运 +1。',
    rarity: 'common',
    effect: { stats: { luck: 1 } }
  },
  {
    id: 't_frugal',
    name: '省钱鬼才',
    description: '极其擅长拼单和薅羊毛，家境 +1。',
    rarity: 'common',
    effect: { stats: { money: 1 } }
  },
  // --- 魔性爆笑梗天赋 ---
  {
    id: 't_wallace_stomach',
    name: '华莱士终极抗体',
    description: '吃喷射套餐依然谈笑风生，钢铁肠胃，体魄 +4，百毒不侵。',
    rarity: 'rare',
    effect: { stats: { strength: 4 }, specialTag: 'meme' }
  },
  {
    id: 't_crazy_thursday',
    name: '疯狂星期四·V我50',
    description: '每周四总会有大冤种微信转账50块，家境 +3，气运 +4。',
    rarity: 'epic',
    effect: { stats: { money: 3, luck: 4 }, specialTag: 'meme' }
  },
  {
    id: 't_pdd_slasher',
    name: '拼多多大砍刀',
    description: '亲朋好友见你退避三舍，但每次都能砍下一分钱提现，智力 +2，家境 +2。',
    rarity: 'rare',
    effect: { stats: { intelligence: 2, money: 2 }, specialTag: 'meme' }
  },
  {
    id: 't_crazy_moments',
    name: '发疯文学大师',
    description: '把别人搞emo自己心情大好，精神状态极度健康，体魄 +3，智力 +2。',
    rarity: 'epic',
    effect: { stats: { strength: 3, intelligence: 2 }, specialTag: 'meme' }
  },
  {
    id: 't_cyber_fortune',
    name: '赛博算命祖师',
    description: '在赛博空间给人算卦看八字，粉丝百万，气运 +6，家境 +4。',
    rarity: 'legendary',
    effect: { stats: { luck: 6, money: 4 }, specialTag: 'meme' }
  },
  {
    id: 't_capybara_peace',
    name: '豚门永存',
    description: '情绪稳定如卡皮巴拉，不内耗不焦虑，功德 +6，体魄 +3。',
    rarity: 'legendary',
    effect: { stats: { karma: 6, strength: 3 }, specialTag: 'meme' }
  }
];

export function getRarityColor(rarity: Talent['rarity']): {
  badge: string;
  border: string;
  glow: string;
  text: string;
} {
  switch (rarity) {
    case 'mythic':
      return {
        badge: 'bg-red-500/20 text-red-400 border-red-500/40',
        border: 'border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.4)]',
        glow: 'from-red-500/20 to-orange-500/20',
        text: 'text-red-400'
      };
    case 'legendary':
      return {
        badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        border: 'border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.4)]',
        glow: 'from-amber-500/20 to-yellow-500/20',
        text: 'text-amber-300'
      };
    case 'epic':
      return {
        badge: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
        border: 'border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
        glow: 'from-purple-500/20 to-pink-500/20',
        text: 'text-purple-300'
      };
    case 'rare':
      return {
        badge: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
        border: 'border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.3)]',
        glow: 'from-blue-500/20 to-cyan-500/20',
        text: 'text-blue-300'
      };
    case 'common':
    default:
      return {
        badge: 'bg-slate-700/30 text-slate-300 border-slate-600/40',
        border: 'border-slate-700/80',
        glow: 'from-slate-800 to-slate-900',
        text: 'text-slate-300'
      };
  }
}
