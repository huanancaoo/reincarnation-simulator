import { LifeEvent } from '../types/game';

export const LIFE_EVENTS: LifeEvent[] = [
  // ==========================================
  // --- 人道日常与魔性梗事件 (Human Events) ---
  // ==========================================

  // --- 0岁：诞生 ---
  {
    id: 'e_born_0',
    ageMin: 0,
    ageMax: 0,
    realm: ['human'],
    content: '伴随着一声清脆的啼哭，你呱呱坠地。护士抱起你称重，医生赞叹：“这孩子真结实！”',
    weight: 100,
    effects: { statChanges: { strength: 1 } }
  },
  {
    id: 'e_born_weak',
    ageMin: 0,
    ageMax: 0,
    realm: ['human'],
    content: '你在早产中艰难降生，在恒温箱里住了两周，父母整夜守候。',
    conditions: { maxStats: { strength: 3 } },
    weight: 30,
    effects: { statChanges: { strength: -1 } }
  },

  // --- 1-3岁：幼年 ---
  {
    id: 'e_first_word',
    ageMin: 1,
    ageMax: 1,
    realm: ['human'],
    content: '你在周岁抓周仪式上，略过了金元宝和毛笔，一把抓住了外公的降压药瓶，全家人陷入了沉思。',
    weight: 40,
    effects: { statChanges: { intelligence: 1, luck: 1 } }
  },
  {
    id: 'e_toddler_bark',
    ageMin: 2,
    ageMax: 2,
    realm: ['human'],
    content: '你学会的第一个词不是“爸爸妈妈”，而是模仿村口大黄狗“汪汪汪”，语言天赋令人震撼。',
    weight: 35,
    effects: { statChanges: { strength: 1, beauty: 1 } }
  },
  {
    id: 'e_toddler_sick',
    ageMin: 3,
    ageMax: 3,
    realm: ['human'],
    content: '你突发高烧不退，家人惊慌失措连夜送医打点滴，万幸退烧康复。',
    conditions: { maxStats: { strength: 4 } },
    weight: 30,
    effects: { statChanges: { strength: -1 } }
  },

  // --- 4-6岁：幼儿园与童年 ---
  {
    id: 'e_kindergarten_king',
    ageMin: 4,
    ageMax: 4,
    realm: ['human'],
    content: '你在幼儿园成了孩子王，带着全班小朋友在操场堆出了一座巨型城堡。',
    weight: 30,
    effects: { statChanges: { intelligence: 1, strength: 1 } }
  },
  {
    id: 'e_snack_baron',
    ageMin: 5,
    ageMax: 5,
    realm: ['human'],
    content: '你用两块奥特曼卡片换了同桌三包干脆面，展现出惊人的商业嗅觉。',
    weight: 35,
    effects: { statChanges: { money: 1, intelligence: 1 } }
  },

  // --- 【命运岔路口 1】7岁：小学零食抉择 ---
  {
    id: 'e_choice_snack_7',
    ageMin: 7,
    ageMax: 7,
    realm: ['human'],
    content: '放学路上，校门口小卖部的魔鬼大面筋和卫龙辣条香气四溢，同桌疯狂诱惑你！',
    weight: 80,
    choice: {
      id: 'c_snack_7',
      title: '命运抉择 · 校门口的辣条风暴',
      dilemma: '兜里揣着刚省下来的5毛零花钱，你该如何处置这致命诱惑？',
      options: [
        {
          label: '🔥 全款拿下大辣条，当场吃得满头大汗！',
          outcomeText: '辣条真是人间绝味！虽然后半夜肚子疼拉了一阵，但心情爽翻天！',
          effects: { statChanges: { strength: -1, luck: 1, karma: 1 } }
        },
        {
          label: '🥦 坚决克制欲望，回家乖乖吃妈妈煮的健康青菜',
          outcomeText: '你克制了欲望，身体倍儿棒，妈妈奖励了你一朵小红花。',
          effects: { statChanges: { strength: 2, karma: 1 } }
        },
        {
          label: '🧠 忽悠同桌买，然后以“借一口”的名义吃掉半包',
          outcomeText: '同桌看着剩下的包装袋哇哇大哭，而你展现出了顶级空手套白狼的才华。',
          effects: { statChanges: { intelligence: 2, karma: -1 } }
        }
      ]
    }
  },

  // --- 8-12岁：少年时期 ---
  {
    id: 'e_primary_dog_fight',
    ageMin: 9,
    ageMax: 10,
    realm: ['human'],
    content: '你在放学路上和路边野狗对骂了十分钟，凭借高亢的嗓门成功将狗骂回了窝，名震全街！',
    weight: 35,
    effects: { statChanges: { strength: 1, luck: 1 } }
  },
  {
    id: 'e_save_stray_cat',
    ageMin: 11,
    ageMax: 12,
    realm: ['human'],
    content: '下雨天你在路边救了一只浑身湿透的流浪小猫，抱回家悉心照料，心灵被治愈。',
    weight: 40,
    effects: { statChanges: { karma: 3, luck: 1 }, achievementId: 'ach_cat_cuddle' }
  },

  // --- 13-17岁：青春期与中高考备战 ---
  {
    id: 'e_teen_pdd_slash',
    ageMin: 14,
    ageMax: 15,
    realm: ['human'],
    content: '你发动全班同学帮你拼多多砍一刀，历经千辛万苦砍下了最后一分钱，成功提现100元！',
    weight: 35,
    effects: { statChanges: { money: 1, intelligence: 1 } }
  },
  {
    id: 'e_teen_love_letter',
    ageMin: 15,
    ageMax: 16,
    realm: ['human'],
    content: '你的抽屉里经常塞满隔壁班写来的情书，情窦初开的青春充满悸动。',
    conditions: { minStats: { beauty: 7 } },
    weight: 40,
    effects: { statChanges: { beauty: 1, luck: 1 } }
  },

  // --- 【命运岔路口 2】18岁：成年与前途志愿抉择 ---
  {
    id: 'e_choice_gaokao_18',
    ageMin: 18,
    ageMax: 18,
    realm: ['human'],
    content: '18岁成人礼钟声敲响，面对未来的滚滚红尘，你站在了决定一生的十字路口！',
    weight: 90,
    choice: {
      id: 'c_gaokao_18',
      title: '命运抉择 · 人生赛道抉择',
      dilemma: '高考成绩与未来蓝图摆在面前，你决定将生命投入何种赛道？',
      options: [
        {
          label: '🏛️ 报考宇宙尽头：法学/汉语言，目标铁饭碗考公！',
          outcomeText: '你开启了漫长而笃定的体制备考之路，两耳不闻窗外事，一心只背申论行测。',
          effects: { statChanges: { intelligence: 2, money: 1, strength: 1 } }
        },
        {
          label: '🤖 报考前沿科技：人工智能与量子飞升，卷向世界巅峰！',
          outcomeText: '你一头扎进算力与模型的无垠星海，天天熬夜推公式，头发掉了但格局打开了！',
          effects: { statChanges: { intelligence: 4, strength: -2 } }
        },
        {
          label: '🍢 不读了！立刻推小车去大学城门口摆摊卖烤淀粉肠！',
          outcomeText: '“原味三块，黑椒五块！”你的淀粉肠摊排队长达百米，半年买奥迪，三年买豪宅！',
          effects: { statChanges: { money: 5, beauty: -1, luck: 2 } }
        }
      ]
    }
  },

  // --- 20-24岁：青年狂想曲 ---
  {
    id: 'e_crazy_thursday_god',
    ageMin: 21,
    ageMax: 23,
    realm: ['human'],
    content: '你在群里发了一篇跌宕起伏的感人长文，文末神转折“今天是疯狂星期四V我50”，竟然真有冤种转了！',
    weight: 40,
    effects: { statChanges: { money: 1, luck: 1 } }
  },
  {
    id: 'e_wallace_challenge',
    ageMin: 22,
    ageMax: 24,
    realm: ['human'],
    content: '你深夜挑战华莱士蜜汁全鸡+冰可乐，随后在马桶上化身航天火箭，深刻领悟了喷射真理。',
    weight: 35,
    effects: { statChanges: { strength: -1, luck: 1 } }
  },

  // --- 【命运岔路口 3】25岁：职场画饼与反抗 ---
  {
    id: 'e_choice_work_25',
    ageMin: 25,
    ageMax: 25,
    realm: ['human'],
    content: '周五傍晚17:55，老板笑眯眯地走到你桌前：“小伙子，今年公司上市全靠大家拼搏了，周六日自愿加个班吧，福报啊！”',
    weight: 85,
    choice: {
      id: 'c_work_25',
      title: '命运抉择 · 资本家的微笑',
      dilemma: '面对老板的PUA和画大饼，你决定作何反应？',
      options: [
        {
          label: '🙇 唯唯诺诺：“好的老板，我爱加班，加班使我快乐！”',
          outcomeText: '你连续通宵两天，周一例会被老板口头表扬为“优秀牛马”，但胃痛得直不起腰。',
          effects: { statChanges: { strength: -2, money: 1 } }
        },
        {
          label: '⚖️ 悄悄录音并截图考勤，周一直接去劳动仲裁大队喝茶！',
          outcomeText: '仲裁委支持了你的诉求，公司被迫赔偿 N+3 大礼包，老板当场破防，你拿着巨款爽游三亚！',
          effects: { statChanges: { money: 4, karma: 2, strength: 1 } }
        },
        {
          label: '🤪 当场发疯：“老板，其实我是大宋八府巡按，现在命你给我磕一个！”',
          outcomeText: '全办公室空气凝固，老板惊慌失措以为你精神失常，从此再也不敢让你加班！',
          effects: { statChanges: { intelligence: 2, beauty: 1 } }
        }
      ]
    }
  },

  // --- 26-31岁：社会毒打与立业 ---
  {
    id: 'e_mushroom_illusion',
    ageMin: 27,
    ageMax: 29,
    realm: ['human'],
    content: '去云南旅游吃野生见手青没煮熟，你看见七个戴斗笠的蓝精灵在天花板上开演唱会，送医洗胃后大呼过瘾！',
    weight: 35,
    effects: { statChanges: { intelligence: 1, karma: 1 } }
  },
  {
    id: 'e_wedding_bells',
    ageMin: 28,
    ageMax: 31,
    realm: ['human'],
    content: '与相恋多年的挚爱步入婚姻殿堂，彩礼陪嫁皆化为两颗相濡以沫的心。',
    weight: 45,
    effects: { statChanges: { karma: 2, beauty: 1 } }
  },

  // --- 【命运岔路口 4】32岁：奇葩相亲遇险记 ---
  {
    id: 'e_choice_blind_date_32',
    ageMin: 32,
    ageMax: 32,
    realm: ['human'],
    content: '七大姑八大姨硬塞给你一场相亲，对方坐下第一句：“我月薪3千，你得全款买三套房，房本写我弟名字。”',
    weight: 75,
    choice: {
      id: 'c_blind_date_32',
      title: '命运抉择 · 奇葩相亲修罗场',
      dilemma: '对面狮子大开口，咖啡馆里邻桌都在憋笑，你如何应对？',
      options: [
        {
          label: '🚽 借尿遁直接结自己那杯咖啡的账，从后门火速溜之大吉！',
          outcomeText: '你溜得比兔子还快，对方在店里吹胡子瞪眼被迫自己买单，大获全胜！',
          effects: { statChanges: { luck: 2, intelligence: 1 } }
        },
        {
          label: '🗣️ 毒舌反杀：“建议直接找玉皇大帝当姐夫，天庭灵霄宝殿地皮更大！”',
          outcomeText: '邻桌爆发出雷鸣般的掌声，你的精彩发言被路人偷拍发到短视频平台点赞破百万！',
          effects: { statChanges: { beauty: 2, karma: 2, money: 1 } }
        },
        {
          label: '🔮 假装深沉帮她看面相：“你印堂发黑，必须买我这串500块开光佛珠破灾！”',
          outcomeText: '对方竟然信了！当场扫码付款500块，你含泪血赚480元差价。',
          effects: { statChanges: { money: 2, intelligence: 2 } }
        }
      ]
    }
  },

  // --- 33-40岁：中年奋进 ---
  {
    id: 'e_crypto_boom',
    ageMin: 33,
    ageMax: 36,
    realm: ['human'],
    content: '你偶然用压岁钱买的空气币暴涨千倍，你果断套现提车提房，实现了财务自由！',
    conditions: { minStats: { luck: 8 } },
    weight: 30,
    effects: { statChanges: { money: 6, luck: 1 } }
  },
  {
    id: 'e_baby_born',
    ageMin: 34,
    ageMax: 37,
    realm: ['human'],
    content: '你的小宝贝降生了，手忙脚乱换尿布的日子虽累，但笑容无比治愈。',
    weight: 45,
    effects: { statChanges: { karma: 3 } }
  },

  // --- 【命运岔路口 5】42岁：股市青青草原危机 ---
  {
    id: 'e_choice_stock_42',
    ageMin: 42,
    ageMax: 42,
    realm: ['human'],
    content: '隔壁老王炒股狂赚500万，而你的账户一片青青大草原，连跌七天！',
    weight: 80,
    choice: {
      id: 'c_stock_42',
      title: '命运抉择 · 绿海翻江倒海',
      dilemma: '面对绿得发慌的账户，你选择怎样的人生哲理？',
      options: [
        {
          label: '🍲 愿赌服输，立刻割肉清仓，晚上带全家人吃顿铜锅涮肉！',
          outcomeText: '你放下了暴富妄念，第二天大盘再次重挫，你暗自庆幸跑得快，心态极其平和。',
          effects: { statChanges: { strength: 2, karma: 2 } }
        },
        {
          label: '💸 红了眼抵押房子借网贷，全仓加杠杆抄底！',
          outcomeText: '不幸遭遇连续跌停熔断，你差点上了失信人被执行名单，悔恨交加。',
          effects: { statChanges: { money: -5, strength: -2 } }
        },
        {
          label: '🎙️ 转型财经吐槽主播：“天天亏钱不如教别人如何避坑！”',
          outcomeText: '你的自黑脱口秀风格火爆全网，靠接广告月入十万，因祸得福！',
          effects: { statChanges: { money: 5, intelligence: 2, luck: 2 } }
        }
      ]
    }
  },

  // --- 45-60岁：知天命 ---
  {
    id: 'e_square_dance_star',
    ageMin: 52,
    ageMax: 56,
    realm: ['human'],
    content: '你在小区广场舞队领舞《最炫民族风》，身姿矫健，成了全小区中老年人的梦中偶像。',
    weight: 35,
    effects: { statChanges: { beauty: 1, strength: 2 } }
  },
  {
    id: 'e_charity_foundation',
    ageMin: 55,
    ageMax: 58,
    realm: ['human'],
    content: '出资设立乡村助学基金，几百个孩子亲切地叫你“叔叔/阿姨”，功德无量。',
    conditions: { minStats: { money: 7 } },
    weight: 35,
    effects: { statChanges: { karma: 6, luck: 2 } }
  },

  // --- 60-100+岁：老骥伏枥与期颐 ---
  {
    id: 'e_peaceful_retirement',
    ageMin: 60,
    ageMax: 65,
    realm: ['human'],
    content: '光荣退休，在阳台养多肉，逗弄金渐层小猫，每天睡到自然醒。',
    weight: 50,
    effects: { statChanges: { strength: 1, karma: 2 } }
  },
  {
    id: 'e_grandkids_around',
    ageMin: 70,
    ageMax: 78,
    realm: ['human'],
    content: '儿孙满堂为你祝寿，四世同堂其乐融融，你乐呵呵地分发压岁红包。',
    weight: 45,
    effects: { statChanges: { karma: 3, strength: -1 } }
  },
  {
    id: 'e_centenarian_milestone',
    ageMin: 100,
    ageMax: 100,
    realm: ['human'],
    content: '你跨过了百岁门槛！吉尼斯世界纪录为你发来高寿证书，长命百岁成真！',
    weight: 100,
    effects: { statChanges: { karma: 10 }, achievementId: 'ach_centenarian' }
  },
  {
    id: 'e_peaceful_death',
    ageMin: 80,
    ageMax: 110,
    realm: ['human'],
    content: '在冬日暖阳微抚的摇椅上，你含笑闭上了眼睛，儿孙环绕，此生无悔。',
    conditions: { minStats: { karma: 5 } },
    weight: 25,
    effects: { isDeath: true, deathReason: '寿终正寝，含笑而逝', achievementId: 'ach_ordinary_happiness' }
  },

  // ==========================================
  // --- 畜生道魔性专属事件 (Animal Events) ---
  // ==========================================

  // --- 大熊猫专属 ---
  {
    id: 'e_panda_bamboo',
    ageMin: 0,
    ageMax: 10,
    realm: ['animal'],
    conditions: { animalIds: ['animal_panda'] },
    content: '你在基地奶爸怀里疯狂打滚抱大腿，啃了一下午最甜嫩的水竹，全国两千万人在线看你吃播！',
    weight: 80,
    effects: { statChanges: { beauty: 2, karma: 3, luck: 2 } }
  },
  {
    id: 'e_panda_escape',
    ageMin: 5,
    ageMax: 20,
    realm: ['animal'],
    conditions: { animalIds: ['animal_panda'] },
    content: '试图翻越围栏“越狱”，结果屁股卡在树叉上摔了个四脚朝天，呆萌视频爆红全球！',
    weight: 70,
    effects: { statChanges: { beauty: 3, money: 2 } }
  },
  {
    id: 'e_panda_old',
    ageMin: 30,
    ageMax: 35,
    realm: ['animal'],
    conditions: { animalIds: ['animal_panda'] },
    content: '成为全球最高寿的大熊猫之一，在专家团队悉心照料下安享晚年，圆满归天。',
    weight: 90,
    effects: { isDeath: true, deathReason: '寿终正寝的极乐国宝一生', achievementId: 'ach_ordinary_happiness' }
  },

  // --- 哈士奇专属 ---
  {
    id: 'e_husky_tear_sofa',
    ageMin: 1,
    ageMax: 6,
    realm: ['animal'],
    conditions: { animalIds: ['animal_husky'] },
    content: '趁主人上班，你花了四个小时将价值两万的真皮沙发拆成一地棉絮，并在废墟上嚎叫庆祝！',
    weight: 85,
    effects: { statChanges: { strength: 3, karma: -1 } }
  },
  {
    id: 'e_husky_snow_storm',
    ageMin: 3,
    ageMax: 10,
    realm: ['animal'],
    conditions: { animalIds: ['animal_husky'] },
    content: '咬碎了主人的羽绒服，整间客厅化作暴风雪现场。主人进门后看着你无辜的歪头，两眼一黑。',
    weight: 80,
    effects: { statChanges: { strength: 2, intelligence: -1 } }
  },

  // --- 卡皮巴拉专属 ---
  {
    id: 'e_capybara_hotspring',
    ageMin: 1,
    ageMax: 10,
    realm: ['animal'],
    conditions: { animalIds: ['animal_capybara'] },
    content: '头顶一个新鲜蜜橘泡在温泉里，旁边两只凶狠的鳄鱼游过，你闭着眼嚼水草，稳如泰山。',
    weight: 90,
    effects: { statChanges: { karma: 4, strength: 2 } }
  },

  // --- 橘猫专属 ---
  {
    id: 'e_cat_push_cup',
    ageMin: 1,
    ageMax: 8,
    realm: ['animal'],
    conditions: { animalIds: ['animal_orange_cat'] },
    content: '当着主人的面，你慢慢用爪子把桌上的水杯推了下去，“啪嚓”一声脆响，你神清气爽。',
    weight: 80,
    effects: { statChanges: { beauty: 1, luck: 2 } }
  },
  {
    id: 'e_cat_fat_king',
    ageMin: 5,
    ageMax: 12,
    realm: ['animal'],
    conditions: { animalIds: ['animal_orange_cat'] },
    content: '体重成功突破18斤！跳上床的一瞬间，熟睡的主人感觉被一块压路机砸中了胸口。',
    weight: 75,
    effects: { statChanges: { strength: 2, beauty: -1 } }
  },

  // --- 峨眉山猴子专属 ---
  {
    id: 'e_monkey_rob_milktea',
    ageMin: 2,
    ageMax: 12,
    realm: ['animal'],
    conditions: { animalIds: ['animal_emei_monkey'] },
    content: '一个箭步抢走了一位女大学生的珍珠奶茶，熟练地插上吸管咕咚咕咚喝了个精光！',
    weight: 85,
    effects: { statChanges: { strength: 2, karma: -1 } }
  },

  // --- 极速肉鸡专属 (0岁光速重开) ---
  {
    id: 'e_chicken_speedrun',
    ageMin: 0,
    ageMax: 1,
    realm: ['animal'],
    conditions: { animalIds: ['animal_chicken_speedrun'] },
    content: '吃饲料长肉28天，你光荣出栏被送进烧腊厨房，在餐桌上散发出迷人的脆皮香气，普度众生！',
    weight: 100,
    effects: { isDeath: true, deathReason: '28天光速奉献人间，达成香气四溢脆皮烧鸡', achievementId: 'ach_early_grave' }
  },

  // ==========================================
  // --- 奇幻修仙与赛博隐藏线 ---
  // ==========================================
  // ==========================================
  // --- 异界修真道专属事件 (Fantasy Events) ---
  // ==========================================
  {
    id: 'e_fantasy_born_0',
    ageMin: 0,
    ageMax: 0,
    realm: ['fantasy'],
    content: '伴随着九道大道紫气自东方奔涌三万里，你于仙光瑞彩中破空降世，天道降下灵雨甘霖！',
    weight: 100,
    effects: { statChanges: { intelligence: 3, luck: 3 } }
  },
  {
    id: 'e_fantasy_toddler_3',
    ageMin: 3,
    ageMax: 3,
    realm: ['fantasy'],
    content: '别家孩童尚在玩泥巴，你已能吐纳天地灵气，丹田之中自然温热，灵气周天自行运转！',
    weight: 90,
    effects: { statChanges: { strength: 2, intelligence: 2 } }
  },
  {
    id: 'e_fantasy_linggen_6',
    ageMin: 6,
    ageMax: 6,
    realm: ['fantasy'],
    content: '宗门测灵大典上，测灵神碑爆发出贯穿苍穹的七彩神光！全场太上长老起立惊呼：“万古罕见的混沌神灵根！”',
    weight: 90,
    effects: { statChanges: { intelligence: 4, karma: 2 } }
  },

  // --- 【异界抉择 1】10岁：外门大比风云 ---
  {
    id: 'e_choice_fantasy_sect_10',
    ageMin: 10,
    ageMax: 10,
    realm: ['fantasy'],
    content: '宗门外门大比擂台上，一位仗着家族势力的嚣张跋扈师兄拔剑挑衅，扬言要废你修为！',
    weight: 95,
    choice: {
      id: 'c_fantasy_sect_10',
      title: '命运抉择 · 宗门大比试金石',
      dilemma: '擂台四周万众瞩目，面对跋扈弟子的挑衅，你当如何应对？',
      options: [
        {
          label: '🧱 掏出后山捡到的生锈黑铁板砖法宝，当场一砖将对方拍晕！',
          outcomeText: '“啪！”的一声脆响，跋扈师兄翻白眼倒地，全宗鸦雀无声，你喜提“板砖魔尊”称号！',
          effects: { statChanges: { strength: 3, luck: 2 } }
        },
        {
          label: '🧘 遵循苟道宗师教诲：佯装不敌认输，深夜悄悄在他炼丹炉里加泻药',
          outcomeText: '师兄次日炼丹炸炉且腹泻不止，而你安稳拿到外门抚慰灵石，深藏功与名！',
          effects: { statChanges: { intelligence: 3, money: 2 } }
        },
        {
          label: '⚡ 当场解开混沌灵根封印，引动九霄天雷异象碾压全场！',
          outcomeText: '雷霆万钧，宗门护山大阵震颤！宗主亲自下场收你为关门真传弟子，赏赐天阶灵宝！',
          effects: { statChanges: { intelligence: 4, money: 4, beauty: 2 } }
        }
      ]
    }
  },

  // --- 【异界抉择 2】16岁：经典退婚名场面 ---
  {
    id: 'e_choice_fantasy_divorce_16',
    ageMin: 16,
    ageMax: 16,
    realm: ['fantasy'],
    content: '大堂之上，青梅竹马带着顶级圣地长老傲慢登门，扔出三枚聚气丹要强行退婚解除婚约！',
    weight: 95,
    choice: {
      id: 'c_fantasy_divorce_16',
      title: '命运抉择 · 莫欺少年穷',
      dilemma: '大堂族人窃窃私语，面对圣地长老的威压，你选择：',
      options: [
        {
          label: '🔥 仰天长啸：“三十年河东，三十年河西，莫欺少年穷！”怒撕婚书！',
          outcomeText: '你的不屈意志引动天地共鸣，道心坚不可摧，戒指中的老爷爷药老欣慰现身传授无上焚天功！',
          effects: { statChanges: { strength: 5, luck: 4 } }
        },
        {
          label: '📜 撕碎婚书冷笑：“不是你退我，是我休了你！顺便娶你身旁的冷艳师尊！”',
          outcomeText: '冷艳长老美眸异彩连连，收你为亲传夫君候选，退婚女脸色铁青当场破防！',
          effects: { statChanges: { beauty: 5, karma: 2, money: 3 } }
        },
        {
          label: '💰 果断收下聚气丹并算账：“违约金才三枚？不加十颗极品灵石免谈！”',
          outcomeText: '圣地为了面子咬牙加钱，你拿着用婚约换来的丰厚资源闭关，修为突飞猛进！',
          effects: { statChanges: { money: 6, intelligence: 3 } }
        }
      ]
    }
  },

  // --- 25岁：无暇筑基 ---
  {
    id: 'e_fantasy_zhuji_25',
    ageMin: 25,
    ageMax: 25,
    realm: ['fantasy'],
    content: '吞服九转造化金丹，体内无瑕天道道基铸就！寿元暴涨至三百年，御剑乘风来，除魔天地间！',
    weight: 90,
    effects: { statChanges: { strength: 6, intelligence: 3 } }
  },

  // --- 【异界抉择 3】35岁：古修洞府绝世造化 ---
  {
    id: 'e_choice_fantasy_ruin_35',
    ageMin: 35,
    ageMax: 35,
    realm: ['fantasy'],
    content: '你跌入太古剑仙墓穴，石棺前陈列着两大无上机缘：九天浩然仙经 vs 噬魂修罗魔剑！',
    weight: 90,
    choice: {
      id: 'c_fantasy_ruin_35',
      title: '命运抉择 · 仙魔一念间',
      dilemma: '两件法宝散发出撼天动地的极道威压，你选择继承哪条道路？',
      options: [
        {
          label: '✨ 参悟九天浩然仙经，以天下苍生为己任，修成堂堂正正剑仙！',
          outcomeText: '仙道神光灌体，正气冲霄，万邪避退，你被正道名门公推为下一代领袖！',
          effects: { statChanges: { karma: 8, intelligence: 4 } }
        },
        {
          label: '🩸 拔出噬魂修罗魔剑，杀伐果断，顺我者昌逆我者亡！',
          outcomeText: '漫天血海翻腾，修罗魔意入脑，你成为令天下仙门闻风丧胆的绝世杀神！',
          effects: { statChanges: { strength: 8, intelligence: 2, karma: -3 } }
        },
        {
          label: '📦 全都打包扛走，挂到万宝楼修真拍卖行套现两千万极品灵石！',
          outcomeText: '你成了修真界首富！修仙界的真理是灵石买一切，你用灵石大炮轰平了所有敌对宗门！',
          effects: { statChanges: { money: 12, luck: 4 } }
        }
      ]
    }
  },

  {
    id: 'e_fantasy_pet_2',
    ageMin: 1,
    ageMax: 5,
    realm: ['fantasy'],
    content: '你在宗门后山捡到一只受伤的神禽幼鸟，精心喂养后与它缔结本命灵宠血契！',
    weight: 70,
    effects: { statChanges: { strength: 2, luck: 3 } }
  },
  {
    id: 'e_fantasy_dan_14',
    ageMin: 12,
    ageMax: 15,
    realm: ['fantasy'],
    content: '你初试炼丹不慎引发炸炉，将半个丹房炸得焦黑，却奇迹般从炉渣中抠出一颗九转洗髓丹！',
    weight: 70,
    effects: { statChanges: { intelligence: 3, money: 2 } }
  },
  {
    id: 'e_fantasy_sword_20',
    ageMin: 18,
    ageMax: 24,
    realm: ['fantasy'],
    content: '你在试剑峰以一柄寻常竹剑力压诸峰天骄，剑气纵横三万里，悟出先天无双剑意！',
    weight: 75,
    effects: { statChanges: { strength: 4, beauty: 3 } }
  },
  {
    id: 'e_fantasy_beast_30',
    ageMin: 28,
    ageMax: 34,
    realm: ['fantasy'],
    content: '大荒妖潮肆虐，你单人独剑截断兽群，斩下万年恶蛟头颅，名震八百诸侯国！',
    weight: 75,
    effects: { statChanges: { strength: 5, karma: 4, money: 5 } }
  },
  {
    id: 'e_fantasy_dao_45',
    ageMin: 40,
    ageMax: 55,
    realm: ['fantasy'],
    content: '你于绝巅孤松下坐关九九八十一天，观落叶枯荣，顿悟生死无常造化，修为暴涨！',
    weight: 70,
    effects: { statChanges: { intelligence: 5, karma: 4 } }
  },
  {
    id: 'e_fantasy_jindan_60',
    ageMin: 60,
    ageMax: 60,
    realm: ['fantasy'],
    content: '九九重紫霄雷劫降临，你于雷池之中硬撼天威，九转紫金丹凝结而成，威震八荒！',
    weight: 90,
    effects: { statChanges: { strength: 8, intelligence: 4 } }
  },
  {
    id: 'e_fantasy_disciple_80',
    ageMin: 70,
    ageMax: 100,
    realm: ['fantasy'],
    content: '你开宗立派广纳门徒，门下亲传弟子在天下天骄榜独占鳌头，宗族气运蒸蒸日上！',
    weight: 70,
    effects: { statChanges: { money: 8, karma: 6 } }
  },
  {
    id: 'e_fantasy_yuanying_120',
    ageMin: 120,
    ageMax: 120,
    realm: ['fantasy'],
    content: '元婴破体而出，瞬息万里！你坐镇宗门太上长老席位，万邦来朝，天下修士皆尊你为无上老祖！',
    weight: 90,
    effects: { statChanges: { strength: 10, intelligence: 6, karma: 5 } }
  },
  {
    id: 'e_fantasy_demon_140',
    ageMin: 130,
    ageMax: 180,
    realm: ['fantasy'],
    content: '域外天魔侵袭仙界裂缝，你祭出道器施展诛仙神雷，将魔尊斩于九幽虚空之下！',
    weight: 80,
    effects: { statChanges: { strength: 8, luck: 5, karma: 6 } }
  },
  // --- 150-300岁：羽化登仙 ---
  {
    id: 'e_fantasy_ascend_300',
    ageMin: 150,
    ageMax: 300,
    realm: ['fantasy'],
    content: '九重大乘天劫已过，南天门开，无尽仙乐响彻天地！你踏空而行，褪去凡胎肉身，飞升天界真仙！',
    weight: 100,
    effects: { isDeath: true, deathReason: '渡尽天劫，白日飞升位列仙班', achievementId: 'ach_immortal_ascend' }
  },

  // ==========================================
  // --- 意外死亡事件 (奇葩死法) ---
  // ==========================================
  {
    id: 'e_death_weak_child',
    ageMin: 2,
    ageMax: 8,
    realm: ['human'],
    content: '因先天体质过于羸弱，一场突如其来的急症夺走了你幼小的生命……',
    conditions: { maxStats: { strength: 1 } },
    weight: 35,
    effects: { isDeath: true, deathReason: '年幼重病早夭', achievementId: 'ach_early_grave' }
  },
  {
    id: 'e_death_lightning',
    ageMin: 20,
    ageMax: 60,
    realm: ['human'],
    content: '暴雨天你在大树下发誓“若违此誓天打五雷轰”，不料一道闪电从天而降……',
    conditions: { maxStats: { luck: 2 } },
    weight: 5,
    effects: { isDeath: true, deathReason: '发誓被惊雷意外击中' }
  },
  {
    id: 'e_death_traffic',
    ageMin: 18,
    ageMax: 50,
    realm: ['human'],
    content: '你在过马路时低头刷手机，一辆大卡车呼啸而过……你化作了地府投胎处的新熟客。',
    conditions: { maxStats: { luck: 3, strength: 4 } },
    weight: 8,
    effects: { isDeath: true, deathReason: '低头看手机过马路遭遇泥头车' }
  },
  {
    id: 'e_death_old_age_normal',
    ageMin: 75,
    ageMax: 95,
    realm: ['human'],
    content: '器官机能逐渐退化，在一个安详的清晨，你静静地停止了心跳。',
    weight: 30,
    effects: { isDeath: true, deathReason: '年迈体衰自然离世' }
  }
];
