const hamburgerIcon = document.querySelector(".hero__hamburger");
const menu = document.querySelector(".hero__menu");

hamburgerIcon.addEventListener("click", () => {
  menu.classList.toggle("active");
});
