const ratingCardElement = document.querySelector(".rating-card");

let selectedFeedback;

function handleFormSubmit(event) {
  event.preventDefault();

  if (!selectedFeedback) return;

  const thankYouTemplate = document.getElementById("thank-you-card");
  const thankYouCard = document.importNode(thankYouTemplate.content, true);
  thankYouCard.querySelector(".selection").textContent = selectedFeedback;
  ratingCardElement.replaceWith(thankYouCard);
}

function handleFeedbackSelection(event) {
  if (event.target.classList.contains("rating-card__option")) {
    ratingCardElement
      .querySelectorAll(".rating-card__option")
      .forEach((option) => option.classList.remove("active"));
    event.target.classList.add("active");
    selectedFeedback = event.target.textContent;
  }
}

ratingCardElement.addEventListener("submit", handleFormSubmit);
ratingCardElement.addEventListener("click", handleFeedbackSelection);
