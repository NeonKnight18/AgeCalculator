const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");  
const yearInput = document.getElementById("year");
const submitButton = document.getElementById("btn");

const dayResult = document.getElementById("day-result");
const monthResult = document.getElementById("month-result"); 
const yearResult = document.getElementById("year-result");

const errorDay = document.querySelector(".error-day");
const errorMonth = document.querySelector(".error-month");  
const errorYear = document.querySelector(".error-year");

const form = document.querySelector("form");
let isValid = true;

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

dayInput.addEventListener("input", (e) => { 
    if (dayInput.value === "") {
        errorDay.textContent = "";
        isValid = false;
    } else if (+dayInput.value === 0) {
        errorDay.textContent = "This field is required.";
        isValid = false;
    } else if (+dayInput.value > 31 || +dayInput.value < 0) {
        errorDay.textContent = "Must be a valid date.";
        isValid = false;
    } else {
        errorDay.textContent = "";
        isValid = true;
    }
});

monthInput.addEventListener("input", (e) => {
    if (monthInput.value === "") {
        errorMonth.textContent = "";
        isValid = false;
    } else if (+monthInput.value === 0) {
        errorMonth.textContent = "This field is required.";
        isValid = false;
    } else if (+monthInput.value > 12 || +monthInput.value < 0) {
        errorMonth.textContent = "Must be a valid month.";
        isValid = false;
    } else {
        errorMonth.textContent = "";
        isValid = true;
    }
});

yearInput.addEventListener("input", (e) => {
    if (yearInput.value === "") {
        errorYear.textContent = "";
        isValid = false;
    } else if (+yearInput.value === 0) {
        errorYear.textContent = "This field is required.";
        isValid = false;
    } else if (+yearInput.value > year || +yearInput.value < 0) {
        errorYear.textContent = "Must be a valid year.";
        isValid = false;
    } else {
        errorYear.textContent = "";
        isValid = true;
    }
});

function calculateAge() {
    if(isValid) {
        let birthDay = +dayInput.value;
        let birthMonth = +monthInput.value;
        let birthYear = +yearInput.value;

        // Use current date values
        let currentDay = day;
        let currentMonth = month;
        let currentYear = year;

        if (birthDay > currentDay) {
            currentDay += months[birthMonth - 1];
            currentMonth -= 1;
        }

        if (birthMonth > currentMonth) {
            currentMonth += 12;
            currentYear -= 1;
        }

        dayResult.textContent = currentDay - birthDay;
        monthResult.textContent = currentMonth - birthMonth;
        yearResult.textContent = currentYear - birthYear;
    }
};

function handleSubmit(e) {
    e.preventDefault(); /*Prevents page reload*/ 

    // Validate day
    let validDay = dayInput.value !== "" && +dayInput.value > 0 && +dayInput.value <= 31;
    let dayLabel = dayInput.previousElementSibling;
    if (!validDay) {
        dayInput.classList.add("error");
        dayLabel.classList.add("error");
    } else {
        dayInput.classList.remove("error");
        dayLabel.classList.remove("error");
    }

    // Validate month
    let validMonth = monthInput.value !== "" && +monthInput.value > 0 && +monthInput.value <= 12;
    let monthLabel = monthInput.previousElementSibling;
    if (!validMonth) {
        monthInput.classList.add("error");
        monthLabel.classList.add("error");
    } else {
        monthInput.classList.remove("error");
        monthLabel.classList.remove("error");
    }

    // Validate year
    let validYear = yearInput.value !== "" && +yearInput.value > 0 && +yearInput.value <= year;
    let yearLabel = yearInput.previousElementSibling;
    if (!validYear) {
        yearInput.classList.add("error");
        yearLabel.classList.add("error");
    } else {
        yearInput.classList.remove("error");
        yearLabel.classList.remove("error");
    }

    if (validDay && validMonth && validYear) {
        calculateAge();
        form.reset();
    } else {
        dayResult.textContent = "--";
        monthResult.textContent = "--";
        yearResult.textContent = "--";
        // Do NOT reset form if invalid
    }
}

dayInput.addEventListener("focus", () => {
    dayInput.classList.remove("error");
    dayInput.previousElementSibling.classList.remove("error");
    errorDay.textContent = "";
});

monthInput.addEventListener("focus", () => {
    monthInput.classList.remove("error");
    monthInput.previousElementSibling.classList.remove("error");
    errorMonth.textContent = "";
});

yearInput.addEventListener("focus", () => {
    yearInput.classList.remove("error");
    yearInput.previousElementSibling.classList.remove("error");
    errorYear.textContent = "";
});

form.addEventListener("submit", handleSubmit);