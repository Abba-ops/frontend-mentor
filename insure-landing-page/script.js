const hamburgerIcon = document.querySelector(".hero__icon");
const navbar = document.querySelector(".hero__menu");

hamburgerIcon.addEventListener("click", () => {
  navbar.classList.toggle("show");
  hamburgerIcon.setAttribute(
    "src",
    navbar.classList.contains("show")
      ? "images/icon-close.svg"
      : "images/icon-hamburger.svg"
  );
});
