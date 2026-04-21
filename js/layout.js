/* =====================================================
   RebornArtistry — layout.js
   Injects consistent header & footer on every page
   ===================================================== */

const SITE_NAV = [
  {
    label: 'Home', pg: 'home1', href: 'index.html',
    sub: [
      { label: '✦ Classic Studio',  pg: 'home1', href: 'index.html'  },
      { label: '✦ Artisan Edition', pg: 'home2', href: 'home2.html'  },
    ]
  },
  { label: 'About',      pg: 'about',      href: 'about.html'      },
 { label: 'Process',    pg: 'process',    href: 'process.html'    },
  { label: 'Commission', pg: 'commission', href: 'commission.html' },
  { label: 'Care Guide', pg: 'care',       href: 'care.html'       },
  { label: 'Community',  pg: 'community',  href: 'community.html'  },
  { label: 'Contact',    pg: 'contact',    href: 'contact.html'    },
  { label: 'Dashboard',    pg: 'Dashboard',    href: 'dashboard.html'    },
  
];

const LOGO_IMG = 'images/reborn-logo.png';

function buildDesktopNav(curPg) {
  return SITE_NAV.map(n => {
    if (n.sub) {
      const anyActive = n.sub.some(s => s.pg === curPg);
      const items = n.sub.map(s =>
        `<a class="dd-item${s.pg===curPg?' active':''}" href="${s.href}" data-pg="${s.pg}" onclick="closeMob()">${s.label}</a>`
      ).join('');
      return `<div class="dd-wrap">
        <span class="nl${anyActive?' active':''}" onclick="toggleDD('ddn-home')" data-pg="${n.pg}">
          ${n.label} <i class="ci bi bi-chevron-down"></i>
        </span>
        <div class="dd-menu" id="ddn-home">${items}</div>
      </div>`;
    }
    return `<a class="nl${n.pg===curPg?' active':''}" href="${n.href}" data-pg="${n.pg}">${n.label}</a>`;
  }).join('');
}

function buildMobileNav(curPg) {
  return SITE_NAV.map(n => {
    if (n.sub) {
      const items = n.sub.map(s =>
        `<a class="dd-item${s.pg===curPg?' active':''}" href="${s.href}" data-pg="${s.pg}" onclick="closeMob()">${s.label}</a>`
      ).join('');
      return `<div class="dd-wrap">
        <span class="nl nl-has-dd${n.sub.some(s=>s.pg===curPg)?' active':''}" onclick="toggleMobDD('mob-ddn-home')">
          ${n.label} <i class="ci bi bi-chevron-down"></i>
        </span>
        <div class="mob-dd-menu" id="mob-ddn-home">${items}</div>
      </div>`;
    }
    return `<a class="nl${n.pg===curPg?' active':''}" href="${n.href}" data-pg="${n.pg}" onclick="closeMob()">${n.label}</a>`;
  }).join('');
}

function injectHeader() {
  const ph = document.getElementById('header-ph');
  if (!ph) return;
  const curPg = document.body.getAttribute('data-page') || '';

  ph.outerHTML = `
  <nav class="nbar" style="position:sticky;top:0;z-index:1000;">
    <div class="container-fluid">
      <div class="nbar-inner">
        <!-- BRAND (always links home) -->
        <a class="nbrand" href="index.html">
          <div class="nbrand-logo">
            <img src="${LOGO_IMG}" alt="RebornArtistry">
          </div>
        </a>

        <!-- DESKTOP NAV -->
        <nav class="dnav">${buildDesktopNav(curPg)}</nav>

        <!-- CONTROLS -->
        <div class="ncontrols">
          <button class="icon-btn" onclick="toggleDir()" title="Toggle RTL/LTR">
            <span class="dir-ico" style="font-size:9px;font-weight:700;letter-spacing:.05em;">RTL</span>
          </button>
          <button class="icon-btn" onclick="toggleDark()" title="Toggle Dark Mode">
            <i class="dark-ico bi bi-moon-stars-fill"></i>
          </button>
          <a class="nav-login" href="login.html">Login</a>
          <button class="hbtn" onclick="toggleMob()" aria-label="Menu">
            <i class="bi bi-list" id="hico"></i>
          </button>
        </div>
      </div><!-- /nbar-inner -->

      <!-- MOBILE MENU -->
      <div class="mmenu" id="mmenu">
        ${buildMobileNav(curPg)}
        <div class="mctrl">
          <button class="icon-btn" onclick="toggleDir()">
            <span class="dir-ico" style="font-size:9px;font-weight:700;letter-spacing:.05em;">RTL</span>
          </button>
          <button class="icon-btn" onclick="toggleDark()">
            <i class="dark-ico bi bi-moon-stars-fill"></i>
          </button>
          <a class="nav-login" href="login.html" onclick="closeMob()">Login</a>
        </div>
      </div>
    </div><!-- /container-fluid -->
  </nav>`;
}

function injectFooter() {
  const ph = document.getElementById('footer-ph');
  if (!ph) return;

  ph.outerHTML = `
  <footer class="foot">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-4 col-md-6">
          <a href="index.html" style="display:inline-block;text-decoration:none;margin-bottom:.6rem;">
            <img src="images/reborn-white.png" alt="RebornArtistry" style="height:70px;width:auto;object-fit:contain;">
          </a>
          <p class="f-desc">Handcrafted silicone & reborn dolls made with love and extraordinary artistry. Every piece a quiet miracle.</p>
          <div class="socials" style="margin-top:1.4rem;">
            <a class="soc" href="#"><i class="bi bi-instagram"></i></a>
            <a class="soc" href="#"><i class="bi bi-pinterest"></i></a>
            <a class="soc" href="#"><i class="bi bi-facebook"></i></a>
            <a class="soc" href="#"><i class="bi bi-youtube"></i></a>
            <a class="soc" href="#"><i class="bi bi-tiktok"></i></a>
          </div>
        </div>

        <div class="col-lg-2 col-md-3 col-6">
          <p class="f-title">Studio</p>
          <ul class="f-list">
            <li><a href="index.html">Home Classic</a></li>
            <li><a href="home2.html">Home Artisan</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="process.html">Our Process</a></li>
            <li><a href="community.html">Community</a></li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-3 col-6">
          <p class="f-title">Services</p>
          <ul class="f-list">
            <li><a href="commission.html">Commission</a></li>
            <li><a href="care.html">Care Guide</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="dashboard.html">Dashboard</a></li>
            
            
          </ul>
        </div>

        <div class="col-lg-4 col-md-6">
          <p class="f-title">Newsletter</p>
          <p style="color:rgba(255,255,255,.42);margin-bottom:1rem;font-size:17px!important;">New dolls, waitlist openings & artist updates — straight to your inbox.</p>
          <div class="f-news">
            <input type="email" class="f-news-in" placeholder="your@email.com">
            <button class="btn-rose" style="flex-shrink:0;">Subscribe</button>
          </div>
        </div>
      </div>

      <div class="f-bottom">
        <p>© 2026 RebornArtistry. All rights reserved. Crafted with love in Chennai.</p>
      </div>
    </div>
  </footer>`;
}

function injectScrollTop() {
  const btn = document.createElement('button');
  btn.id = 'scroll-top-btn';
  btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  btn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
  injectScrollTop();
});
