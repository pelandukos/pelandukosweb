(function () {
  const storageKey = 'pelanduk_lang';
  const supported = ['en', 'ms'];

  function getLangFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    return supported.includes(lang) ? lang : null;
  }

  function resolveLang() {
    const fromQuery = getLangFromQuery();
    if (fromQuery) {
      localStorage.setItem(storageKey, fromQuery);
      return fromQuery;
    }

    const stored = localStorage.getItem(storageKey);
    if (supported.includes(stored)) {
      return stored;
    }

    const browserLang = (navigator.language || 'en').slice(0, 2);
    return supported.includes(browserLang) ? browserLang : 'en';
  }

  function updateLangLinks(lang) {
    document.querySelectorAll('[data-preserve-lang]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#')) {
        return;
      }
      const url = new URL(href, window.location.origin);
      url.searchParams.set('lang', lang);
      link.setAttribute('href', url.pathname + url.search);
    });
  }

  function applyI18n(lang) {
    const dict = window.PAGE_I18N || {};
    const fallback = dict.en || {};
    const selected = dict[lang] || fallback;

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = selected[key] || fallback[key];
      if (value) {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const value = selected[key] || fallback[key];
      if (value) {
        el.innerHTML = value;
      }
    });

    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-set-lang') === lang);
    });

    const titleKey = 'metaTitle';
    if (selected[titleKey] || fallback[titleKey]) {
      document.title = selected[titleKey] || fallback[titleKey];
    }

    updateLangLinks(lang);
  }

  function setActiveLinks() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-page-link]').forEach((link) => {
      if (link.getAttribute('data-page-link') === page) {
        link.classList.add('active');
      }
    });
  }

  function initLanguageButtons() {
    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', function () {
        const lang = this.getAttribute('data-set-lang');
        if (!supported.includes(lang)) {
          return;
        }
        localStorage.setItem(storageKey, lang);
        applyI18n(lang);
      });
    });
  }

  const lang = resolveLang();
  setActiveLinks();
  initLanguageButtons();
  applyI18n(lang);
})();
