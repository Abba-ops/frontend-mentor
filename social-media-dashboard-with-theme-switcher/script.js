const switchInput = document.querySelector(".switch__input");

const THEME_KEY = "social-dashboard-theme";

(function () {
  const savedTheme = localStorage.getItem(THEME_KEY) || "theme--light";
  document.body.classList.add(savedTheme);
  switchInput.checked = savedTheme === "theme--light" ? false : true;
})();

function toggleThemeHandler() {
  const isLightTheme = document.body.classList.toggle("theme--light");
  document.body.classList.toggle("theme--dark", !isLightTheme);
  localStorage.setItem(
    THEME_KEY,
    isLightTheme ? "theme--light" : "theme--dark"
  );
}

switchInput.addEventListener("change", toggleThemeHandler);
