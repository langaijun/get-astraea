// Vercel Serverless Function - Oracle Report Generator
// Uses DeepSeek API to generate personalized oracle reports

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Personalized fallback reports for each god
const GOD_FALLBACK_REPORTS = {
  athena: {
    en: {
      identity: `## Your Oracle Identity\n\nAthena, goddess of wisdom and strategy, walks beside you. She took a sip of water from her sacred well of knowledge, her owl perched silently on her shoulder, and this message flows to you.\n\nYou are not merely intelligent—you are wise. There is a difference: intelligence gathers facts, but wisdom understands meaning. Athena chose you because you have the capacity to see beyond appearances, to question what others accept without thought. Her aegis shield protects you not from battle, but from the illusion that force is necessary.`,
      wisdom: `## The Wisdom Within\n\nYour mind is sharp like Athena's spear, but true wisdom lies not in sharpness alone—it lies in knowing when to strike and when to sheathe the blade. You see patterns that others miss because you observe deeply. Trust your analytical ability; it is not a burden, but a gift that allows you to navigate complexity with grace.\n\nThere is also a quieter wisdom within you—one that knows when to speak and when to remain silent. Athena is not only the goddess of strategic warfare; she is also the patroness of crafts, of weaving, of patient creation that turns thread into tapestry. This duality lives in you: a warrior who can also weave peace.`,
      tides: `## Navigating Current Tides\n\nBefore acting, ask: "What matters most here?" Strategy comes from clarity, and clarity comes from pausing. In the rush of modern life, we often forget that the first move is not always the best move. Athena teaches us to step back, survey the battlefield of our lives, and choose our path with intention.\n\nWhen you feel overwhelmed, return to the image of the owl watching from above. Wisdom comes from perspective—from seeing the whole forest, not just the trees that stand before you. Whatever challenge you face, there is a solution that honors all parts of yourself. Find it.`,
      practices: `## Sacred Practices for Daily Life\n\n- **Morning Wisdom Ritual**: Before you begin your day, take three minutes to write down your most important priorities. Not ten, not five—three. These three will guide your actions.\n\n- **The Pause Method**: Before making any significant decision, count to seven. In those seven seconds, imagine Athena's owl taking flight and surveying the situation from above. What does it see?\n\n- **Wisdom Journal**: Each evening, write down one thing you learned about yourself or your world today. Wisdom accumulates not from big epiphanies alone, but from small, consistent reflections.\n\n- **Share Freely**: Share knowledge freely with others, but with discernment. Not everyone deserves access to your inner library. Trust your gut about who receives your light.`,
      blessing: `## A Closing Blessing\n\nMay your mind be clear as an owl's night vision, your path be as just as Athena's shield, and your wisdom light the way not just for yourself but for all who walk beside you. May you remember that the greatest battles are won not with swords, but with understanding, patience, and the courage to see what truly matters.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n雅典娜，智慧与策略女神，与你同行。她从神圣的知识之井中啜饮，猫头鹰安静地停在她肩上，这条信息流向你。\n\n你不只是聪明——你是智慧的。两者有区别：聪明收集事实，但智慧理解意义。雅典娜选择了你，因为你有能力超越表象，去质疑别人不经思考就接受的东西。她的埃吉斯盾牌保护你的不是战斗，而是相信力量必要的幻觉。`,
      wisdom: `## 内在的智慧\n\n你的头脑像雅典娜的长矛一样敏锐，但真正的智慧不在于锋利——而在于知道何时出击，何时收剑入鞘。你看到别人错过的模式，因为你观察得更深。相信你的分析能力；这不是负担，而是让你优雅地驾驭复杂性的天赋。\n\n你内心还有一种更安静的智慧——知道何时说话，何时保持沉默。雅典娜不仅是战略战争女神，她也是手工艺、编织、耐心创造的守护神，将线变成挂毯。这种双重性存在于你体内：战士，也可以编织和平。`,
      tides: `## 穿越当下的潮汐\n\n行动之前，问自己："这里最重要的是什么？" 策略来自清晰，而清晰来自停顿。在现代生活的匆忙中，我们常常忘记第一步并不总是最好的一步。雅典娜教导我们退后一步，俯视我们生活的战场，有意图地选择我们的道路。\n\n当你感到不知所措时，回到从上方俯视的猫头鹰的形象。智慧来自视角——看到整片森林，而不仅仅是眼前的树木。无论你面临什么挑战，都有一个尊重你所有部分的解决方案。找到它。`,
      practices: `## 日常生活的神圣实践\n\n- **晨间智慧仪式**：在开始你的一天之前，花三分钟写下你最重要的三个优先事项。不是十个，不是五个——就是三个。这三个将指导你的行动。\n\n- **暂停法**：在做出任何重大决定之前，数到七。在这七秒钟里，想象雅典娜的猫头鹰起飞并从上方俯视情况。它看到了什么？\n\n- **智慧日记**：每天晚上，写下你今天学到的关于自己或世界的一件事。智慧不仅来自大的顿悟，也来自小而持续的反思。\n\n- **自由分享**：自由地与他人分享知识，但要有分辨力。不是每个人都值得进入你的内心图书馆。相信你的直觉，判断谁应该接受你的光。`,
      blessing: `## 结尾祝福\n\n愿你的头脑像猫头鹰的夜视一样清晰，你的道路像雅典娜的盾牌一样公正，你的智慧不仅照亮你自己的路，也照亮所有与你同行的人。愿你记住，最伟大的战役不是用剑赢得的，而是用理解、耐心和看到真正重要的勇气。`
    }
  },
  apollo: {
    en: {
      identity: `## Your Oracle Identity\n\nApollo's light shines through you. He set down his lyre to drink, and this message is for you.`,
      wisdom: `## The Wisdom Within\n\nYou carry warmth and light. Your presence heals others without you knowing. Art and beauty flow naturally from your soul.`,
      tides: `## Navigating Current Tides\n\nThe sun rises every day—so will clarity. Trust the rhythm of your days. Create something, anything. Creation heals.`,
      practices: `## Sacred Practices for Daily Life\n\n- Sing or hum when you feel lost\n- Spend time in sunlight, real or imagined\n- Create one beautiful thing each day`,
      blessing: `## A Closing Blessing\n\nMay your light be warm, your art be true, and your days be filled with music.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n阿波罗的光芒透过你闪耀。他放下竖琴喝了水，这条信息是给你的。`,
      wisdom: `## 内在的智慧\n\n你携带着温暖和光芒。你的存在不知不觉地治愈他人。艺术和美自然地从你灵魂中流淌。`,
      tides: `## 穿越当下的潮汐\n\n太阳每天都会升起——清晰也会到来。相信你生活的节奏。创造点什么，什么都好。创造治愈。`,
      practices: `## 日常生活的神圣实践\n\n- 迷路时唱歌或哼唱\n- 花时间在阳光下，真实的或想象的都可以\n- 每天创造一件美好的事物`,
      blessing: `## 结尾祝福\n\n愿你的光芒温暖，你的艺术真实，你的日子充满音乐。`
    }
  },
  artemis: {
    en: {
      identity: `## Your Oracle Identity\n\nThe forest guardian walks with you. Artemis paused at a spring to drink, and the water whispered this truth.`,
      wisdom: `## The Wisdom Within\n\nYour independence is strength, not isolation. You protect what matters—wild places, honest hearts, pure intentions. Trust your wild instincts.`,
      tides: `## Navigating Current Tides\n\nGo outside. Nature speaks your language. The moon waxes and wanes, but always returns. So will you.`,
      practices: `## Sacred Practices for Daily Life\n\n- Walk barefoot on grass or earth\n- Honor your need for solitude\n- Protect something small—a plant, a dream, a moment`,
      blessing: `## A Closing Blessing\n\nMay you be wild and free, protected by the forest, guided by the moon.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n森林守护者与你同行。阿尔忒弥斯在泉边停下喝了水，水低语着这个真相。`,
      wisdom: `## 内在的智慧\n\n你的独立是力量，不是孤立。你保护重要的东西——野性的地方、诚实的心、纯粹的意图。相信你的野性本能。`,
      tides: `## 穿越当下的潮汐\n\n去户外。大自然说你的语言。月亮会阴晴圆缺，但总会回来。你也会。`,
      practices: `## 日常生活的神圣实践\n\n- 赤脚走在草地或土地上\n- 尊重你对独处的需求\n- 保护一个小东西——一株植物、一个梦想、一个时刻`,
      blessing: `## 结尾祝福\n\n愿你野性自由，受森林保护，受月亮指引。`
    }
  },
  hestia: {
    en: {
      identity: `## Your Oracle Identity\n\nHestia keeps the hearth fire burning for you. She poured water over the embers, and this warmth is for you.`,
      wisdom: `## The Wisdom Within\n\nYou create comfort. Your quiet presence is a gift. Home is not a place—it's where others feel safe around you.`,
      tides: `## Navigating Current Tides\n\nReturn to center. Breathe. Make tea. Small rituals ground us when life feels chaotic.`,
      practices: `## Sacred Practices for Daily Life\n\n- Light a candle when you need clarity\n- Cook something with intention\n- Notice the warmth in small moments`,
      blessing: `## A Closing Blessing\n\nMay your hearth never go cold, your home always welcome, and your heart find peace.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n赫斯提亚为你保持炉火燃烧。她把水倒在灰烬上，这份温暖是给你的。`,
      wisdom: `## 内在的智慧\n\n你创造舒适。你安静的存在是礼物。家不是一个地方——它是别人在你身边感到安全的地方。`,
      tides: `## 穿越当下的潮汐\n\n回到中心。呼吸。煮茶。当生活感觉混乱时，小小的仪式让我们脚踏实地。`,
      practices: `## 日常生活的神圣实践\n\n- 需要清晰时点一根蜡烛\n- 有意地煮点东西\n- 注意小片刻中的温暖`,
      blessing: `## 结尾祝福\n\n愿你的炉火永不熄灭，你的家永远欢迎，你的心找到平静。`
    }
  },
  demeter: {
    en: {
      identity: `## Your Oracle Identity\n\nThe mother of harvest nourishes you. Demeter blessed the water with grain, and this abundance is your birthright.`,
      wisdom: `## The Wisdom Within\n\nYou feed others—emotionally, spiritually, sometimes literally. Your nurturing is not weakness. It is power.`,
      tides: `## Navigating Current Tides\n\nWinter comes, but spring follows. Patience is not passive. Seeds grow underground before they sprout.`,
      practices: `## Sacred Practices for Daily Life\n\n- Grow something, even a small pot plant\n- Cook with love and intention\n- Share meals with others`,
      blessing: `## A Closing Blessing\n\nMay your harvest be abundant, your seasons be balanced, and your nourishment be shared.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n丰收之母滋养着你。德墨忒耳用谷物祝福了水，这份丰盛是你的与生俱来的权利。`,
      wisdom: `## 内在的智慧\n\n你滋养他人——情感上、精神上，有时字面意义上。你的养育不是软弱，是力量。`,
      tides: `## 穿越当下的潮汐\n\n冬天会来，但春天会跟随。耐心不是被动。种子发芽前在地下生长。`,
      practices: `## 日常生活的神圣实践\n\n- 种点什么，即使是一盆小植物\n- 用爱和意图做饭\n- 与他人分享食物`,
      blessing: `## 结尾祝福\n\n愿你的收获丰盛，你的季节平衡，你的滋养被分享。`
    }
  },
  hephaestus: {
    en: {
      identity: `## Your Oracle Identity\n\nThe smith god shapes you. Hephaestus quenched his hammer in water, and this message is forged for you.`,
      wisdom: `## The Wisdom Within\n\nYou create with your hands and mind. What others call broken, you see as potential. You are an artist of repair.`,
      tides: `## Navigating Current Tides\n\nWhen stuck, make something. Build. Create. The act of making reveals the path forward.`,
      practices: `## Sacred Practices for Daily Life\n\n- Fix something broken\n- Create with your hands regularly\n- See beauty in utility and function`,
      blessing: `## A Closing Blessing\n\nMay your creations be meaningful, your repairs be lasting, and your hands find their work.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n锻造之神塑造着你。赫菲斯托斯把锤子浸入水中，这条信息为你锻造。`,
      wisdom: `## 内在的智慧\n\n你用手和思想创造。别人眼中破碎的东西，你看到潜力。你是修理艺术家。`,
      tides: `## 穿越当下的潮汐\n\n卡住时，做点什么。建造。创造。创造的行为揭示前进的道路。`,
      practices: `## 日常生活的神圣实践\n\n- 修理坏掉的东西\n- 经常用手创作\n- 在实用和功能中发现美`,
      blessing: `## 结尾祝福\n\n愿你的创造有意义，你的修理持久，你的手找到它们的工作。`
    }
  },
  hermes: {
    en: {
      identity: `## Your Oracle Identity\n\nThe messenger god speaks through you. Hermes sipped from a stream and said: "Carry this forward."`,
      wisdom: `## The Wisdom Within\n\nYou connect people, ideas, places. You are a bridge. Your adaptability is not flakiness—it is flexibility.`,
      tides: `## Navigating Current Tides\n\nStay curious. Ask questions. Follow the interesting thread. The messenger finds the way.`,
      practices: `## Sacred Practices for Daily Life\n\n- Learn something new regularly\n- Connect two people who should meet\n- Travel, even if it's just a new route`,
      blessing: `## A Closing Blessing\n\nMay your messages be clear, your journeys be safe, and your connections be meaningful.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n信使之神通过你说话。赫尔墨斯从小溪中啜饮并说："把这个带下去。"`,
      wisdom: `## 内在的智慧\n\n你连接人、想法、地方。你是桥梁。你的适应能力不是善变——是灵活性。`,
      tides: `## 穿越当下的潮汐\n\n保持好奇。问问题。追随有趣的线索。信使找到路。`,
      practices: `## 日常生活的神圣实践\n\n- 经常学习新东西\n- 连接两个应该见面的人\n- 旅行，即使只是走一条新路`,
      blessing: `## 结尾祝福\n\n愿你的信息清晰，旅程安全，连接有意义。`
    }
  },
  aphrodite: {
    en: {
      identity: `## Your Oracle Identity\n\nLove and beauty are your domain. Aphrodite bathed in rose water and left this reflection for you.`,
      wisdom: `## The Wisdom Within\n\nYou see beauty that others miss. Love is not romance—it is the force that connects everything. You are its conduit.`,
      tides: `## Navigating Current Tides\n\nPractice self-love first. When you are full, others drink without you being drained. Beauty is presence, not performance.`,
      practices: `## Sacred Practices for Daily Life\n\n- Surround yourself with beauty\n- Speak kindly to yourself\n- Create moments of intimacy with friends`,
      blessing: `## A Closing Blessing\n\nMay you be deeply loved, truly seen, and surrounded by beauty.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n爱与美是你的领域。阿芙洛狄忒用玫瑰水沐浴，留下了这个倒影给你。`,
      wisdom: `## 内在的智慧\n\n你看到别人错过的美。爱不是浪漫——它是连接一切的力量。你是它的管道。`,
      tides: `## 穿越当下的潮汐\n\n首先练习自爱。当你充满时，他人饮用不会让你枯竭。美是存在，不是表演。`,
      practices: `## 日常生活的神圣实践\n\n- 用美包围自己\n- 对自己说话要友善\n- 与朋友创造亲密时刻`,
      blessing: `## 结尾祝福\n\n愿你被深爱，被真正看见，被美包围。`
    }
  },
  dionysus: {
    en: {
      identity: `## Your Oracle Identity\n\nJoy and liberation flow through you. Dionysus poured wine into water and declared: "Celebrate being alive."`,
      wisdom: `## The Wisdom Within\n\nYou belong here. Your presence brings joy. Release is not escape—it is letting go of what no longer serves you.`,
      tides: `## Navigating Current Tides\n\nDance, sing, laugh. Pleasure is not sin—it is medicine. Find community. You are not alone.`,
      practices: `## Sacred Practices for Daily Life\n\n- Do something just for fun\n- Gather with friends regularly\n- Celebrate small wins`,
      blessing: `## A Closing Blessing\n\nMay your joy be deep, your release be liberating, and your belonging be unshakable.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n欢乐和解放流过你。狄俄尼索斯把酒倒进水中宣称："庆祝活着。"`,
      wisdom: `## 内在的智慧\n\n你属于这里。你的存在带来快乐。释放不是逃避——是放下不再为你服务的东西。`,
      tides: `## 穿越当下的潮汐\n\n跳舞，唱歌，笑。快乐不是罪——是药。找到群体。你并不孤单。`,
      practices: `## 日常生活的神圣实践\n\n- 做点只为好玩的事\n- 定期与朋友聚会\n- 庆祝小胜利`,
      blessing: `## 结尾祝福\n\n愿你的快乐深沉，释放解放，归属不可动摇。`
    }
  },
  persephone: {
    en: {
      identity: `## Your Oracle Identity\n\nYou understand cycles of death and rebirth. Persephone drank from the underworld spring and whispered this about renewal.`,
      wisdom: `## The Wisdom Within\n\nYou have been to the dark and returned. That makes you wise, not broken. Your hope is real because it survived despair.`,
      tides: `## Navigating Current Tides\n\nThe seasons change, and so will this. Trust the cycle. What is ending makes space for what is beginning.`,
      practices: `## Sacred Practices for Daily Life\n\n- Honor endings as beginnings\n- Spend time with growing things\n- Remember that winter always leads to spring`,
      blessing: `## A Closing Blessing\n\nMay your springs be hopeful, your cycles be blessed, and your journey be transformative.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n你理解死亡与重生的循环。珀耳塞福涅从冥界之泉中喝水，低语着关于更新的话语。`,
      wisdom: `## 内在的智慧\n\n你曾到过黑暗并返回。这让你智慧，不是破碎。你的希望是真实的，因为它在绝望中幸存。`,
      tides: `## 穿越当下的潮汐\n\n季节会改变，这也会。相信循环。结束为开始腾出空间。`,
      practices: `## 日常生活的神圣实践\n\n- 把结束当作开始来尊重\n- 花时间与生长的事物相处\n- 记住冬天总会引向春天`,
      blessing: `## 结尾祝福\n\n愿你的春天充满希望，循环被祝福，旅程具有转变力量。`
    }
  },
  hebe: {
    en: {
      identity: `## Your Oracle Identity\n\nYouth and vitality are yours. Hebe filled a golden cup with water and offered: "Stay fresh, stay kind."`,
      wisdom: `## The Wisdom Within\n\nYour energy is a gift. Service to others is not subservience—it is how you shine. You lift the room.`,
      tides: `## Navigating Current Tides\n\nStay light-hearted. Serious problems need light solutions. You are a breath of fresh air that others need.`,
      practices: `## Sacred Practices for Daily Life\n\n- Help someone spontaneously\n- Keep your inner child alive\n- Approach life with playfulness`,
      blessing: `## A Closing Blessing\n\nMay your youth be eternal, your service be joyful, and your heart remain light.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n青春和活力属于你。赫柏用金杯装满水并说："保持新鲜，保持善良。"`,
      wisdom: `## 内在的智慧\n\n你的能量是礼物。为他人服务不是顺从——是你发光的方式。你提升整个房间。`,
      tides: `## 穿越当下的潮汐\n\n保持轻松的心态。严重的问题需要轻松的解决方案。你是别人需要的清新空气。`,
      practices: `## 日常生活的神圣实践\n\n- 自发地帮助某人\n- 让内在的孩子保持活力\n- 用顽皮的方式对待生活`,
      blessing: `## 结尾祝福\n\n愿你的青春永恒，服务快乐，心保持轻盈。`
    }
  },
  iris: {
    en: {
      identity: `## Your Oracle Identity\n\nYou are a messenger of good news. Iris dipped in a waterfall and carried this rainbow message to you.`,
      wisdom: `## The Wisdom Within\n\nYou connect the divided. You see bridges where others see gaps. Hope is what you carry.`,
      tides: `## Navigating Current Tides\n\nLook for the rainbow after rain. Good news is coming. Share it when you find it.`,
      practices: `## Sacred Practices for Daily Life\n\n- Share good news when you hear it\n- Look for beauty in transitions\n- Be the connector in your circles`,
      blessing: `## A Closing Blessing\n\nMay your rainbows be bright, your connections be true, and your hope be contagious.`
    },
    zh: {
      identity: `## 你的神谕身份\n\n你是好消息的信使。伊里斯浸入瀑布，把这条彩虹信息带给你。`,
      wisdom: `## 内在的智慧\n\n你连接分裂的。你在别人看到差距的地方看到桥梁。你携带的是希望。`,
      tides: `## 穿越当下的潮汐\n\n雨后寻找彩虹。好消息即将到来。找到它时分享它。`,
      practices: `## 日常生活的神圣实践\n\n- 听到好消息时分享它\n- 在过渡中寻找美\n- 成为圈子中的连接者`,
      blessing: `## 结尾祝福\n\n愿你的彩虹明亮，连接真实，希望具有传染性。`
    }
  }
};

