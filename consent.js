(() => {
  'use strict';

  /* --------------------------------------------------------
   *  CONFIG
   * ------------------------------------------------------ */

  const current = document.currentScript;
  const cfg = current?.dataset || {};

  const GTM_ID   = (cfg.gtm || 'GTM-XXXX').trim();
  const PRIV_URL = (cfg.privacy || '#').trim();
  const IMPR_URL = (cfg.imprint || '#').trim();
  const BRAND    = (cfg.brand || '#000').trim();


  /* --------------------------------------------------------
   *  DATA LAYER / GTAG
   * ------------------------------------------------------ */

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    dataLayer.push(arguments);
  };

  (function initializeConsentDefault() {
    const exists = window.dataLayer.some(e => e?.[0] === 'consent' && e?.[1] === 'default');
    if (!exists) {
      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500
      });
    }
  })();


  /* --------------------------------------------------------
   *  LOAD GTM IMMEDIATELY (unchanged)
   * ------------------------------------------------------ */

  function loadGTM(id) {
    if (!id || id === 'GTM-XXXX') {
      console.warn('[Consent] GTM-ID fehlt oder = GTM-XXXX – GTM lädt nicht.');
      return;
    }
    if (window.__gtm_loaded) return;

    window.__gtm_loaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
  }

  loadGTM(GTM_ID);


  /* --------------------------------------------------------
   *  CSS
   * ------------------------------------------------------ */

  const CSS = `
:root{
  --brand:${BRAND};
  --surface:#fff;
  --surface-variant:#e5e7eb;
  --on-surface:#111;
  --tone:#e8f0fe;
  --on-tone:#0b1324;
  --radius:14px;
  --shadow:0 15px 35px rgba(0,0,0,.15);
}

#consent-banner[hidden]{display:none!important}

.cb-overlay{
  position:fixed;
  inset:0;
  background:#000;
  opacity:.35;
  z-index:1079;
}

.cb-box{
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  z-index:1080;
  background:var(--surface);
  color:var(--on-surface);
  border-radius:var(--radius);
  border:1px solid var(--surface-variant);
  box-shadow:var(--shadow);
  width:min(92vw,640px);
  opacity:0;
  transition:opacity .25s ease;
}

.cb-box.visible{
  opacity:1;
}

.cb-inner{
  padding:1.35rem;
}

#cb-title{
  margin:0 0 .5rem;
  font-size:1.35rem;
  font-weight:700;
}

.cb-desc{
  margin:.35rem 0 1rem;
  font-size:1rem;
}

.cb-desc a{
  color:var(--brand);
  text-decoration:underline;
}

.cb-actions{
  display:flex;
  flex-direction:column;
  gap:.6rem;
  margin:1rem 0;
}

@media (min-width:560px){
  .cb-actions{
    flex-direction:row;
  }
}

.cb-btn{
  display:flex;
  justify-content:center;
  align-items:center;
  padding:12px 14px;
  border-radius:10px;
  font-weight:600;
  border:1px solid transparent;
  cursor:pointer;
}

.cb-btn-primary{
  background:var(--brand);
  color:#fff;
  border-color:var(--brand);
  box-shadow:0 0 6px rgba(0,0,0,.15);
}

.cb-btn-tonal{
  background:var(--tone);
  color:var(--on-tone);
}

.cb-btn-outline{
  border-color:var(--brand);
  color:var(--brand);
}

/* Collapsible settings */
#cb-settings-toggle {
  margin: .5rem 0 .75rem 0;
}

#cb-switches-wrapper {
  transition: all .25s ease;
}

#cb-switches-wrapper[hidden] {
  opacity:0;
  max-height:0;
  overflow:hidden;
}

#cb-switches-wrapper:not([hidden]) {
  opacity:1;
  max-height:500px;
}

.cb-switches{
  display:grid;
  gap:.6rem;
  margin:.25rem 0 .5rem;
}

.cb-switch{
  display:flex;
  align-items:center;
  gap:.6rem;
  padding:.55rem .8rem;
  background:#fff;
  border:1px solid var(--surface-variant);
  border-radius:10px;
}

.cb-switch input{
  width:20px;
  height:20px;
  accent-color:var(--brand);
}

.cb-links{
  margin-top:12px;
  text-align:center;
  font-size:.9rem;
}
  `.trim();


  /* --------------------------------------------------------
   *  HTML TEMPLATE (Variante A)
   * ------------------------------------------------------ */

  const HTML = `
<div id="consent-banner" hidden aria-live="polite">
  <div class="cb-overlay" role="presentation"></div>

  <div class="cb-box" role="dialog" aria-modal="true" aria-labelledby="cb-title" aria-describedby="cb-desc">
    <div class="cb-inner">

      <h2 id="cb-title">Datenschutz Einstellungen</h2>

      <p id="cb-desc" class="cb-desc">
        Wir verwenden Cookies, um unsere Website zuverlässig zu betreiben.
        Mit Ihrer Zustimmung nutzen wir Cookies für <strong>Statistiken</strong> und <strong>Marketing</strong>.
        Sie können Ihre Auswahl jederzeit ändern.
      </p>

      <div class="cb-actions">
        <button id="btn-accept-all" class="cb-btn cb-btn-primary">Alle akzeptieren</button>
        <button id="btn-decline-all" class="cb-btn cb-btn-outline">Nur essenziell</button>
      </div>

      <button id="cb-settings-toggle" class="cb-btn cb-btn-tonal" type="button">
        Einstellungen anzeigen
      </button>

      <div id="cb-switches-wrapper" hidden>
        <div class="cb-switches" role="group" aria-label="Einwilligungsoptionen">

          <label class="cb-switch">
            <input type="checkbox" id="toggle-essential" checked disabled>
            Essenziell (immer aktiv)
          </label>

          <label class="cb-switch">
            <input type="checkbox" id="toggle-statistics">
            Statistiken
          </label>

          <label class="cb-switch">
            <input type="checkbox" id="toggle-marketing">
            Marketing
          </label>

          <button id="btn-accept-selection" class="cb-btn cb-btn-tonal">
            Auswahl speichern
          </button>

        </div>
      </div>

      <p class="cb-links">
        <a href="${PRIV_URL}" rel="nofollow">Datenschutzerklärung</a> ·
        <a href="${IMPR_URL}" rel="nofollow">Impressum</a>
      </p>

    </div>
  </div>
</div>
`.trim();


  /* --------------------------------------------------------
   *  STORAGE
   * ------------------------------------------------------ */

  const CONSENT_KEY = 'gp_consent_prefs_v3';
  const CONSENT_SET = 'gp_consent_set_v3';
  const COOKIE_DAYS = 180;

  function setCookie(name, value) {
    const d = new Date();
    d.setTime(d.getTime() + COOKIE_DAYS * 86400000);
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax; Secure`;
  }

  function removeCookie(n) {
    document.cookie = `${encodeURIComponent(n)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax; Secure`;
  }

  function consentModeFrom(p) {
    return {
      ad_storage: p.marketing ? 'granted' : 'denied',
      ad_user_data: p.marketing ? 'granted' : 'denied',
      ad_personalization: p.marketing ? 'granted' : 'denied',
      analytics_storage: p.statistics ? 'granted' : 'denied'
    };
  }

  function persist(p) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(p));
    localStorage.setItem(CONSENT_SET, 'true');

    setCookie('consent_statistics', p.statistics ? 'granted' : 'denied');
    setCookie('consent_marketing',  p.marketing  ? 'granted' : 'denied');
  }

  function applyConsent(prefs, source) {
    const mode = consentModeFrom(prefs);

    gtag('consent', 'update', mode);

    dataLayer.push({
      event: source || 'consent_update',
      consent_categories: {
        essential: true,
        statistics: prefs.statistics,
        marketing: prefs.marketing
      },
      consent_mode: mode
    });

    persist(prefs);
  }


  /* --------------------------------------------------------
   *  UI INIT
   * ------------------------------------------------------ */

  function injectBanner() {
    // CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // HTML
    const wrap = document.createElement('div');
    wrap.innerHTML = HTML;
    const banner = wrap.firstElementChild;
    document.body.appendChild(banner);

    // Elements
    const box        = banner.querySelector('.cb-box');
    const stats      = banner.querySelector('#toggle-statistics');
    const mkt        = banner.querySelector('#toggle-marketing');
    const btnAll     = banner.querySelector('#btn-accept-all');
    const btnSel     = banner.querySelector('#btn-accept-selection');
    const btnNo      = banner.querySelector('#btn-decline-all');

    const toggleBtn  = banner.querySelector('#cb-settings-toggle');
    const wrapper    = banner.querySelector('#cb-switches-wrapper');

    // Restore?
    const stored = localStorage.getItem(CONSENT_SET) === 'true';

    if (stored) {
      try {
        const prefs = JSON.parse(localStorage.getItem(CONSENT_KEY) || '{}');
        stats.checked = !!prefs.statistics;
        mkt.checked   = !!prefs.marketing;
        applyConsent(prefs, 'consent_restore');
        banner.hidden = true;
        document.body.style.overflow = '';
      } catch {
        banner.hidden = false;
      }
    } else {
      banner.hidden = false;

      requestAnimationFrame(() => {
        const isVisible = banner.offsetParent !== null;
        
        if (!isVisible) {
          console.warn('[Consent] Banner blockiert – kein Scroll-Lock.');
          document.body.style.overflow = '';
          return;
        }

        document.body.style.overflow = 'hidden';
        box.classList.add('visible');
      });
    }


    /* -------- BUTTONS -------- */

    btnAll.addEventListener('click', () => {
      const prefs = { statistics: true, marketing: true };
      applyConsent(prefs, 'consent_accept_all');
      closeBanner(banner);
    });

    btnSel.addEventListener('click', () => {
      const prefs = { statistics: stats.checked, marketing: mkt.checked };
      applyConsent(prefs, 'consent_accept_selection');
      closeBanner(banner);
    });

    btnNo.addEventListener('click', () => {
      const prefs = { statistics: false, marketing: false };
      applyConsent(prefs, 'consent_decline_all');
      closeBanner(banner);
    });


    /* -------- COLLAPSIBLE SETTINGS -------- */

    toggleBtn.addEventListener('click', () => {
      const open = !wrapper.hidden;

      if (open) {
        wrapper.hidden = true;
        toggleBtn.textContent = 'Einstellungen anzeigen';
      } else {
        wrapper.hidden = false;
        toggleBtn.textContent = 'Einstellungen ausblenden';
      }
    });


    /* -------- PUBLIC API -------- */

    window.openConsentBanner = () => {
      banner.hidden = false;
      document.body.style.overflow = 'hidden';

      try {
        const prefs = JSON.parse(localStorage.getItem(CONSENT_KEY) || '{}');
        stats.checked = !!prefs.statistics;
        mkt.checked   = !!prefs.marketing;
      } catch {}

      requestAnimationFrame(() => box.classList.add('visible'));
    };
  }


  /* --------------------------------------------------------
   *  CLOSE
   * ------------------------------------------------------ */

  function closeBanner(banner) {
    banner.hidden = true;
    document.body.style.overflow = '';
  }


  /* --------------------------------------------------------
   *  RESET
   * ------------------------------------------------------ */

  window.resetConsent = function (reload) {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(CONSENT_SET);

    removeCookie('consent_statistics');
    removeCookie('consent_marketing');

    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });

    dataLayer.push({ event: 'consent_reset' });

    if (reload) location.reload();
  };


  /* --------------------------------------------------------
   *  INIT
   * ------------------------------------------------------ */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectBanner, { once: true });
  } else {
    injectBanner();
  }

})();
