// Premium Page Logic

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

let resultGod = null;
let isPaid = false;

document.addEventListener('DOMContentLoaded', async () => {
  await initPremiumPage();
});

async function initPremiumPage() {
  // Initialize language
  initI18n();

  // Load translations
  await loadTranslations('en');
  await loadTranslations('zh');

  // Get result from sessionStorage
  const storedResult = sessionStorage.getItem('oracle-result');
  if (!storedResult) {
    window.location.href = 'quiz.html';
    return;
  }

  resultGod = JSON.parse(storedResult);

  // Check payment status
  isPaid = localStorage.getItem('oracle-paid') === 'true';

  // Update initial translations
  updatePageTranslations();

  // Setup language toggle
  document.getElementById('langToggle').addEventListener('click', () => {
    toggleLanguage();
    updatePremiumUI();
  });

  // Setup retry button
  document.getElementById('retryReportBtn').addEventListener('click', () => {
    generateReport();
  });

  // Setup confirm payment button
  document.getElementById('confirmPaymentBtn')?.addEventListener('click', () => {
    if (confirm('Have you completed the PayPal payment?')) {
      localStorage.setItem('oracle-paid', 'true');
      isPaid = true;
      showReportSection();
      generateReport();
    }
  });

  // Setup generate button (if already paid)
  if (isPaid) {
    document.getElementById('paypalBtn').textContent = t('result.alreadyPaid') || 'Generate Report';
    document.getElementById('paypalBtn').classList.remove('btn-paypal');
    document.getElementById('paypalBtn').classList.add('btn-primary');
    document.getElementById('paypalBtn').addEventListener('click', (e) => {
      e.preventDefault();
      showReportSection();
      generateReport();
    });
  } else {
    // PayPal button already has Payment Link configured in HTML
    // User can confirm payment after completing PayPal flow
  }

  // Render god info
  renderGodInfo();
}

function updatePremiumUI() {
  renderGodInfo();
}

function renderGodInfo() {
  if (!resultGod) return;

  const lang = getCurrentLang();

  // Update god emoji
  document.getElementById('godEmoji').textContent = GOD_EMOJIS[resultGod.id] || '🏛️';

  // Update god name
  document.getElementById('godName').textContent =
    resultGod.name[lang] || resultGod.name.en;

  // Update placeholder and hint
  const textarea = document.getElementById('userInput');
  textarea.placeholder = t('result.inputHint') || textarea.placeholder;
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

  const userInput = document.getElementById('userInput').value.trim();
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

  // Parse report into sections (assuming markdown-like format)
  const sections = parseReportSections(report);

  sectionsContainer.innerHTML = '';

  sections.forEach((section, index) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'report-section fade-in';
    sectionDiv.style.animationDelay = `${index * 0.1}s`;

    if (section.title) {
      const title = document.createElement('h3');
      title.className = 'font-title text-xl font-bold text-amber-900 mb-3';
      title.textContent = section.title;
      sectionDiv.appendChild(title);
    }

    if (section.content) {
      const content = document.createElement('div');
      content.className = 'text-gray-700 leading-relaxed';
      content.innerHTML = formatMarkdown(section.content);
      sectionDiv.appendChild(content);
    }

    sectionsContainer.appendChild(sectionDiv);
  });
}

function parseReportSections(report) {
  // Simple parser for report sections
  // Expect format: ## Section Title\nContent...
  const sections = [];
  const lines = report.split('\n');
  let currentSection = { title: '', content: '' };

  lines.forEach(line => {
    if (line.startsWith('## ')) {
      // Save previous section
      if (currentSection.title || currentSection.content) {
        sections.push(currentSection);
      }
      // Start new section
      currentSection = { title: line.replace('## ', ''), content: '' };
    } else {
      currentSection.content += line + '\n';
    }
  });

  // Add last section
  if (currentSection.title || currentSection.content) {
    sections.push(currentSection);
  }

  // If no sections found, treat entire report as one section
  if (sections.length === 0) {
    sections.push({ title: '', content: report });
  }

  return sections;
}

function formatMarkdown(text) {
  // Simple markdown formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p class="mt-3">')
    .replace(/\n/g, '<br>');
}
