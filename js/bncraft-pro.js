/*
 * BNcraft Pro layer
 * Adds shared polish and small working tools without replacing page logic.
 */
(function () {
  'use strict';

  const THEMES = [
    'blue', 'purple', 'red', 'green', 'yellow', 'orange', 'white', 'grayscale', 'pink',
    'aurora', 'cyber', 'emerald', 'volcano', 'ice', 'sunset', 'royal', 'matrix', 'candy', 'midnight'
  ];
  const FONTS = ['default', 'minecraft', 'alt', 'mono', 'rounded', 'display', 'tech', 'headline', 'clean', 'condensed', 'code'];
  const STORAGE_DENSITY = 'bncraft-density-compact';

  const icon = {
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.65" y1="16.65" x2="21" y2="21"/></svg>',
    palette: '<svg viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2a10 10 0 0 0-3 19.5c1.5.25 2-.55 2-1.45v-1.1c0-.8.65-1.45 1.45-1.45H14a8 8 0 0 0 8-8c0-4.15-4.05-7.5-10-7.5z"/></svg>',
    font: '<svg viewBox="0 0 24 24"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
    top: '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>',
    dice: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1"/><circle cx="16" cy="8" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/></svg>',
    grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    help: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    home: '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    download: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    share: '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>'
  };

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function pageName() {
    return (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  }

  function toast(message) {
    let stack = document.getElementById('bncraftToastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'bncraftToastStack';
      stack.className = 'bncraft-toast-stack';
      document.body.appendChild(stack);
    }
    const el = document.createElement('div');
    el.className = 'bncraft-toast';
    el.textContent = message;
    stack.appendChild(el);
    setTimeout(() => el.remove(), 2700);
  }

  function setTheme(theme) {
    if (window.BNcraft && typeof window.BNcraft.setTheme === 'function') window.BNcraft.setTheme(theme);
    else {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('bncraft-theme', theme);
    }
  }

  function setFont(font) {
    if (window.BNcraft && typeof window.BNcraft.setFont === 'function') window.BNcraft.setFont(font);
    else {
      document.documentElement.setAttribute('data-font', font);
      localStorage.setItem('bncraft-font', font);
    }
  }

  function cycleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || localStorage.getItem('bncraft-theme') || 'blue';
    const next = THEMES[(THEMES.indexOf(current) + 1 + THEMES.length) % THEMES.length];
    setTheme(next);
    toast('Theme: ' + labelize(next));
  }

  function cycleFont() {
    const current = document.documentElement.getAttribute('data-font') || localStorage.getItem('bncraft-font') || 'default';
    const next = FONTS[(FONTS.indexOf(current) + 1 + FONTS.length) % FONTS.length];
    setFont(next);
    toast('Font: ' + labelize(next));
  }

  function labelize(value) {
    return String(value || '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function copyText(text, doneMessage) {
    const fallback = () => {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.left = '-999px';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      area.remove();
      toast(doneMessage || 'Copied');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast(doneMessage || 'Copied')).catch(fallback);
    } else {
      fallback();
    }
  }

  function enhanceNav() {
    const page = pageName();
    document.querySelectorAll('a[target="_blank"]').forEach((a) => {
      if (!a.getAttribute('rel')) a.setAttribute('rel', 'noopener noreferrer');
    });
    document.querySelectorAll('.hamburger-menu a[href]').forEach((a) => {
      const href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      if (href && href === page) a.classList.add('bncraft-active-nav');
    });
  }

  function buildDock() {
    if (document.getElementById('bncraftQuickDock')) return;
    const dock = document.createElement('div');
    dock.id = 'bncraftQuickDock';
    dock.className = 'bncraft-quick-dock';
    dock.innerHTML = [
      dockButton('command', 'Search', icon.search),
      dockButton('theme', 'Theme', icon.palette),
      dockButton('font', 'Font', icon.font),
      dockButton('settings', 'Settings', icon.settings),
      dockButton('top', 'Top', icon.top)
    ].join('');
    dock.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-pro-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-pro-action');
      if (action === 'command') openCommand();
      if (action === 'theme') cycleTheme();
      if (action === 'font') cycleFont();
      if (action === 'settings') {
        if (window.BNcraft && typeof BNcraft.openSettingsPanel === 'function') BNcraft.openSettingsPanel();
        else toast('Settings are loading');
      }
      if (action === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(dock);
  }

  function dockButton(action, title, svg) {
    return '<button type="button" class="bncraft-dock-btn" data-pro-action="' + action + '" title="' + title + '" aria-label="' + title + '">' + svg + '</button>';
  }

  function commandItems() {
    const items = [
      { title: 'Home', desc: 'BNcraft start page', icon: icon.home, href: 'index.html', tags: 'home main start' },
      { title: 'Marketplace Mods', desc: 'Browse marketplace mods', icon: icon.download, href: 'Mods.html', tags: 'mods marketplace download' },
      { title: 'Other Mods', desc: 'Browse shaders and add-ons', icon: icon.grid, href: 'other-mods.html', tags: 'other shaders addons' },
      { title: 'Help Center', desc: 'Install and download help', icon: icon.help, href: 'Help-Center.html', tags: 'help workink lootlabs linkvertise' },
      { title: 'Links', desc: 'Social links and contact', icon: icon.share, href: 'Links.html', tags: 'links social discord' },
      { title: 'Focus Search', desc: 'Jump to the page search box', icon: icon.search, action: focusSearch, tags: 'search find filter', kbd: '/' },
      { title: 'Random Mod', desc: 'Open a random visible mod card', icon: icon.dice, action: openRandomMod, tags: 'random mod dice' },
      { title: 'My Favorites', desc: 'Open saved favorite mods', icon: icon.heart, action: openFavorites, tags: 'favorites hearts saved' },
      { title: 'Copy Page Link', desc: 'Copy this page URL', icon: icon.link, action: () => copyText(location.href, 'Page link copied'), tags: 'copy share link' },
      { title: 'Next Theme', desc: 'Cycle the site theme', icon: icon.palette, action: cycleTheme, tags: 'theme color' },
      { title: 'Next Font', desc: 'Cycle the site font', icon: icon.font, action: cycleFont, tags: 'font type' }
    ];
    return items;
  }

  function buildCommandPalette() {
    if (document.getElementById('bncraftCommandOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'bncraftCommandOverlay';
    overlay.className = 'bncraft-command-overlay';
    overlay.innerHTML =
      '<div class="bncraft-command-modal" role="dialog" aria-modal="true" aria-label="BNcraft search">' +
        '<div class="bncraft-command-input-wrap">' + icon.search +
          '<input class="bncraft-command-input" id="bncraftCommandInput" autocomplete="off" placeholder="Search BNcraft...">' +
          '<span class="bncraft-command-kbd">Esc</span>' +
        '</div>' +
        '<div class="bncraft-command-results" id="bncraftCommandResults"></div>' +
      '</div>';
    document.body.appendChild(overlay);

    const input = document.getElementById('bncraftCommandInput');
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeCommand();
    });
    input.addEventListener('input', renderCommandResults);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const first = document.querySelector('.bncraft-command-item');
        if (first) first.click();
      }
    });
    renderCommandResults();
  }

  function openCommand() {
    buildCommandPalette();
    const overlay = document.getElementById('bncraftCommandOverlay');
    const input = document.getElementById('bncraftCommandInput');
    overlay.classList.add('open');
    input.value = '';
    renderCommandResults();
    setTimeout(() => input.focus(), 20);
  }

  function closeCommand() {
    const overlay = document.getElementById('bncraftCommandOverlay');
    if (overlay) overlay.classList.remove('open');
  }

  function renderCommandResults() {
    const input = document.getElementById('bncraftCommandInput');
    const out = document.getElementById('bncraftCommandResults');
    if (!input || !out) return;
    const q = input.value.trim().toLowerCase();
    const results = commandItems().filter((item) => {
      const hay = (item.title + ' ' + item.desc + ' ' + (item.tags || '')).toLowerCase();
      return !q || hay.includes(q);
    }).slice(0, 9);
    out.innerHTML = results.map((item, idx) =>
      '<button type="button" class="bncraft-command-item' + (idx === 0 ? ' active' : '') + '" data-command-index="' + idx + '">' +
        '<span class="bncraft-command-icon">' + item.icon + '</span>' +
        '<span><span class="bncraft-command-title">' + escapeHtml(item.title) + '</span><span class="bncraft-command-desc">' + escapeHtml(item.desc) + '</span></span>' +
        (item.kbd ? '<span class="bncraft-command-kbd">' + item.kbd + '</span>' : '<span></span>') +
      '</button>'
    ).join('') || '<div class="bncraft-command-desc" style="padding:18px">No results</div>';
    out.querySelectorAll('[data-command-index]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = results[Number(btn.getAttribute('data-command-index'))];
        closeCommand();
        if (item.href) location.href = item.href;
        else if (item.action) item.action();
      });
    });
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function bindShortcuts() {
    document.addEventListener('keydown', (e) => {
      const active = document.activeElement;
      const typing = active && ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCommand();
        return;
      }
      if (e.key === 'Escape') closeCommand();
      if (!typing && e.key === '/') {
        const search = document.getElementById('searchInput');
        if (search) {
          e.preventDefault();
          focusSearch();
        }
      }
    });
  }

  function focusSearch() {
    const search = document.getElementById('searchInput');
    if (search) {
      search.focus();
      search.select();
      toast('Search ready');
    } else {
      openCommand();
    }
  }

  function openRandomMod() {
    const cards = Array.from(document.querySelectorAll('.mod-card')).filter((card) => card.offsetParent !== null);
    if (!cards.length) {
      toast('No visible mod cards');
      return;
    }
    cards[Math.floor(Math.random() * cards.length)].click();
  }

  function openFavorites() {
    if (typeof window.showFavorites === 'function') {
      window.showFavorites();
      toast('Favorites opened');
    } else {
      toast('Favorites are available on mod pages');
    }
  }

  function applyDensityFromStorage() {
    document.documentElement.classList.toggle('bncraft-density-compact', localStorage.getItem(STORAGE_DENSITY) === '1');
  }

  function toggleDensity() {
    const next = !document.documentElement.classList.contains('bncraft-density-compact');
    document.documentElement.classList.toggle('bncraft-density-compact', next);
    localStorage.setItem(STORAGE_DENSITY, next ? '1' : '0');
    toast(next ? 'Compact cards on' : 'Comfort cards on');
  }

  function enhanceHome() {
    const hero = document.querySelector('.hero');
    if (!hero || document.querySelector('.bncraft-home-pro')) return;
    const btn = hero.querySelector('.hero-btn');
    const wrap = document.createElement('div');
    wrap.className = 'bncraft-home-pro';
    wrap.innerHTML = [
      homeCard('Mods.html', 'Marketplace Mods', 'Browse the main mod library'),
      homeCard('other-mods.html', 'Other Mods', 'Shaders, add-ons, weapons, survival packs'),
      homeCard('Help-Center.html', 'Help Center', 'Install guides and download link support'),
      homeCard('Links.html', 'Links', 'Discord, socials, and contact')
    ].join('');
    if (btn) btn.insertAdjacentElement('afterend', wrap);
    else hero.appendChild(wrap);

    const services = document.createElement('div');
    services.className = 'bncraft-service-strip';
    services.innerHTML = serviceLink('Work.ink.png', 'Work.ink') + serviceLink('Lootlabs.png', 'LootLabs') + serviceLink('Linkvertise.png', 'Linkvertise');
    wrap.insertAdjacentElement('afterend', services);
  }

  function homeCard(href, title, desc) {
    return '<a class="bncraft-home-card" href="' + href + '"><strong>' + escapeHtml(title) + '</strong><span>' + escapeHtml(desc) + '</span></a>';
  }

  function serviceLink(img, title) {
    return '<a class="bncraft-service-link" href="Help-Center.html#bncraftGatewayGuide"><img src="' + img + '" alt="' + title + '"><span><strong>' + title + '</strong><span>Download guide</span></span></a>';
  }

  function enhanceModPages() {
    applyDensityFromStorage();
    if (document.querySelector('.bncraft-mod-toolbar')) return;
    const target = document.querySelector('.controls') || document.querySelector('.header-section') || document.querySelector('.mod-grid');
    if (!target) return;
    const toolbar = document.createElement('div');
    toolbar.className = 'bncraft-mod-toolbar';
    toolbar.innerHTML =
      toolButton('search', 'Search', icon.search) +
      toolButton('random', 'Random', icon.dice) +
      toolButton('density', 'Density', icon.grid) +
      toolButton('favorites', 'Favorites', icon.heart) +
      '<a class="bncraft-tool-btn" href="Help-Center.html#bncraftGatewayGuide">' + icon.help + '<span>Link Help</span></a>' +
      toolButton('copy', 'Share', icon.link);
    toolbar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-tool]');
      if (!btn) return;
      const action = btn.getAttribute('data-tool');
      if (action === 'search') focusSearch();
      if (action === 'random') openRandomMod();
      if (action === 'density') toggleDensity();
      if (action === 'favorites') openFavorites();
      if (action === 'copy') copyText(location.href, 'Page link copied');
    });
    target.insertAdjacentElement('beforebegin', toolbar);
  }

  function toolButton(action, label, svg) {
    return '<button type="button" class="bncraft-tool-btn" data-tool="' + action + '">' + svg + '<span>' + label + '</span></button>';
  }

  function enhanceHelp() {
    addHelpSearch();
    buildGatewayGuide();
    if (!document.getElementById('bncraftGuideLangObserver')) {
      const marker = document.createElement('meta');
      marker.id = 'bncraftGuideLangObserver';
      document.head.appendChild(marker);
      new MutationObserver(() => buildGatewayGuide(true)).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }
  }

  function addHelpSearch() {
    if (document.querySelector('.bncraft-help-search')) return;
    const tabs = document.querySelector('.platform-tabs');
    if (!tabs) return;
    const wrap = document.createElement('label');
    wrap.className = 'bncraft-help-search';
    wrap.innerHTML = icon.search + '<input type="search" placeholder="Search help center...">';
    tabs.insertAdjacentElement('afterend', wrap);
    const input = wrap.querySelector('input');
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      document.querySelectorAll('.install-card, .faq-card').forEach((card) => {
        card.classList.toggle('bncraft-hidden-by-help-search', q && !card.textContent.toLowerCase().includes(q));
      });
    });
  }

  function guideCopy() {
    const panel = document.querySelector('.bncraft-service-panel.active');
    if (!panel) return;
    const text = Array.from(panel.querySelectorAll('.bncraft-service-step')).map((step) => {
      const title = step.querySelector('strong') ? step.querySelector('strong').textContent.trim() : '';
      const desc = step.querySelector('span') ? step.querySelector('span').textContent.trim() : '';
      return title + ': ' + desc;
    }).join('\n');
    copyText(text, 'Steps copied');
  }

  function buildGatewayGuide(rebuild) {
    const existing = document.getElementById('bncraftGatewayGuide');
    if (existing && !rebuild) return;
    if (existing) existing.remove();
    const tabs = document.querySelector('.platform-tabs');
    const main = document.querySelector('.help-main');
    if (!tabs && !main) return;
    const lang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
    const tr = lang.startsWith('tr');
    const copyLabel = tr ? 'Adimlari kopyala' : 'Copy steps';
    const section = document.createElement('section');
    section.className = 'bncraft-help-services';
    section.id = 'bncraftGatewayGuide';
    section.innerHTML =
      '<div class="bncraft-help-services-head">' +
        '<div><h2>' + (tr ? 'Indirme Servisleri Rehberi' : 'Download Link Guide') + '</h2>' +
        '<p>' + (tr ? 'Work.ink, LootLabs ve Linkvertise linklerinde ne yapacagini net sekilde gosterir.' : 'Clear steps for Work.ink, LootLabs, and Linkvertise links.') + '</p></div>' +
        '<div class="bncraft-service-tabs">' +
          '<button type="button" class="bncraft-service-tab active" data-service="workink">Work.ink</button>' +
          '<button type="button" class="bncraft-service-tab" data-service="lootlabs">LootLabs</button>' +
          '<button type="button" class="bncraft-service-tab" data-service="linkvertise">Linkvertise</button>' +
        '</div>' +
      '</div>' +
      servicePanel('workink', 'Work.ink', 'Work.ink.png', tr ? 'Kisa reklamli gecis servisi' : 'Short ad gateway', tr ? 'BNcraft linki seni once Work.ink sayfasina alir. Sure veya gorev bittikten sonra dosya linkine gecersin.' : 'BNcraft links may open Work.ink first. After the timer or task is complete, you continue to the file link.', [
        [tr ? 'Sayfanin yuklenmesini bekle' : 'Wait for the page', tr ? 'VPN veya reklam engelleyici sorun cikarirsa kapatip yenile.' : 'If VPN or an ad blocker blocks it, disable it and refresh.'],
        [tr ? 'Devam butonunu bul' : 'Find Continue/Get Link', tr ? 'Sure bitince Continue, Get Link veya benzer buton gorunur.' : 'When the timer ends, a Continue, Get Link, or similar button appears.'],
        [tr ? 'Son dosya sayfasina gec' : 'Open the final file', tr ? 'Son adim genelde MediaFire veya dosya indirme sayfasidir.' : 'The last page is usually MediaFire or the file download host.']
      ], copyLabel) +
      servicePanel('lootlabs', 'LootLabs', 'Lootlabs.png', tr ? 'Kontrol noktali indirme servisi' : 'Checkpoint download gateway', tr ? 'LootLabs bazen kisa gorev veya kontrol noktasi ister. Yanlis reklam sekmelerini kapat, ana sayfada kal.' : 'LootLabs can show a short task or checkpoint. Close unrelated ad tabs and stay on the main page.', [
        [tr ? 'Ana LootLabs sekmesinde kal' : 'Stay on LootLabs', tr ? 'Acilan ekstra reklam sekmeleri dosya linki degildir.' : 'Extra ad tabs are not the real file link.'],
        [tr ? 'Checkpoint adimini tamamla' : 'Complete the checkpoint', tr ? 'Continue veya Unlock gibi butonlari takip et.' : 'Follow buttons such as Continue or Unlock.'],
        [tr ? 'Gercek indirme linkini ac' : 'Open the real download', tr ? 'Son linkte dosya boyutu veya host ismi gorunur.' : 'The final link normally shows the file host or file size.']
      ], copyLabel) +
      servicePanel('linkvertise', 'Linkvertise', 'Linkvertise.png', tr ? 'Reklam destekli link yonlendirme' : 'Ad-supported link redirect', tr ? 'Linkvertise ucretsiz erisim akisiyle calisir. Hesap, sifre veya kart bilgisi gerekmez.' : 'Linkvertise uses a free access flow. You do not need passwords, accounts, or card details.', [
        [tr ? 'Free Access yolunu sec' : 'Choose free access', tr ? 'Ucretli teklifleri atla, ucretsiz devam secenegini kullan.' : 'Skip paid offers and use the free continue option.'],
        [tr ? 'Gorevleri sakin tamamla' : 'Complete the visible steps', tr ? 'Buton aktif olana kadar sayfadaki yonlendirmeyi takip et.' : 'Follow the visible instructions until the continue button activates.'],
        [tr ? 'Dosya hostuna gec' : 'Continue to the file host', tr ? 'Son sayfada dosyayi indir, reklam sekmelerini kapat.' : 'Download from the final host and close unrelated ad tabs.']
      ], copyLabel);
    section.addEventListener('click', (e) => {
      const tab = e.target.closest('[data-service]');
      if (tab) {
        const key = tab.getAttribute('data-service');
        section.querySelectorAll('.bncraft-service-tab').forEach((b) => b.classList.toggle('active', b === tab));
        section.querySelectorAll('.bncraft-service-panel').forEach((p) => p.classList.toggle('active', p.getAttribute('data-service-panel') === key));
      }
      if (e.target.closest('.bncraft-copy-steps')) guideCopy();
    });
    if (tabs) tabs.insertAdjacentElement('afterend', section);
    else main.insertAdjacentElement('beforebegin', section);
    if (location.hash === '#bncraftGatewayGuide') {
      setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
  }

  function servicePanel(key, title, img, tag, desc, steps, copyLabel) {
    return '<div class="bncraft-service-panel' + (key === 'workink' ? ' active' : '') + '" data-service-panel="' + key + '">' +
      '<div class="bncraft-service-card">' +
        '<div class="bncraft-service-brand"><img src="' + img + '" alt="' + title + '"><div><h3>' + title + '</h3><span>' + escapeHtml(tag) + '</span></div></div>' +
        '<p>' + escapeHtml(desc) + '</p>' +
        '<button type="button" class="bncraft-copy-steps">' + escapeHtml(copyLabel) + '</button>' +
      '</div>' +
      '<div class="bncraft-service-steps">' + steps.map((step, i) =>
        '<div class="bncraft-service-step"><div class="bncraft-service-num">' + (i + 1) + '</div><div><strong>' + escapeHtml(step[0]) + '</strong><span>' + escapeHtml(step[1]) + '</span></div></div>'
      ).join('') + '</div>' +
    '</div>';
  }

  function enhanceLinks() {
    if (document.querySelector('.bncraft-links-share')) return;
    const footer = document.querySelector('.links-footer');
    const pageWrap = document.querySelector('.page-wrap');
    if (!pageWrap) return;
    const wrap = document.createElement('div');
    wrap.className = 'bncraft-links-share';
    wrap.innerHTML = '<button type="button" class="bncraft-share-card">' + icon.share + '<span>Copy BNcraft profile link</span></button>';
    wrap.addEventListener('click', () => copyText(location.href, 'Profile link copied'));
    if (footer) footer.insertAdjacentElement('beforebegin', wrap);
    else pageWrap.insertAdjacentElement('afterend', wrap);
  }

  function pageEnhancements() {
    const page = pageName();
    if (page === 'index.html' || page === '') enhanceHome();
    if (page === 'mods.html' || page === 'other-mods.html') enhanceModPages();
    if (page === 'help-center.html') enhanceHelp();
    if (page === 'links.html') enhanceLinks();
  }

  ready(function initBncraftPro() {
    window.BNcraftPro = {
      toast,
      openCommand,
      closeCommand,
      cycleTheme,
      cycleFont,
      toggleDensity
    };
    document.documentElement.classList.add('bncraft-pro-ready');
    applyDensityFromStorage();
    enhanceNav();
    buildDock();
    buildCommandPalette();
    bindShortcuts();
    pageEnhancements();
  });
})();
