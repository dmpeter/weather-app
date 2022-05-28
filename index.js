function getCurrentDate() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();

  if (hours < 10) {
    hours = "0".concat(hours);
  }
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }

  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  //currentDate.innerHTML = `${day} ${date}. ${month} ${year}, ${hours}:${minutes}`;

  document.querySelector(".weather-day").innerHTML = `${day}`;
  document.querySelector(
    ".weather-date"
  ).innerHTML = `${date}. ${month}, ${year}`;
}

function formateForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  console.log(latitude);
  console.log(longitude);

  let apiKey = "731649d671b2838caf05516f1e2dd5d3";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(updateWeatherData);
}

function updateWeatherData(response) {
  celsiusTemp = response.data.main.temp;

  document.querySelector(".weather-location").innerHTML =
    response.data.name + ", " + response.data.sys.country;
  document.querySelector(".temp-current").innerHTML = Math.round(celsiusTemp);
  document.querySelector(".weather-main-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function searchLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;

  let apiKey = "731649d671b2838caf05516f1e2dd5d3";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiURL).then(updateWeatherData);
}

function handlePosition(position) {
  navigator.geolocation.getCurrentPosition(getLocation);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="weakly-weather-item">
      <p class="mb-0">${formateForecastDay(forecastDay.dt)}</p>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="">
      <p class="mb-0 forecast-temp-max">${Math.round(forecastDay.temp.max)}°C
      <span class="forecast-temp-min"> ${Math.round(
        forecastDay.temp.min
      )}°C</span></p>
    </div>
  `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "731649d671b2838caf05516f1e2dd5d3";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${apiKey}`;
  console.log(coordinates);
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function load(city) {
  let apiKey = "731649d671b2838caf05516f1e2dd5d3";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(updateWeatherData);
}

let formSearch = document.querySelector(".form-search");
formSearch.addEventListener("click", searchLocation);

let btnLocationCurrent = document.querySelector("#btn-location-current");
btnLocationCurrent.addEventListener("click", handlePosition);
getCurrentDate();

load("Vienna");
