// Gods Data - 12 Greek Deities
// Each god has: id, name (EN/CN), trait, color, quotes (EN/CN)

const gods = [
  {
    id: 'athena',
    name: { en: 'Athena', zh: '雅典娜' },
    trait: { en: 'Wisdom, Strategy, Protection', zh: '智慧、策略、保护' },
    color: '#1E3A5F',
    quotes: {
      en: 'Wisdom is not knowing all answers—it is knowing which questions matter.',
      zh: '智慧不是知道所有答案，而是知道哪个问题值得问。'
    }
  },
  {
    id: 'apollo',
    name: { en: 'Apollo', zh: '阿波罗' },
    trait: { en: 'Light, Art, Healing, Reason', zh: '光明、艺术、治愈、理性' },
    color: '#FFD700',
    quotes: {
      en: 'Your light does not need to blind everyone; it just needs to warm one near you.',
      zh: '你的光芒不必照亮所有人，只要温暖身边的人就好。'
    }
  },
  {
    id: 'artemis',
    name: { en: 'Artemis', zh: '阿尔忒弥斯' },
    trait: { en: 'Nature Guardian, Independence', zh: '守护自然、独立' },
    color: '#228B22',
    quotes: {
      en: 'Wild does not mean lost—sometimes it means finding your own path.',
      zh: '野性不意味着迷失，有时候它意味着找到自己的路。'
    }
  },
  {
    id: 'hestia',
    name: { en: 'Hestia', zh: '赫斯提亚' },
    trait: { en: 'Hearth, Home, Quiet Strength', zh: '炉灶、家庭、安静' },
    color: '#FFA500',
    quotes: {
      en: 'Your worth is measured by warmth you bring, not by achievements you show.',
      zh: '你的价值，不在于你展示的成就，而在于你传递的温暖。'
    }
  },
  {
    id: 'demeter',
    name: { en: 'Demeter', zh: '德墨忒耳' },
    trait: { en: 'Harvest, Motherly Love, Nourishment', zh: '丰收、母爱、滋养' },
    color: '#DAA520',
    quotes: {
      en: 'What looks like empty soil today may bloom tomorrow—growth takes its own time.',
      zh: '今天看似空荡的土壤，明天可能绽放——生长有自己的节奏。'
    }
  },
  {
    id: 'hephaestus',
    name: { en: 'Hephaestus', zh: '赫菲斯托斯' },
    trait: { en: 'Creation, Craftsmanship', zh: '创造、工匠' },
    color: '#4A4A4A',
    quotes: {
      en: 'What others call broken, you can reshape into something uniquely yours.',
      zh: '别人眼中的破碎，你可以重塑成独一无二的作品。'
    }
  },
  {
    id: 'hermes',
    name: { en: 'Hermes', zh: '赫尔墨斯' },
    trait: { en: 'Communication, Travel, Cleverness', zh: '沟通、旅行、机灵' },
    color: '#C0C0C0',
    quotes: {
      en: 'The bridge between people is built one word at a time.',
      zh: '人与人之间的桥梁，是用一句一句的话语搭建的。'
    }
  },
  {
    id: 'aphrodite',
    name: { en: 'Aphrodite', zh: '阿芙洛狄忒' },
    trait: { en: 'Love, Beauty, Intimacy', zh: '爱、美、亲密关系' },
    color: '#FFC0CB',
    quotes: {
      en: 'Love is not perfect timing—it is choosing someone, again and again.',
      zh: '爱不是完美时机，而是一次又一次的选择。'
    }
  },
  {
    id: 'dionysus',
    name: { en: 'Dionysus', zh: '狄俄尼索斯' },
    trait: { en: 'Release, Joy, Belonging', zh: '释放、欢乐、归属感' },
    color: '#722F37',
    quotes: {
      en: 'You belong here—not because you are perfect, but because you are authentically you.',
      zh: '你属于这里——不是因为完美，而是因为真实的你。'
    }
  },
  {
    id: 'persephone',
    name: { en: 'Persephone', zh: '珀耳塞福涅' },
    trait: { en: 'Rebirth, Hope, Spring', zh: '重生、希望、春天' },
    color: '#9370DB',
    quotes: {
      en: 'Every darkness carries a seed of spring within it.',
      zh: '每片黑暗里都藏着一颗春天的种子。'
    }
  },
  {
    id: 'hebe',
    name: { en: 'Hebe', zh: '赫柏' },
    trait: { en: 'Youth, Vitality, Service', zh: '青春、活力、服务' },
    color: '#FFB6C1',
    quotes: {
      en: 'Youth is not years you have lived—it is lightness in your heart.',
      zh: '青春不是你活过的年岁，而是你心中的轻盈。'
    }
  },
  {
    id: 'iris',
    name: { en: 'Iris', zh: '伊里斯' },
    trait: { en: 'Rainbow, Connection, Good News', zh: '彩虹、连接、传递好消息' },
    color: 'linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8B00FF)',
    quotes: {
      en: 'Hope is not distant; it is quiet confidence that things will find their way.',
      zh: '希望不远，它是相信事情会有出路的静默力量。'
    }
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = gods;
}
