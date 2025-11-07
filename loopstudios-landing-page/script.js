const hamburgerIcon = document.querySelector(".hero__icon");
const navbar = document.querySelector(".hero__nav");

hamburgerIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
  hamburgerIcon.src = navbar.classList.contains("active")
    ? "images/icon-close.svg"
    : "images/icon-hamburger.svg";
});
