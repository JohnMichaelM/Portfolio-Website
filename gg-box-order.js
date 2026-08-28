const orderStorageKey = "ggbox-demo-order";

const orderContent = document.getElementById("order-content");
const noOrder = document.getElementById("no-order");
const orderNumber = document.getElementById("order-number");
const paymentMethod = document.getElementById("payment-method");
const deliveryAddress = document.getElementById("delivery-address");
const orderItems = document.getElementById("order-items");
const orderTotal = document.getElementById("order-total");
const statusHeading = document.getElementById("status-heading");
const statusDescription = document.getElementById("status-description");
const nextStatusButton = document.getElementById("next-status");
const clearOrderButton = document.getElementById("clear-order");

const statuses = [
  {
    title: "Bestillingen er bekreftet",
    description: "Vi har mottatt demo-bestillingen din og gjør den klar."
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
    description: "Demo-bestillingen er markert som levert."
  }
];

function loadOrder() {
  try {
    const savedOrder = localStorage.getItem(orderStorageKey);
    return savedOrder ? JSON.parse(savedOrder) : null;
  } catch {
    return null;
  }
}

let order = loadOrder();

function formatPrice(price) {
  return `${price} kr`;
}

function renderOrder() {
  if (!order || !order.items || order.items.length === 0) {
    orderContent.hidden = true;
    noOrder.hidden = false;
    return;
  }

  const statusIndex = Number.isInteger(order.statusIndex)
    ? order.statusIndex
    : 0;

  const currentStatus = statuses[statusIndex];

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
    nextStatusButton.textContent = "Demo-bestillingen er levert";
  } else {
    nextStatusButton.disabled = false;
    nextStatusButton.textContent = "Simuler neste status";
  }
}

nextStatusButton.addEventListener("click", () => {
  if (!order || order.statusIndex >= statuses.length - 1) {
    return;
  }

  order.statusIndex += 1;
  localStorage.setItem(orderStorageKey, JSON.stringify(order));

  renderOrder();
});

clearOrderButton.addEventListener("click", () => {
  localStorage.removeItem(orderStorageKey);
  window.location.href = "gg-box-demo.html";
});

renderOrder();