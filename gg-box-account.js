const siteNotice = document.getElementById("site-notice");
const ordersToggle = document.getElementById("orders-toggle");
const ordersPanel = document.getElementById("orders-panel");
const orderStorageKey = "ggbox-demo-order";

const orderStatuses = [
  "Bekreftet",
  "Pakkes",
  "På vei",
  "Levert"
];

function loadOrder() {
  try {
    const savedOrder = localStorage.getItem(orderStorageKey);
    return savedOrder ? JSON.parse(savedOrder) : null;
  } catch {
    return null;
  }
}

function formatPrice(price) {
  return `${price} kr`;
}

function formatDate(date) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Dato ikke tilgjengelig";
  }

  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(parsedDate);
}

function renderOrders() {
  const order = loadOrder();

  if (!order || !Array.isArray(order.items) || order.items.length === 0) {
    ordersPanel.innerHTML = `
      <div class="orders-empty">
        <p>Du har ingen demobestilling ennå.</p>
        <a class="orders-link" href="gg-box-demo.html">Se GG-BOXer</a>
      </div>
    `;
    return;
  }

  const statusIndex = Number.isInteger(order.statusIndex)
    ? Math.min(Math.max(order.statusIndex, 0), orderStatuses.length - 1)
    : 0;

  const itemCount = order.items.reduce((sum, item) => {
    return sum + Number(item.quantity || 0);
  }, 0);

  ordersPanel.innerHTML = `
    <article class="orders-summary">
      <div class="orders-summary-header">
        <div>
          <p class="section-label">SISTE DEMOBESTILLING</p>
          <h2>Ordre ${order.number}</h2>
        </div>
        <p class="orders-summary-status">${orderStatuses[statusIndex]}</p>
      </div>

      <div class="orders-summary-details">
        <p><span>Bestilt</span><strong>${formatDate(order.createdAt)}</strong></p>
        <p><span>Antall varer</span><strong>${itemCount}</strong></p>
        <p><span>Sum</span><strong>${formatPrice(order.total)}</strong></p>
      </div>

      <div class="orders-summary-footer">
        <p>Demoen husker kun den siste bestillingen.</p>
        <a class="orders-link" href="gg-box-order.html">Se ordrestatus</a>
      </div>
    </article>
  `;
}

function showNotice(message) {
  siteNotice.textContent = message;
  siteNotice.classList.add("is-visible");

  clearTimeout(showNotice.timeout);

  showNotice.timeout = setTimeout(() => {
    siteNotice.classList.remove("is-visible");
  }, 3000);
}

document.querySelectorAll("[data-coming-soon]").forEach((button) => {
  button.addEventListener("click", () => {
    showNotice(button.dataset.comingSoon);
  });
});

ordersToggle.addEventListener("click", () => {
  const isOpen = ordersToggle.getAttribute("aria-expanded") === "true";

  ordersToggle.setAttribute("aria-expanded", String(!isOpen));
  ordersPanel.hidden = isOpen;

  if (!isOpen) {
    renderOrders();
  }
});
