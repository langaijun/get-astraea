// Result Page Logic

let resultGod = null;

// God emojis for display
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

// Static import for free interpretations
import { freeInterpretations } from './god-templates.js';
import { generateShareCard } from './share.js';

const {
  initI18n,
  loadTranslations,
  t,
  setLanguage,
  updatePageTranslations,
  toggleLanguage,
  getCurrentLang
} = window.oracleI18n;

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

  // Check if user just returned from payment
  const urlParams = new URLSearchParams(window.location.search);
  const paymentStatus = urlParams.get('status');

  // Update initial translations
  updatePageTranslations();

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

  // Setup retry report button
  document.getElementById('retryReportBtn')?.addEventListener('click', () => {
    generateReport();
  });

  // Setup PayPal button
  setupPayPalButton();

  // Render result
  renderResult();

  // If payment confirmed, generate report
  if (paymentStatus === 'paid') {
    // Clear URL parameter
    window.history.replaceState({}, document.title, window.location.pathname);
    showReportSection();
    generateReport();
  }
}

function updateResultUI() {
  renderResult();
}

/** Strip leading "**神话映射**：" / "**Mythological Mapping**:" from template mythology field */
function stripMythologyHeading(text) {
  if (!text) return '';
  return text.replace(/^\*\*(神话映射|Mythological Mapping)\*\*[：:]\s*\n?/m, '').trimStart();
}

/** Chinese copy: em dash —— → colon ： */
function zhEmDashToColon(text, lang) {
  if (lang !== 'zh' || !text) return text;
  return text.replace(/——/g, '：');
}

/** Markdown list "- " prefix (traits / advice lines) */
function stripLeadingListDash(line) {
  if (!line) return line;
  return line.replace(/^\s*-\s+/, '').trim();
}

/** Skip standalone section title lines like "**你的核心特质**：" */
function isSectionHeaderOnlyLine(line) {
  return /^\*\*[^*]+\*\*[：:]\s*$/.test((line || '').trim());
}

function formatTraitsOrAdviceBlock(raw, lang) {
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !isSectionHeaderOnlyLine(l))
    .map((l) => {
      let line = stripLeadingListDash(l);
      line = zhEmDashToColon(line, lang);
      return `<li class="flex items-start"><span class="mr-2 text-amber-500">•</span><span>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}</span></li>`;
    })
    .join('');
}

function renderResult() {
  if (!resultGod) return;

  const lang = getCurrentLang();

  // Check if user has paid (report section is visible or payment status was paid)
  const urlParams = new URLSearchParams(window.location.search);
  const hasPaid = urlParams.get('status') === 'paid' || !document.getElementById('reportSection').classList.contains('hidden');

  // Hide loading, show result
  document.getElementById('loadingState').classList.add('hidden');
  document.getElementById('errorState').classList.add('hidden');
  document.getElementById('resultCard').classList.remove('hidden');

  // Hide free reading section if paid
  if (hasPaid) {
    document.getElementById('freeReadingSection').classList.add('hidden');
  }

  // Update god avatar (emoji circle in #godAvatar; share sits on .god-card corner)
  const avatarIconEl = document.getElementById('godAvatarIcon');
  if (avatarIconEl) {
    avatarIconEl.textContent = GOD_EMOJIS[resultGod.id] || '🏛️';
    avatarIconEl.style.background = resultGod.color.includes('gradient')
      ? resultGod.color
      : `${resultGod.color}30`;
  }

  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    const shareLabel = t('result.shareTitle') || 'Share';
    shareBtn.setAttribute('aria-label', shareLabel);
    shareBtn.setAttribute('title', shareLabel);
  }

  // Update god name
  document.getElementById('godName').textContent =
    resultGod.name[lang] || resultGod.name.en;

  // Update trait
  document.getElementById('godTrait').textContent =
    resultGod.trait[lang] || resultGod.trait.en;

  // Update quote
  document.getElementById('godQuote').textContent =
    resultGod.quotes[lang] || resultGod.quotes.en;

  // Render free reading only if not paid
  if (!hasPaid) {
    renderFreeReading();
  }
}

