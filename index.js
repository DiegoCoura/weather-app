import Card from "./src/components/Card.js";
import {
  formatCityName,
  removeChildren,
  containsNumber,
  handleToggleUnit,
} from "./src/helpers.js";

const locationInput = document.getElementById("search-location");
const searchButton = document.getElementById("search-button");

const heroSection = document.querySelector(".hero");
const toggleUnitBtn = document.querySelector("#toggle-unit");

let currentLocation;
let temperatureUnit = "celsius";

toggleUnitBtn.addEventListener("click", function () {
  handleToggleUnit();
  temperatureUnit === "celsius"
    ? (temperatureUnit = "fahrenheit")
    : (temperatureUnit = "celsius");
  displayCard(currentLocation);
});

function geoFindMe() {
  const status = document.getElementById("status");

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "";

    const formattedCoord = formatCoordinates(latitude, longitude);
    fetchWeather(formattedCoord);
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by our browser";
  } else {
    status.textContent = "Locating...";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

const KEY_API = "00943edc7ab94b01b96175007240403";
const BASE_API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${KEY_API}&days=7&q=`;

const formatCoordinates = (lat, long) => {
  let currentLatitude = String(lat);
  let currentLongitude = String(long);

  currentLocation = currentLatitude + "," + currentLongitude;
  return currentLocation;
};

const createURL = (location) => {
  let formattedLocation;

  if (containsNumber(location)) {
    formattedLocation = currentLocation;
  } else {
    formattedLocation = formatCityName(location);
  }

  return BASE_API_URL + formattedLocation;
};

const fetchWeather = async (location) => {
  try {
    const currentURL = createURL(location);
    const response = await fetch(currentURL);
    const city = await response.json();
    currentLocation = city;
    displayCard(city);
  } catch (err) {
    console.log(err);
  }
};

const displayCard = (city) => {
  removeChildren(heroSection);
  heroSection.appendChild(Card(city, temperatureUnit));
};

searchButton.addEventListener("click", () => {
  const cityName = locationInput.value;
  if (cityName.trim() === "") return;
  locationInput.value = "";
  fetchWeather(cityName);
});

locationInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});

window.addEventListener("load", geoFindMe);
