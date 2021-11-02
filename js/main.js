const api = {
  key: "aabcafb0fa9b227e9413557d281b29db",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);
function setQuery(e) {
  if (e.keyCode === 13) {
    console.log(searchBox.value);
    getResult(searchBox.value);
  }
}

function getResult(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => weather.json())
    .then(displayResults);
}
function displayResults(weather) {
  console.log(weather);
  document.querySelector(
    ".location .city"
  ).innerHTML = `${weather.name}, ${weather.sys.country} `;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerHTML = dateBuilder(now);

  document.querySelector(".temp").innerHTML = "";
  document.querySelector(".temp").innerHTML = `
  ${Math.round(weather.main.temp)} 
  <span>°c</span>`;

  let weatherE1 = document.querySelector(".weather");
  weatherE1.innerHTML = weather.weather[0].main;

  document.querySelector(".hi-low").innerHTML = `${Math.round(
    weather.main.temp_min
  )}°c/${Math.round(weather.main.temp_max)}°c`;
}
function dateBuilder(s) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
