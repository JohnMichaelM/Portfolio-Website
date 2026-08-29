(() => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const profileThemeToggle = document.getElementById("profile-theme-toggle");
  const viewButtons = document.querySelectorAll("[data-view-target]");
  const views = document.querySelectorAll("[data-view]");
  const viewContainer = document.querySelector(".view-container");
  const homeActivities = document.getElementById("home-activities");
  const openCalendarButton = document.getElementById("open-calendar");
  const calendarBack = document.getElementById("calendar-back");
  const calendarTitle = document.getElementById("calendar-title");
  const calendarPrevious = document.getElementById("calendar-previous");
  const calendarNext = document.getElementById("calendar-next");
  const calendarGrid = document.getElementById("calendar-grid");
  const calendarSelectionTitle = document.getElementById("calendar-selection-title");
  const calendarItems = document.getElementById("calendar-items");
  const calendarEmpty = document.getElementById("calendar-empty");
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
  const profileAwardsCount = document.getElementById("profile-awards-count");
  const awardsBack = document.getElementById("awards-back");
  const awardsCount = document.getElementById("awards-count");
  const awardsList = document.getElementById("awards-list");
  const privacyBack = document.getElementById("privacy-back");
  const privacySavedCount = document.getElementById("privacy-saved-count");
  const privacyPostCount = document.getElementById("privacy-post-count");
  const privacyCommentCount = document.getElementById("privacy-comment-count");
  const privacyAwardCount = document.getElementById("privacy-award-count");
  const generateDataReportButton = document.getElementById("generate-data-report");
  const dataReport = document.getElementById("data-report");
  const dataReportContent = document.getElementById("data-report-content");
  const resetDemoDataButton = document.getElementById("reset-demo-data");
  const privacyStatus = document.getElementById("privacy-status");
  const helpBack = document.getElementById("help-back");
  const profileThemeValue = document.getElementById("profile-theme-value");
  const textSizeToggle = document.getElementById("text-size-toggle");
  const textSizeValue = document.getElementById("text-size-value");
  const demoNotifications = document.getElementById("demo-notifications");
  const forumSearch = document.getElementById("forum-search");
  const forumFilterButtons = document.querySelectorAll("[data-forum-filter]");
  const forumPostsContainer = document.getElementById("forum-posts");
  const forumCount = document.getElementById("forum-count");
  const forumEmpty = document.getElementById("forum-empty");
  const forumFeedback = document.getElementById("forum-feedback");
  const newForumPostButton = document.getElementById("new-forum-post");
  const forumComposeBack = document.getElementById("forum-compose-back");
  const forumPostForm = document.getElementById("forum-post-form");
  const forumAddCalendar = document.getElementById("forum-add-calendar");
  const forumCalendarFields = document.getElementById("forum-calendar-fields");
  const forumCalendarDate = document.getElementById("forum-calendar-date");
  const forumDetailBack = document.getElementById("forum-detail-back");
  const forumDetailCategory = document.getElementById("forum-detail-category");
  const forumDetailTitle = document.getElementById("forum-detail-title");
  const forumDetailInitials = document.getElementById("forum-detail-initials");
  const forumDetailAuthor = document.getElementById("forum-detail-author");
  const forumDetailTime = document.getElementById("forum-detail-time");
  const forumDetailBody = document.getElementById("forum-detail-body");
  const forumDetailReplies = document.getElementById("forum-detail-replies");
  const forumDetailReactions = document.getElementById("forum-detail-reactions");
  const forumReactButton = document.getElementById("forum-react");
  const deleteForumPostButton = document.getElementById("delete-forum-post");
  const forumComments = document.getElementById("forum-comments");
  const forumCommentsEmpty = document.getElementById("forum-comments-empty");
  const forumCommentForm = document.getElementById("forum-comment-form");
  const forumCommentText = document.getElementById("forum-comment-text");
  const forumCommentStatus = document.getElementById("forum-comment-status");
  const savedTheme = localStorage.getItem("communigreen-theme");
  const savedTextSize = localStorage.getItem("communigreen-text-size");
  const savedNotificationSetting = localStorage.getItem("communigreen-demo-notifications");
  const savedActivitiesKey = "communigreen-saved-activities";
  const localForumPostsKey = "communigreen-local-forum-posts";
  const localForumCommentsKey = "communigreen-local-forum-comments";
  const forumReactionsKey = "communigreen-forum-reactions";
  const unlockedAwardsKey = "communigreen-unlocked-awards";
  const communigreenStorageKeys = [
    "communigreen-theme",
    "communigreen-text-size",
    "communigreen-demo-notifications",
    savedActivitiesKey,
    localForumPostsKey,
    localForumCommentsKey,
    forumReactionsKey,
    unlockedAwardsKey
  ];
  let currentActivityId = null;
  let currentForumPostId = null;
  let previousView = "explore";
  let previousForumView = "forum";
  let activeForumFilter = "all";
  let calendarCursor = new Date(2026, 8, 1);
  let selectedCalendarDate = "2026-09-26";

  // Rekonstruert demoinnhold. Aktivitetene er ikke hentet fra eksterne tjenester.
  const activities = [
    {
      id: "sognsvann-rydderunde",
      title: "Søppelplukking rundt Sognsvann",
      date: "26. september",
      dateValue: "2026-09-26",
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
      dateValue: "2026-09-28",
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
      dateValue: "2026-10-03",
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
      dateValue: "2026-10-07",
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
      dateValue: "2026-10-11",
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
      dateValue: "2026-10-15",
      location: "Akerselva, Oslo",
      distance: 2.9,
      categories: ["Natur", "Fellesskap"],
      description: "En kort fellestur med tid til samtale og nye bekjentskaper.",
      about: "Vi følger en enkel rute langs elven i rolig tempo. Turen er laget som en uformell møteplass og avsluttes på samme sted som den starter.",
      thisWeek: false,
      featured: false
    }
  ];

  // Alle navn, innlegg og tall i forumet er fiktive og laget for demoen.
  const presetForumPosts = [
    {
      id: "sykkel-gis-bort",
      author: "Lars C.",
      initials: "LC",
      time: "2 timer siden",
      category: "Gjenbruk",
      title: "Sykkel gis bort til noen som trenger den",
      excerpt: "En brukt barnesykkel trenger et nytt hjem.",
      body: "Vi har en brukt barnesykkel som ikke lenger blir brukt. Den trenger litt enkelt vedlikehold, men kan fortsatt få mange fine turer.\n\nGi gjerne beskjed dersom du kjenner noen i nærmiljøet som kan ha glede av den.",
      reactions: 6,
      comments: [
        { author: "Nora P.", initials: "NP", time: "1 time siden", text: "Dette kan være aktuelt for noen i nabolaget vårt." }
      ]
    },
    {
      id: "epler-fra-hagen",
      author: "Mina H.",
      initials: "MH",
      time: "6 timer siden",
      category: "Matdeling",
      title: "Epler fra hagen kan hentes",
      excerpt: "Vi har flere epler enn vi rekker å bruke denne høsten.",
      body: "Epletreet vårt har gitt mye frukt i år. I stedet for at resten blir liggende, vil vi gjerne dele med andre i området.\n\nTa med en pose og hent en passende mengde. Innlegget er selvfølgelig bare en del av denne lokale demoen.",
      reactions: 9,
      comments: [
        { author: "Elias R.", initials: "ER", time: "4 timer siden", text: "Flott initiativ. Jeg kjenner noen som gjerne henter litt." }
      ]
    },
    {
      id: "male-nabolagsbenk",
      author: "Omar N.",
      initials: "ON",
      time: "1 dag siden",
      category: "Nabolag",
      title: "Noen som vil hjelpe til med nabolagsbenken?",
      excerpt: "Vi ønsker å gi den gamle benken ved møteplassen et nytt strøk maling.",
      body: "Den lille benken ved møteplassen trenger litt omsorg. Jeg har maling og enkelt utstyr, men hadde satt pris på litt hjelp og selskap.\n\nTanken er en kort og uformell innsats for et hyggeligere fellesområde.",
      reactions: 5,
      comments: [
        { author: "Sara V.", initials: "SV", time: "20 timer siden", text: "Jeg kan hjelpe til en liten stund på ettermiddagen." }
      ]
    }
  ];

  const awardDefinitions = [
    {
      id: "first-save",
      number: "01",
      title: "Første steg",
      description: "Lagre din første aktivitet i demoen.",
      target: 1,
      getProgress: () => readSavedActivities().length
    },
    {
      id: "neighborhood-voice",
      number: "02",
      title: "Nabolagsstemme",
      description: "Opprett ditt første lokale foruminnlegg.",
      target: 1,
      getProgress: () => readLocalForumPosts().length
    },
    {
      id: "calendar-contributor",
      number: "03",
      title: "Kalenderbidrag",
      description: "Legg et lokalt foruminnlegg til i kalenderen.",
      target: 1,
      getProgress: () => readLocalForumPosts().filter((post) => post.calendarDate).length
    },
    {
      id: "active-collection",
      number: "04",
      title: "Aktiv samling",
      description: "Bygg en samling med tre lagrede aktiviteter.",
      target: 3,
      getProgress: () => readSavedActivities().length
    }
  ];

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function readLocalForumPosts() {
    try {
      const posts = JSON.parse(localStorage.getItem(localForumPostsKey) || "[]");
      return Array.isArray(posts) ? posts : [];
    } catch {
      return [];
    }
  }

  function writeLocalForumPosts(posts) {
    localStorage.setItem(localForumPostsKey, JSON.stringify(posts));
  }

  function readLocalForumComments() {
    try {
      const comments = JSON.parse(localStorage.getItem(localForumCommentsKey) || "{}");
      return comments && typeof comments === "object" && !Array.isArray(comments) ? comments : {};
    } catch {
      return {};
    }
  }

  function writeLocalForumComments(comments) {
    localStorage.setItem(localForumCommentsKey, JSON.stringify(comments));
  }

  function readForumReactions() {
    try {
      const reactions = JSON.parse(localStorage.getItem(forumReactionsKey) || "[]");
      return Array.isArray(reactions) ? reactions : [];
    } catch {
      return [];
    }
  }

  function writeForumReactions(reactions) {
    localStorage.setItem(forumReactionsKey, JSON.stringify(reactions));
  }

  function getAllForumPosts() {
    return [...readLocalForumPosts(), ...presetForumPosts];
  }

  function isLocalForumPost(post) {
    return post.local === true || post.id.startsWith("local-");
  }

  function getForumPostComments(post) {
    const savedComments = readLocalForumComments()[post.id];
    const localComments = Array.isArray(savedComments) ? savedComments : [];
    const presetComments = (post.comments || []).map((comment) => ({ ...comment, isLocal: false }));
    const editableComments = localComments.map((comment, localIndex) => ({ ...comment, isLocal: true, localIndex }));
    return [...presetComments, ...editableComments];
  }

  function getForumReactionCount(post) {
    return post.reactions + (readForumReactions().includes(post.id) ? 1 : 0);
  }

  function createForumCard(post) {
    const replyCount = getForumPostComments(post).length;
    const reactionCount = getForumReactionCount(post);

    return `
      <article class="forum-card">
        <div class="forum-author">
          <span class="forum-avatar" aria-hidden="true">${escapeHtml(post.initials)}</span>
          <span><strong>${escapeHtml(post.author)}</strong><small>${escapeHtml(post.time)}</small></span>
        </div>
        <p class="forum-category">${escapeHtml(post.category)}</p>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt)}</p>
        ${post.calendarDate ? `<p class="forum-calendar-date">Kalender · ${escapeHtml(formatCalendarDate(post.calendarDate, true))}</p>` : ""}
        <div class="forum-card-footer">
          <div class="forum-stats"><span>${replyCount} svar</span><span>${reactionCount} ${reactionCount === 1 ? "reaksjon" : "reaksjoner"}</span></div>
          <button type="button" data-forum-post="${escapeHtml(post.id)}">Se innlegg</button>
        </div>
      </article>
    `;
  }

  function renderForumPosts() {
    const searchTerm = forumSearch.value.trim().toLowerCase();
    const filteredPosts = getAllForumPosts().filter((post) => {
      const matchesCategory = activeForumFilter === "all" || post.category.toLowerCase() === activeForumFilter;
      const searchableText = `${post.author} ${post.category} ${post.title} ${post.excerpt}`.toLowerCase();
      return matchesCategory && searchableText.includes(searchTerm);
    });

    forumPostsContainer.innerHTML = filteredPosts.map(createForumCard).join("");
    forumCount.textContent = `${filteredPosts.length} innlegg`;
    forumEmpty.hidden = filteredPosts.length !== 0;
  }

  function setForumFilter(filter) {
    activeForumFilter = filter;
    forumFilterButtons.forEach((button) => {
      const isActive = button.dataset.forumFilter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    renderForumPosts();
  }

  function renderForumComments(post) {
    const comments = getForumPostComments(post);
    forumComments.innerHTML = comments.map((comment) => `
      <article class="comment-card">
        <div class="forum-author">
          <span class="forum-avatar" aria-hidden="true">${escapeHtml(comment.initials)}</span>
          <span><strong>${escapeHtml(comment.author)}</strong><small>${escapeHtml(comment.time)}</small></span>
        </div>
        <p>${escapeHtml(comment.text)}</p>
        ${comment.isLocal ? `
          <div class="comment-card-footer">
            <button class="delete-comment-button" type="button" data-delete-comment="${comment.localIndex}" aria-label="Slett kommentaren fra ${escapeHtml(comment.author)}">Slett kommentar</button>
          </div>
        ` : ""}
      </article>
    `).join("");
    forumCommentsEmpty.hidden = comments.length !== 0;
  }

  function updateForumDetailStats(post) {
    const replyCount = getForumPostComments(post).length;
    const hasReacted = readForumReactions().includes(post.id);
    forumDetailReplies.textContent = `${replyCount} svar`;
    const reactionCount = getForumReactionCount(post);
    forumDetailReactions.textContent = `${reactionCount} ${reactionCount === 1 ? "reaksjon" : "reaksjoner"}`;
    forumReactButton.setAttribute("aria-pressed", String(hasReacted));
    forumReactButton.textContent = hasReacted ? "Fjern reaksjon" : "Lik innlegg";
  }

  function openForumPost(postId) {
    const post = getAllForumPosts().find((item) => item.id === postId);
    if (!post) return;

    const activeView = document.querySelector("[data-view]:not([hidden])");
    previousForumView = activeView?.dataset.view === "calendar" ? "calendar" : "forum";
    currentForumPostId = post.id;
    forumDetailCategory.textContent = post.category;
    forumDetailTitle.textContent = post.title;
    forumDetailInitials.textContent = post.initials;
    forumDetailAuthor.textContent = post.author;
    forumDetailTime.textContent = post.time;
    forumDetailBody.textContent = post.body;
    forumCommentForm.reset();
    forumCommentStatus.hidden = true;
    deleteForumPostButton.hidden = !isLocalForumPost(post);
    renderForumComments(post);
    updateForumDetailStats(post);
    showView("forum-detail");
  }

  function parseCalendarDate(dateValue) {
    return new Date(`${dateValue}T12:00:00`);
  }

  function toCalendarDateValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatCalendarDate(dateValue, includeYear = false) {
    return new Intl.DateTimeFormat("no-NO", {
      day: "numeric",
      month: "long",
      ...(includeYear ? { year: "numeric" } : {})
    }).format(parseCalendarDate(dateValue));
  }

  function getCalendarEntries(dateValue) {
    const activityEntries = activities
      .filter((activity) => activity.dateValue === dateValue)
      .map((activity) => ({ type: "activity", item: activity }));
    const forumEntries = readLocalForumPosts()
      .filter((post) => post.calendarDate === dateValue)
      .map((post) => ({ type: "forum", item: post }));
    return [...activityEntries, ...forumEntries];
  }

  function renderHomeWeekIndicators() {
    document.querySelectorAll(".week-strip [data-calendar-date]").forEach((button) => {
      const entryCount = getCalendarEntries(button.dataset.calendarDate).length;
      button.classList.toggle("has-items", entryCount > 0);
      const dateLabel = formatCalendarDate(button.dataset.calendarDate);
      const entryLabel = entryCount === 1 ? "1 oppføring" : `${entryCount} oppføringer`;
      button.setAttribute("aria-label", `${dateLabel}, ${entryLabel}`);
    });
  }

  function renderCalendarSelection() {
    const entries = getCalendarEntries(selectedCalendarDate);
    calendarSelectionTitle.textContent = `Aktiviteter ${formatCalendarDate(selectedCalendarDate)}`;
    calendarItems.innerHTML = entries.map(({ type, item }) => {
      if (type === "activity") {
        return `
          <article class="calendar-entry">
            <p class="brand-label">Demoaktivitet</p>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.location)} · ${escapeHtml(item.description)}</p>
            <button type="button" data-activity-id="${escapeHtml(item.id)}">Se aktivitet</button>
          </article>
        `;
      }

      return `
        <article class="calendar-entry">
          <p class="brand-label">Fra forum · ${escapeHtml(item.category)}</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.excerpt)}</p>
          <button type="button" data-forum-post="${escapeHtml(item.id)}">Se foruminnlegg</button>
        </article>
      `;
    }).join("");
    calendarEmpty.hidden = entries.length !== 0;
  }

  function renderCalendar() {
    const year = calendarCursor.getFullYear();
    const month = calendarCursor.getMonth();
    const monthName = new Intl.DateTimeFormat("no-NO", { month: "long", year: "numeric" })
      .format(calendarCursor);
    calendarTitle.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const emptyCells = Array.from({ length: firstWeekday }, () => '<span class="calendar-spacer" aria-hidden="true"></span>');
    const dayButtons = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const dateValue = toCalendarDateValue(new Date(year, month, day));
      const entryCount = getCalendarEntries(dateValue).length;
      const isSelected = dateValue === selectedCalendarDate;
      const fullDate = new Intl.DateTimeFormat("no-NO", {
        weekday: "long",
        day: "numeric",
        month: "long"
      }).format(parseCalendarDate(dateValue));
      const entryLabel = entryCount === 1 ? "1 oppføring" : `${entryCount} oppføringer`;
      return `<button class="calendar-day${entryCount ? " has-items" : ""}${isSelected ? " is-selected" : ""}" type="button" data-calendar-date="${dateValue}" aria-pressed="${isSelected}" aria-label="${escapeHtml(fullDate)}, ${entryLabel}">${day}</button>`;
    });

    calendarGrid.innerHTML = [...emptyCells, ...dayButtons].join("");
    renderCalendarSelection();
  }

  function selectCalendarDate(dateValue) {
    selectedCalendarDate = dateValue;
    const selectedDate = parseCalendarDate(dateValue);
    calendarCursor = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    renderCalendar();
    showView("calendar");
  }

  function changeCalendarMonth(monthOffset) {
    calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + monthOffset, 1);
    selectedCalendarDate = toCalendarDateValue(calendarCursor);
    renderCalendar();
  }

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

  function readUnlockedAwards() {
    try {
      const unlockedAwards = JSON.parse(localStorage.getItem(unlockedAwardsKey) || "[]");
      return Array.isArray(unlockedAwards) ? unlockedAwards : [];
    } catch {
      return [];
    }
  }

  function syncUnlockedAwards() {
    const validAwardIds = new Set(awardDefinitions.map((award) => award.id));
    const unlockedAwards = new Set(readUnlockedAwards().filter((awardId) => validAwardIds.has(awardId)));
    awardDefinitions.forEach((award) => {
      if (award.getProgress() >= award.target) unlockedAwards.add(award.id);
    });
    const updatedAwards = [...unlockedAwards];
    localStorage.setItem(unlockedAwardsKey, JSON.stringify(updatedAwards));
    return updatedAwards;
  }

  function renderAwards() {
    const unlockedAwards = syncUnlockedAwards();
    awardsCount.textContent = `${unlockedAwards.length} av ${awardDefinitions.length}`;
    awardsList.innerHTML = awardDefinitions.map((award) => {
      const progress = Math.min(award.getProgress(), award.target);
      const isUnlocked = unlockedAwards.includes(award.id);
      const status = isUnlocked ? "Låst opp i denne demoen" : `${progress} av ${award.target}`;
      return `
        <article class="award-card${isUnlocked ? " is-unlocked" : ""}">
          <span class="award-index" aria-hidden="true">${award.number}</span>
          <div class="award-content">
            <h2>${escapeHtml(award.title)}</h2>
            <p>${escapeHtml(award.description)}</p>
            <strong class="award-status">${status}</strong>
            <progress value="${isUnlocked ? award.target : progress}" max="${award.target}" aria-label="Fremdrift for ${escapeHtml(award.title)}"></progress>
          </div>
        </article>
      `;
    }).join("");
  }

  function getLocalCommentCount() {
    return Object.values(readLocalForumComments())
      .reduce((total, comments) => total + (Array.isArray(comments) ? comments.length : 0), 0);
  }

  function renderPrivacyState() {
    privacySavedCount.textContent = String(readSavedActivities().length);
    privacyPostCount.textContent = String(readLocalForumPosts().length);
    privacyCommentCount.textContent = String(getLocalCommentCount());
    privacyAwardCount.textContent = String(syncUnlockedAwards().length);
  }

  function generateLocalDataReport() {
    const savedTitles = activities
      .filter((activity) => readSavedActivities().includes(activity.id))
      .map((activity) => `– ${activity.title}`);
    const localPosts = readLocalForumPosts();
    const postLines = localPosts.map((post) => `– ${post.title}${post.calendarDate ? ` (${formatCalendarDate(post.calendarDate, true)})` : ""}`);
    const commentLines = Object.values(readLocalForumComments())
      .flatMap((comments) => Array.isArray(comments) ? comments.map((comment) => `– ${comment.text}`) : []);
    const unlockedIds = syncUnlockedAwards();
    const awardLines = awardDefinitions
      .filter((award) => unlockedIds.includes(award.id))
      .map((award) => `– ${award.title}`);

    dataReportContent.textContent = [
      `Tema: ${body.classList.contains("dark-mode") ? "Mørk" : "Lys"}`,
      `Tekststørrelse: ${body.classList.contains("large-text") ? "Større" : "Normal"}`,
      `Demovarsler: ${demoNotifications.checked ? "På" : "Av"}`,
      "",
      "Lagrede aktiviteter:",
      ...(savedTitles.length ? savedTitles : ["– Ingen"]),
      "",
      "Lokale foruminnlegg:",
      ...(postLines.length ? postLines : ["– Ingen"]),
      "",
      "Lokale kommentarer:",
      ...(commentLines.length ? commentLines : ["– Ingen"]),
      "",
      `Lokale reaksjoner: ${readForumReactions().length}`,
      "",
      "Opplåste utmerkelser:",
      ...(awardLines.length ? awardLines : ["– Ingen"])
    ].join("\n");
    dataReport.hidden = false;
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
    profileAwardsCount.textContent = String(syncUnlockedAwards().length);
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
    if (["home", "explore", "saved", "calendar"].includes(activeView?.dataset.view)) {
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

    if (viewName === "forum") {
      renderForumPosts();
    }

    if (viewName === "calendar") {
      renderCalendar();
    }

    if (viewName === "awards") {
      renderAwards();
    }

    if (viewName === "privacy") {
      renderPrivacyState();
    }

    views.forEach((view) => {
      view.hidden = view.dataset.view !== viewName;
    });

    viewContainer.scrollTop = 0;

    const navViewName = ["saved", "awards", "privacy", "help"].includes(viewName)
      ? "profile"
      : viewName === "calendar"
        ? "home"
      : viewName === "forum-detail"
        ? (previousForumView === "calendar" ? "home" : "forum")
      : viewName === "forum-compose"
        ? "forum"
        : viewName === "detail"
          ? (previousView === "saved" ? "profile" : previousView === "calendar" ? "home" : previousView)
          : viewName;

    document.querySelectorAll(".nav-button").forEach((button) => {
      const isActive = button.dataset.viewTarget === navViewName;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  setTheme(savedTheme === "dark");
  setTextSize(savedTextSize === "large");
  demoNotifications.checked = savedNotificationSetting === "on";
  renderActivities(homeActivities, activities.filter((activity) => activity.featured));
  renderHomeWeekIndicators();
  setFilter("all");
  setForumFilter("all");
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

  forumFilterButtons.forEach((button) => {
    button.addEventListener("click", () => setForumFilter(button.dataset.forumFilter));
  });

  forumSearch.addEventListener("input", renderForumPosts);
  openCalendarButton.addEventListener("click", () => showView("calendar"));
  calendarBack.addEventListener("click", () => showView("home"));
  awardsBack.addEventListener("click", () => showView("profile"));
  privacyBack.addEventListener("click", () => showView("profile"));
  helpBack.addEventListener("click", () => showView("profile"));
  generateDataReportButton.addEventListener("click", generateLocalDataReport);
  resetDemoDataButton.addEventListener("click", () => {
    if (!window.confirm("Nullstille alle lokale data og innstillinger for CommuniGreen-demoen?")) return;

    communigreenStorageKeys.forEach((storageKey) => localStorage.removeItem(storageKey));
    setTheme(false);
    setTextSize(false);
    demoNotifications.checked = false;
    currentActivityId = null;
    currentForumPostId = null;
    forumSearch.value = "";
    setForumFilter("all");
    renderSavedActivities();
    renderProfileState();
    renderHomeWeekIndicators();
    renderPrivacyState();
    dataReport.hidden = true;
    privacyStatus.textContent = "CommuniGreen-demoen er nullstilt. Andre porteføljedata er ikke berørt.";
    privacyStatus.hidden = false;
  });
  calendarPrevious.addEventListener("click", () => changeCalendarMonth(-1));
  calendarNext.addEventListener("click", () => changeCalendarMonth(1));
  calendarGrid.addEventListener("click", (event) => {
    const dateButton = event.target.closest("[data-calendar-date]");
    if (!dateButton) return;
    selectedCalendarDate = dateButton.dataset.calendarDate;
    renderCalendar();
  });

  forumDetailBack.addEventListener("click", () => showView(previousForumView));
  newForumPostButton.addEventListener("click", () => {
    forumPostForm.reset();
    forumCalendarFields.hidden = true;
    forumCalendarDate.required = false;
    showView("forum-compose");
  });
  forumComposeBack.addEventListener("click", () => showView("forum"));
  forumAddCalendar.addEventListener("change", () => {
    forumCalendarFields.hidden = !forumAddCalendar.checked;
    forumCalendarDate.required = forumAddCalendar.checked;
    if (!forumAddCalendar.checked) forumCalendarDate.value = "";
  });

  forumPostForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("forum-post-title").value.trim();
    const category = document.getElementById("forum-post-category").value;
    const bodyText = document.getElementById("forum-post-body").value.trim();
    if (!title || !category || !bodyText) return;

    const localPost = {
      id: `local-${Date.now()}`,
      author: "Anna Marie",
      initials: "AM",
      time: "Nå",
      category,
      title,
      excerpt: bodyText.length > 100 ? `${bodyText.slice(0, 97)}…` : bodyText,
      body: bodyText,
      reactions: 0,
      comments: [],
      local: true,
      calendarDate: forumAddCalendar.checked ? forumCalendarDate.value : ""
    };

    writeLocalForumPosts([localPost, ...readLocalForumPosts()]);
    renderHomeWeekIndicators();
    forumPostForm.reset();
    forumCalendarFields.hidden = true;
    forumCalendarDate.required = false;
    forumSearch.value = "";
    setForumFilter("all");
    showView("forum");
    forumFeedback.textContent = localPost.calendarDate
      ? `Innlegget er lagt til lokalt og vises i kalenderen ${formatCalendarDate(localPost.calendarDate)}.`
      : "Innlegget er lagt til lokalt på denne enheten.";
    forumFeedback.hidden = false;
  });

  forumCommentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const commentText = forumCommentText.value.trim();
    if (!currentForumPostId || !commentText) return;

    const comments = readLocalForumComments();
    const postComments = Array.isArray(comments[currentForumPostId]) ? comments[currentForumPostId] : [];
    comments[currentForumPostId] = [
      ...postComments,
      { author: "Anna Marie", initials: "AM", time: "Nå", text: commentText }
    ];
    writeLocalForumComments(comments);
    forumCommentForm.reset();

    const post = getAllForumPosts().find((item) => item.id === currentForumPostId);
    if (!post) return;
    renderForumComments(post);
    updateForumDetailStats(post);
    renderForumPosts();
    forumCommentStatus.textContent = "Kommentaren er lagt til lokalt.";
    forumCommentStatus.hidden = false;
  });

  forumReactButton.addEventListener("click", () => {
    if (!currentForumPostId) return;
    const reactions = readForumReactions();
    const updatedReactions = reactions.includes(currentForumPostId)
      ? reactions.filter((postId) => postId !== currentForumPostId)
      : [...reactions, currentForumPostId];
    writeForumReactions(updatedReactions);

    const post = getAllForumPosts().find((item) => item.id === currentForumPostId);
    if (!post) return;
    updateForumDetailStats(post);
    renderForumPosts();
  });

  deleteForumPostButton.addEventListener("click", () => {
    const post = getAllForumPosts().find((item) => item.id === currentForumPostId);
    if (!post || !isLocalForumPost(post)) return;
    if (!window.confirm("Slette dette lokale innlegget og alle lokale kommentarer til det?")) return;

    writeLocalForumPosts(readLocalForumPosts().filter((item) => item.id !== post.id));

    const comments = readLocalForumComments();
    delete comments[post.id];
    writeLocalForumComments(comments);
    writeForumReactions(readForumReactions().filter((postId) => postId !== post.id));
    renderHomeWeekIndicators();

    currentForumPostId = null;
    showView("forum");
    forumFeedback.textContent = "Innlegget og tilhørende lokale kommentarer er slettet.";
    forumFeedback.hidden = false;
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
    const weekDateButton = event.target.closest(".week-strip [data-calendar-date]");
    if (weekDateButton) {
      selectCalendarDate(weekDateButton.dataset.calendarDate);
      return;
    }

    const deleteCommentButton = event.target.closest("[data-delete-comment]");
    if (deleteCommentButton) {
      if (!currentForumPostId) return;
      if (!window.confirm("Slette denne lokale kommentaren?")) return;

      const commentIndex = Number(deleteCommentButton.dataset.deleteComment);
      const comments = readLocalForumComments();
      const postComments = Array.isArray(comments[currentForumPostId]) ? comments[currentForumPostId] : [];
      if (!Number.isInteger(commentIndex) || !postComments[commentIndex]) return;

      postComments.splice(commentIndex, 1);
      if (postComments.length === 0) {
        delete comments[currentForumPostId];
      } else {
        comments[currentForumPostId] = postComments;
      }
      writeLocalForumComments(comments);

      const post = getAllForumPosts().find((item) => item.id === currentForumPostId);
      if (!post) return;
      renderForumComments(post);
      updateForumDetailStats(post);
      renderForumPosts();
      forumCommentStatus.textContent = "Kommentaren er slettet.";
      forumCommentStatus.hidden = false;
      return;
    }

    const forumPostButton = event.target.closest("[data-forum-post]");
    if (forumPostButton) {
      openForumPost(forumPostButton.dataset.forumPost);
      return;
    }

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
