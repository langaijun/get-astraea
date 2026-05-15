// i18n - Internationalization
// Default: English

const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'oracle-lang';
const SUPPORTED_LANGS = ['en', 'zh'];

let currentLang = DEFAULT_LANG;
let translations = {};

// Initialize language
function initI18n() {
  const savedLang = localStorage.getItem(STORAGE_KEY);
  if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
    currentLang = savedLang;
  }
  return currentLang;
}

// Load translations for a language
async function loadTranslations(lang) {
  if (translations[lang]) {
    return translations[lang];
  }

  try {
    const response = await fetch(`/i18n/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    translations[lang] = await response.json();
    return translations[lang];
  } catch (error) {
    console.error('Error loading translations:', error);
    // Fallback to default language
    if (lang !== DEFAULT_LANG) {
      return loadTranslations(DEFAULT_LANG);
    }
    return {};
  }
}

// Get a translation string by key
function t(key, params = {}) {
  const keys = key.split('.');
  let value = translations[currentLang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  // Handle array values
  if (Array.isArray(value)) {
    return value;
  }

  // Replace params in the string
  if (typeof value === 'string' && params) {
    return value.replace(/\{\{(\w+)\}\}/g, (_, param) => params[param] || '');
  }

  return value;
}

// Set language
async function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) {
    console.warn(`Unsupported language: ${lang}`);
    return;
  }

  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  await loadTranslations(lang);
  updatePageTranslations();
}

// Update all elements with data-i18n attribute
function updatePageTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);

    if (translation !== key) {
      // Handle different element types
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    }
  });
}

// Toggle between languages
function toggleLanguage() {
  const newLang = currentLang === 'en' ? 'zh' : 'en';
  setLanguage(newLang);
}

// Get current language
function getCurrentLang() {
  return currentLang;
}

// Export functions (CommonJS for Node/tests)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initI18n, loadTranslations, t, setLanguage, updatePageTranslations, toggleLanguage, getCurrentLang };
}

// Expose for ES modules (e.g. result.js) — `type="module"` scripts do not share global `function` bindings
if (typeof window !== 'undefined') {
  window.oracleI18n = {
    initI18n,
    loadTranslations,
    t,
    setLanguage,
    updatePageTranslations,
    toggleLanguage,
    getCurrentLang
  };
}
