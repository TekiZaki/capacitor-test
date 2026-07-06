const state = {
  name: localStorage.getItem('username') || '',
  theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  counter: 0,
  quotes: [
    "The best way to predict the future is to create it.",
    "First, solve the problem. Then, write the code.",
    "Make it simple, but significant.",
    "Believing in yourself is the first secret to success.",
    "In the middle of difficulty lies opportunity.",
    "Great things never came from comfort zones.",
    "Capacitor bridges native and web environments seamlessly!"
  ],
  currentQuoteIndex: 0
};

const elements = {
  greeting: document.getElementById('greeting'),
  themeToggle: document.getElementById('theme-toggle'),
  nameInput: document.getElementById('name-input'),
  tabButtons: document.querySelectorAll('.tab-btn'),
  tabContents: document.querySelectorAll('.tab-content'),
  quoteText: document.getElementById('quote-text'),
  quoteBtn: document.getElementById('quote-btn'),
  counterValue: document.getElementById('counter-value'),
  decrementBtn: document.getElementById('decrement-btn'),
  incrementBtn: document.getElementById('increment-btn'),
  diagStatus: document.getElementById('diag-status'),
  diagPlatform: document.getElementById('diag-platform'),
  diagScreen: document.getElementById('diag-screen'),
  diagBattery: document.getElementById('diag-battery'),
  refreshDiagBtn: document.getElementById('refresh-diag-btn')
};

function init() {
  applyTheme(state.theme);
  setupNameInput();
  setupTabs();
  setupQuote();
  setupCounter();
  setupDiagnostics();
  setupThemeToggle();
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  elements.themeToggle.querySelector('.icon').textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}

function setupThemeToggle() {
  elements.themeToggle.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(state.theme);
  });
}

function setupNameInput() {
  if (state.name) {
    elements.nameInput.value = state.name;
    updateGreeting(state.name);
  }

  elements.nameInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    state.name = value;
    localStorage.setItem('username', value);
    updateGreeting(value);
  });
}

function updateGreeting(name) {
  elements.greeting.textContent = name ? `Hello, ${name}!` : 'Welcome, Explorer!';
}

function setupTabs() {
  elements.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      elements.tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      elements.tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
          content.classList.add('active');
        }
      });

      if (tabId === 'diagnostics') {
        updateDiagnostics();
      }
    });
  });
}

function setupQuote() {
  elements.quoteBtn.addEventListener('click', () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * state.quotes.length);
    } while (nextIndex === state.currentQuoteIndex && state.quotes.length > 1);

    state.currentQuoteIndex = nextIndex;
    
    elements.quoteText.style.opacity = '0';
    setTimeout(() => {
      elements.quoteText.textContent = `"${state.quotes[nextIndex]}"`;
      elements.quoteText.style.opacity = '1';
    }, 150);
  });
}

function setupCounter() {
  elements.incrementBtn.addEventListener('click', () => {
    state.counter++;
    elements.counterValue.textContent = state.counter;
  });

  elements.decrementBtn.addEventListener('click', () => {
    state.counter--;
    elements.counterValue.textContent = state.counter;
  });
}

// Check standard web client stats
function setupDiagnostics() {
  elements.refreshDiagBtn.addEventListener('click', updateDiagnostics);
}

function updateDiagnostics() {
  const isOnline = navigator.onLine;
  elements.diagStatus.textContent = isOnline ? '🟢 Online' : '🔴 Offline';
  elements.diagStatus.style.color = isOnline ? '#10b981' : '#ef4444';

  let platform = 'Web Browser';
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) {
    platform = 'Android WebView';
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    platform = 'iOS WebKit';
  }
  elements.diagPlatform.textContent = platform;

  elements.diagScreen.textContent = `${window.screen.width} × ${window.screen.height}`;

  if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
      const level = Math.round(battery.level * 100);
      const charging = battery.charging ? ' (Charging)' : '';
      elements.diagBattery.textContent = `${level}%${charging}`;
    }).catch(() => {
      elements.diagBattery.textContent = 'N/A';
    });
  } else {
    elements.diagBattery.textContent = 'N/A';
  }
}

document.addEventListener('DOMContentLoaded', init);