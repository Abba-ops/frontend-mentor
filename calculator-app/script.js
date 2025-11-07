const screen = document.querySelector(".calculator__screen");
const keypad = document.querySelector(".calculator__keypad");
const themeSelectors = document.querySelectorAll('input[name="theme"]');

(function applySavedTheme() {
  const savedTheme = localStorage.getItem("data-theme");
  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
  }
})();

themeSelectors.forEach((selector) => {
  selector.addEventListener("change", () => {
    const selectedTheme = selector.value;
    document.body.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("data-theme", selectedTheme);
  });
});

keypad.addEventListener("click", (event) => {
  const key = event.target;
  if (!key.classList.contains("keypad__key")) return;

  const keyValue = key.dataset.value;

  switch (keyValue) {
    case "DEL":
      screen.textContent = screen.textContent.slice(0, -1);
      break;

    case "RESET":
      screen.textContent = "";
      break;

    case "=":
      screen.textContent = eval(screen.textContent);
      break;

    default:
      screen.textContent += keyValue;
  }
});
