// Share Card Generator - Canvas-based

function generateShareCard(data) {
  const { godName, quote, emoji } = data;

  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set dimensions (instagram story size)
  canvas.width = 1080;
  canvas.height = 1920;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#FEF3C7');
  gradient.addColorStop(0.5, '#FDE68A');
  gradient.addColorStop(1, '#FEF3C7');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Decorative circles
  ctx.fillStyle = '#F59E0B30';
  ctx.beginPath();
  ctx.arc(200, 200, 300, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#F59E0B20';
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
  ctx.fillText(emoji, canvas.width / 2, 600);

  // God Name
  ctx.fillStyle = '#78350F';
  ctx.font = 'bold 120px Georgia, serif';
  ctx.fillText(godName, canvas.width / 2, 800);

  // Decorative line
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(180, 900);
  ctx.lineTo(900, 900);
  ctx.stroke();

  // Quote (word wrap)
  const quoteText = `"${quote}"`;
  ctx.fillStyle = '#92400E';
  ctx.font = '48px Georgia, serif';
  wrapText(ctx, quoteText, canvas.width / 2, 1050, 720, 60);

  // Footer
  ctx.fillStyle = '#B45309';
  ctx.font = '36px Georgia, serif';
  ctx.fillText('get-astraea.com', canvas.width / 2, 1800);

  // Download
  const link = document.createElement('a');
  link.download = `oracle-${godName}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + (i * lineHeight));
  }
}

// Also provide Web Share API support
async function shareResult(data) {
  const { godName, quote } = data;

  const shareData = {
    title: "Oracle's Whisper",
    text: `My oracle is ${godName}! "${quote}"`,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      alert('Copied to clipboard!');
    }
  } catch (err) {
    console.log('Share cancelled or failed:', err);
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateShareCard, shareResult };
}
