const products = {
  favorites: {
    name: "Favorittmiks",
    price: 199,
    image: "images/gg-box/products/favorites-mix.png"
  },
  japan: {
    name: "En reise til Japan",
    price: 249,
    image: "images/gg-box/products/japan-box.png"
  },
  mystery: {
    name: "Mystery Box",
    price: 249,
    image: "images/gg-box/products/mystery-box.png"
  }
};

const favoriteStorageKey = "ggbox-demo-favorites";
const cartStorageKey = "ggbox-demo-cart";

const favoritesList = document.getElementById("favorites-list");
const themeToggle = document.getElementById("theme-toggle");
const siteNotice = document.getElementById("site-notice");

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(favoriteStorageKey)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(favoriteStorageKey, JSON.stringify(favorites));
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(cartStorageKey)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

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

function addToCart(productId) {
  const product = products[productId];
  const cart = loadCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  saveCart(cart);
  showNotice(`${product.name} ble lagt i handlekurven.`);
}

function removeFavorite(productId) {
  const updatedFavorites = loadFavorites().filter((id) => id !== productId);
  saveFavorites(updatedFavorites);
  renderFavorites();
  showNotice("Favoritten ble fjernet.");
}

function renderFavorites() {
  const favoriteIds = loadFavorites();

  if (favoriteIds.length === 0) {
    favoritesList.innerHTML = `
      <article class="empty-favorites">
        <h2>Ingen favoritter ennå</h2>
        <p>Trykk på hjertet ved en GG-BOX i butikken for å lagre den her.</p>
        <a class="primary-button" href="gg-box-demo.html">Se GG-BOXer</a>
      </article>
    `;
    return;
  }

  favoritesList.innerHTML = favoriteIds
    .filter((id) => products[id])
    .map((id) => {
      const product = products[id];

      return `
        <article class="favorite-card">
          <img src="${product.image}" alt="${product.name}">
          <div class="favorite-card-content">
            <h2>${product.name}</h2>
            <p>Lagret favoritt i demonstrasjonen av GG-BOX.</p>

            <div class="favorite-card-footer">
              <strong>${formatPrice(product.price)}</strong>

              <div class="favorite-actions">
                <button
                  class="remove-favorite"
                  type="button"
                  data-remove="${id}"
                >
                  Fjern
                </button>

                <button
                  class="primary-button"
                  type="button"
                  data-add="${id}"
                >
                  Legg i kurv
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.add);
    });
  });

  document.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      removeFavorite(button.dataset.remove);
    });
  });
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "Lys modus";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  themeToggle.textContent = isDarkMode ? "Lys modus" : "Mørk modus";
});

renderFavorites();
