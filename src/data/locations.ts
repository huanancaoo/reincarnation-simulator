import { BirthLocation, FamilyBackground, Realm } from '../types/game';

// ==========================================
// --- 出生地库 (按道途分类) ---
// ==========================================
export const ALL_BIRTH_LOCATIONS: BirthLocation[] = [
  // --- 人道 (Human Locations) ---
  {
    id: 'loc_china_tier1',
    name: '中国 · 一线繁华都市',
    flag: '🇨🇳',
    continent: '亚洲',
    probability: 80,
    difficulty: '困难',
    description: '出生在北上广深，霓虹璀璨，节奏飞快。卷王辈出，机会与压力并存。',
    buffs: { intelligence: 2, money: 1 },
    realm: ['human']
  },
  {
    id: 'loc_china_county',
    name: '中国 · 宁静小城/乡村',
    flag: '🇨🇳',
    continent: '亚洲',
    probability: 120,
    difficulty: '普通',
    description: '烟火气十足的县城或小镇，人情味浓郁，生活节奏从容安稳。',
    buffs: { strength: 1, karma: 1 },
    realm: ['human']
  },
  {
    id: 'loc_nordic',
    name: '北欧 · 峡湾童话王国 (挪威/瑞典/丹麦)',
    flag: '🇳🇴',
    continent: '欧洲',
    probability: 15,
    difficulty: '极乐',
    description: '投胎界的 SSR！从出生到摇椅一辈子高福利，下午三点下班看极光。',
    buffs: { money: 3, strength: 2, beauty: 1, karma: 2 },
    realm: ['human']
  },
  {
    id: 'loc_switzerland',
    name: '瑞士 · 阿尔卑斯山麓',
    flag: '🇨🇭',
    continent: '欧洲',
    probability: 10,
    difficulty: '极乐',
    description: '群山环抱，空气甜美，全球富豪理财中心，人生难度降至极低。',
    buffs: { money: 4, beauty: 2, strength: 1 },
    realm: ['human']
  },
  {
    id: 'loc_japan',
    name: '日本 · 东京千代田/京都古都',
    flag: '🇯🇵',
    continent: '亚洲',
    probability: 30,
    difficulty: '简单',
    description: '便利店遍地，秩序井然，二次元圣地，但人际界限分明，轻度社恐狂喜。',
    buffs: { beauty: 1, intelligence: 1, strength: -1 },
    realm: ['human']
  },
  {
    id: 'loc_usa_california',
    name: '美国 · 加州硅谷/西海岸',
    flag: '🇺🇸',
    continent: '北美洲',
    probability: 35,
    difficulty: '简单',
    description: '阳光沙滩与科技风投交织，满大街的创新极客与创业神话。',
    buffs: { intelligence: 2, money: 2 },
    realm: ['human']
  },
  {
    id: 'loc_india',
    name: '印度 · 恒河平原',
    flag: '🇮🇳',
    continent: '亚洲',
    probability: 180,
    difficulty: '困难',
    description: '人口大国，香料与古老哲学发源地，阶层竞争极其残酷。',
    buffs: { strength: 1, intelligence: 1, money: -2 },
    realm: ['human']
  },
  {
    id: 'loc_africa_savanna',
    name: '东非 · 肯尼亚大草原',
    flag: '🇰🇪',
    continent: '非洲',
    probability: 90,
    difficulty: '困难',
    description: '与角马奔腾，与雄狮同行，野性自然之美，然而医疗与教育资源匮乏。',
    buffs: { strength: 3, beauty: 1, money: -3 },
    realm: ['human']
  },
  {
    id: 'loc_dubai',
    name: '阿联酋 · 迪拜奢华之都',
    flag: '🇦🇪',
    continent: '中东',
    probability: 10,
    difficulty: '简单',
    description: '沙漠中的金碧辉煌，豪车与人工岛屿，土豪之名远扬。',
    buffs: { money: 5, beauty: 1 },
    realm: ['human']
  },

  // --- 畜生动物道 (Animal Locations) ---
  {
    id: 'loc_wolong_panda',
    name: '四川 · 卧龙中华大熊猫自然保护区',
    flag: '🐼',
    continent: '神州',
    probability: 40,
    difficulty: '极乐',
    description: '国家顶级生态基地，嫩竹甘泉，全天候恒温空调房，无数奶爸奶妈贴心伺候。',
    buffs: { money: 5, beauty: 3, luck: 5 },
    realm: ['animal']
  },
  {
    id: 'loc_emei_mountain',
    name: '四川 · 峨眉山雷洞坪猴群根据地',
    flag: '⛰️',
    continent: '神州',
    probability: 40,
    difficulty: '普通',
    description: '天然险峰密林，游客如织，辣条可乐自取，猴王号令群山，逍遥自在。',
    buffs: { strength: 4, intelligence: 2 },
    realm: ['animal']
  },
  {
    id: 'loc_onsen_japan',
    name: '日本 · 长野地狱谷雪山温泉',
    flag: '♨️',
    continent: '东瀛',
    probability: 30,
    difficulty: '极乐',
    description: '大雪纷飞中常年热气腾腾的天然温泉，头顶橘子泡澡，享受终极情绪稳定。',
    buffs: { karma: 5, strength: 3 },
    realm: ['animal']
  },
  {
    id: 'loc_mansion_cat',
    name: '汤臣一品 · 富婆私享江景复式豪宅',
    flag: '🏰',
    continent: '魔都',
    probability: 30,
    difficulty: '极乐',
    description: '顶级全景落地窗，定制纯金项圈与进口深海金枪鱼罐头，每天踩着主人的脸醒来。',
    buffs: { money: 6, beauty: 4 },
    realm: ['animal']
  },
  {
    id: 'loc_guangdong_farm',
    name: '广东 · 清远万羽极速养殖场',
    flag: '🌾',
    continent: '岭南',
    probability: 30,
    difficulty: '地狱',
    description: '流水线大棚，吃最饱的饲料，长最快的肉，28天极速出栏达成脆皮烧鸡大业！',
    buffs: { strength: -2, karma: 3 },
    realm: ['animal']
  },

  // --- 异界修真道 (Fantasy Locations) ---
  {
    id: 'loc_qingyun_sect',
    name: '东荒 · 青云天宗 · 通天峰',
    flag: '🏯',
    continent: '修真大世界',
    probability: 40,
    difficulty: '简单',
    description: '九峰耸入云霄，仙鹤环绕，灵泉如瀑。正道万载魁首，藏经阁收录三千仙法。',
    buffs: { intelligence: 4, karma: 3, luck: 3 },
    realm: ['fantasy']
  },
  {
    id: 'loc_huanggu_clan',
    name: '中州 · 荒古姜家 · 大帝祖地',
    flag: '🏛️',
    continent: '神墟大陆',
    probability: 25,
    difficulty: '极乐',
    description: '极道帝兵镇压气运，大帝神王血脉世代传承，降生之时神钟九响，紫气浩荡！',
    buffs: { strength: 5, money: 6, luck: 4 },
    realm: ['fantasy']
  },
  {
    id: 'loc_poverty_village',
    name: '凡界 · 乌坦城外 · 萧家小山村',
    flag: '🌾',
    continent: '斗气大陆',
    probability: 60,
    difficulty: '困难',
    description: '退婚流传奇圣地！虽无仙气灵脉，但后山悬崖与山洞常常埋藏远古至宝与老爷爷。',
    buffs: { strength: 2, karma: 2, luck: 5 },
    realm: ['fantasy']
  },
  {
    id: 'loc_demon_abyss',
    name: '极北 · 九幽万魔幽冥古渊',
    flag: '🌋',
    continent: '魔罗天',
    probability: 35,
    difficulty: '地狱',
    description: '魔焰翻腾，杀伐滔天，弱肉强食适者生存！天生修成天魔不灭体，桀骜不驯。',
    buffs: { strength: 6, intelligence: 3, karma: -3 },
    realm: ['fantasy']
  },
  {
    id: 'loc_isekai_kingdom',
    name: '异界 · 艾尔兰斯神圣帝国 · 王都',
    flag: '⚔️',
    continent: '异世界剑与魔法',
    probability: 40,
    difficulty: '简单',
    description: '魔导蒸汽朋克与剑圣公会并存，被卡车送过来的转生者聚集于此，讨伐魔王！',
    buffs: { intelligence: 4, strength: 3, beauty: 2 },
    realm: ['fantasy']
  },
  {
    id: 'loc_ancient_ruin',
    name: '太古 · 诸神陨落归墟遗迹',
    flag: '🌌',
    continent: '混沌虚空',
    probability: 10,
    difficulty: '地狱',
    description: '万古禁区，混沌气弥漫，大道碎片崩飞。出生自带至尊骨与重瞳神异！',
    buffs: { strength: 8, intelligence: 6, luck: 6 },
    realm: ['fantasy']
  }
];

