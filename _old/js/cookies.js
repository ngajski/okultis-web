/* ===================================================
   Okultis — Cookie Consent
   =================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'okultis_cookie_consent';
  var SIX_MONTHS_MS = 182 * 24 * 60 * 60 * 1000;
  var GA_ID = 'G-4X89M6MWM9';
  var RECAPTCHA_KEY = '6LcaSnEsAAAAAA_EtV9FJjCfZ8fLeyLsnF9GeElo';

  function getConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (Date.now() - data.timestamp > SIX_MONTHS_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data;
    } catch (e) {
      return null;
    }
  }

  function setConsent(accepted) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      consent: accepted,
      timestamp: Date.now()
    }));
  }

  function loadGA() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function loadRecaptcha() {
    var script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=' + RECAPTCHA_KEY;
    document.body.appendChild(script);
  }

  function loadScripts() {
    loadGA();
    loadRecaptcha();
  }

  function showBanner() {
    var banner = document.getElementById('cookieBanner');
    if (!banner) return;

    // Small delay so the CSS transition plays
    requestAnimationFrame(function () {
      banner.classList.add('is-visible');
    });

    document.getElementById('cookieAccept').addEventListener('click', function () {
      setConsent(true);
      loadScripts();
      banner.classList.remove('is-visible');
    });

    document.getElementById('cookieReject').addEventListener('click', function () {
      setConsent(false);
      banner.classList.remove('is-visible');
    });
  }

  // --- Init ---
  var consent = getConsent();

  if (consent === null) {
    showBanner();
  } else if (consent.consent === true) {
    loadScripts();
  }
  // If consent.consent === false, do nothing (scripts stay blocked)
})();
