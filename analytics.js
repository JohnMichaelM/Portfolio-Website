(() => {
  "use strict";

  const CONFIG = Object.freeze({
    measurementId: "G-88Z3WK4NT3",
    productionHostname: "johnmichaelm.github.io",
    productionPathPrefix: "/Portfolio-Website",
    consentStorageKey: "portfolio-analytics-consent",
    schemaVersion: "1",
  });

  const EVENTS = Object.freeze({
    PROJECT_OPEN: "project_open",
    SECTION_VIEW: "section_view",
    DEMO_OPEN: "demo_open",
    CONTACT_INTENT: "contact_intent",
    RESOURCE_OPEN: "resource_open",
    CTA_CLICK: "cta_click",
  });

  const allowedEvents = new Set(Object.values(EVENTS));
  const viewedSections = new Set();
  let analyticsEnabled = false;
  let googleTagInitialized = false;
  let sectionObserver = null;

  function isProduction() {
    return (
      window.location.hostname === CONFIG.productionHostname &&
      window.location.pathname.startsWith(CONFIG.productionPathPrefix)
    );
  }

  function readConsent() {
    try {
      return window.localStorage.getItem(CONFIG.consentStorageKey);
    } catch {
      return null;
    }
  }

  function storeConsent(value) {
    try {
      window.localStorage.setItem(CONFIG.consentStorageKey, value);
    } catch {
      // Valget gjelder fortsatt for den åpne siden dersom lagring er blokkert.
    }
  }

  function getPageContext() {
    return {
      page_type: document.body.dataset.analyticsPageType || "unknown",
      project_id: document.body.dataset.analyticsProjectId || "portfolio",
      schema_version: CONFIG.schemaVersion,
    };
  }

  function getSafePageLocation() {
    const url = new URL(window.location.href);
    const allowedParameters = new Set([
      "utm_id",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ]);

    [...url.searchParams.keys()].forEach((key) => {
      if (!allowedParameters.has(key)) {
        url.searchParams.delete(key);
      }
    });

    url.hash = "";
    return url.toString();
  }

  function createGtagQueue() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };
  }

  function loadGoogleAnalytics() {
    analyticsEnabled = true;

    if (!isProduction()) {
      console.info("Analytics er aktivert lokalt, men sender bare fra produksjonsdomenet.");
      startSectionTracking();
      return;
    }

    createGtagQueue();

    if (googleTagInitialized) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      window.gtag("event", "page_view", {
        ...getPageContext(),
        page_location: getSafePageLocation(),
      });
      startSectionTracking();
      return;
    }

    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("set", getPageContext());
    window.gtag("config", CONFIG.measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: getSafePageLocation(),
    });

    const googleTag = document.createElement("script");
    googleTag.async = true;
    googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(CONFIG.measurementId)}`;
    googleTag.dataset.portfolioAnalytics = "google-tag";
    document.head.append(googleTag);

    googleTagInitialized = true;
    startSectionTracking();
  }

  function deleteAnalyticsCookies() {
    const cookieNames = document.cookie
      .split(";")
      .map((cookie) => cookie.trim().split("=")[0])
      .filter((name) => name === "_ga" || name.startsWith("_ga_"));
    const paths = ["/", `${CONFIG.productionPathPrefix}/`];

    cookieNames.forEach((name) => {
      paths.forEach((path) => {
        document.cookie = `${name}=; Max-Age=0; path=${path}; SameSite=Lax`;
      });
    });
  }

  function disableAnalytics() {
    analyticsEnabled = false;
    sectionObserver?.disconnect();

    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    deleteAnalyticsCookies();
  }

  function track(eventName, parameters = {}) {
    if (!analyticsEnabled || !isProduction() || !allowedEvents.has(eventName)) {
      return;
    }

    createGtagQueue();
    window.gtag("event", eventName, {
      ...getPageContext(),
      ...parameters,
    });
  }

  function parametersFromElement(element) {
    const parameters = {};
    const mappings = {
      analyticsProjectId: "project_id",
      analyticsLinkLocation: "link_location",
      analyticsCtaId: "cta_id",
      analyticsResourceId: "resource_id",
      analyticsContactMethod: "contact_method",
    };

    Object.entries(mappings).forEach(([datasetKey, parameterName]) => {
      const value = element.dataset[datasetKey];
      if (value) {
        parameters[parameterName] = value;
      }
    });

    return parameters;
  }

  function startSectionTracking() {
    sectionObserver?.disconnect();

    if (!analyticsEnabled || !("IntersectionObserver" in window)) {
      return;
    }

    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.dataset.analyticsSection;
          if (!entry.isIntersecting || !sectionId || viewedSections.has(sectionId)) {
            return;
          }

          viewedSections.add(sectionId);
          track(EVENTS.SECTION_VIEW, { section_id: sectionId });
          sectionObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll("[data-analytics-section]").forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  function createConsentPanel() {
    const panel = document.createElement("section");
    panel.className = "analytics-consent";
    panel.id = "analytics-consent";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "analytics-consent-title");
    panel.innerHTML = `
      <div class="analytics-consent__inner">
        <div class="analytics-consent__copy">
          <h2 class="analytics-consent__title" id="analytics-consent-title">Valgfri analyse</h2>
          <p class="analytics-consent__text">Jeg bruker valgfri bruksstatistikk for å forbedre porteføljen. Ingen analysedata sendes før du godtar. <a href="personvern.html">Les om personvern og analyse</a>.</p>
        </div>
        <div class="analytics-consent__actions">
          <button class="analytics-consent__button" type="button" data-consent-choice="denied">Avslå</button>
          <button class="analytics-consent__button" type="button" data-consent-choice="granted">Godta analyse</button>
        </div>
      </div>
    `;
    document.body.append(panel);
    return panel;
  }

  function announceConsent(message) {
    let status = document.getElementById("analytics-status");
    if (!status) {
      status = document.createElement("p");
      status.className = "analytics-status";
      status.id = "analytics-status";
      status.setAttribute("aria-live", "polite");
      document.body.append(status);
    }
    status.textContent = message;
  }

  const consentPanel = createConsentPanel();

  function openPreferences(shouldFocus = true) {
    consentPanel.hidden = false;
    if (shouldFocus) {
      consentPanel.querySelector("[data-consent-choice]")?.focus();
    }
  }

  function closePreferences() {
    consentPanel.hidden = true;
  }

  consentPanel.addEventListener("click", (event) => {
    const choiceButton = event.target.closest("[data-consent-choice]");
    if (!choiceButton) {
      return;
    }

    const choice = choiceButton.dataset.consentChoice;
    storeConsent(choice);

    if (choice === "granted") {
      loadGoogleAnalytics();
      announceConsent("Analyse er godtatt.");
    } else {
      disableAnalytics();
      announceConsent("Analyse er avslått.");
    }

    closePreferences();
  });

  document.addEventListener("click", (event) => {
    const preferencesButton = event.target.closest("[data-analytics-preferences]");
    if (preferencesButton) {
      openPreferences();
      return;
    }

    const trackedElement = event.target.closest("[data-analytics-event]");
    if (!trackedElement) {
      return;
    }

    track(trackedElement.dataset.analyticsEvent, parametersFromElement(trackedElement));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !consentPanel.hidden && readConsent()) {
      closePreferences();
      document.querySelector("[data-analytics-preferences]")?.focus();
    }
  });

  const savedConsent = readConsent();
  if (savedConsent === "granted") {
    loadGoogleAnalytics();
  } else if (savedConsent !== "denied") {
    openPreferences(false);
  }

  window.portfolioAnalytics = Object.freeze({
    events: EVENTS,
    openPreferences,
    track,
  });
})();
