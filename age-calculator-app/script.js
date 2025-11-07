var calculatorForm = document.querySelector(".calculator__form");
var yearsOutput = document.getElementById("years");
var monthsOutput = document.getElementById("months");
var daysOutput = document.getElementById("days");
var dateInput = {};
function showError(errorText, inputId) {
  var input = document.getElementById(inputId);
  if (!input) return;
  var p = document.createElement("p");
  p.textContent = errorText;
  p.className = "form__error";
  var wrapper = input.closest("div");
  if (wrapper) {
    wrapper.classList.add("error");
    wrapper.insertAdjacentElement("beforeend", p);
  }
}
function calculatorAge(year, month, day) {
  var birthDate = new Date(year, month - 1, day);
  var currentDate = new Date();
  var ageYears = currentDate.getFullYear() - birthDate.getFullYear();
  var ageMonths = currentDate.getMonth() - birthDate.getMonth();
  var ageDays = currentDate.getDate() - birthDate.getDate();
  if (ageDays < 0) {
    var previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    ageDays += previousMonth.getDate();
    ageMonths--;
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }
  return { years: ageYears, months: ageMonths, days: ageDays };
}
function submitHandler(event) {
  var inputEl = event.target;
  if (!inputEl) return;
  dateInput[inputEl.id] = Number(inputEl.value.trim());
  var errors = {
    day: "",
    month: "",
    year: "",
  };
  calculatorForm.querySelectorAll(".form__error").forEach(function (item) {
    return item.remove();
  });
  calculatorForm
    .querySelectorAll(".calculator__field")
    .forEach(function (item) {
      return item.classList.remove("error");
    });
  if (!dateInput.day) {
    errors.day = "Day is required";
  } else if (dateInput.day < 1 || dateInput.day > 31) {
    errors.day = "Enter a valid day (1-31)";
  }
  if (!dateInput.month) {
    errors.month = "Month is required";
  } else if (dateInput.month < 1 || dateInput.month > 12) {
    errors.month = "Enter a valid month (1-12)";
  }
  var currentYear = new Date().getFullYear();
  if (!dateInput.year) {
    errors.year = "Year is required";
  } else if (
    dateInput.year > currentYear ||
    dateInput.year.toString().length < 4
  ) {
    errors.year = "Enter a valid year";
  }
  var hasErrors = Object.values(errors).some(function (msg) {
    return msg.length > 0;
  });
  if (hasErrors) {
    for (var key in errors) {
      var errorMsg = errors[key];
      if (errorMsg) showError(errorMsg, key);
    }
    return;
  }
  if (dateInput.day && dateInput.month && dateInput.year) {
    var result = calculatorAge(dateInput.year, dateInput.month, dateInput.day);
    daysOutput.textContent = result.days.toString();
    monthsOutput.textContent = result.months.toString();
    yearsOutput.textContent = result.years.toString();
  }
}
calculatorForm.addEventListener("input", submitHandler);
