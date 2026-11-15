/* CookiesEncode site scripts: header, mobile nav, reveal on scroll */
(function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav__toggle');

  // Header background on scroll
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // Mobile: tap a dropdown parent to expand its links
  document.querySelectorAll('.nav__item > button.nav__link').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!header.classList.contains('is-open')) return;
      const item = btn.parentElement;
      const expanded = item.classList.toggle('is-expanded');
      btn.setAttribute('aria-expanded', expanded);
    });
  });

  // Close menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('is-open')) {
      header.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Reveal on scroll
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('is-in'));
  }

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
