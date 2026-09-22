import { AnimalSpecies } from '../types/game';

export const ANIMAL_SPECIES: AnimalSpecies[] = [
  {
    id: 'animal_panda',
    name: '中华国宝 · 大熊猫',
    icon: '🐼',
    rarity: 'mythic',
    description: '投胎界天花板！一出生就是一等公民，天天抱奶爸大腿啃嫩竹笋，全国人民云吸你。',
    maxAge: 35,
    probability: 3,
    initialBuffs: { beauty: 8, luck: 8, money: 8, karma: 5 },
    specialTrait: '【国宝光环】免除一切生存压力，自带数百万人气与顶级医疗团队。'
  },
  {
    id: 'animal_capybara',
    name: '情绪稳定 · 水豚卡皮巴拉',
    icon: '🦫',
    rarity: 'legendary',
    description: '水豚哲学大师，头顶橘子与大鸟泡温泉，鳄鱼从身边游过连眼皮都不抬，活成佛系传说。',
    maxAge: 12,
    probability: 10,
    initialBuffs: { strength: 4, karma: 8, luck: 5 },
    specialTrait: '【佛性无边】免疫一切焦虑与精神内耗，受到所有物种尊敬。'
  },
  {
    id: 'animal_orange_cat',
    name: '吨位天花板 · 纯血大橘',
    icon: '🐱',
    rarity: 'epic',
    description: '十只橘猫九只胖，还有一只压垮炕。被有钱人家收养，每天打翻杯子、踩主人脸享受人生。',
    maxAge: 20,
    probability: 25,
    initialBuffs: { beauty: 5, money: 4, luck: 4, strength: 3 },
    specialTrait: '【踩奶通灵】只要喵一声，人类就会自动献上顶级金枪鱼罐头。'
  },
  {
    id: 'animal_husky',
    name: '拆迁办主任 · 哈士奇',
    icon: '🐺',
    rarity: 'rare',
    description: '狼的外表藏着搞笑灵魂。精通拆毁真皮沙发、把棉被撕成暴风雪，嚎叫声响彻整个小区。',
    maxAge: 15,
    probability: 30,
    initialBuffs: { strength: 7, intelligence: -3, luck: 3 },
    specialTrait: '【拆家战神】永远精力充沛，犯了错靠卖萌和歪头蒙混过关。'
  },
  {
    id: 'animal_emei_monkey',
    name: '峨眉山匪首 · 霸王金猴',
    icon: '🐒',
    rarity: 'rare',
    description: '占山为王，拦截游客抢夺冰红茶与辣条，拳打无人机，脚踢拐杖，景区安保拿你毫无办法。',
    maxAge: 22,
    probability: 25,
    initialBuffs: { strength: 6, intelligence: 4, karma: -2, luck: 4 },
    specialTrait: '【景区劫匪】只要有游客，就有无限的零食奶茶供应。'
  },
  {
    id: 'animal_chicken_speedrun',
    name: '广东快出栏 · 极速白羽鸡',
    icon: '🍗',
    rarity: 'common',
    description: '28天光速出栏的传奇肉禽。生得光荣，走得喷香。极速完成转世投胎，刷成就神宠！',
    maxAge: 1, // 0-1岁直接出栏完成使命
    probability: 7,
    initialBuffs: { strength: -2, karma: 3, luck: -2 },
    specialTrait: '【香气四溢】以极速肉身奉献人间，达成光速轮回转世。'
  }
];
