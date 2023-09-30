const body = document.querySelector("body");

function appendBody(title, content) {
  const newElement = document
    .querySelector("#result-template")
    .content.cloneNode(true);
  newElement.querySelector("h2").innerHTML = title;
  newElement.querySelector("p").innerHTML = content;
  body.appendChild(newElement);
}

const myBday = moment("1989-09-19");
const today = moment();

appendBody("MyBday", myBday);
appendBody("Today", today);

// 1.

const daysOld = today.diff(myBday, "Days");
appendBody("1. Days Old", daysOld);

// 2.

const duration = moment.duration(today.diff(myBday));
const years = duration.years();
const months = duration.months();
const days = duration.days();
const myAgeString = `I am ${years} years, ${months} months and ${days} days old`;

appendBody("2. Years, Months & Days from Bday", myAgeString);

// 3.

const dateArr = [
  moment("2025-02-16"),
  moment("2021-01-09"),
  moment("2014-08-17"),
]; //I'm putting these in an array to iterate over (it'll also allow me to do more than two)
// I'll test three for the hell of it

let closestDate;
let closestDateDays;

dateArr.forEach((date) => {
  let daysDiff = today.diff(date, "Days");
  if (daysDiff < 0) {
    daysDiff *= -1; // if the date occurs AFTER today, I'll get a negative. Fixing this here...
  }
  if (!closestDate) {
    // establishing default values to begin with
    closestDate = date;
    closestDateDays = daysDiff;
  } else if (closestDateDays > daysDiff) {
    closestDate = date;
    closestDateDays = daysDiff;
  }
});

appendBody("3. Closest Date", closestDate);

// 4.

const twoDates = [moment("2022-04-10"), moment("2017-10-01")];

appendBody(
  "4. After or Before?",
  twoDates[0].diff(twoDates[1]) < 0
    ? "First date comes before the second"
    : "Second date comes before the first"
);

// 5.

const londonTimeTz = moment().tz("Europe/London").format("YYYY-MM-DD HH-mm");
const londonTimeUTC = moment().utcOffset(1).format("YYYY-MM-DD HH-mm");
appendBody("5a. Time in London, using tz", londonTimeTz);
appendBody("5b. Time in London, using utcOffset", londonTimeUTC);
