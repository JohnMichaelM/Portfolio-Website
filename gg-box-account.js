const siteNotice = document.getElementById("site-notice");
const ordersToggle = document.getElementById("orders-toggle");
const ordersPanel = document.getElementById("orders-panel");
const legacyOrderStorageKey = "ggbox-demo-order";
const orderHistoryStorageKey = "ggbox-demo-orders";

const orderStatuses = ["Bekreftet", "Pakkes", "På vei", "Levert"];

function loadOrders() {
  let orders = [];

  try {
    const savedOrders = localStorage.getItem(orderHistoryStorageKey);
    const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];
    orders = Array.isArray(parsedOrders) ? parsedOrders : [];
  } catch {
    orders = [];
  }

  try {
    const savedLegacyOrder = localStorage.getItem(legacyOrderStorageKey);
    const legacyOrder = savedLegacyOrder ? JSON.parse(savedLegacyOrder) : null;

    if (
      legacyOrder &&
      legacyOrder.number &&
      !orders.some((order) => order.number === legacyOrder.number)
    ) {
      orders.unshift(legacyOrder);
      localStorage.setItem(orderHistoryStorageKey, JSON.stringify(orders));
    }
  } catch {
    return orders;
  }

  return orders;
}

function formatPrice(price) {
  return `${Number(price) || 0} kr`;
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

function getStatusIndex(order) {
  if (!Number.isInteger(order.statusIndex)) {
    return 0;
  }

  return Math.min(Math.max(order.statusIndex, 0), orderStatuses.length - 1);
}

function getItemCount(order) {
  if (!Array.isArray(order.items)) {
    return 0;
  }

  return order.items.reduce((sum, item) => {
    return sum + Number(item.quantity || 0);
  }, 0);
}

function renderOrderCard(order) {
  const statusIndex = getStatusIndex(order);
  const orderNumber = String(order.number || "Ukjent");
  const orderUrl = `gg-box-order.html?order=${encodeURIComponent(orderNumber)}&view=history`;

  return `
    <article class="orders-summary">
      <div class="orders-summary-header">
        <div>
          <p class="section-label">${formatDate(order.createdAt)}</p>
          <h3>Ordre ${orderNumber}</h3>
        </div>
        <p class="orders-summary-status">${orderStatuses[statusIndex]}</p>
      </div>

      <div class="orders-summary-details">
        <p><span>Antall varer</span><strong>${getItemCount(order)}</strong></p>
        <p><span>Sum</span><strong>${formatPrice(order.total)}</strong></p>
      </div>

      <div class="orders-summary-footer">
        <a class="orders-link" href="${orderUrl}">Se ordredetaljer</a>
      </div>
    </article>
  `;
}

function renderOrderGroup(title, orders, emptyMessage) {
  const content = orders.length
    ? `<div class="orders-list">${orders.map(renderOrderCard).join("")}</div>`
    : `<p class="orders-group-empty">${emptyMessage}</p>`;

  return `
    <section class="orders-group">
      <h2>${title}</h2>
      ${content}
    </section>
  `;
}

function renderOrders() {
  const orders = loadOrders()
    .filter((order) => order && Array.isArray(order.items) && order.items.length)
    .sort((firstOrder, secondOrder) => {
      return new Date(secondOrder.createdAt) - new Date(firstOrder.createdAt);
    });

  if (orders.length === 0) {
    ordersPanel.innerHTML = `
      <div class="orders-empty">
        <p>Du har ingen demobestillinger ennå.</p>
        <a class="orders-link" href="gg-box-demo.html">Se GG-BOXer</a>
      </div>
    `;
    return;
  }

  const activeOrders = orders.filter((order) => getStatusIndex(order) < 3);
  const previousOrders = orders.filter((order) => getStatusIndex(order) === 3);

  ordersPanel.innerHTML = `
    ${renderOrderGroup(
      "Pågående bestillinger",
      activeOrders,
      "Du har ingen pågående demobestillinger."
    )}
    ${renderOrderGroup(
      "Tidligere bestillinger",
      previousOrders,
      "Du har ingen leverte demobestillinger ennå."
    )}
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
