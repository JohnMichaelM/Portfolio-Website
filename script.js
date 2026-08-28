const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  const themeLabel = themeToggle.querySelector("[data-theme-label]");

  if (themeLabel) {
    themeLabel.textContent = isDark ? "Lys" : "Mørk";
  } else {
    themeToggle.textContent = isDark ? "Lys modus" : "Mørk modus";
  }
  themeToggle.setAttribute("aria-pressed", String(isDark));

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Bytt til lys modus" : "Bytt til mørk modus"
  );
}

if (savedTheme === "dark") {
  setTheme(true);
} else if (savedTheme === "light") {
  setTheme(false);
} else {
  setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
}

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");

  setTheme(isDark);
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
});

