const accordionContainer = document.querySelector(".accordion__list");

function handleAccordionClick(event) {
  const clickedItem = event.target.closest(".accordion__item");
  if (!clickedItem) return;

  const toggleIcon = clickedItem.querySelector("img");
  const allItems = accordionContainer.querySelectorAll(".accordion__item");
  const allIcons = accordionContainer.querySelectorAll("img");

  allItems.forEach((item) => {
    if (item !== clickedItem) {
      item.classList.remove("active");
    }
  });

  allIcons.forEach((icon) => {
    icon.src = "images/icon-plus.svg";
  });

  clickedItem.classList.toggle("active");
  toggleIcon.src = clickedItem.classList.contains("active")
    ? "images/icon-minus.svg"
    : "images/icon-plus.svg";
}

accordionContainer.addEventListener("click", handleAccordionClick);