function renderFreeReading() {
  if (!resultGod || !freeInterpretations) return;

  const lang = getCurrentLang();
  const godId = resultGod.id;
  const reading = freeInterpretations[godId];

  if (!reading) return;

  const contentDiv = document.getElementById('freeReadingContent');

  const data = reading[lang];

  const descriptionHtml = zhEmDashToColon(data.description, lang).replace(/\n/g, '<br>');

  const descHtml = `
    <div class="bg-amber-50 rounded-xl p-6 mb-6">
      <p class="text-gray-700 leading-relaxed">
        ${descriptionHtml}
      </p>
    </div>
  `;

  const traitsHtml = `
    <div class="bg-white/80 rounded-xl p-6 mb-6">
      <h5 class="font-title text-lg font-bold text-amber-900 mb-3">${t('result.yourTraits') || 'Your Core Traits'}</h5>
      <ul class="text-gray-700 leading-relaxed space-y-2 ml-4">
        ${formatTraitsOrAdviceBlock(data.traits, lang)}
      </ul>
    </div>
  `;

  const mythRaw = zhEmDashToColon(stripMythologyHeading(data.mythology), lang);
  const mythHtml = `
    <div class="bg-white rounded-xl p-6 mb-6">
      <p class="text-gray-600 leading-relaxed text-base">
        ${mythRaw.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}
      </p>
    </div>
  `;

  const adviceHtml = `
    <div class="bg-white rounded-xl p-6 border-2 border-amber-200">
      <h5 class="font-title text-lg font-bold text-amber-900 mb-3">${t('result.lifeAdvice') || 'Life Advice'}</h5>
      <ul class="text-gray-700 leading-relaxed space-y-3 ml-4">
        ${formatTraitsOrAdviceBlock(data.advice, lang)}
      </ul>
    </div>
  `;

  contentDiv.innerHTML = mythHtml + descHtml + traitsHtml + adviceHtml;
}

function setupPayPalButton() {
  const paypalBtn = document.getElementById('paypalBtn');
  if (!paypalBtn) return;

  paypalBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Check if user provided input (required)
    const userInput = document.getElementById('userInput')?.value.trim() || '';
    if (!userInput) {
      // Show error on input field
      const inputField = document.getElementById('userInput');
      inputField.classList.add('border-red-500');
      inputField.focus();

      // Remove error after user types
      inputField.addEventListener('input', function removeError() {
        inputField.classList.remove('border-red-500');
        inputField.removeEventListener('input', removeError);
      });
      return;
    }

    sessionStorage.setItem('oracle-user-question', userInput);

    // Build return URL
    const baseUrl = window.location.origin + window.location.pathname;
    const returnUrl = encodeURIComponent(baseUrl + '?status=paid');

    // Redirect to PayPal with return URL
    const paypalUrl = `https://www.paypal.com/ncp/payment/M2WU2T7YLWDXY?return_url=${returnUrl}`;
    window.open(paypalUrl, '_blank');
  });
}

function showReportSection() {
  document.getElementById('paymentSection').classList.add('hidden');
  document.getElementById('reportSection').classList.remove('hidden');
  document.getElementById('reportSection').classList.add('fade-in');
}

function hideReportSection() {
  document.getElementById('reportSection').classList.add('hidden');
  document.getElementById('paymentSection').classList.remove('hidden');
}

function showReportLoading() {
  document.getElementById('reportLoading').classList.remove('hidden');
  document.getElementById('reportContent').classList.add('hidden');
  document.getElementById('reportError').classList.add('hidden');
}

function showReportError() {
  document.getElementById('reportLoading').classList.add('hidden');
  document.getElementById('reportContent').classList.add('hidden');
  document.getElementById('reportError').classList.remove('hidden');
}

function showReportBusy() {
  document.getElementById('reportLoading').classList.add('hidden');
  document.getElementById('reportContent').classList.add('hidden');

  // Create busy state message
  const reportContainer = document.getElementById('reportSections').parentElement;

  // Remove existing busy state if any
  const existingBusy = document.getElementById('reportBusyState');
  if (existingBusy) existingBusy.remove();

  const busyDiv = document.createElement('div');
  busyDiv.id = 'reportBusyState';
  busyDiv.className = 'text-center py-12';
  busyDiv.innerHTML = `
    <div class="text-4xl mb-4">🌊</div>
    <p class="text-xl text-amber-700 font-medium mb-2" data-i18n="common.oracleBusy">
      ${t('common.oracleBusy')}
    </p>
    <p class="text-gray-500 mb-6" data-i18n="common.oracleBusySub">
      ${t('common.oracleBusySub')}
    </p>
    <button id="retryReportBtn" class="btn-primary px-6 py-3 text-white font-semibold rounded-xl">
      <span data-i18n="common.oracleBusyRetry">${t('common.oracleBusyRetry')}</span>
    </button>
  `;

  reportContainer.innerHTML = '';
  reportContainer.appendChild(busyDiv);

  document.getElementById('retryReportBtn').addEventListener('click', () => {
    generateReport();
  });
}