function generateFallbackReport(god, lang, godName, trait) {
  const reports = GOD_FALLBACK_REPORTS[god];
  if (!reports) {
    // Default fallback if god not found
    return lang === 'zh'
      ? `## 你的神谕身份\n\n神祇喝了口水后想对你说的话。\n\n## 内在的智慧\n\n你有与神祇的连接。\n\n## 穿越当下的潮汐\n\n相信你内心的声音。\n\n## 日常生活的神圣实践\n\n- 每天静默片刻\n- 相信直觉\n- 对自己温柔\n\n## 结尾祝福\n\n神祇与你同在。`
      : `## Your Oracle Identity\n\nThe oracle took a sip of water and offers this message.\n\n## The Wisdom Within\n\nYou have a connection to the divine.\n\n## Navigating Current Tides\n\nTrust your inner voice.\n\n## Sacred Practices for Daily Life\n\n- Spend time in silence daily\n- Trust your intuition\n- Be gentle with yourself\n\n## A Closing Blessing\n\nThe gods walk with you.`;
  }

  const f = reports[lang];
  return f.identity +
         '\n\n' + f.wisdom +
         '\n\n' + f.tides +
         '\n\n' + f.practices +
         '\n\n' + f.blessing;
}

function generatePromptEN(godName, trait, quote, userInput) {
  return `You are a gentle, wise oracle from ancient Greek mythology. Your task is to create a personalized oracle reading for someone whose guiding deity is ${godName}.

## About the Person
- Their oracle deity is ${godName} (${trait})
- Their guiding message is: "${quote}"
${userInput ? `- They have shared this concern/question: "${userInput}"` : ''}

## Task
Create a warm, encouraging, and insightful oracle report of approximately 300-500 words. The tone should be:
- Gentle and compassionate
- Wise but accessible
- Empowering and affirming
- Mystical but grounded

## Structure
Please format your response with the following sections using "##" headers:

## The Wisdom Within
Highlight their inherent strengths and qualities that ${godName} embodies. Help them see the beauty in their nature.

## Navigating Current Tides
Offer guidance relevant to their current state. Address their specific concern with wisdom and perspective.

## Sacred Practices for Daily Life
Suggest 3-4 simple, practical practices to connect with ${godName}'s energy in their daily life.

## A Closing Blessing
End with a brief, beautiful blessing or affirmation they can carry with them.

Remember: We are all children of gods. They deserve a good life. Your words should help them feel seen, understood, and worthy.`;
}

