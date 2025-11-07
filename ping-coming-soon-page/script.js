const form = document.querySelector(".form");

function showInputError(errorText, inputId) {
  const inputEl = document.getElementById(inputId);
  const errorMsg = document.createElement("p");
  errorMsg.className = "form__error";
  errorMsg.textContent = errorText;
  inputEl.insertAdjacentElement("afterend", errorMsg);
  inputEl.classList.add("error");
}

function removeError(inputId) {
  const inputEl = document.getElementById(inputId);
  const errorEl = inputEl.nextElementSibling;
  if (errorEl && errorEl.classList.contains("form__error")) {
    errorEl.remove();
  }
  inputEl.classList.remove("error");
}

function submitHandler(event) {
  event.preventDefault();

  const emailInputId = "email";
  const emailInput = event.target.elements[emailInputId];

  removeError(emailInputId);

  const emailValue = emailInput.value.trim();

  if (!emailValue) {
    showInputError("Email is required.", emailInputId);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailValue)) {
    showInputError("Please provide a valid email address.", emailInputId);
    return;
  }
}

form.addEventListener("submit", submitHandler);
