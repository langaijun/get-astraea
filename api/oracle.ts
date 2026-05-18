// Vercel Edge Function - Oracle Report Generator
// Uses DeepSeek API to generate personalized oracle reports

interface OracleRequest {
  god: string;
  godName: string;
  godNameZh: string;
  trait: string;
  traitZh: string;
  quote: string;
  quoteZh: string;
  userInput: string;
  lang: 'en' | 'zh';
  answers: number[];
}

interface OracleResponse {
  report: string;
  error?: string;
}

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Fallback reports when AI fails
const FALLBACK_REPORTS = {
  en: {
    identity: `## Your Oracle Identity\n\nYou have a deep connection to the divine. The oracle has taken a sip of water and offers you this truth.`,
    wisdom: `## The Wisdom Within\n\nYour heart knows the way forward. Trust your intuition, for it is the voice of the gods speaking through you.`,
    tides: `## Navigating Current Tides\n\nThe water settles when we let go. Breathe deeply, and the path will reveal itself.`,
    practices: `## Sacred Practices for Daily Life\n\n- Take three deep breaths before making decisions\n- Spend five minutes in silence each morning\n- Trust your first instinct`,
    blessing: `## A Closing Blessing\n\nMay you walk in wisdom and peace. The gods walk with you, always.`
  },
  zh: {
    identity: `## 你的神谕身份\n\n你与神祇有着深深的连接。神祇喝了杯水，然后告诉你这个真相。`,
    wisdom: `## 内在的智慧\n\n你的心知道前进的方向。相信你的直觉，因为它是神祇通过你发出的声音。`,
    tides: `## 穿越当下的潮汐\n\n当我们放下时，水会平静下来。深呼吸，道路自然会显现。`,
    practices: `## 日常生活的神圣实践\n\n- 做决定前深呼吸三次\n- 每天早上花五分钟静默\n- 相信你的第一直觉`,
    blessing: `## 结尾祝福\n\n愿你带着智慧和和平前行。神祇永远与你同在。`
  }
};

function generateFallbackReport(lang: 'en' | 'zh', godName: string): string {
  const f = lang === 'en' ? FALLBACK_REPORTS.en : FALLBACK_REPORTS.zh;
  // Personalize with god name
  return f.identity.replace('the oracle', godName) +
         '\n\n' + f.wisdom +
         '\n\n' + f.tides +
         '\n\n' + f.practices +
         '\n\n' + f.blessing;
}

function generatePromptEN(godName: string, trait: string, quote: string, userInput: string): string {
  return `You are a gentle, wise oracle from ancient Greek mythology. Your task is to create a personalized oracle reading for someone whose guiding deity is ${godName}.

## About the Person
- Their oracle deity is ${godName} (${trait})
- Their guiding message is: "${quote}"
${userInput ? `- They have shared this concern/question: "${userInput}"` : ''}

## Task
Create a warm, encouraging, and insightful oracle report of approximately 1000 words. The tone should be:
- Gentle and compassionate
- Wise but accessible
- Empowering and affirming
- Mystical but grounded

## Structure
Please format your response with the following sections using "##" headers:

## Your Oracle Identity
Introduce ${godName}'s energy and how it manifests in their life. Explain what it means to have this deity as their oracle.

## The Wisdom Within
Highlight their inherent strengths and qualities that ${godName} embodies. Help them see the beauty in their nature.

## Navigating Current Tides
Offer guidance relevant to their current state. ${userInput ? 'Address their specific concern with wisdom and perspective.' : 'Help them find clarity and direction.'}

## Sacred Practices for Daily Life
Suggest 3-4 simple, practical practices to connect with ${godName}'s energy in their daily life. These should be accessible and meaningful.

## A Closing Blessing
End with a brief, beautiful blessing or affirmation they can carry with them.

Remember: We are all children of gods. They deserve a good life. Your words should help them feel seen, understood, and worthy.`;
}

function generatePromptZH(godNameZh: string, traitZh: string, quoteZh: string, userInput: string): string {
  return `你是一位来自古希腊神话的温柔、睿智的神谕者。你的任务是为一位守护神是 ${godNameZh} 的人创建个性化的神谕解读。

## 关于这个人
- 他们的守护神是 ${godNameZh}（${traitZh}）
- 他们的金句是："${quoteZh}"
${userInput ? `- 他们分享了这样的困惑/问题："${userInput}"` : ''}

## 任务
创建约 1000 字的温暖、鼓励和富有洞察力的神谕报告。语气应该是：
- 温柔和富有同情心
- 智慧但易于理解
- 赋予力量和肯定
- 神秘但脚踏实地

## 结构
请使用 "##" 标题按以下部分格式化你的回复：

## 你的神谕身份
介绍 ${godNameZh} 的能量以及它如何在他们生活中显现。解释拥有这位神祇作为他们的神谕意味着什么。

## 内在的智慧
突出 ${godNameZh} 所体现的他们固有优势和品质。帮助他们看到自己本性中的美。

## 穿越当下的潮汐
提供与他们当前状态相关的指导。${userInput ? '用智慧和视角回应他们的具体关切。' : '帮助他们找到清晰和方向。'}

## 日常生活的神圣实践
建议 3-4 种简单、实用的实践方法，在日常生活中连接 ${godNameZh} 的能量。这些应该是易于理解和有意义的。

## 结尾祝福
以一个简短、美好的祝福或肯定结束，让他们可以随身携带。

记住：我们都是神的孩子。他们值得好的生活。你的话语应该帮助他们感到被看见、被理解和值得。`;
}

export default async function handler(request: Request): Promise<Response> {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body: OracleRequest = await request.json();
    const { god, godName, godNameZh, trait, traitZh, quote, quoteZh, userInput, lang, answers } = body;

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

    // Add timeout to fetch (20 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepSeekKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: lang === 'zh'
              ? '你是一位温柔、睿智的神谕者，用温暖的词语给予人们指引和安慰。简洁有力，800字以内。'
              : 'You are a gentle, wise oracle who provides guidance and comfort through warm, encouraging words. Be concise, under 800 words.'
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
      // Return fallback report instead of error
      const fallbackReport = generateFallbackReport(lang, lang === 'zh' ? godNameZh : godName);
      return new Response(
        JSON.stringify({ report: fallbackReport }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const report = data.choices?.[0]?.message?.content || '';

    if (!report) {
      // Return fallback report instead of error
      const fallbackReport = generateFallbackReport(lang, lang === 'zh' ? godNameZh : godName);
      return new Response(
        JSON.stringify({ report: fallbackReport }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result: OracleResponse = { report };

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

  } catch (error) {
    console.error('Oracle generation error:', error);
    // Return fallback report instead of error
    const fallbackReport = generateFallbackReport(lang, lang === 'zh' ? godNameZh : godName);
    return new Response(
      JSON.stringify({ report: fallbackReport }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Configure Edge Function
export const config = {
  runtime: 'edge'
};
