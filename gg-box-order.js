const legacyOrderStorageKey = "ggbox-demo-order";
const orderHistoryStorageKey = "ggbox-demo-orders";

const orderContent = document.getElementById("order-content");
const noOrder = document.getElementById("no-order");
const orderNumber = document.getElementById("order-number");
const paymentMethod = document.getElementById("payment-method");
const deliveryAddress = document.getElementById("delivery-address");
const orderItems = document.getElementById("order-items");
const orderTotal = document.getElementById("order-total");
const statusHeading = document.getElementById("status-heading");
const statusDescription = document.getElementById("status-description");
const orderPageTitle = document.getElementById("order-page-title");
const orderIntro = document.getElementById("order-intro");
const nextStatusButton = document.getElementById("next-status");
const startNewOrderButton = document.getElementById("start-new-order");

const statuses = [
  {
    title: "Bestillingen er bekreftet",
    description: "Vi har mottatt demobestillingen din og gjør den klar."
  },
  {
    title: "Bestillingen pakkes",
    description: "GG-BOXen blir pakket med snacks fra den valgte boksen."
  },
  {
    title: "Bestillingen er på vei",
    description: "Bestillingen er på vei til Storgata 12 i Oslo."
  },
  {
    title: "Bestillingen er levert",
    description: "Demobestillingen er markert som levert."
  }
];

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
      !orders.some((savedOrder) => savedOrder.number === legacyOrder.number)
    ) {
      orders.unshift(legacyOrder);
      localStorage.setItem(orderHistoryStorageKey, JSON.stringify(orders));
    }
  } catch {
    return orders;
  }

  return orders;
}

let orders = loadOrders();
const requestedOrderNumber = new URLSearchParams(window.location.search).get(
  "order"
);
const isHistoryView = new URLSearchParams(window.location.search).get("view") === "history";
let order = requestedOrderNumber
  ? orders.find((savedOrder) => savedOrder.number === requestedOrderNumber)
  : orders[0];

function formatPrice(price) {
  return `${price} kr`;
}

function getStatusIndex() {
  if (!order || !Number.isInteger(order.statusIndex)) {
    return 0;
  }

  return Math.min(Math.max(order.statusIndex, 0), statuses.length - 1);
}

function saveOrder() {
  const orderIndex = orders.findIndex((savedOrder) => {
    return savedOrder.number === order.number;
  });

  if (orderIndex === -1) {
    return;
  }

  orders[orderIndex] = order;
  localStorage.setItem(orderHistoryStorageKey, JSON.stringify(orders));
  localStorage.setItem(legacyOrderStorageKey, JSON.stringify(order));
}

function renderOrder() {
  if (!order || !Array.isArray(order.items) || order.items.length === 0) {
    orderContent.hidden = true;
    noOrder.hidden = false;
    return;
  }

  const statusIndex = getStatusIndex();
  const currentStatus = statuses[statusIndex];

  if (isHistoryView) {
    orderPageTitle.textContent = "Ordredetaljer.";
    orderIntro.textContent = "Her ser du innhold og status for demobestillingen.";
  }

  orderNumber.textContent = order.number;
  paymentMethod.textContent = order.paymentMethod;
  deliveryAddress.textContent = `${order.customer.name}, ${order.customer.address}`;
  orderTotal.textContent = formatPrice(order.total);

  statusHeading.textContent = currentStatus.title;
  statusDescription.textContent = currentStatus.description;

  orderItems.innerHTML = order.items
    .map((item) => {
      return `
        <article class="order-item">
          <div>
            <h3>${item.name}</h3>
            <p>${item.quantity} × ${formatPrice(item.price)}</p>
          </div>

          <strong>${formatPrice(item.price * item.quantity)}</strong>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll("[data-status-step]").forEach((step) => {
    const stepIndex = Number(step.dataset.statusStep);

    step.classList.toggle("is-complete", stepIndex < statusIndex);
    step.classList.toggle("is-active", stepIndex === statusIndex);
  });

  if (statusIndex === statuses.length - 1) {
    nextStatusButton.disabled = true;
    nextStatusButton.textContent = "Demobestillingen er levert";
  } else {
    nextStatusButton.disabled = false;
    nextStatusButton.textContent = "Simuler neste status";
  }
}

nextStatusButton.addEventListener("click", () => {
  const statusIndex = getStatusIndex();

  if (!order || statusIndex >= statuses.length - 1) {
    return;
  }

  order.statusIndex = statusIndex + 1;
  saveOrder();
  renderOrder();
});

startNewOrderButton.addEventListener("click", () => {
  window.location.href = "gg-box-demo.html";
});

renderOrder();
