(() => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const profileThemeToggle = document.getElementById("profile-theme-toggle");
  const viewButtons = document.querySelectorAll("[data-view-target]");
  const views = document.querySelectorAll("[data-view]");
  const viewContainer = document.querySelector(".view-container");
  const homeActivities = document.getElementById("home-activities");
  const exploreActivities = document.getElementById("explore-activities");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const resultCount = document.getElementById("result-count");
  const filterEmpty = document.getElementById("filter-empty");
  const detailBack = document.getElementById("detail-back");
  const detailCategories = document.getElementById("detail-categories");
  const detailTitle = document.getElementById("detail-title");
  const detailDescription = document.getElementById("detail-description");
  const detailDate = document.getElementById("detail-date");
  const detailLocation = document.getElementById("detail-location");
  const detailDistance = document.getElementById("detail-distance");
  const detailAbout = document.getElementById("detail-about");
  const saveActivityButton = document.getElementById("save-activity");
  const saveStatus = document.getElementById("save-status");
  const savedActivitiesContainer = document.getElementById("saved-activities");
  const savedEmpty = document.getElementById("saved-empty");
  const savedCount = document.getElementById("saved-count");
  const savedFeedback = document.getElementById("saved-feedback");
  const profileSavedCount = document.getElementById("profile-saved-count");
  const profileSavedLabel = document.getElementById("profile-saved-label");
  const profileThemeValue = document.getElementById("profile-theme-value");
  const textSizeToggle = document.getElementById("text-size-toggle");
  const textSizeValue = document.getElementById("text-size-value");
  const demoNotifications = document.getElementById("demo-notifications");
  const savedTheme = localStorage.getItem("communigreen-theme");
  const savedTextSize = localStorage.getItem("communigreen-text-size");
  const savedNotificationSetting = localStorage.getItem("communigreen-demo-notifications");
  const savedActivitiesKey = "communigreen-saved-activities";
  let currentActivityId = null;
  let previousView = "explore";

  // Rekonstruert demoinnhold. Aktivitetene er ikke hentet fra eksterne tjenester.
  const activities = [
    {
      id: "sognsvann-rydderunde",
      title: "Søppelplukking rundt Sognsvann",
      date: "26. september",
      location: "Sognsvann, Oslo",
      distance: 2.4,
      categories: ["Natur", "Miljø"],
      description: "Bli med på en rolig rydderunde rundt vannet.",
      about: "Vi går en kort runde sammen og samler avfall langs stien. Utstyr deles ut ved oppmøte, og aktiviteten passer også for deg som ikke har deltatt tidligere.",
      thisWeek: true,
      featured: true
    },
    {
      id: "gamle-plagg",
      title: "Gi gamle plagg nytt liv",
      date: "28. september",
      location: "Sagene, Oslo",
      distance: 3.8,
      categories: ["Gjenbruk", "Fellesskap"],
      description: "Lær enkel reparasjon og redesign sammen med andre.",
      about: "Ta med et plagg du ønsker å reparere eller endre. Du får enkel veiledning og kan dele ideer med andre deltakere. Grunnleggende utstyr er tilgjengelig.",
      thisWeek: true,
      featured: true
    },
    {
      id: "parsell-dag",
      title: "Felles plantedag i parsellhagen",
      date: "3. oktober",
      location: "Tøyen, Oslo",
      distance: 5.2,
      categories: ["Natur", "Fellesskap"],
      description: "Gjør hagen klar for høsten og møt andre i nærmiljøet.",
      about: "Vi rydder i bedene, planter for neste sesong og gjør fellesområdet klart for høsten. Du trenger ingen erfaring med hagearbeid.",
      thisWeek: false,
      featured: false
    },
    {
      id: "sykkelverksted",
      title: "Åpent sykkelverksted",
      date: "7. oktober",
      location: "Grünerløkka, Oslo",
      distance: 1.7,
      categories: ["Gjenbruk", "Miljø"],
      description: "Få veiledning til enkelt vedlikehold av din egen sykkel.",
      about: "På verkstedet kan du lære å justere bremser, smøre kjedet og gjøre en enkel sikkerhetskontroll. Ta med egen sykkel dersom du har en.",
      thisWeek: false,
      featured: false
    },
    {
      id: "byttedag",
      title: "Byttedag i nabolaget",
      date: "11. oktober",
      location: "Bøler, Oslo",
      distance: 6.1,
      categories: ["Gjenbruk", "Fellesskap"],
      description: "Ta med noe du ikke bruker og finn noe nyttig å ta med hjem.",
      about: "Byttedagen gir klær og små bruksgjenstander en ny eier. Alt du tar med skal være rent og i brukbar stand. Det er også mulig å delta uten å ta med noe.",
      thisWeek: false,
      featured: false
    },
    {
      id: "kveldstur",
      title: "Kveldstur og lokal natur",
      date: "15. oktober",
      location: "Akerselva, Oslo",
      distance: 2.9,
      categories: ["Natur", "Fellesskap"],
      description: "En kort fellestur med tid til samtale og nye bekjentskaper.",
      about: "Vi følger en enkel rute langs elven i rolig tempo. Turen er laget som en uformell møteplass og avsluttes på samme sted som den starter.",
      thisWeek: false,
      featured: false
    }
  ];

  function createActivityCard(activity, canRemove = false) {
    const tags = activity.categories.map((category) => `<span>${category}</span>`).join("");
    const removeButton = canRemove
      ? `<button class="remove-button" type="button" data-remove-activity="${activity.id}" aria-label="Fjern ${activity.title} fra lagrede">Fjern</button>`
      : "";

    return `
      <article class="activity-card">
        <div class="activity-meta"><span>${activity.date}</span><span>${activity.location}</span></div>
        <h3>${activity.title}</h3>
        <p>${activity.description}</p>
        <div class="activity-tags">${tags}</div>
        <div class="activity-meta"><span>${String(activity.distance).replace(".", ",")} km unna</span></div>
        <div class="card-actions">
          <button type="button" data-activity-id="${activity.id}">Se aktivitet</button>
          ${removeButton}
        </div>
      </article>
    `;
  }

  function renderActivities(container, activityList, canRemove = false) {
    container.innerHTML = activityList.map((activity) => createActivityCard(activity, canRemove)).join("");
  }

  function matchesFilter(activity, filter) {
    if (filter === "all") return true;
    if (filter === "week") return activity.thisWeek;
    if (filter === "near") return activity.distance <= 3;
    return activity.categories.some((category) => category.toLowerCase() === filter);
  }

  function setFilter(filter) {
    const filteredActivities = activities.filter((activity) => matchesFilter(activity, filter));

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    renderActivities(exploreActivities, filteredActivities);
    resultCount.textContent = `${filteredActivities.length} ${filteredActivities.length === 1 ? "aktivitet" : "aktiviteter"}`;
    filterEmpty.hidden = filteredActivities.length !== 0;
  }

  function readSavedActivities() {
    try {
      const savedActivities = JSON.parse(localStorage.getItem(savedActivitiesKey) || "[]");
      return Array.isArray(savedActivities) ? savedActivities : [];
    } catch {
      return [];
    }
  }

  function writeSavedActivities(savedActivities) {
    localStorage.setItem(savedActivitiesKey, JSON.stringify(savedActivities));
  }

  function renderSavedActivities() {
    const savedActivityIds = readSavedActivities();
    const savedActivityList = activities.filter((activity) => savedActivityIds.includes(activity.id));
    const hasSavedActivities = savedActivityList.length > 0;

    renderActivities(savedActivitiesContainer, savedActivityList, true);
    savedActivitiesContainer.hidden = !hasSavedActivities;
    savedEmpty.hidden = hasSavedActivities;
    savedCount.textContent = `${savedActivityList.length} ${savedActivityList.length === 1 ? "lagret" : "lagrede"}`;
  }

  function renderProfileState() {
    const savedActivityIds = readSavedActivities();
    const savedActivityCount = activities.filter((activity) => savedActivityIds.includes(activity.id)).length;

    profileSavedCount.textContent = String(savedActivityCount);
    profileSavedLabel.textContent = savedActivityCount === 1 ? "Lagret aktivitet" : "Lagrede aktiviteter";
  }

  function updateSaveButton(activityId) {
    const isSaved = readSavedActivities().includes(activityId);
    saveActivityButton.setAttribute("aria-pressed", String(isSaved));
    saveActivityButton.textContent = isSaved ? "Fjern fra lagrede" : "Lagre aktivitet";
  }

  function openActivity(activityId) {
    const activity = activities.find((item) => item.id === activityId);
    if (!activity) return;

    const activeView = document.querySelector("[data-view]:not([hidden])");
    if (["home", "explore", "saved"].includes(activeView?.dataset.view)) {
      previousView = activeView.dataset.view;
    }

    currentActivityId = activity.id;
    detailCategories.textContent = activity.categories.join(" · ");
    detailTitle.textContent = activity.title;
    detailDescription.textContent = activity.description;
    detailDate.textContent = activity.date;
    detailLocation.textContent = activity.location;
    detailDistance.textContent = `${String(activity.distance).replace(".", ",")} km unna`;
    detailAbout.textContent = activity.about;
    saveStatus.hidden = true;
    updateSaveButton(activity.id);
    showView("detail");
  }

  function setTheme(isDark) {
    body.classList.toggle("dark-mode", isDark);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Bytt til lys modus" : "Bytt til mørk modus");
    profileThemeToggle.setAttribute("aria-pressed", String(isDark));
    profileThemeValue.textContent = isDark ? "Mørk" : "Lys";
  }

  function toggleTheme() {
    const isDark = !body.classList.contains("dark-mode");
    setTheme(isDark);
    localStorage.setItem("communigreen-theme", isDark ? "dark" : "light");
  }

  function setTextSize(isLarge) {
    body.classList.toggle("large-text", isLarge);
    textSizeToggle.setAttribute("aria-pressed", String(isLarge));
    textSizeValue.textContent = isLarge ? "Større" : "Normal";
  }

  function toggleTextSize() {
    const isLarge = !body.classList.contains("large-text");
    setTextSize(isLarge);
    localStorage.setItem("communigreen-text-size", isLarge ? "large" : "normal");
  }

  function showView(viewName) {
    if (viewName === "saved") {
      savedFeedback.hidden = true;
      renderSavedActivities();
    }

    if (viewName === "profile") {
      renderProfileState();
    }

    views.forEach((view) => {
      view.hidden = view.dataset.view !== viewName;
    });

    viewContainer.scrollTop = 0;

    document.querySelectorAll(".nav-button").forEach((button) => {
      const isActive = button.dataset.viewTarget === viewName;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  setTheme(savedTheme === "dark");
  setTextSize(savedTextSize === "large");
  demoNotifications.checked = savedNotificationSetting === "on";
  renderActivities(homeActivities, activities.filter((activity) => activity.featured));
  setFilter("all");
  renderSavedActivities();
  renderProfileState();
  themeToggle.addEventListener("click", toggleTheme);
  profileThemeToggle.addEventListener("click", toggleTheme);
  textSizeToggle.addEventListener("click", toggleTextSize);
  demoNotifications.addEventListener("change", () => {
    localStorage.setItem("communigreen-demo-notifications", demoNotifications.checked ? "on" : "off");
  });

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.viewTarget));
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
  });

  detailBack.addEventListener("click", () => showView(previousView));

  saveActivityButton.addEventListener("click", () => {
    if (!currentActivityId) return;

    const savedActivities = readSavedActivities();
    const isSaved = savedActivities.includes(currentActivityId);
    const updatedActivities = isSaved
      ? savedActivities.filter((activityId) => activityId !== currentActivityId)
      : [...savedActivities, currentActivityId];

    writeSavedActivities(updatedActivities);
    updateSaveButton(currentActivityId);
    renderSavedActivities();
    renderProfileState();
    saveStatus.textContent = isSaved ? "Aktiviteten er fjernet fra lagrede." : "Aktiviteten er lagret på denne enheten.";
    saveStatus.hidden = false;
  });

  document.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-activity]");
    if (removeButton) {
      const activityId = removeButton.dataset.removeActivity;
      const activity = activities.find((item) => item.id === activityId);
      const updatedActivities = readSavedActivities().filter((savedActivityId) => savedActivityId !== activityId);

      writeSavedActivities(updatedActivities);
      renderSavedActivities();
      renderProfileState();
      savedFeedback.textContent = `${activity?.title || "Aktiviteten"} er fjernet fra lagrede.`;
      savedFeedback.hidden = false;
      return;
    }

    const activityButton = event.target.closest("[data-activity-id]");
    if (!activityButton) return;

    openActivity(activityButton.dataset.activityId);
  });
})();
