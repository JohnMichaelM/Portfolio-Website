const cartStorageKey = "ggbox-demo-cart";
const legacyOrderStorageKey = "ggbox-demo-order";
const orderHistoryStorageKey = "ggbox-demo-orders";

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const confirmOrderButton = document.getElementById("confirm-order");
const siteNotice = document.getElementById("site-notice");

function loadCart() {
  try {
    const savedCart = localStorage.getItem(cartStorageKey);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

function loadOrderHistory() {
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
    }
  } catch {
    return orders;
  }

  return orders;
}

const cart = loadCart();

function formatPrice(price) {
  return `${price} kr`;
}

function showNotice(message) {
  siteNotice.textContent = message;
  siteNotice.classList.add("is-visible");

  clearTimeout(showNotice.timeout);

  showNotice.timeout = setTimeout(() => {
    siteNotice.classList.remove("is-visible");
  }, 3000);
}

function getTotal() {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

function createOrderNumber(orders) {
  let orderNumber;

  do {
    orderNumber = `GG-${Math.floor(1000 + Math.random() * 9000)}`;
  } while (orders.some((order) => order.number === orderNumber));

  return orderNumber;
}

function renderCheckout() {
  const total = getTotal();

  checkoutTotal.textContent = formatPrice(total);

  if (cart.length === 0) {
    checkoutItems.innerHTML = `
      <p class="empty-checkout">
        Handlekurven er tom. Velg en GG-BOX før du går til betaling.
      </p>
    `;

    confirmOrderButton.disabled = true;
    return;
  }

  checkoutItems.innerHTML = cart
    .map((item) => {
      return `
        <article class="checkout-item">
          <div>
            <h3>${item.name}</h3>
            <p>${item.quantity} × ${formatPrice(item.price)}</p>
          </div>

          <strong>${formatPrice(item.price * item.quantity)}</strong>
        </article>
      `;
    })
    .join("");

  confirmOrderButton.disabled = false;
}

function createDemoOrder() {
  const selectedPayment = document.querySelector(
    'input[name="payment"]:checked'
  );
  const orders = loadOrderHistory();

  const order = {
    number: createOrderNumber(orders),
    createdAt: new Date().toISOString(),
    paymentMethod: selectedPayment.value,
    customer: {
      name: "Ola Nordmann",
      address: "Storgata 12, 0184 Oslo"
    },
    items: cart,
    total: getTotal(),
    statusIndex: 0
  };

  orders.unshift(order);

  localStorage.setItem(orderHistoryStorageKey, JSON.stringify(orders));
  localStorage.setItem(legacyOrderStorageKey, JSON.stringify(order));
  localStorage.removeItem(cartStorageKey);

  window.location.href = `gg-box-order.html?order=${encodeURIComponent(order.number)}`;
}

document.querySelectorAll("[data-coming-soon]").forEach((button) => {
  button.addEventListener("click", () => {
    showNotice(button.dataset.comingSoon);
  });
});

confirmOrderButton.addEventListener("click", () => {
  if (cart.length === 0) {
    showNotice("Handlekurven er tom.");
    return;
  }

  createDemoOrder();
});

renderCheckout();
