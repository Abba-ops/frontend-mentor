const formElement = document.querySelector(".form");

function displayError(errorMessage, inputId) {
  const inputElement = document.getElementById(inputId);
  const errorParagraph = document.createElement("p");
  errorParagraph.textContent = errorMessage;
  errorParagraph.className = "form__error";
  inputElement.insertAdjacentElement("afterend", errorParagraph);
  inputElement.classList.add("error");
}

const handleSubmit = (event) => {
  event.preventDefault();

  const firstName = event.target.elements.firstName.value.trim();
  const lastName = event.target.elements.lastName.value.trim();
  const email = event.target.elements.email.value.trim();
  const password = event.target.elements.password.value.trim();

  let validationErrors = {};

  formElement
    .querySelectorAll(".form__error")
    .forEach((error) => error.remove());
  formElement
    .querySelectorAll(".form__input")
    .forEach((input) => input.classList.remove("error"));

  if (!firstName) {
    validationErrors.firstName = "First name is required.";
  } else if (firstName.length < 2) {
    validationErrors.firstName = "First name must be at least 2 characters.";
  }

  if (!lastName) {
    validationErrors.lastName = "Last name is required.";
  } else if (lastName.length < 2) {
    validationErrors.lastName = "Last name must be at least 2 characters.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    validationErrors.email = "Email is required.";
  } else if (!emailPattern.test(email)) {
    validationErrors.email = "Enter a valid email address.";
  }

  if (!password) {
    validationErrors.password = "Password is required.";
  } else if (password.length < 6) {
    validationErrors.password = "Password must be at least 6 characters.";
  }

  if (Object.keys(validationErrors).length) {
    for (const field in validationErrors) {
      displayError(validationErrors[field], field);
    }
  }
};

formElement.addEventListener("submit", handleSubmit);
