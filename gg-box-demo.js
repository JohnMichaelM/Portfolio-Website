const products = {
  favorites: {
    name: "Favorittene-mix",
    price: 199
  },
  japan: {
    name: "En reise til Japan",
    price: 249
  },
  mystery: {
    name: "Mystery Box",
    price: 249
  }
};

const cartStorageKey = "ggbox-demo-cart";

function loadCart() {
  try {
    const savedCart = localStorage.getItem(cartStorageKey);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

const cart = loadCart();

const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
const cartDrawer = document.getElementById("cart-drawer");
const cartBackdrop = document.getElementById("cart-backdrop");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");
const siteNotice = document.getElementById("site-notice");

function formatPrice(price) {
  return `${price} kr`;
}

function saveCart() {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function showNotice(message) {
  siteNotice.textContent = message;
  siteNotice.classList.add("is-visible");

  clearTimeout(showNotice.timeout);

  showNotice.timeout = setTimeout(() => {
    siteNotice.classList.remove("is-visible");
  }, 3000);
}

function openCart() {
  cartDrawer.classList.add("is-open");
  cartBackdrop.classList.add("is-open");

  cartDrawer.setAttribute("aria-hidden", "false");
  cartBackdrop.setAttribute("aria-hidden", "false");
  cartToggle.setAttribute("aria-expanded", "true");
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartBackdrop.classList.remove("is-open");

  cartDrawer.setAttribute("aria-hidden", "true");
  cartBackdrop.setAttribute("aria-hidden", "true");
  cartToggle.setAttribute("aria-expanded", "false");
}

function renderCart() {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const itemCount = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = formatPrice(total);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">Handlekurven din er tom.</p>
    `;
    return;
  }

  cartItems.innerHTML = cart
    .map((item) => {
      return `
        <article class="cart-item">
          <div>
            <h3>${item.name}</h3>
            <p>${formatPrice(item.price)} per boks</p>
          </div>

          <div class="quantity-controls" aria-label="Antall ${item.name}">
            <button
              class="quantity-button"
              type="button"
              data-product="${item.id}"
              data-change="-1"
              aria-label="Fjern én ${item.name}"
            >
              −
            </button>

            <span class="quantity-value">${item.quantity}</span>

            <button
              class="quantity-button"
              type="button"
              data-product="${item.id}"
              data-change="1"
              aria-label="Legg til én ${item.name}"
            >
              +
            </button>
          </div>

          <strong class="cart-item-total">
            ${formatPrice(item.price * item.quantity)}
          </strong>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".quantity-button").forEach((button) => {
    button.addEventListener("click", () => {
      changeQuantity(
        button.dataset.product,
        Number(button.dataset.change)
      );
    });
  });
}

function addToCart(productId) {
  const selectedProduct = products[productId];
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  showNotice(`${selectedProduct.name} ble lagt i handlekurven.`);
}

function changeQuantity(productId, change) {
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex === -1) {
    return;
  }

  cart[itemIndex].quantity += change;

  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCart();
  renderCart();
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    addToCart(button.dataset.product);
  });
});

document.querySelectorAll("[data-coming-soon]").forEach((button) => {
  button.addEventListener("click", () => {
    showNotice(button.dataset.comingSoon);
  });
});

cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    showNotice("Legg først en GG-BOX i handlekurven.");
    return;
  }

  window.location.href = "gg-box-checkout.html";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
  }
});

renderCart();