const themeToggleButton = document.querySelector(".header__theme-toggle");
const countryContainer = document.querySelector(".countries");

const LOCAL_STORAGE_THEME_KEY = "rest-countries-theme";
let allCountries = [];

(async function loadCountryData() {
  const response = await fetch("data.json");
  allCountries = await response.json();
  displayCountries();
})();

(function applySavedTheme() {
  const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
    themeToggleButton.querySelector(".bx").className =
      savedTheme === "light" ? "bx bx-moon" : "bx bxs-moon";
  }
})();

function displayCountries() {
  allCountries.forEach((country) => {
    const countryCard = document.createElement("article");
    countryCard.dataset.code = country.alpha3Code;
    countryCard.className = "country-card";
    countryCard.innerHTML = `
      <a href="/countries.html?country=${country.alpha3Code}" class="country-card__link">
        <img class="country-card__flag" src="${country.flags.svg}" alt="${country.name}" />
        <div class="country-card__info">
          <h3 class="country-card__name">${country.name}</h3>
          <p><strong>Population: </strong>${country.population}</p>
          <p><strong>Region: </strong>${country.region}</p>
          <p><strong>Capital: </strong>${country.capital}</p>
        </div>
      </a>
    `;
    countryContainer.appendChild(countryCard);
  });
}

function handleSearch(event) {
  const searchQuery = event.target.value.trim().toLowerCase();

  const matchedCountryCodes = allCountries
    .filter((country) => country.name.toLowerCase().includes(searchQuery))
    .map((country) => country.alpha3Code);

  document.querySelectorAll(".country-card").forEach((card) => {
    card.style.display = matchedCountryCodes.includes(card.dataset.code)
      ? "block"
      : "none";
  });
}

function handleRegionFilter(event) {
  const selectedRegion = event.target.value.toLowerCase();

  const matchedCountryCodes = allCountries
    .filter((country) => country.region.toLowerCase().includes(selectedRegion))
    .map((country) => country.alpha3Code);

  document.querySelectorAll(".country-card").forEach((card) => {
    card.style.display = matchedCountryCodes.includes(card.dataset.code)
      ? "block"
      : "none";
  });
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme;
  const updatedTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = updatedTheme;
  themeToggleButton.querySelector(".bx").className =
    updatedTheme === "light" ? "bx bx-moon" : "bx bxs-moon";
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, updatedTheme);
}

themeToggleButton.addEventListener("click", toggleTheme);