// ==========================================
// --- 家庭/宗族背景库 (按道途分类) ---
// ==========================================
export const ALL_FAMILY_BACKGROUNDS: FamilyBackground[] = [
  // --- 人道 (Human Families) ---
  {
    id: 'fam_billionaire',
    title: '跨国财阀 / 顶层首富',
    icon: '👑',
    probability: 2,
    statModifiers: { money: 6, beauty: 2, luck: 2 },
    description: '出生直接含着纯金钥匙，名下信托基金九位数，私人飞机代步。',
    realm: ['human']
  },
  {
    id: 'fam_scholar',
    title: '院士世家 / 顶尖书香',
    icon: '🎓',
    probability: 8,
    statModifiers: { intelligence: 4, money: 2 },
    description: '家里藏书数万册，从小耳濡目染，诺贝尔奖得主经常来家里做客。',
    realm: ['human']
  },
  {
    id: 'fam_business',
    title: '富商名贾 / 家族企业',
    icon: '💎',
    probability: 15,
    statModifiers: { money: 3, beauty: 1 },
    description: '家境优渥，从小接触商业洽谈，衣食无忧，起点远超同龄人。',
    realm: ['human']
  },
  {
    id: 'fam_middle',
    title: '双职工中产家庭',
    icon: '🏡',
    probability: 35,
    statModifiers: { intelligence: 1, money: 1, strength: 1 },
    description: '父母有稳定体面的工作，全力为你提供良好教育，温馨而平实。',
    realm: ['human']
  },
  {
    id: 'fam_worker',
    title: '寻常百姓 / 工薪劳动者',
    icon: '🛠️',
    probability: 30,
    statModifiers: { strength: 2, karma: 1 },
    description: '父母勤劳善良，省吃俭用将你拉扯大，教会你脚踏实地做人。',
    realm: ['human']
  },
  {
    id: 'fam_poor',
    title: '清贫寒门 / 负债累累',
    icon: '🏚️',
    probability: 10,
    statModifiers: { money: -3, strength: 1, luck: -1 },
    description: '家里经济拮据，但磨难可能锻造出你坚韧不拔的钢铁意志。',
    realm: ['human']
  },

  // --- 异界修真道 (Fantasy Sects & Heritage) ---
  {
    id: 'fam_emperor_child',
    title: '不朽帝族 · 绝世神子/帝女',
    icon: '👑',
    probability: 5,
    statModifiers: { money: 8, beauty: 4, strength: 5, luck: 5 },
    description: '帝族嫡系至尊！自幼受万仙朝拜，服用九转金丹药浴洗髓，护道者皆为大圣！',
    realm: ['fantasy']
  },
  {
    id: 'fam_sword_master',
    title: '隐世剑尊 · 天生剑胚遗孤',
    icon: '🗡️',
    probability: 15,
    statModifiers: { strength: 5, intelligence: 4, beauty: 2 },
    description: '父母曾是一剑光寒十九州的绝世剑仙，天生体内蕴养一口先天本命剑胎。',
    realm: ['fantasy']
  },
  {
    id: 'fam_broken_dantian',
    title: '没落氏族 · 退婚流赘婿预备役',
    icon: '💔',
    probability: 30,
    statModifiers: { strength: -1, luck: 6, karma: 3 },
    description: '幼年丹田碎裂沦为笑柄，然而指间的生锈铁戒中，竟沉睡着一位万年前的药皇药老！',
    realm: ['fantasy']
  },
  {
    id: 'fam_demon_heir',
    title: '万魔之宗 · 幽冥少宗主',
    icon: '🩸',
    probability: 15,
    statModifiers: { strength: 4, money: 4, intelligence: 3 },
    description: '魔道巨擘之子，行事随心所欲，护短到了极点，宗门十万魔将皆听你号令！',
    realm: ['fantasy']
  },
  {
    id: 'fam_sweeper_disciple',
    title: '藏经阁 · 扫地杂役小道童',
    icon: '🧹',
    probability: 25,
    statModifiers: { intelligence: 5, karma: 4, money: -2 },
    description: '看似平平无奇的扫地杂役，却日夜翻阅三千古经道藏，于微末中悟通无上大道。',
    realm: ['fantasy']
  },
  {
    id: 'fam_isekai_truck',
    title: '转生勇者 · 卡车保送满级外挂',
    icon: '🚚',
    probability: 10,
    statModifiers: { intelligence: 4, strength: 4, luck: 5, money: 2 },
    description: '为了救横穿马路的黑猫被泥头车撞飞，转生直接解锁满级全属性与鉴定圣眼！',
    realm: ['fantasy']
  }
];

// 向后兼容旧引用的导出
export const BIRTH_LOCATIONS = ALL_BIRTH_LOCATIONS.filter((l) => !l.realm || l.realm.includes('human'));
export const FAMILY_BACKGROUNDS = ALL_FAMILY_BACKGROUNDS.filter((f) => !f.realm || f.realm.includes('human'));

export function getLocationsByRealm(realm: Realm): BirthLocation[] {
  return ALL_BIRTH_LOCATIONS.filter((loc) => !loc.realm || loc.realm.includes(realm));
}

export function getFamiliesByRealm(realm: Realm): FamilyBackground[] {
  return ALL_FAMILY_BACKGROUNDS.filter((fam) => !fam.realm || fam.realm.includes(realm));
}
