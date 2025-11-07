const navIcon = document.querySelector(".nav__icon");
const navList = document.querySelector(".nav__list");

navIcon.addEventListener("click", (event) => {
  navIcon.src = navList.classList.contains("active")
    ? "images/icon-menu.svg"
    : "images/icon-menu-close.svg";
  navList.classList.toggle("active");
});
