const jobListEl = document.querySelector(".job-list");
const filterEl = document.querySelector(".filter");
const filterListEl = filterEl.querySelector(".filter__list");

let jobs = [];
const filters = {
  role: new Set(),
  level: new Set(),
  language: new Set(),
  tool: new Set(),
};

(async function () {
  const response = await fetch("data.json");
  jobs = await response.json();
  renderJobListings();
})();

function renderJobListings() {
  jobs.forEach((job) => {
    const jobElement = document.createElement("div");
    jobElement.className = "job-card";
    jobElement.dataset.featured = job.featured;
    jobElement.dataset.id = job.id;
    jobElement.innerHTML = `
    <div class="job-card__main">
      <img class="job-card__logo" src="${job.logo}" alt="${job.company}" />
      <div class="job-card__info">
        <div class="job-card__top">
          <h4 class="job-card__company">${job.company}</h4>
          ${
            job.new
              ? "<span class='job-card__badge job-card__badge--new'>New!</span>"
              : ""
          }
          ${
            job.featured
              ? "<span class='job-card__badge job-card__badge--featured'>Featured</span>"
              : ""
          }
        </div>
        <p class="job-card__position">${job.position}</p>
        <ul class="job-card__meta">
          <li class="job-card__meta-item">${job.postedAt}</li>
          <li class="job-card__meta-item">${job.contract}</li>
          <li class="job-card__meta-item">${job.location}</li>
        </ul>
      </div>
    </div>
    <div class="job-card__filters">
    ${
      job.role
        ? `<p class="job-card__filter" data-filter-type="role">${job.role}</p>`
        : ""
    }
    ${
      job.level
        ? `<p class="job-card__filter" data-filter-type="level">${job.level}</p>`
        : ""
    }
    ${job.languages
      .map(
        (language) =>
          `<p class="job-card__filter" data-filter-type="language">${language}</p>`
      )
      .join("")}
    ${job.tools
      .map(
        (tool) =>
          `<p class="job-card__filter" data-filter-type="tool">${tool}</p>`
      )
      .join("")}     
    </div>
    `;
    jobListEl.append(jobElement);
  });
}

function updateFilterUI() {
  const active = Object.values(filters).some((set) => set.size > 0);
  filterEl.style.display = active ? "flex" : "none";
}

function addFilter(category, filterType) {
  const badge = document.createElement("div");
  badge.className = "filter__item";
  badge.dataset.filterType = filterType;
  badge.innerHTML = `
  <p class="filter__text">${category}</p>
  <div class="filter__remove">
    <img
      alt="remove icon"
      src="images/icon-remove.svg"
      class="filter__icon" />
  </div>
  `;
  filterListEl.append(badge);
  displayJobs();
}

function removeFilter(filterType, value, badgeEl) {
  filters[filterType].delete(value);
  badgeEl.remove();
  updateFilterUI();
  displayJobs();
}

function clearFilters() {
  Object.keys(filters).forEach((type) => filters[type].clear());
  filterListEl.innerHTML = "";
  updateFilterUI();
  displayJobs();
}

function applyFilters() {
  return jobs.filter((job) => {
    const roleMatch = !filters.role.size || filters.role.has(job.role);
    const levelMatch = !filters.level.size || filters.level.has(job.level);
    const languageMatch =
      !filters.language.size ||
      Array.from(filters.language).every((language) =>
        job.languages.includes(language)
      );
    const toolMatch =
      !filters.tool.size || job.tools.some((tool) => filters.tool.has(tool));

    return roleMatch && levelMatch && languageMatch && toolMatch;
  });
}

function displayJobs() {
  const allJobCards = jobListEl.querySelectorAll(".job-card");
  const filteredJobs = applyFilters();

  allJobCards.forEach((jobCard) => {
    const jobId = jobCard.dataset.id;
    const isVisible = filteredJobs.some((job) => job.id === +jobId);
    jobCard.style.display = isVisible ? "flex" : "none";
  });
}

function filterJobsHandler(event) {
  const clickedElement = event.target;
  if (!clickedElement.classList.contains("job-card__filter")) return;

  const categoryKey = clickedElement.dataset.filterType;
  const filterValue = clickedElement.textContent.trim();
  const filterSet = filters[categoryKey];

  if (filterSet.has(filterValue)) return;
  filterSet.add(filterValue);
  updateFilterUI();
  addFilter(filterValue, categoryKey);
}

jobListEl.addEventListener("click", filterJobsHandler);
filterEl.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.closest(".filter__remove")) {
    const item = clickedElement.closest(".filter__item");
    const filterType = item.dataset.filterType;
    const value = item.querySelector(".filter__text").textContent.trim();
    removeFilter(filterType, value, item);
  } else if (clickedElement.classList.contains("filter__clear")) {
    clearFilters();
  }
});
