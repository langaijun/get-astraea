// Share Card Generator - Use pre-generated images

function generateShareCard(data) {
  const { godId, lang } = data;

  // Download pre-generated image
  const link = document.createElement('a');
  const filename = `share-${godId}-${lang}.png`;
  link.download = `oracle-${godId}.png`;
  link.href = `share-images/${filename}`;
  link.click();
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
