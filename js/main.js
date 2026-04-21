/* =====================================================
   RebornArtistry — main.js
   Dark Mode · RTL · Accordion · Eye Toggle · Tabs
   ===================================================== */

/* ── Dark Mode ── */
function initTheme() {
  const t = localStorage.getItem('ra-theme') || 'light';
  document.documentElement.setAttribute('data-theme', t);
  syncDarkIcons(t);
}
function toggleDark() {
  const cur  = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ra-theme', next);
  syncDarkIcons(next);
}
function syncDarkIcons(t) {
  document.querySelectorAll('.dark-ico').forEach(el => {
    el.className = 'dark-ico bi ' + (t === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill');
  });
}

/* ── RTL ── */
function initDir() {
  const d = localStorage.getItem('ra-dir') || 'ltr';
  document.documentElement.setAttribute('dir', d);
  syncDirIcons(d);
}
function toggleDir() {
  const cur  = document.documentElement.getAttribute('dir');
  const next = cur === 'rtl' ? 'ltr' : 'rtl';
  document.documentElement.setAttribute('dir', next);
  localStorage.setItem('ra-dir', next);
  syncDirIcons(next);
}
function syncDirIcons(d) {
  document.querySelectorAll('.dir-ico').forEach(el => {
    el.textContent = d === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* ── Active Nav ── */
function setActiveNav() {
  const pg = document.body.getAttribute('data-page') || '';
  document.querySelectorAll('[data-pg]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-pg') === pg);
  });
}

/* ── Dropdown (desktop) ── */
function toggleDD(id) {
  const menu = document.getElementById(id);
  const btn  = menu ? menu.previousElementSibling : null;
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  closeAllDDs();
  if (!isOpen) {
    menu.classList.add('open');
    if (btn) btn.classList.add('dd-open');
  }
}
function closeAllDDs() {
  document.querySelectorAll('.dd-menu').forEach(m => {
    m.classList.remove('open');
    const b = m.previousElementSibling;
    if (b) b.classList.remove('dd-open');
  });
}
document.addEventListener('click', e => {
  if (!e.target.closest('.dd-wrap')) closeAllDDs();
});

/* ── Mobile Menu ── */
let mobOpen = false;
function toggleMob() {
  mobOpen = !mobOpen;
  const m = document.getElementById('mmenu');
  const i = document.getElementById('hico');
  const nbar = document.querySelector('.nbar');
  if (m) m.classList.toggle('open', mobOpen);
  if (i) i.className = mobOpen ? 'bi bi-x-lg' : 'bi bi-list';
  if (nbar) nbar.classList.toggle('mob-open', mobOpen);
}
function closeMob() {
  mobOpen = false;
  const m = document.getElementById('mmenu');
  const i = document.getElementById('hico');
  const nbar = document.querySelector('.nbar');
  if (m) m.classList.remove('open');
  if (i) i.className = 'bi bi-list';
  if (nbar) nbar.classList.remove('mob-open');
}
function toggleMobDD(id) {
  const m = document.getElementById(id);
  if (m) m.classList.toggle('open');
}

/* ── Password Eye ── */
function initEyes() {
  document.querySelectorAll('.feye-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.feye-wrap');
      if (!wrap) return;
      const inp = wrap.querySelector('input');
      const ico = btn.querySelector('i');
      if (!inp || !ico) return;
      if (inp.type === 'password') {
        inp.type = 'text';
        ico.className = 'bi bi-eye-slash';
      } else {
        inp.type = 'password';
        ico.className = 'bi bi-eye';
      }
    });
  });
}

/* ── Accordion ── */
function initAccordion() {
  document.querySelectorAll('.acc-hdr').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const body   = hdr.nextElementSibling;
      const isOpen = body && body.classList.contains('open');
      // close all
      document.querySelectorAll('.acc-body').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.acc-hdr').forEach(h => h.classList.remove('open'));
      if (!isOpen && body) {
        body.classList.add('open');
        hdr.classList.add('open');
      }
    });
  });
}

/* ── Dashboard Tabs ── */
function initDashTabs() {
  document.querySelectorAll('.dash-nav-link[data-tab]').forEach(link => {
    link.addEventListener('click', () => {
      const tab = link.getAttribute('data-tab');
      document.querySelectorAll('.dash-nav-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'));
      link.classList.add('active');
      const panel = document.getElementById('tab-' + tab);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ── Fun Fact Counter ── */
function initCounters() {
  const nums = document.querySelectorAll('.fun-num');
  if (!nums.length) return;

  const run = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const step = 16;
    const inc = target / (duration / step);
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= target) {
        cur = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(cur) + suffix;
    }, step);
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        run(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  nums.forEach(el => obs.observe(el));
}

/* ── Scroll Animations ── */
function initScrollAnim() {
  const selectors = [
    { sel: '.phero-c',   cls: 'ra-anim-up' },
    { sel: '.fbox',      cls: 'ra-anim-up' },
    { sel: '.stat-card', cls: 'ra-anim-up' },
    { sel: '.cert-card', cls: 'ra-anim-scale' },
    { sel: '.order-row', cls: 'ra-anim-up' },
    { sel: '.sec .text-center', cls: 'ra-anim-up' },
    { sel: '.tl-item',   cls: 'ra-anim-left' },
    { sel: '.cta-c',     cls: 'ra-anim-up' },
    { sel: '.phero-label', cls: 'ra-anim-in' },
    { sel: '.col-lg-5 .img-cover, .col-lg-6 .img-cover', cls: 'ra-anim-right' },
    { sel: '.eyebrow',   cls: 'ra-anim-in' },
    { sel: '.pbar',      cls: 'ra-anim-in' },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('ra-hidden');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  selectors.forEach(({ sel, cls }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (el.closest('.phero')) return;
      el.classList.add('ra-hidden', cls);
      const delays = ['','ra-d1','ra-d2','ra-d3','ra-d4','ra-d5'];
      el.classList.add(delays[Math.min(i % 5, 5)]);
      observer.observe(el);
    });
  });

  /* Hero section animates immediately on load */
  document.querySelectorAll('.phero-c, .phero-label').forEach(el => {
    el.classList.add('ra-anim-up');
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDir();
  setActiveNav();
  initEyes();
  initAccordion();
  initDashTabs();
  initCounters();
  initScrollAnim();
});
