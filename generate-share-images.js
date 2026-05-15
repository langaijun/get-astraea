// Generate share images using Node.js Canvas
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GOD_EMOJIS = {
  athena: '🦉',
  apollo: '☀️',
  artemis: '🏹',
  hestia: '🏠',
  demeter: '🌾',
  hephaestus: '⚒️',
  hermes: '🪶',
  aphrodite: '🌹',
  dionysus: '🍇',
  persephone: '🌸',
  hebe: '🌸',
  iris: '🌈'
};

const gods = [
  { id: 'athena', name: { en: 'Athena', zh: '雅典娜' }, quotes: { en: 'Wisdom is not knowing all answers—it is knowing which questions matter.', zh: '智慧不是知道所有答案，而是知道哪个问题值得问。' }},
  { id: 'apollo', name: { en: 'Apollo', zh: '阿波罗' }, quotes: { en: 'Your light does not need to blind everyone; it just needs to warm one near you.', zh: '你的光芒不必照亮所有人，只要温暖身边的人就好。' }},
  { id: 'artemis', name: { en: 'Artemis', zh: '阿尔忒弥斯' }, quotes: { en: 'Wild does not mean lost—sometimes it means finding your own path.', zh: '野性不意味着迷失，有时候它意味着找到自己的路。' }},
  { id: 'hestia', name: { en: 'Hestia', zh: '赫斯提亚' }, quotes: { en: 'Your worth is measured by warmth you bring, not by achievements you show.', zh: '你的价值，不在于你展示的成就，而在于你传递的温暖。' }},
  { id: 'demeter', name: { en: 'Demeter', zh: '德墨忒耳' }, quotes: { en: 'What looks like empty soil today may bloom tomorrow—growth takes its own time.', zh: '今天看似空荡的土壤，明天可能绽放——生长有自己的节奏。' }},
  { id: 'hephaestus', name: { en: 'Hephaestus', zh: '赫菲斯托斯' }, quotes: { en: 'What others call broken, you can reshape into something uniquely yours.', zh: '别人眼中的破碎，你可以重塑成独一无二的作品。' }},
  { id: 'hermes', name: { en: 'Hermes', zh: '赫尔墨斯' }, quotes: { en: 'The bridge between people is built one word at a time.', zh: '人与人之间的桥梁，是用一句一句的话语搭建的。' }},
  { id: 'aphrodite', name: { en: 'Aphrodite', zh: '阿芙洛狄忒' }, quotes: { en: 'Love is not perfect timing—it is choosing someone, again and again.', zh: '爱不是完美时机，而是一次又一次的选择。' }},
  { id: 'dionysus', name: { en: 'Dionysus', zh: '狄俄尼索斯' }, quotes: { en: 'You belong here—not because you are perfect, but because you are authentically you.', zh: '你属于这里——不是因为完美，而是因为真实的你。' }},
  { id: 'persephone', name: { en: 'Persephone', zh: '珀耳塞福涅' }, quotes: { en: 'Every darkness carries a seed of spring within it.', zh: '每片黑暗里都藏着一颗春天的种子。' }},
  { id: 'hebe', name: { en: 'Hebe', zh: '赫柏' }, quotes: { en: 'Youth is not years you have lived—it is lightness in your heart.', zh: '青春不是你活过的年岁，而是你心中的轻盈。' }},
  { id: 'iris', name: { en: 'Iris', zh: '伊里斯' }, quotes: { en: 'Hope is not distant; it is quiet confidence that things will find their way.', zh: '希望不远，它是相信事情会有出路的静默力量。' }}
];

