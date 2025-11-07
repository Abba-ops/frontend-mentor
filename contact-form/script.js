const form = document.querySelector(".form");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showSuccessMessage() {
  const successMessage = document.querySelector(".form__success");
  successMessage.classList.add("visible");
  setTimeout(() => {
    successMessage.classList.remove("visible");
  }, 4000);
}

function showInputError(inputId, errorText) {
  const inputElement = document.getElementById(inputId);
  const errorElement = document.getElementById(`${inputId}-error`);
  errorElement.textContent = errorText;
  errorElement.style.display = "block";
  inputElement.classList.add("error");
}

function clearFormErrors() {
  const errorMessages = document.querySelectorAll(".form__error");
  const errorFields = document.querySelectorAll(".error");

  errorMessages.forEach((message) => {
    message.textContent = "";
    message.style.display = "none";
  });

  errorFields.forEach((field) => field.classList.remove("error"));
}

function submitHandler(event) {
  event.preventDefault();

  const errors = {};
  clearFormErrors();

  const firstname = event.target.firstname.value.trim();
  const lastname = event.target.lastname.value.trim();
  const email = event.target.email.value.trim();
  const message = event.target.message.value.trim();
  const radioButtons = event.target.querySelectorAll('input[name="request"]');
  const isQueryTypeSelected = Array.from(radioButtons).some(
    (radio) => radio.checked
  );
  const terms = event.target.terms.checked;

  if (!firstname) {
    errors.firstname = "This field is required.";
  }

  if (!lastname) {
    errors.lastname = "This field is required.";
  }

  if (!email) {
    errors.email = "This field is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!isQueryTypeSelected) {
    errors.request = "Please select a query type.";
  }

  if (!message) {
    errors.message = "This field is required.";
  }

  if (!terms) {
    errors.terms = "To submit this form, please consent to be contacted.";
  }

  if (Object.keys(errors).length) {
    for (const key in errors) {
      showInputError(key, errors[key]);
    }
    return;
  }

  showSuccessMessage();
  event.target.reset();
}

form.addEventListener("submit", submitHandler);
