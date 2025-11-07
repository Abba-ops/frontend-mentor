const calculatorForm = document.querySelector(
  ".calculator__form"
) as HTMLFormElement;
const yearsOutput = document.getElementById("years") as HTMLSpanElement;
const monthsOutput = document.getElementById("months") as HTMLSpanElement;
const daysOutput = document.getElementById("days") as HTMLSpanElement;

type DateInputKeys = "day" | "month" | "year";
const dateInput: Partial<Record<DateInputKeys, number>> = {};

function showError(errorText: string, inputId: DateInputKeys) {
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  if (!input) return;
  const p = document.createElement("p");
  p.textContent = errorText;
  p.className = "form__error";
  const wrapper = input.closest("div");
  if (wrapper) {
    wrapper.classList.add("error");
    wrapper.insertAdjacentElement("beforeend", p);
  }
}

function calculatorAge(year: number, month: number, day: number) {
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageDays = currentDate.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    const previousMonth = new Date(
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

function submitHandler(event: Event): void {
  const inputEl = event.target as HTMLInputElement | null;
  if (!inputEl) return;
  dateInput[inputEl.id as DateInputKeys] = Number(inputEl.value.trim());

  let errors: Record<DateInputKeys, string> = {
    day: "",
    month: "",
    year: "",
  };

  calculatorForm
    .querySelectorAll(".form__error")
    .forEach((item) => item.remove());

  calculatorForm
    .querySelectorAll(".calculator__field")
    .forEach((item) => item.classList.remove("error"));

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

  const currentYear = new Date().getFullYear();

  if (!dateInput.year) {
    errors.year = "Year is required";
  } else if (
    dateInput.year > currentYear ||
    dateInput.year.toString().length < 4
  ) {
    errors.year = "Enter a valid year";
  }

  const hasErrors = Object.values(errors).some((msg) => msg.length > 0);

  if (hasErrors) {
    for (const key in errors) {
      const errorMsg = errors[key as DateInputKeys];
      if (errorMsg) showError(errorMsg, key as DateInputKeys);
    }
    return;
  }

  if (dateInput.day && dateInput.month && dateInput.year) {
    const result = calculatorAge(
      dateInput.year,
      dateInput.month,
      dateInput.day
    );
    daysOutput.textContent = result.days.toString();
    monthsOutput.textContent = result.months.toString();
    yearsOutput.textContent = result.years.toString();
  }
}

calculatorForm.addEventListener("input", submitHandler);