// Text wrapping function - smart line break with punctuation support
function wrapText(ctx, text, maxWidth) {
  const isChinese = /[\u4e00-\u9fa5]/.test(text);

  // 中标点符号（逗号、句号、问号、感叹号、分号、顿号）
  const punctRegex = /[,，.。！!?？;；、]/;

  let cleanText = text;

  // 按标点符号分段，保留标点
  const segments = cleanText.split(/([,，.。！!?？;；、]+)/);
  let parts = [];
  for (let i = 0; i < segments.length; i += 2) {
    const textPart = segments[i] || '';
    const punct = segments[i + 1] || '';
    if (textPart || punct) {
      parts.push(textPart + punct);
    }
  }

  // 重新组合成行
  let lines = [];
  let currentLine = '';

  parts.forEach(part => {
    const separator = isChinese ? '' : ' ';  // 中文不加空格，英文加空格
    const testLine = currentLine ? currentLine + separator + part : part;
    const testMetrics = ctx.measureText(testLine);

    if (testMetrics.width <= maxWidth) {
      currentLine = testLine;
    } else {
      // 当前行已满，先保存
      if (currentLine) {
        lines.push(currentLine);
      }

      // 单独处理当前部分（可能也需要分多行）
      if (isChinese) {
        // 中文按字符
        let newLine = '';
        for (let i = 0; i < part.length; i++) {
          const testLine = newLine + part[i];
          const testMetrics = ctx.measureText(testLine);
          if (testMetrics.width <= maxWidth) {
            newLine = testLine;
          } else {
            if (newLine) {
              lines.push(newLine);
            }
            newLine = part[i];
          }
        }
        currentLine = newLine;
      } else {
        // 英文按单词
        const words = part.trim().split(/\s+/);
        let newLine = '';
        words.forEach((word, idx) => {
          const testLine = newLine ? newLine + ' ' + word : word;
          const testMetrics = ctx.measureText(testLine);
          if (testMetrics.width <= maxWidth) {
            newLine = testLine;
          } else {
            if (newLine) {
              lines.push(newLine);
            }
            newLine = word;
          }
        });
        currentLine = newLine;
      }
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function generateImage(god, lang) {
  const canvas = createCanvas(1080, 1920);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#FEF3C7');
  gradient.addColorStop(0.5, '#FDE68A');
  gradient.addColorStop(1, '#FEF3C7');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Decorative circles
  ctx.fillStyle = 'rgba(245, 158, 11, 0.19)';
  ctx.beginPath();
  ctx.arc(200, 200, 300, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(245, 158, 11, 0.125)';
  ctx.beginPath();
  ctx.arc(880, 1720, 250, 0, Math.PI * 2);
  ctx.fill();

  // Title
  ctx.fillStyle = '#92400E';
  ctx.font = 'bold 72px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText("Oracle's Whisper", canvas.width / 2, 180);

  // Subtitle
  ctx.fillStyle = '#B45309';
  ctx.font = 'italic 36px Georgia, serif';
  ctx.fillText('神谕的低语', canvas.width / 2, 240);

  // Emoji (large)
  ctx.font = '300px serif';
  ctx.fillText(GOD_EMOJIS[god.id], canvas.width / 2, 600);

  // God Name - adjust font size for longer names
  const godName = god.name[lang];
  const nameWidth = ctx.measureText(godName).width;
  let nameFontSize = 120;
  if (nameWidth > 800) nameFontSize = 80;
  ctx.fillStyle = '#78350F';
  ctx.font = `bold ${nameFontSize}px Georgia, serif`;
  ctx.fillText(godName, canvas.width / 2, 800);

  // Decorative line
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(180, 900);
  ctx.lineTo(900, 900);
  ctx.stroke();

  // Quote (word wrap) - 无引号
  const quoteText = god.quotes[lang];
  ctx.fillStyle = '#92400E';
  ctx.font = '48px Georgia, serif';

  // 计算页边距：3个字符宽度
  const charWidth = ctx.measureText('字').width;
  const maxWidth = canvas.width - (charWidth * 6);  // 左右各3个字符

  const lines = wrapText(ctx, quoteText, maxWidth);
  const startY = 1050;
  lines.forEach((line, i) => {
    ctx.fillText(line, canvas.width / 2, startY + (i * 70));
  });

  // Footer
  ctx.fillStyle = '#B45309';
  ctx.font = '36px Georgia, serif';
  ctx.fillText('get-astraea.com', canvas.width / 2, 1800);

  return canvas;
}

async function generateAll() {
  const outputDir = path.join(__dirname, 'share-images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('开始生成图片...');

  // 生成英文版
  for (const god of gods) {
    const canvas = generateImage(god, 'en');
    const filename = `share-${god.id}-en.png`;
    const filepath = path.join(outputDir, filename);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filepath, buffer);
    console.log(`✅ ${god.name.en} (EN)`);
  }

  console.log('\n生成中文版...');

  // 生成中文版
  for (const god of gods) {
    const canvas = generateImage(god, 'zh');
    const filename = `share-${god.id}-zh.png`;
    const filepath = path.join(outputDir, filename);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filepath, buffer);
    console.log(`✅ ${god.name.zh} (中文)`);
  }

  console.log('\n全部完成！图片保存在 share-images 目录');
}

generateAll().catch(console.error);