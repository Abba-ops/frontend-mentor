const errorText = document.querySelector(".calculator__error-text");
const tipButtonsWrapper = document.querySelector(".calculator__tip-options");
const resetButton = document.querySelector(".calculator__reset-button");
const tipCustomInput = document.querySelector(".calculator__tip-custom");
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipAmountEl = document.querySelector(
  ".calculator__result-item:nth-child(1) .calculator__result-value"
);
const totalAmountEl = document.querySelector(
  ".calculator__result-item:nth-child(2) .calculator__result-value"
);

let bill = 0;
let tipPercentage = 0;
let people = 1;

function calculate() {
  people = parseFloat(peopleInput.value) || 0;
  bill = parseFloat(billInput.value) || 0;

  if (people === 0) {
    peopleInput.parentElement.classList.add("error");
    errorText.style.display = "block";
    return;
  } else {
    peopleInput.parentElement.classList.remove("error");
    errorText.style.display = "none";
  }

  const tipAmountPerPerson = (bill * tipPercentage) / people;
  const totalPerPerson = (bill + bill * tipPercentage) / people;

  tipAmountEl.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
  totalAmountEl.textContent = `$${totalPerPerson.toFixed(2)}`;
}

function clearActiveTipButtons() {
  const tipButtons = document.querySelectorAll(".calculator__tip-button");
  tipButtons.forEach((button) => button.classList.remove("active"));
}

function getPercentageHandler(event) {
  const target = event.target;
  tipCustomInput.value = "";
  clearActiveTipButtons();
  if (target.classList.contains("calculator__tip-button")) {
    tipPercentage = parseFloat(target.dataset.tip) / 100;
    target.classList.add("active");
    calculate();
  }
}

function resetHandler() {
  peopleInput.value = "";
  tipCustomInput.value = "";
  billInput.value = "";
  tipAmountEl.textContent = "$0.00";
  totalAmountEl.textContent = "$0.00";
  clearActiveTipButtons();
  tipPercentage = 0;
  bill = 0;
  people = 1;
}

function customInputHandler() {
  clearActiveTipButtons();
  tipPercentage = parseFloat(tipCustomInput.value) / 100 || 0;
  calculate();
}

tipButtonsWrapper.addEventListener("click", getPercentageHandler);
resetButton.addEventListener("click", resetHandler);
tipCustomInput.addEventListener("input", customInputHandler);
billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);
