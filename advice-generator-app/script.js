const adviceId = document.querySelector(".advice__id span");
const adviceText = document.querySelector(".advice__text");
const adviceButton = document.querySelector(".advice__button");

async function generateQuote() {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    if (!res.ok) {
      throw new Error(
        "An error occurred while fetching advice. Please try again later."
      );
    }

    const data = await res.json();
    adviceId.textContent = `#${data.slip.id}`;
    adviceText.textContent = data.slip.advice;
  } catch (error) {
    alert(
      error.message || "We couldn’t fetch new advice. Please try again shortly."
    );
  }
}

generateQuote();

adviceButton.addEventListener("click", generateQuote);
