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
    const submitBtn = form.querySelector('button[type="submit"]');
 
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
 
      const name = form.querySelector('#f-name').value.trim();
      const originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправляем…';
      }
      success.classList.remove('show', 'form-error');
 
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
 
        if (response.ok) {
          success.textContent = `Спасибо, ${name || 'заявка принята'}! Мастер свяжется с вами в течение 30 минут, чтобы согласовать удобное время выезда.`;
          success.classList.add('show');
          form.reset();
        } else {
          success.textContent = 'Не получилось отправить заявку. Позвоните нам напрямую по телефону, указанному на сайте — так будет быстрее.';
          success.classList.add('show', 'form-error');
        }
      } catch (err) {
        success.textContent = 'Не получилось отправить заявку — проверьте интернет-соединение и попробуйте ещё раз, либо позвоните нам напрямую.';
        success.classList.add('show', 'form-error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
 
});
 
