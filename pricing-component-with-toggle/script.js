const switchInput = document.querySelector(".switch__input");
const basicPrice = document.querySelector(
  ".pricing__plan--basic .pricing__plan-price"
);
const professionalPrice = document.querySelector(
  ".pricing__plan--professional .pricing__plan-price"
);
const masterPrice = document.querySelector(
  ".pricing__plan--master .pricing__plan-price"
);

function togglePricingHandler(event) {
  if (event.target.checked) {
    basicPrice.textContent = "19.99";
    professionalPrice.textContent = "24.99";
    masterPrice.textContent = "39.99";
  } else {
    basicPrice.textContent = "199.99";
    professionalPrice.textContent = "249.99";
    masterPrice.textContent = "399.99";
  }
}

switchInput.addEventListener("change", togglePricingHandler);
