const hamburgerIcon = document.querySelector(".hero__icon");
const questionsAccordion = document.querySelector(".questions__accordion");
const navbar = document.querySelector(".hero__nav");
const menu = document.querySelector(".hero__menu");
const heroLogo = document.querySelector(".hero__logo");

function changeTab(event) {
  const selectedTab = event.target;
  const tabId = selectedTab.getAttribute("data-tab");

  const allTabs = document.querySelectorAll(".features__tab");
  const allContents = document.querySelectorAll(".features__content");

  allTabs.forEach((tab) => tab.classList.remove("active"));
  allContents.forEach((content) => content.classList.remove("active"));

  selectedTab.classList.add("active");

  const activeContent = document.querySelector(`div[data-content="${tabId}"]`);
  if (activeContent) activeContent.classList.add("active");
}

function toggleAccordionItem(activeItem) {
  const allItems = document.querySelectorAll(".questions__accordion-item");

  allItems.forEach((item) => {
    if (item !== activeItem) {
      item.classList.remove("active");
    }
  });

  activeItem.classList.toggle("active");
}

function accordionClickHandler(event) {
  const clickedElement = event.target;

  if (clickedElement.nodeName !== "H3") return;

  const activeItem = clickedElement.parentElement;
  toggleAccordionItem(activeItem);
}

function toggleMenuHandler() {
  navbar.classList.toggle("active");
  menu.classList.toggle("active");

  hamburgerIcon.src = menu.classList.contains("active")
    ? "images/icon-close.svg"
    : "images/icon-hamburger.svg";

  heroLogo.src = menu.classList.contains("active")
    ? "images/logo-bookmark-white.svg"
    : "images/logo-bookmark.svg";
}

questionsAccordion.addEventListener("click", accordionClickHandler);
hamburgerIcon.addEventListener("click", toggleMenuHandler);
