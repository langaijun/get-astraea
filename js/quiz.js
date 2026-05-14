// Quiz Logic

let currentQuestion = 0;
let answers = [];
let currentLang = 'en';

// Initialize quiz
document.addEventListener('DOMContentLoaded', async () => {
  await initQuiz();
});

async function initQuiz() {
  // Initialize language
  currentLang = initI18n();

  // Load translations
  await loadTranslations('en');
  await loadTranslations('zh');

  // Check if user is retaking quiz
  const storedAnswers = sessionStorage.getItem('oracle-answers');
  if (storedAnswers) {
    // Clear for fresh start
    sessionStorage.removeItem('oracle-answers');
    sessionStorage.removeItem('oracle-result');
  }

  // Initialize answers array
  answers = new Array(questions.length).fill(null);

  // Setup language toggle
  document.getElementById('langToggle').addEventListener('click', () => {
    toggleLanguage();
    updateQuizUI();
  });

  // Setup next button
  document.getElementById('nextBtn').addEventListener('click', handleNext);

  // Render first question
  renderQuestion();
}

function updateQuizUI() {
  currentLang = getCurrentLang();
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestion];
  const lang = currentLang;

  // Update question number
  document.getElementById('currentQ').textContent = currentQuestion + 1;
  document.getElementById('totalQ').textContent = questions.length;

  // Update progress bar
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById('progressBar').style.width = `${progress}%`;
  document.getElementById('progressPercent').textContent = `${Math.round(progress)}%`;

  // Update question text
  const questionText = question.question[lang] || question.question.en;
  document.getElementById('questionText').textContent = questionText;

  // Update button text
  const nextBtn = document.getElementById('nextBtn');
  if (currentQuestion === questions.length - 1) {
    const submitText = t('quiz.submit');
    nextBtn.querySelector('span').textContent = submitText || 'Reveal My Oracle';
  } else {
    const nextText = t('quiz.next');
    nextBtn.querySelector('span').textContent = nextText || 'Next';
  }

  // Render options
  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const optionText = option.text[lang] || option.text.en;
    const isSelected = answers[currentQuestion] === index;

    const button = document.createElement('button');
    button.className = `option-btn w-full text-left px-6 py-4 rounded-xl border-2 border-amber-200 bg-white text-gray-700 hover:border-amber-400 ${isSelected ? 'selected' : ''}`;
    button.innerHTML = `
      <span class="font-medium">${optionText}</span>
    `;
    button.addEventListener('click', () => selectOption(index));
    optionsContainer.appendChild(button);
  });

  // Update next button state
  updateNextButton();
}

function selectOption(index) {
  answers[currentQuestion] = index;
  renderQuestion();
}

function updateNextButton() {
  const nextBtn = document.getElementById('nextBtn');
  if (answers[currentQuestion] !== null) {
    nextBtn.disabled = false;
    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    nextBtn.disabled = true;
    nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }
}

function handleNext() {
  if (answers[currentQuestion] === null) return;

  // Save answers to sessionStorage
  sessionStorage.setItem('oracle-answers', JSON.stringify(answers));

  if (currentQuestion < questions.length - 1) {
    // Next question
    currentQuestion++;
    document.getElementById('questionContainer').classList.remove('fade-in');
    setTimeout(() => {
      renderQuestion();
      document.getElementById('questionContainer').classList.add('fade-in');
    }, 50);
  } else {
    // Calculate result and navigate
    calculateResult();
  }
}

function calculateResult() {
  // Initialize scores for each god
  const scores = {};
  gods.forEach(god => {
    scores[god.id] = 0;
  });

  // Calculate scores based on answers
  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex];
    const option = question.options[answerIndex];

    if (option.scores) {
      Object.entries(option.scores).forEach(([godId, score]) => {
        scores[godId] += score;
      });
    }
  });

  // Find god with highest score
  let maxScore = 0;
  let resultGod = gods[0];

  gods.forEach(god => {
    if (scores[god.id] > maxScore) {
      maxScore = scores[god.id];
      resultGod = god;
    }
  });

  // Save result to sessionStorage
  sessionStorage.setItem('oracle-result', JSON.stringify(resultGod));

  // Redirect to result page
  window.location.href = 'result.html';
}
