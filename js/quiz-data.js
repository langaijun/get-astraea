// Quiz Data - 12 Questions with Options
// Each option corresponds to specific gods (see GOD_MAPPING.md)

const questions = [
  {
    id: 1,
    question: {
      en: 'Zeus suddenly @everyone in the group: "Everyone submit a PPT next week, topic: My Internal Rolling Achievements". What would you do?',
      zh: '宙斯突然在群里@所有人："下周每人交一份PPT，主题是我的内卷成就". 你会做什么？'
    },
    options: [
      {
        text: { en: 'Make a rainbow PPT, title: "Dawn has arrived, spring is not far"', zh: '把会议记录做成彩虹PPT，标题写"曙光已至，春天不远"' },
        scores: { iris: 3, persephone: 3 }
      },
      {
        text: { en: 'Immediately open Excel, analyze KPI curves for each god', zh: '立刻打开Excel，分析过去三年每位神的KPI曲线' },
        scores: { athena: 3, apollo: 3 }
      },
      {
        text: { en: 'Send emoji sticker in group: "Whose pizza is best? My treat"', zh: '群发表情包："谁家披萨最好吃？我请大家"' },
        scores: { hestia: 3, demeter: 3 }
      },
      {
        text: { en: 'Turn on airplane mode, go to forest to chop wood', zh: '打开飞行模式，去森林砍柴造一个小木屋' },
        scores: { artemis: 3, hephaestus: 3 }
      }
    ]
  },
  {
    id: 2,
    question: {
      en: 'Hera posts on Moments: "Today\'s beauty, even Aphrodite fell silent". What would you do?',
      zh: '赫拉发朋友圈："今天的美，连阿芙洛狄忒都沉默了". 你会做什么？'
    },
    options: [
      {
        text: { en: 'Like + comment "yyds goddess!" + post a selfie to interact', zh: '点赞+评论"yyds仙女！"，顺便发个自拍互动' },
        scores: { hebe: 3, aphrodite: 3 }
      },
      {
        text: { en: 'Screenshot and share to group: "Today\'s gossip, hurry and eat melons"', zh: '截图发群聊："今日瓜田，速来吃瓜"' },
        scores: { apollo: 3, hermes: 3 }
      },
      {
        text: { en: 'DM her: "Dress is nice, but I can make you a matching hairpin"', zh: '私信她："裙子不错，但我能给你做个配套发簪"' },
        scores: { hephaestus: 3 }
      },
      {
        text: { en: '@everyone: "Come to my house, let\'s open a bottle and judge together"', zh: '@所有人："来我家吧，开瓶酒一起品鉴"' },
        scores: { hestia: 3, dionysus: 3 }
      }
    ]
  },
  {
    id: 3,
    question: {
      en: 'Ares pulls you into a mystery group, name: "Monday 8AM Resistance". What would you do?',
      zh: '阿瑞斯把你拉进一个神秘群，群名"周一早八摸鱼联盟". 你会做什么？'
    },
    options: [
      {
        text: { en: 'Immediately draft a "Slacking Strategy Roadmap PPT"', zh: '立刻起草一份"摸鱼战略路线图PPT"' },
        scores: { athena: 3, hermes: 3 }
      },
      {
        text: { en: 'Send message: "Can it be \'Spring Slacking\'? Winter is too cold"', zh: '发消息："能不能改成\'春天摸鱼\'？冬天太冷了"' },
        scores: { demeter: 3, persephone: 3 }
      },
      {
        text: { en: '"How about come to my house, I\'ll make soup to boost your energy?"', zh: '"不如来我家，我煮汤给你们补补元气"' },
        scores: { aphrodite: 3, hestia: 3 }
      },
      {
        text: { en: '"Resistance? Did I miss a party?"', zh: '"摸鱼？我是不是错过了啥派对？"' },
        scores: { apollo: 3, dionysus: 3 }
      }
    ]
  },
  {
    id: 4,
    question: {
      en: 'Poseidon invites you: "Let\'s go experience overtime blessings at the seaside office, the night view is beautiful there". What would you do?',
      zh: '波塞冬邀请你："去海边办公室体验加班福报吧，那边夜景很美". 你会做什么？'
    },
    options: [
      {
        text: { en: '"Can we go when the flowers bloom by the sea? Spring is coming soon"', zh: '"能不能等海边花开的时候去？春天快到了"' },
        scores: { demeter: 3, persephone: 3 }
      },
      {
        text: { en: 'Post on Moments: "Seaside overtime invites you, rainbow snacks included"', zh: '发朋友圈："海边加班邀你，有彩虹零食"' },
        scores: { apollo: 3, iris: 3 }
      },
      {
        text: { en: '"Can you give me a detailed schedule? I need to arrange my calendar"', zh: '"能不能给个详细的时间表？我好安排日程"' },
        scores: { hebe: 3, hermes: 3 }
      },
      {
        text: { en: '"No thanks, I\'m fine at home baking bread and fixing furniture"', zh: '"不了，我在家烤面包、修家具挺好的"' },
        scores: { hestia: 3, hephaestus: 3 }
      }
    ]
  },
  {
    id: 5,
    question: {
      en: 'Dionysus posts in the group: "Who wants to come to my house for a party tonight?". What would you do?',
      zh: '狄俄尼索斯在群里发："谁今晚来我家开派对？". 你会做什么？'
    },
    options: [
      {
        text: { en: '"I\'ll bring soup and fruit over"', zh: '"我带汤和水果过去"' },
        scores: { hestia: 3, demeter: 3 }
      },
      {
        text: { en: '"What time? I\'ll secure a spot early"', zh: '"几点？我提前占个位置"' },
        scores: { hermes: 3, hebe: 3 }
      },
      {
        text: { en: '"I can help you build a set of audio equipment"', zh: '"我能帮你做一套音响设备"' },
        scores: { hephaestus: 3 }
      },
      {
        text: { en: 'I\'m in!', zh: '我来！' },
        scores: { aphrodite: 3 }
      }
    ]
  },
  {
    id: 6,
    question: {
      en: 'Poseidon posts in the group: "Who wants to go with me to open a seaside guesthouse?". What would you do?',
      zh: '波塞冬在群里发："谁愿意和我一起去海边开民宿？". 你会做什么？'
    },
    options: [
      {
        text: { en: '"Can I plant a small vegetable garden in the courtyard?"', zh: '"我能在院子里种点小菜吗？"' },
        scores: { demeter: 3, persephone: 3 }
      },
      {
        text: { en: '"I want to build a seaside cabin, then go fishing"', zh: '"我要造个海边小木屋，然后去打鱼"' },
        scores: { hephaestus: 3, artemis: 3 }
      },
      {
        text: { en: '"Seaside guesthouse? I\'m in!"', zh: '"海边民宿？我在！"' },
        scores: { apollo: 3, dionysus: 3 }
      },
      {
        text: { en: '"I won\'t go, I\'ll cook soup and bring it over"', zh: '"我就不去了，给大家煮点汤送过去"' },
        scores: { hestia: 3, hebe: 3 }
      }
    ]
  },
  {
    id: 7,
    question: {
      en: 'Zeus announces: To improve efficiency, weekly reports must be submitted before Friday end of day. What would you do?',
      zh: '宙斯宣布：为了提高效率，每周五下班前必须交周报. 你会做什么？'
    },
    options: [
      {
        text: { en: '"Can I use emoji stickers instead?"', zh: '"能不能用表情包代替？"' },
        scores: { aphrodite: 3, hebe: 3 }
      },
      {
        text: { en: '"I made soup, everyone drink some soup first before writing"', zh: '"我煮了汤，大家先喝口汤再写"' },
        scores: { demeter: 3, hestia: 3 }
      },
      {
        text: { en: '"I created a weekly report template group, those who need it join"', zh: '"我建了个周报模板群，需要的进"' },
        scores: { athena: 3, hermes: 3 }
      },
      {
        text: { en: '"It\'s the weekend, want a drink first?"', zh: '"周末了要不要先喝一杯再说？"' },
        scores: { dionysus: 3, persephone: 3 }
      }
    ]
  },
  {
    id: 8,
    question: {
      en: 'Ares posts in the group: "Who\'s going to the gym today?". What would you do?',
      zh: '阿瑞斯在群里发："今天去健身房的有谁？". 你会做什么？'
    },
    options: [
      {
        text: { en: '"I\'ll bring a workout plan sheet"', zh: '"我带个健身计划表格去"' },
        scores: { athena: 3, apollo: 3 }
      },
      {
        text: { en: '"I\'m going for a run,顺便看看春天的花"', zh: '"我去跑步，顺便看看春天的花"' },
        scores: { artemis: 3, persephone: 3 }
      },
      {
        text: { en: '"I\'ll bring a massager, everyone can relax after working out"', zh: '"我带个按摩仪，大家练完可以放松"' },
        scores: { hephaestus: 3, hebe: 3 }
      },
      {
        text: { en: '"I brought fruit, replenish energy after exercise"', zh: '"我带了水果，运动后补充能量"' },
        scores: { demeter: 3, iris: 3 }
      }
    ]
  },
  {
    id: 9,
    question: {
      en: 'Hera posts on Moments: "Another day troubled by beauty". What would you do?',
      zh: '赫拉发朋友圈："今天又是被美貌烦恼的一天". 你会做什么？'
    },
    options: [
      {
        text: { en: '@everyone "Who has beauty filter recommendations?"', zh: '@所有人 "谁有美颜滤镜推荐？"' },
        scores: { athena: 3, hermes: 3 }
      },
      {
        text: { en: '"How about have a beauty party at my house?"', zh: '"来我家开个美貌派对吧！"' },
        scores: { aphrodite: 3, dionysus: 3 }
      },
      {
        text: { en: '"Can beauty add points? I\'m starting to grind"', zh: '"美貌能加分吗？我要开始卷了"' },
        scores: { apollo: 3, hebe: 3 }
      },
      {
        text: { en: '"Come to my house, I\'ll make soup to boost your energy"', zh: '"来我家吧，煮汤给你补补元气"' },
        scores: { hestia: 3, persephone: 3 }
      }
    ]
  },
  {
    id: 10,
    question: {
      en: 'Zeus suddenly announces: To enhance cohesion, everyone must attend annual team building. What would you do?',
      zh: '宙斯突然宣布：为了增强凝聚力，每个人必须参加年度团建. 你会做什么？'
    },
    options: [
      {
        text: { en: '"I\'ll be the atmosphere team captain!"', zh: '"我来当团建气氛组组长！"' },
        scores: { iris: 3, hermes: 3 }
      },
      {
        text: { en: '"I\'ll bring snacks and soup for team building"', zh: '"团建时我负责带零食和汤"' },
        scores: { demeter: 3, hestia: 3 }
      },
      {
        text: { en: '"I can help plan the process, design posters, and host"', zh: '"我可以帮忙策划流程、设计海报、当主持人"' },
        scores: { aphrodite: 3, athena: 3, apollo: 3 }
      }
    ]
  },
  {
    id: 11,
    question: {
      en: 'Your friend asks: "Where do you want to go this weekend?". What would you do?',
      zh: '你的朋友问："周末想去哪玩？". 你会做什么？'
    },
    options: [
      {
        text: { en: '"Go to the forest park, see the spring flowers"', zh: '"Go to the forest park, see the spring flowers"' },
        scores: { artemis: 3, persephone: 3 }
      },
      {
        text: { en: '"Have a party at home, buy some wine"', zh: '"在家开个派对吧，买点酒"' },
        scores: { hestia: 3, dionysus: 3 }
      },
      {
        text: { en: '"I have several plans, let\'s analyze them first..."', zh: '"我有几个方案，先来分析一下..."' },
        scores: { hephaestus: 3, athena: 3, hermes: 3 }
      }
    ]
  },
  {
    id: 12,
    question: {
      en: 'Faced with a table of dishes, what do you reach for first?',
      zh: '面对一桌菜，你会先拿什么？'
    },
    options: [
      {
        text: { en: 'Soup and rice, warm the stomach first', zh: '汤和米饭，先暖暖胃' },
        scores: { hestia: 3, hebe: 3 }
      },
      {
        text: { en: 'First observe what everyone else is eating, then decide', zh: '先观察每个人吃什么，再决定' },
        scores: { athena: 3, hermes: 3 }
      },
      {
        text: { en: 'Exquisite little pastries', zh: '精致的小点心' },
        scores: { hephaestus: 3, aphrodite: 3 }
      },
      {
        text: { en: 'Vegetables and fruits I grew myself', zh: '自己种的蔬菜和水果' },
        scores: { artemis: 3, demeter: 3 }
      }
    ]
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = questions;
}