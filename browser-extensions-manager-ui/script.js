const themeToggleButton = document.querySelector(".header__toggle");
const extensionsContainer = document.querySelector(".extensions__list");
const filterButtons = {
  all: document.getElementById("filter-all"),
  active: document.getElementById("filter-active"),
  inactive: document.getElementById("filter-inactive"),
};

const THEME_KEY = "extension-ui-theme";

let extensions = [];

(async function () {
  const response = await fetch("data.json");
  const data = await response.json();

  extensions = data.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
  }));

  renderExtensions();
})();

(function () {
  const savedTheme = localStorage.getItem(THEME_KEY) || "theme--light";
  document.body.classList.add(savedTheme);

  themeToggleButton.querySelector("img").src =
    savedTheme === "theme--light"
      ? "images/icon-moon.svg"
      : "images/icon-sun.svg";

  const headerLogo = document.querySelector(".header__logo");
  headerLogo.src =
    savedTheme === "theme--light" ? "images/logo.svg" : "images/logo-white.svg";
})();

function renderExtensions() {
  extensionsContainer.innerHTML = "";

  extensions.forEach(({ name, description, logo, id, isActive }) => {
    const extensionElement = document.createElement("div");
    extensionElement.className = "extension";
    extensionElement.dataset.active = isActive;
    extensionElement.dataset.id = id;

    extensionElement.innerHTML = `
      <div class="extension__info">
        <img class="extension__logo" src="${logo}" alt="${name} logo" />
        <div class="extension__details">
          <h3 class="extension__name">${name}</h3>
          <p class="extension__description">${description}</p>
        </div>
      </div>
      <div class="extension__actions">
        <button class="extension__remove-btn" data-id="${id}">Remove</button>
        <label class="switch">
          <input class="switch__input" type="checkbox" ${
            isActive ? "checked" : ""
          } data-id="${id}" />
          <span class="switch__slider"></span>
        </label>
      </div>
    `;

    extensionsContainer.appendChild(extensionElement);
  });
}

function toggleThemeHandler() {
  const isLightTheme = document.body.classList.toggle("theme--light");
  document.body.classList.toggle("theme--dark", !isLightTheme);
  localStorage.setItem(
    THEME_KEY,
    isLightTheme ? "theme--light" : "theme--dark"
  );

  themeToggleButton.querySelector("img").src = isLightTheme
    ? "images/icon-moon.svg"
    : "images/icon-sun.svg";

  const headerLogo = document.querySelector(".header__logo");
  headerLogo.src = isLightTheme ? "images/logo.svg" : "images/logo-white.svg";
}

function extensionClickHandler(e) {
  const target = e.target;
  const extensionId = target.dataset.id;

  if (target.classList.contains("extension__remove-btn")) {
    extensions = extensions.filter((ext) => ext.id !== extensionId);
    document.querySelector(`[data-id="${extensionId}"]`).remove();
  }

  if (target.classList.contains("switch__input")) {
    extensions = extensions.map((ext) =>
      ext.id === extensionId ? { ...ext, isActive: target.checked } : ext
    );
    document.querySelector(`[data-id="${extensionId}"]`).dataset.active =
      target.checked;
  }
}

function filterClickHandler(filter, e) {
  document
    .querySelectorAll(".extensions__filter-btn")
    .forEach((item) => item.classList.remove("active"));
  e.target.classList.add("active");

  extensionsContainer.querySelectorAll(".extension").forEach((item) => {
    const isActive = item.dataset.active === "true";

    if (filter === "all") {
      item.style.display = "block";
    } else if (filter === "active" && !isActive) {
      item.style.display = "none";
    } else if (filter === "inactive" && isActive) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  });
}

themeToggleButton.addEventListener("click", toggleThemeHandler);
extensionsContainer.addEventListener("click", extensionClickHandler);
filterButtons.all.addEventListener(
  "click",
  filterClickHandler.bind(null, "all")
);
filterButtons.active.addEventListener(
  "click",
  filterClickHandler.bind(null, "active")
);
filterButtons.inactive.addEventListener(
  "click",
  filterClickHandler.bind(null, "inactive")
);
