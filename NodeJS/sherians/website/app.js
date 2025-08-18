/* ===========================
   EXKO — Shared JS
   Goal: Keep this simple, readable, and safe to change.
   =========================== */

// Run once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initNewsletterForms();
  initGSAP();
});

/* Mobile menu: small, predictable behavior */
function initMenu(){
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('navMenu');
  if(!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

/* Newsletter forms: client-side check + friendly message */
function initNewsletterForms(){
  const forms = document.querySelectorAll('form.newsletter');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const msg = form.querySelector('.form__msg');
      if(!input || !msg) return;

      // Very friendly validation that you can replace with your backend call
      if(!input.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value)){
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = '#c01423';
        return;
      }
      msg.textContent = 'Thanks! You are subscribed.';
      msg.style.color = '#1b7c86';
      input.value = '';
    });
  });
}

/* GSAP: subtle reveals that never change layout */
function initGSAP(){
  if(!(window.gsap && window.ScrollTrigger)) return;
  gsap.registerPlugin(ScrollTrigger);

  // Generic reveal for sections
  gsap.utils.toArray('.section').forEach((sec) => {
    gsap.from(sec, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sec,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Stagger items within lists for a nice touch
  gsap.utils.toArray('.offer__list li, .checklist li, .service__list li, .post, .card--product, .card--workwith').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}
