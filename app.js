/* ============================================================
   Premium Selection Group — shared JS
   Web components <psg-nav> + <psg-footer> + общая логика страницы.
   ============================================================ */
(function () {
  'use strict';

  // === Helpers ===
  var DEBUG = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(location.hostname) || location.hostname === '';
  var log = DEBUG ? console.log.bind(console, '[PSG]') : function () {};
  var prefersReduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // ============================================================
  // Web components
  // ============================================================

  // SVG-symbol для логотипа — определяется один раз через nav-компонент
  var LOGO_SYMBOL = '' +
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
      '<defs><symbol id="logo-ps-mini" viewBox="0 0 80 90">' +
        '<text x="0" y="62" font-family="Commissioner, sans-serif" font-weight="900" font-size="72" letter-spacing="-2" fill="currentColor">P</text>' +
        '<text x="34" y="86" font-family="Commissioner, sans-serif" font-weight="900" font-size="72" letter-spacing="-2" fill="currentColor">S</text>' +
        '<line x1="52" y1="4" x2="22" y2="88" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"/>' +
      '</symbol></defs>' +
    '</svg>';

  var NAV_HTML = LOGO_SYMBOL + '' +
    '<nav class="nav">' +
      '<a href="index.html" class="nav-logo">' +
        '<svg><use href="#logo-ps-mini"/></svg>' +
        '<span class="wm">PREMIUM<br>SELECTION</span>' +
      '</a>' +
      '<div class="nav-meta">' +
        '<a href="works.html">Работы</a>' +
        '<a href="discover.html">Диагностика</a>' +
        '<a href="index.html#news">Новости</a>' +
        '<a href="about.html">О нас</a>' +
        '<a href="contact.html">Контакты</a>' +
      '</div>' +
    '</nav>';

  var FOOTER_HTML = '' +
    '<footer class="site-footer">' +
      '<div class="ftr-grid">' +
        '<div class="ftr-brand">' +
          '<div class="brand-mark">P/S<span class="dot">.</span></div>' +
          '<p>Premium Selection Group<br>Tashkent · Dubai · 2018</p>' +
        '</div>' +
        '<div class="ftr-col">' +
          '<h5>Направления</h5>' +
          '<ul>' +
            '<li><a href="marketing-research.html">Marketing &amp; Research</a></li>' +
            '<li><a href="production.html">Production</a></li>' +
            '<li><a href="it.html">IT</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="ftr-col">' +
          '<h5>Компания</h5>' +
          '<ul>' +
            '<li><a href="about.html">О нас</a></li>' +
            '<li><a href="works.html">Работы</a></li>' +
            '<li><a href="discover.html">Диагностика</a></li>' +
            '<li><a href="contact.html">Контакты</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="ftr-col">' +
          '<h5>Документы</h5>' +
          '<ul>' +
            '<li><a href="privacy.html">Политика конфиденциальности</a></li>' +
            '<li><a href="cookies.html">Cookies</a></li>' +
            '<li><a href="offer.html">Публичная оферта</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="ftr-bottom">' +
        '<span>© 2026 Premium Selection Group. All rights reserved.</span>' +
        '<span>RU · EN · UZ</span>' +
        '<span>FOOTER</span>' +
      '</div>' +
    '</footer>';

  // Custom element безопасно к двойной регистрации
  function defineElement(name, html) {
    if (customElements.get(name)) return;
    customElements.define(name, class extends HTMLElement {
      connectedCallback() { this.insertAdjacentHTML('afterbegin', html); }
    });
  }
  defineElement('psg-nav', NAV_HTML);
  defineElement('psg-footer', FOOTER_HTML);

  // ============================================================
  // Page logic — вызывается на DOMContentLoaded
  // ============================================================

  function initSubnav() {
    var hero = document.getElementById('hero');
    var subnav = document.getElementById('subnav');
    if (!hero || !subnav || !('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        subnav.classList.toggle('visible', !e.isIntersecting);
      });
    }, { rootMargin: '-100px 0px 0px 0px' });
    obs.observe(hero);
  }

  function initSubnavProgress() {
    var hero = document.getElementById('hero');
    if (!hero) return;
    var ticking = false;
    function update() {
      var heroH = hero.offsetHeight;
      var totalH = document.documentElement.scrollHeight - window.innerHeight - heroH;
      if (totalH <= 0) return;
      var scrolled = Math.max(0, window.scrollY - heroH);
      var pct = Math.min(100, Math.max(0, (scrolled / totalH) * 100));
      document.documentElement.style.setProperty('--scroll-progress', pct.toFixed(2) + '%');
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () { update(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  function initScrollSpy() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.subnav a[href^="#"]');
    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id;
        navLinks.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  function initCounters() {
    var nums = document.querySelectorAll('.numbers .num[data-target]');
    if (!nums.length) return;
    var setStatic = function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var pad = String(target).length === 1 ? 2 : String(target).length;
      el.textContent = String(target).padStart(pad, '0');
    };
    if (!('IntersectionObserver' in window) || prefersReduce) {
      nums.forEach(setStatic);
      return;
    }
    var animate = function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var pad = String(target).length === 1 ? 2 : String(target).length;
      var dur = 1200, t0 = performance.now();
      function step(t) {
        var p = Math.min(1, (t - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased)).padStart(pad, '0');
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
      });
    }, { rootMargin: '-30% 0px -30% 0px' });
    nums.forEach(function (n) { obs.observe(n); });
  }

  // Cases-фильтр. Поддерживает 2 режима:
  //   — single dim: один ряд .cases-filter (без data-dim) + .case[data-tag]
  //   — multi dim: несколько .cases-filter[data-dim="..."] + .case[data-direction][data-industry]...
  function initCasesFilter() {
    var dimFilters = document.querySelectorAll('.cases-filter[data-dim]');
    if (dimFilters.length) {
      initMultiDimFilter(dimFilters);
    } else {
      initSingleDimFilter();
    }
  }

  function initSingleDimFilter() {
    var btns = document.querySelectorAll('.cases-filter button');
    var cases = document.querySelectorAll('.case[data-tag]');
    if (!btns.length || !cases.length) return;
    var active = new Set(['all']);
    function apply() {
      btns.forEach(function (b) {
        b.classList.toggle('active', active.has(b.getAttribute('data-filter')));
      });
      cases.forEach(function (c) {
        var v = c.getAttribute('data-tag');
        c.style.display = (active.has('all') || active.has(v)) ? '' : 'none';
      });
    }
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tag = btn.getAttribute('data-filter');
        if (tag === 'all') {
          active.clear(); active.add('all');
        } else {
          active.delete('all');
          if (active.has(tag)) {
            active.delete(tag);
            if (active.size === 0) active.add('all');
          } else {
            active.add(tag);
          }
        }
        apply();
      });
    });
    apply();
  }

  function initMultiDimFilter(dimFilters) {
    var dims = [];
    var byDim = {};
    var activeByDim = {};
    dimFilters.forEach(function (block) {
      var dim = block.getAttribute('data-dim');
      dims.push(dim);
      byDim[dim] = block.querySelectorAll('button');
      activeByDim[dim] = new Set(['all']);
    });
    var cases = document.querySelectorAll('.case[data-' + dims[0] + ']');
    if (!cases.length) return;
    function apply() {
      dims.forEach(function (dim) {
        byDim[dim].forEach(function (b) {
          b.classList.toggle('active', activeByDim[dim].has(b.getAttribute('data-filter')));
        });
      });
      cases.forEach(function (c) {
        var ok = dims.every(function (dim) {
          var v = c.getAttribute('data-' + dim);
          return activeByDim[dim].has('all') || activeByDim[dim].has(v);
        });
        c.style.display = ok ? '' : 'none';
      });
    }
    dims.forEach(function (dim) {
      byDim[dim].forEach(function (btn) {
        btn.addEventListener('click', function () {
          var tag = btn.getAttribute('data-filter');
          var act = activeByDim[dim];
          if (tag === 'all') {
            act.clear(); act.add('all');
          } else {
            act.delete('all');
            if (act.has(tag)) {
              act.delete(tag);
              if (act.size === 0) act.add('all');
            } else {
              act.add(tag);
            }
          }
          apply();
        });
      });
    });
    apply();
  }

  function initManifestCycling() {
    var el = document.querySelector('.direction-manifest[data-rotate]');
    if (!el || prefersReduce) return;
    var raw = el.getAttribute('data-rotate');
    var phrases;
    try {
      phrases = JSON.parse(raw).map(function (s) { return s.replace(/&nbsp;/g, ' '); });
    } catch (e) { return; }
    if (!Array.isArray(phrases) || phrases.length < 2) return;
    var idx = 0;
    el.textContent = phrases[0];
    setInterval(function () {
      el.classList.add('swap');
      setTimeout(function () {
        idx = (idx + 1) % phrases.length;
        el.textContent = phrases[idx];
        el.classList.remove('swap');
      }, 380);
    }, 4200);
  }

  function initAnchorNoop() {
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest && e.target.closest('a[href="#"]');
      if (a) e.preventDefault();
    });
  }

  function init() {
    log('init', location.pathname);
    try { initSubnav(); }            catch (e) { console.error('[PSG] subnav', e); }
    try { initSubnavProgress(); }    catch (e) { console.error('[PSG] progress', e); }
    try { initScrollSpy(); }         catch (e) { console.error('[PSG] scroll-spy', e); }
    try { initCounters(); }          catch (e) { console.error('[PSG] counters', e); }
    try { initCasesFilter(); }       catch (e) { console.error('[PSG] filter', e); }
    try { initManifestCycling(); }   catch (e) { console.error('[PSG] manifest', e); }
    try { initAnchorNoop(); }        catch (e) { console.error('[PSG] anchor-noop', e); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
