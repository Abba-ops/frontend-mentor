const hamburgerIcon = document.querySelector(".nav__icon");
const menu = document.querySelector(".nav__menu");

hamburgerIcon.addEventListener("click", () => {
  menu.classList.toggle("show");
  hamburgerIcon.setAttribute(
    "src",
    menu.classList.contains("show")
      ? "images/icon-close.svg"
      : "images/icon-hamburger.svg"
  );
});
