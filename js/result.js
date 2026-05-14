// Result Page Logic

let resultGod = null;

document.addEventListener('DOMContentLoaded', async () => {
  await initResultPage();
});

async function initResultPage() {
  // Initialize language
  initI18n();

  // Load translations
  await loadTranslations('en');
  await loadTranslations('zh');

  // Get result from sessionStorage
  const storedResult = sessionStorage.getItem('oracle-result');
  if (!storedResult) {
    showError();
    return;
  }

  resultGod = JSON.parse(storedResult);

  // Setup language toggle
  document.getElementById('langToggle').addEventListener('click', () => {
    toggleLanguage();
    updateResultUI();
  });

  // Setup retake button
  document.getElementById('retakeBtn').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = 'quiz.html';
  });

  // Setup retry button
  document.getElementById('retryBtn').addEventListener('click', () => {
    window.location.href = 'quiz.html';
  });

  // Setup share button
  document.getElementById('shareBtn').addEventListener('click', handleShare);

  // Render result
  renderResult();
}

function updateResultUI() {
  renderResult();
}

function renderResult() {
  if (!resultGod) return;

  const lang = getCurrentLang();

  // Hide loading, show result
  document.getElementById('loadingState').classList.add('hidden');
  document.getElementById('errorState').classList.add('hidden');
  document.getElementById('resultCard').classList.remove('hidden');

  // Update god avatar
  const godEmoji = GOD_EMOJIS[resultGod.id] || '🏛️';
  const avatarEl = document.getElementById('godAvatar');
  avatarEl.textContent = godEmoji;
  avatarEl.style.background = resultGod.color.includes('gradient')
    ? resultGod.color
    : `${resultGod.color}30`;

  // Update god name
  document.getElementById('godName').textContent =
    resultGod.name[lang] || resultGod.name.en;

  // Update trait
  document.getElementById('godTrait').textContent =
    resultGod.trait[lang] || resultGod.trait.en;

  // Update quote
  document.getElementById('godQuote').textContent =
    resultGod.quotes[lang] || resultGod.quotes.en;
}

function showError() {
  document.getElementById('loadingState').classList.add('hidden');
  document.getElementById('resultCard').classList.add('hidden');
  document.getElementById('errorState').classList.remove('hidden');
}

function handleShare() {
  if (!resultGod) return;

  const lang = currentLang;
  const shareData = {
    godName: resultGod.name[lang] || resultGod.name.en,
    quote: resultGod.quotes[lang] || resultGod.quotes.en,
    emoji: GOD_EMOJIS[resultGod.id] || '🏛️'
  };

  generateShareCard(shareData);
}
