const hamburgerIcon = document.querySelector(".hero__icon");
const menu = document.querySelector(".hero__menu");

hamburgerIcon.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");

  hamburgerIcon.setAttribute(
    "src",
    menu.classList.contains("hidden")
      ? "images/icon-hamburger.svg"
      : "images/icon-close.svg"
  );
});