function showReportContent() {
  document.getElementById('reportLoading').classList.add('hidden');
  document.getElementById('reportError').classList.add('hidden');
  document.getElementById('reportContent').classList.remove('hidden');
}

async function generateReport() {
  showReportSection();
  showReportLoading();

  const loadingMessages = [
    t('result.loading') || 'Connecting to ancient wisdom...',
    t('result.generating') || 'Interpreting the whispers...',
    'Seeking guidance from the oracle...',
    'Weaving wisdom into words...'
  ];

  // Animate loading messages
  let msgIndex = 0;
  const messageInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % loadingMessages.length;
    document.getElementById('loadingMessage').textContent = loadingMessages[msgIndex];
  }, 2000);

  // Get user question from sessionStorage
  const userInput = sessionStorage.getItem('oracle-user-question')?.trim() || '';
  const lang = getCurrentLang();

  // Prepare request data
  const requestData = {
    god: resultGod.id,
    godName: resultGod.name.en,
    godNameZh: resultGod.name.zh,
    trait: resultGod.trait.en,
    traitZh: resultGod.trait.zh,
    quote: resultGod.quotes.en,
    quoteZh: resultGod.quotes.zh,
    userInput: userInput,
    lang: lang,
    answers: JSON.parse(sessionStorage.getItem('oracle-answers') || '[]')
  };

  try {
    const response = await fetch('/api/oracle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    clearInterval(messageInterval);

    if (!response.ok) {
      throw new Error('Failed to generate report');
    }

    const data = await response.json();

    if (data.error) {
      // Special handling for oracle_busy (user provided question but timed out)
      if (data.error === 'oracle_busy') {
        clearInterval(messageInterval);
        showReportBusy();
        return;
      }
      throw new Error(data.error);
    }

    // Display the report
    displayReport(data.report);

  } catch (error) {
    console.error('Error generating report:', error);
    clearInterval(messageInterval);
    showReportError();
  }
}

function displayReport(report) {
  showReportContent();

  const sectionsContainer = document.getElementById('reportSections');

  // Parse report into sections and content blocks
  const blocks = parseReportBlocks(report);

  sectionsContainer.innerHTML = '';

  blocks.forEach((block, index) => {
    const blockDiv = document.createElement('div');
    blockDiv.className = 'fade-in';
    blockDiv.style.animationDelay = `${index * 0.1}s`;

    if (block.type === 'content') {
      const content = document.createElement('div');
      content.className = 'text-gray-700 leading-relaxed report-section-content';
      content.innerHTML = formatMarkdown(block.content);
      blockDiv.appendChild(content);
    } else if (block.type === 'title') {
      const title = document.createElement('h3');
      title.className = 'font-title text-xl font-bold text-amber-900 report-section-title text-center';
      title.textContent = block.content;
      blockDiv.appendChild(title);
    }

    sectionsContainer.appendChild(blockDiv);
  });
}

function parseReportBlocks(report) {
  // Parse report into alternating content and title blocks
  // Format: ## Title\nContent\n\n## Next Title\nContent...
  // Render order: Title1 -> Content1 -> Title2 -> Content2 -> ...
  const blocks = [];
  const lines = report.split('\n');
  let currentTitle = '';
  let currentContent = '';

  lines.forEach(line => {
    if (line.startsWith('## ')) {
      // When we encounter a new title, push the previous title and content (if both exist)
      if (currentTitle) {
        blocks.push({ type: 'title', content: currentTitle });
      }
      if (currentContent.trim()) {
        blocks.push({ type: 'content', content: currentContent.trim() });
        currentContent = '';
      }
      currentTitle = line.replace('## ', '').trim();
    } else {
      currentContent += line + '\n';
    }
  });

  // Push remaining title and content
  if (currentTitle) {
    blocks.push({ type: 'title', content: currentTitle });
  }
  if (currentContent.trim()) {
    blocks.push({ type: 'content', content: currentContent.trim() });
  }

  // If no sections found, treat entire report as content
  if (blocks.length === 0) {
    blocks.push({ type: 'content', content: report.trim() });
  }

  return blocks;
}

function formatMarkdown(text) {
  // Simple markdown formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p class="mt-3">')
    .replace(/\n/g, '<br>');
}

function showError() {
  document.getElementById('loadingState').classList.add('hidden');
  document.getElementById('resultCard').classList.add('hidden');
  document.getElementById('errorState').classList.remove('hidden');
}

function handleShare() {
  if (!resultGod) return;

  const lang = getCurrentLang();
  const shareData = {
    godId: resultGod.id,
    lang: lang
  };

  generateShareCard(shareData);
}
