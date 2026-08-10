// ТРИАЛХОЛОД — общие скрипты сайта

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- бургер-меню ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  /* ---------- стрелка манометра в hero ---------- */
  const needle = document.getElementById('gaugeNeedle');
  if (needle) {
    requestAnimationFrame(() => {
      needle.style.transition = 'transform 1.4s cubic-bezier(.22,1.4,.36,1)';
      needle.style.transform = 'rotate(58deg)';
    });
  }

  /* ---------- FAQ аккордеон ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  /* ---------- статьи "читать полностью" ---------- */
  document.querySelectorAll('.read-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.article-card');
      const full = card.querySelector('.article-full');
      const isOpen = card.classList.contains('open');
      card.classList.toggle('open');
      full.style.maxHeight = isOpen ? null : full.scrollHeight + 40 + 'px';
      btn.textContent = isOpen ? 'Читать статью →' : 'Свернуть ↑';
    });
  });

  /* ---------- форма заявки на ремонт ---------- */
  const form = document.getElementById('repairForm');
  if (form) {
    const success = document.getElementById('formSuccess');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const name = form.querySelector('#f-name').value.trim();
      success.textContent = `Спасибо, ${name || 'заявка принята'}! Мастер свяжется с вами в течение 30 минут, чтобы согласовать удобное время выезда.`;
      success.classList.add('show');
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

});
