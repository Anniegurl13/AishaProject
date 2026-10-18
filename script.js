const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = themeToggle.querySelector(".theme-label");
const root = document.documentElement;
// Mobile navigation
function closeMenu() {
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});
// Close the menu after selecting a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});
// Close the menu when returning to desktop layout
window.addEventListener("resize", () => {
  if (window.innerWidth > 780) {
    closeMenu();
  }
});
// Dark mode
function applyTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("aisha-foundation-theme");
} catch (error) {
  // The theme toggle still works if browser storage is unavailable.
}
applyTheme(savedTheme === "dark" ? "dark" : "light");
themeToggle.addEventListener("click", () => {
  const nextTheme =
    root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem("aisha-foundation-theme", nextTheme);
  } catch (error) {
    // The theme remains active for the current page.
  }
});
// Current year in footer
document.getElementById("year").textContent =
  new Date().getFullYear();