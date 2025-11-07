const calculatorForm = document.querySelector(".calculator__form");
const resetButton = document.querySelector(".calculator__reset-button");

function showInputError(inputName, errorText) {
  const errorElement = document.getElementById(`${inputName}-error`);
  const previousElement = errorElement.previousElementSibling;

  if (previousElement.classList.contains("calculator__input-wrapper"))
    previousElement.classList.add("error");

  if (errorElement) {
    errorElement.textContent = errorText;
    errorElement.style.display = "block";
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".calculator__error-message");
  errorElements.forEach((element) => {
    const previousElement = element.previousElementSibling;
    previousElement.classList.remove("error");

    element.textContent = "";
    element.style.display = "none";
  });
}

function calculateMortgage() {
  const principal = parseFloat(
    document.querySelector("input[name='amount']").value
  );
  const years = parseFloat(document.querySelector("input[name='term']").value);
  const annualRate = parseFloat(
    document.querySelector("input[name='rate']").value
  );
  const n = years * 12;

  const mortgageTypeRadios = document.querySelectorAll("input[name='type']");
  let type = "";
  mortgageTypeRadios.forEach((radio) => {
    if (radio.checked) {
      type = radio.id;
    }
  });

  let monthlyPayment, totalPayment;
  if (type === "repayment") {
    const r = annualRate / 100 / 12;
    monthlyPayment =
      (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    totalPayment = monthlyPayment * n;
  } else if (type === "interest-only") {
    monthlyPayment = (principal * (annualRate / 100)) / 12;
    totalPayment = monthlyPayment * n + principal;
  }

  return { monthlyPayment, totalPayment };
}

function showResults() {
  const resultsTemplate = document.getElementById("results-template");
  const resultsElement = resultsTemplate.content.cloneNode(true);

  const { monthlyPayment, totalPayment } = calculateMortgage();

  const monthlyRepaymentElement = resultsElement.querySelector(
    ".calculator__summary-value"
  );
  const totalRepaymentElement = resultsElement.querySelector(
    ".calculator__summary-total"
  );
  monthlyRepaymentElement.textContent = `£${monthlyPayment.toLocaleString(
    "en-GB",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  )}`;
  totalRepaymentElement.textContent = `£${totalPayment.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  document.querySelector(".calculator__results").replaceWith(resultsElement);
}

function resetMortgage() {
  const emptyTemplate = document.getElementById("empty-template");
  const emptyElement = emptyTemplate.content.cloneNode(true);
  document.querySelector(".calculator__results").replaceWith(emptyElement);
  clearErrors();
}

function submitHandler(event) {
  event.preventDefault();

  let errors = {};
  clearErrors();

  const amount = calculatorForm.querySelector("input[name='amount']").value;
  const term = calculatorForm.querySelector("input[name='term']").value;
  const rate = calculatorForm.querySelector("input[name='rate']").value;
  const radioButtons = document.querySelectorAll('input[name="type"]');

  const isMortgageTypeSelected = Array.from(radioButtons).some(
    (radio) => radio.checked
  );

  if (!amount.length) {
    errors.amount = "This input is required.";
  }

  if (!term.length) {
    errors.term = "This input is required.";
  }

  if (!rate.length) {
    errors.rate = "This input is required.";
  }

  if (!isMortgageTypeSelected) {
    errors.type = "This input is required.";
  }

  if (Object.keys(errors).length) {
    for (const key in errors) {
      showInputError(key, errors[key]);
    }
    return;
  }

  showResults();
}

calculatorForm.addEventListener("submit", submitHandler);
resetButton.addEventListener("click", resetMortgage);
