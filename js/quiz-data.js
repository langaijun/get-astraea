// Quiz Data - 12 Questions with Options
// Each question has: id, question (EN/CN), options with scores for each god

const questions = [
  {
    id: 1,
    question: {
      en: 'When you face a difficult problem, what is your first instinct?',
      zh: '当你面对困难问题时，你的第一反应是？'
    },
    options: [
      {
        text: { en: 'Analyze it logically and find the best solution', zh: '逻辑分析，找出最佳解决方案' },
        scores: { athena: 3, apollo: 2, hermes: 2 }
      },
      {
        text: { en: 'Feel it through and listen to my intuition', zh: '感受它，倾听我的直觉' },
        scores: { artemis: 3, aphrodite: 2, dionysus: 1 }
      },
      {
        text: { en: 'Ask someone I trust for guidance', zh: '询问我信任的人寻求指导' },
        scores: { hestia: 3, hebe: 2, hermes: 1 }
      },
      {
        text: { en: 'Try different approaches until something works', zh: '尝试不同方法，直到找到有效的' },
        scores: { hephaestus: 3, hermes: 2, demeter: 1 }
      }
    ]
  },
  {
    id: 2,
    question: {
      en: 'What kind of environment makes you feel most alive?',
      zh: '什么样的环境让你感觉最有活力？'
    },
    options: [
      {
        text: { en: 'A quiet, cozy space with close company', zh: '安静舒适的空间，有亲近的人陪伴' },
        scores: { hestia: 3, hebe: 2, aphrodite: 1 }
      },
      {
        text: { en: 'Nature—forests, mountains, or by the sea', zh: '大自然——森林、山脉或海边' },
        scores: { artemis: 3, demeter: 2, persephone: 1 }
      },
      {
        text: { en: 'Places with art, music, and creative energy', zh: '充满艺术、音乐和创造力的地方' },
        scores: { apollo: 3, dionysus: 2, iris: 1 }
      },
      {
        text: { en: 'Social gatherings with friends and laughter', zh: '和朋友聚会，充满欢声笑语' },
        scores: { dionysus: 3, hermes: 2, hebe: 1 }
      }
    ]
  },
  {
    id: 3,
    question: {
      en: 'When someone shares a worry with you, how do you respond?',
      zh: '当有人向你倾诉担忧时，你会如何回应？'
    },
    options: [
      {
        text: { en: 'Listen deeply and offer warm comfort', zh: '深度倾听，给予温暖的安慰' },
        scores: { hestia: 3, aphrodite: 2, hebe: 1 }
      },
      {
        text: { en: 'Offer practical advice and solutions', zh: '提供实用的建议和解决方案' },
        scores: { athena: 3, hermes: 2, apollo: 1 }
      },
      {
        text: { en: 'Help them see hope in their situation', zh: '帮助他们在情况中看到希望' },
        scores: { persephone: 3, iris: 2, apollo: 1 }
      },
      {
        text: { en: 'Connect them with others who can help', zh: '把他们和能提供帮助的人联系起来' },
        scores: { hermes: 3, dionysus: 2, hebe: 1 }
      }
    ]
  },
  {
    id: 4,
    question: {
      en: 'What brings you the deepest sense of fulfillment?',
      zh: '什么给你带来最深的满足感？'
    },
    options: [
      {
        text: { en: 'Creating something with my own hands', zh: '用自己的双手创造某样东西' },
        scores: { hephaestus: 3, demeter: 2, athena: 1 }
      },
      {
        text: { en: 'Helping someone grow or heal', zh: '帮助某人成长或治愈' },
        scores: { demeter: 3, hestia: 2, persephone: 1 }
      },
      {
        text: { en: 'Learning something new and understanding deeply', zh: '学习新事物，深入理解' },
        scores: { athena: 3, apollo: 2, hermes: 1 }
      },
      {
        text: { en: 'Expressing beauty or joy in some form', zh: '以某种形式表达美或快乐' },
        scores: { aphrodite: 3, dionysus: 2, apollo: 1 }
      }
    ]
  },
  {
    id: 5,
    question: {
      en: 'How do you handle change and new beginnings?',
      zh: '你如何应对变化和新的开始？'
    },
    options: [
      {
        text: { en: 'Embrace them with hope and courage', zh: '带着希望和勇气拥抱它们' },
        scores: { persephone: 3, iris: 2, artemis: 1 }
      },
      {
        text: { en: 'Plan carefully before making any move', zh: '在行动前仔细规划' },
        scores: { athena: 3, hermes: 2, hestia: 1 }
      },
      {
        text: { en: 'Take it one step at a time, patiently', zh: '耐心地一步一步来' },
        scores: { demeter: 3, hebe: 2, hestia: 1 }
      },
      {
        text: { en: 'Dive in and adapt as I go', zh: '投入其中，边做边适应' },
        scores: { dionysus: 3, hermes: 2, artemis: 1 }
      }
    ]
  },
  {
    id: 6,
    question: {
      en: 'What role do you naturally play in a group?',
      zh: '在团队中，你自然扮演什么角色？'
    },
    options: [
      {
        text: { en: 'The one who connects everyone together', zh: '把所有人连接在一起的人' },
        scores: { hermes: 3, aphrodite: 2, dionysus: 1 }
      },
      {
        text: { en: 'The one who sees the big picture and strategizes', zh: '看大局并制定策略的人' },
        scores: { athena: 3, apollo: 2, iris: 1 }
      },
      {
        text: { en: 'The one who ensures everyone feels included', zh: '确保每个人都感到被接纳的人' },
        scores: { hestia: 3, hebe: 2, dionysus: 1 }
      },
      {
        text: { en: 'The one who brings energy and joy', zh: '带来活力和快乐的人' },
        scores: { dionysus: 3, apollo: 2, hebe: 1 }
      }
    ]
  },
  {
    id: 7,
    question: {
      en: 'When you need to make an important decision, what guides you?',
      zh: '当你需要做重要决定时，什么指引你？'
    },
    options: [
      {
        text: { en: 'Logic and careful reasoning', zh: '逻辑和仔细推理' },
        scores: { athena: 3, apollo: 2, hephaestus: 1 }
      },
      {
        text: { en: 'My values and what feels right', zh: '我的价值观和感觉对的东西' },
        scores: { artemis: 3, hestia: 2, persephone: 1 }
      },
      {
        text: { en: 'How it will affect people I care about', zh: '它会如何影响我在乎的人' },
        scores: { aphrodite: 3, demeter: 2, hebe: 1 }
      },
      {
        text: { en: 'Intuition and inner knowing', zh: '直觉和内心的知晓' },
        scores: { iris: 3, persephone: 2, apollo: 1 }
      }
    ]
  },
  {
    id: 8,
    question: {
      en: 'What kind of beauty resonates most with you?',
      zh: '什么样的美最能引起你的共鸣？'
    },
    options: [
      {
        text: { en: 'Natural beauty—wildflowers, mountains, oceans', zh: '自然之美——野花、山川、海洋' },
        scores: { artemis: 3, demeter: 2, persephone: 1 }
      },
      {
        text: { en: 'Artistic beauty—music, poetry, paintings', zh: '艺术之美——音乐、诗歌、绘画' },
        scores: { apollo: 3, aphrodite: 2, iris: 1 }
      },
      {
        text: { en: 'Handcrafted beauty—things made with care and skill', zh: '手工之美——用心和技巧制作的东西' },
        scores: { hephaestus: 3, hestia: 2, demeter: 1 }
      },
      {
        text: { en: 'Human beauty—connection, kindness, authenticity', zh: '人性之美——连接、善良、真实' },
        scores: { aphrodite: 3, hebe: 2, dionysus: 1 }
      }
    ]
  },
  {
    id: 9,
    question: {
      en: 'When you are alone, what do you most enjoy doing?',
      zh: '当你独处时，你最喜欢做什么？'
    },
    options: [
      {
        text: { en: 'Reflecting, reading, or learning something new', zh: '反思、阅读或学习新事物' },
        scores: { athena: 3, apollo: 2, hermes: 1 }
      },
      {
        text: { en: 'Creating something—a meal, a craft, a piece of writing', zh: '创造某样东西——一顿饭、一件工艺品、一篇文章' },
        scores: { hephaestus: 3, demeter: 2, hestia: 1 }
      },
      {
        text: { en: 'Being in nature or moving my body', zh: '在大自然中或活动身体' },
        scores: { artemis: 3, hebe: 2, persephone: 1 }
      },
      {
        text: { en: 'Resting, dreaming, or simply being', zh: '休息、做梦，或者只是存在' },
        scores: { hestia: 3, persephone: 2, dionysus: 1 }
      }
    ]
  },
  {
    id: 10,
    question: {
      en: 'How do you like to help others?',
      zh: '你喜欢如何帮助他人？'
    },
    options: [
      {
        text: { en: 'By sharing wisdom and insight', zh: '通过分享智慧和见解' },
        scores: { athena: 3, apollo: 2, iris: 1 }
      },
      {
        text: { en: 'By being present and offering warm support', zh: '通过陪伴和提供温暖支持' },
        scores: { hestia: 3, hebe: 2, aphrodite: 1 }
      },
      {
        text: { en: 'By solving problems and fixing things', zh: '通过解决问题和修复东西' },
        scores: { hephaestus: 3, hermes: 2, demeter: 1 }
      },
      {
        text: { en: 'By inspiring hope and joy', zh: '通过激发希望和快乐' },
        scores: { persephone: 3, dionysus: 2, iris: 1 }
      }
    ]
  },
  {
    id: 11,
    question: {
      en: 'What does "home" mean to you?',
      zh: '"家"对你意味着什么？'
    },
    options: [
      {
        text: { en: 'A place where I feel safe and loved', zh: '一个我感到安全和被爱的地方' },
        scores: { hestia: 3, aphrodite: 2, demeter: 1 }
      },
      {
        text: { en: 'Wherever I can be my authentic self', zh: '任何我可以做真实自己的地方' },
        scores: { artemis: 3, dionysus: 2, persephone: 1 }
      },
      {
        text: { en: 'A space filled with beauty and things I cherish', zh: '一个充满美和我珍视事物的空间' },
        scores: { apollo: 3, aphrodite: 2, hephaestus: 1 }
      },
      {
        text: { en: 'Where I can create and nurture what matters to me', zh: '一个我可以创造和滋养对我重要事物的地方' },
        scores: { demeter: 3, hephaestus: 2, hestia: 1 }
      }
    ]
  },
  {
    id: 12,
    question: {
      en: 'When you feel lost or uncertain, what helps you find your way?',
      zh: '当你感到迷失或不确定时，什么帮助你找到方向？'
    },
    options: [
      {
        text: { en: 'Talking with someone I trust', zh: '和我信任的人交谈' },
        scores: { hermes: 3, aphrodite: 2, hestia: 1 }
      },
      {
        text: { en: 'Patience—waiting for clarity to come', zh: '耐心——等待清晰到来' },
        scores: { demeter: 3, persephone: 2, hestia: 1 }
      },
      {
        text: { en: 'Finding strength in my inner light', zh: '在内心光芒中找到力量' },
        scores: { apollo: 3, iris: 2, athena: 1 }
      },
      {
        text: { en: 'Reminding myself that growth takes time', zh: '提醒自己成长需要时间' },
        scores: { hebe: 3, demeter: 2, hephaestus: 1 }
      }
    ]
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = questions;
}
