const heroIcon = document.querySelector(".hero__icon");
const heroMenu = document.querySelector(".hero__menu");

heroIcon.addEventListener("click", (event) => {
  heroMenu.classList.toggle("active");
  heroIcon.src = heroMenu.classList.contains("active")
    ? "images/icon-close.svg"
    : "images/icon-hamburger.svg";
});
