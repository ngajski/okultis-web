/* ===================================================
   Okultis — Main JS
   =================================================== */

(function () {
  'use strict';

  // --- DOM refs ---
  const header     = document.getElementById('header');
  const hamburger  = document.getElementById('hamburger');
  const nav        = document.getElementById('nav');
  const navLinks   = document.querySelectorAll('.nav__link');
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  // Create overlay element for mobile nav
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);

  // --- Mobile menu toggle ---
  function openMenu() {
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    nav.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Close menu when a nav link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
      var top    = section.offsetTop - 100;
      var bottom = top + section.offsetHeight;
      var id     = section.getAttribute('id');
      var link   = document.querySelector('.nav__link[href="#' + id + '"]');
      if (link) {
        if (scrollY >= top && scrollY < bottom) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // --- Scroll-triggered fade-in animations ---
  var fadeEls = document.querySelectorAll('.section__title, .card, .clients__item, .about__content, .contact__intro, .form');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(function (el) {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // --- Contact form ---
  function validateField(input, errorEl, message) {
    if (!input.value.trim()) {
      input.classList.add('is-invalid');
      errorEl.textContent = message;
      return false;
    }
    input.classList.remove('is-invalid');
    errorEl.textContent = '';
    return true;
  }

  function validateEmail(input, errorEl) {
    if (!input.value.trim()) {
      input.classList.add('is-invalid');
      errorEl.textContent = 'Email is required.';
      return false;
    }
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(input.value.trim())) {
      input.classList.add('is-invalid');
      errorEl.textContent = 'Please enter a valid email.';
      return false;
    }
    input.classList.remove('is-invalid');
    errorEl.textContent = '';
    return true;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameInput    = document.getElementById('name');
    var emailInput   = document.getElementById('email');
    var messageInput = document.getElementById('message');
    var nameError    = document.getElementById('nameError');
    var emailError   = document.getElementById('emailError');
    var messageError = document.getElementById('messageError');

    var v1 = validateField(nameInput, nameError, 'Name is required.');
    var v2 = validateEmail(emailInput, emailError);
    var v3 = validateField(messageInput, messageError, 'Message is required.');

    if (!v1 || !v2 || !v3) return;

    // Submit via AJAX
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    formStatus.textContent = '';
    formStatus.className = 'form__status';

    var formData = new FormData(form);

    fetch('send.php', {
      method: 'POST',
      body: formData,
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          formStatus.textContent = data.message || 'Message sent! We\'ll be in touch soon.';
          formStatus.classList.add('form__status--success');
          form.reset();
        } else {
          formStatus.textContent = data.message || 'Something went wrong. Please try again.';
          formStatus.classList.add('form__status--error');
        }
      })
      .catch(function () {
        formStatus.textContent = 'Network error. Please try again later.';
        formStatus.classList.add('form__status--error');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      });
  });

  // Clear validation on input
  document.querySelectorAll('.form__input').forEach(function (input) {
    input.addEventListener('input', function () {
      this.classList.remove('is-invalid');
      var errorEl = this.parentElement.querySelector('.form__error');
      if (errorEl) errorEl.textContent = '';
    });
  });
})();
