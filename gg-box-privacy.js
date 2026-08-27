const privacyForm = document.getElementById("privacy-form");
const marketingPreference = document.getElementById("marketing-preference");
const resetPreferences = document.getElementById("reset-preferences");
const siteNotice = document.getElementById("site-notice");

const storageKey = "ggbox-demo-privacy-preferences";

function showNotice(message) {
  siteNotice.textContent = message;
  siteNotice.classList.add("is-visible");

  clearTimeout(showNotice.timeout);

  showNotice.timeout = setTimeout(() => {
    siteNotice.classList.remove("is-visible");
  }, 3000);
}

function loadPreferences() {
  const savedPreferences = localStorage.getItem(storageKey);

  if (!savedPreferences) {
    return;
  }

  const preferences = JSON.parse(savedPreferences);

  marketingPreference.checked = preferences.marketing === true;
}

privacyForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const preferences = {
    marketing: marketingPreference.checked
  };

  localStorage.setItem(storageKey, JSON.stringify(preferences));

  showNotice("Demovalget ditt er lagret lokalt i nettleseren.");
});

resetPreferences.addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  marketingPreference.checked = false;

  showNotice("Lagrede demovalg er tilbakestilt.");
});

loadPreferences();