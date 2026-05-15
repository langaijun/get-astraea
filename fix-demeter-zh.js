// Fix Demeter Chinese share image
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GOD_EMOJIS = {
  demeter: '🌾'
};

const demeter = {
  id: 'demeter',
  name: { zh: '德墨忒耳' },
  quotes: { zh: '今天看似空荡的土壤，明天可能绽放——生长有自己的节奏。' }
};

// Text wrapping for Demeter Chinese only
function wrapText(ctx, text, maxWidth) {
  let lines = [];
  let currentLine = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const testLine = currentLine + char;
    const metrics = ctx.measureText(testLine);

    if (metrics.width <= maxWidth) {
      currentLine = testLine;
    } else {
      // 如果是句号且单独成行，合并到上一行
      if (char === '。' && lines.length > 0) {
        const lastLine = lines[lines.length - 1];
        const mergedLine = lastLine + '。';
        const mergedMetrics = ctx.measureText(mergedLine);
        if (mergedMetrics.width <= maxWidth) {
          lines[lines.length - 1] = mergedLine;
          currentLine = '';
        } else {
          lines.push(currentLine);
          currentLine = char;
        }
      } else {
        lines.push(currentLine);
        currentLine = char;
      }
    }
  }

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

  // God Name
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

  // Quote
  const quoteText = god.quotes[lang];
  ctx.fillStyle = '#92400E';
  ctx.font = '48px Georgia, serif';
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

const canvas = generateImage(demeter, 'zh');
const outputDir = path.join(__dirname, 'share-images');
const filepath = path.join(outputDir, 'share-demeter-zh.png');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(filepath, buffer);
console.log('✅ 德墨忒耳 (中文) - 句号已修正');