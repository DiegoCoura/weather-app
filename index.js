import Card from "./src/components/Card.js";
import {
  formatCityName,
  removeChildren,
  containsNumber,
} from "./src/helpers.js";

const locationInput = document.getElementById("search-location");
const searchButton = document.getElementById("search-button");

const heroSection = document.querySelector(".hero");

function geoFindMe() {
  const status = document.getElementById("status");

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = ""

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

let currentCoordinates;

const formatCoordinates = (lat, long) => {
  let currentLatitude = String(lat);
  let currentLongitude = String(long);

  currentCoordinates = currentLatitude + "," + currentLongitude;
  return currentCoordinates;
};

const createURL = (location) => {
  let formattedLocation;

  if (containsNumber(location)) {
    formattedLocation = currentCoordinates;
  } else {
    formattedLocation = formatCityName(location);
  }

  return BASE_API_URL + formattedLocation;
};

const fetchWeather = async (currentLocation) => {
  try {
    const currentURL = createURL(currentLocation);
    const response = await fetch(currentURL);
    const city = await response.json();
    displayCard(city);
  } catch (err) {
    console.log(err);
  }
};

const displayCard = (city) => {
  removeChildren(heroSection);
  heroSection.appendChild(Card(city));
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

window.addEventListener("load", geoFindMe
);
