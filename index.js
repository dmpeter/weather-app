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

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  console.log(latitude);
  console.log(longitude);

  let apiKey = "393e4807ec66e8c161be060a50d1af44";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(updateWeatherData);
}

function updateWeatherData(response) {
  document.querySelector(".weather-location").innerHTML =
    response.data.name + ", " + response.data.sys.country;
  document.querySelector(".temp-current").innerHTML = Math.round(
    response.data.main.temp
  );
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
  console.log(response);
}

function searchLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;

  let apiKey = "393e4807ec66e8c161be060a50d1af44";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(updateWeatherData);
}

function handlePosition(position) {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let formSearch = document.querySelector(".form-search");
formSearch.addEventListener("click", searchLocation);

let btnLocationCurrent = document.querySelector("#btn-location-current");
btnLocationCurrent.addEventListener("click", handlePosition);
getCurrentDate();
