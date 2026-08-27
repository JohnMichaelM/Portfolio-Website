const siteNotice = document.getElementById("site-notice");

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