function generatePromptZH(godNameZh, traitZh, quoteZh, userInput) {
  return `你是一位来自古希腊神话的温柔、睿智的神谕者。你的任务是为一位守护神是 ${godNameZh} 的人创建个性化的神谕解读。

## 关于这个人
- 他们的守护神是 ${godNameZh}（${traitZh}）
- 他们的金句是："${quoteZh}"
${userInput ? `- 他们分享了这样的困惑/问题："${userInput}"` : ''}

## 任务
创建约 300-500 字的温暖、鼓励和富有洞察力的神谕报告。语气应该是：
- 温柔和富有同情心
- 智慧但易于理解
- 赋予力量和肯定
- 神秘但脚踏实地

## 结构
请使用 "##" 标题按以下部分格式化你的回复：

## 内在的智慧
突出 ${godNameZh} 所体现的他们固有优势和品质。帮助他们看到自己本性中的美。

## 穿越当下的潮汐
提供与他们当前状态相关的指导。用智慧和视角回应他们的具体关切。

## 日常生活的神圣实践
建议 3-4 种简单、实用的实践方法，在日常生活中连接 ${godNameZh} 的能量。

## 结尾祝福
以一个简短、美好的祝福或肯定结束。

记住：我们都是神的孩子。他们值得好的生活。你的话语应该帮助他们感到被看见、被理解和值得。`;
}

export default async function handler(request) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const { god, godName, godNameZh, trait, traitZh, quote, quoteZh, userInput, lang, answers, stream } = body;

    // Validate required fields
    if (!god || !godName || !lang) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate prompt based on language
    const prompt = lang === 'zh'
      ? generatePromptZH(godNameZh, traitZh, quoteZh, userInput || '')
      : generatePromptEN(godName, trait, quote, userInput || '');

    // Call DeepSeek API
    const deepSeekKey = process.env.DEEPSEEK_API_KEY;

    if (!deepSeekKey) {
      console.error('DEEPSEEK_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Stream enabled request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepSeekKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        stream: stream || false,
        messages: [
          {
            role: 'system',
            content: lang === 'zh'
              ? '你是一位温柔、睿智的神谕者，用温暖的词语给予人们指引和安慰。简洁有力，总共300-500字。'
              : 'You are a gentle, wise oracle who provides guidance and comfort through warm, encouraging words. Be concise, total 300-500 words.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1200,
        temperature: 0.8
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API error:', errorData, 'Status:', response.status);
      return new Response(
        JSON.stringify({ error: 'oracle_busy' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if streaming or regular response
    const contentType = response.headers.get('content-type') || '';

    if (stream) {
      // SSE Stream Response
      return handleStreamResponse(response);
    } else {
      // Regular JSON Response
      const data = await response.json();
      const report = data.choices?.[0]?.message?.content || '';

      if (!report) {
        return new Response(
          JSON.stringify({ error: 'oracle_busy' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const result = { report, isFallback: false };

      return new Response(
        JSON.stringify(result),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        }
      );
    }

  } catch (error) {
    console.error('Oracle generation error:', error);
    return new Response(
      JSON.stringify({ error: 'oracle_busy' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Handle SSE streaming response
async function handleStreamResponse(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const jsonStr = line.slice(5);
                  const data = JSON.parse(jsonStr);

                  // Send SSE formatted data
                  const sseEvent = `data: ${JSON.stringify(data)}\n\n`;
                  controller.enqueue(new TextEncoder().encode(sseEvent));
                } catch (e) {
                  console.error('Error parsing SSE data:', e);
                }
              } else if (line.includes('[DONE]')) {
                break;
              }
            }
        } catch (error) {
          console.error('Stream processing error:', error);
        } finally {
          controller.close();
        }
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    }
  );
}
