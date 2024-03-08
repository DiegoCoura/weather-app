import Card from "./src/components/Card.js";
import { formatCityName, removeChildren } from "./src/helpers.js";

const locationInput = document.getElementById("search-location");
const searchButton = document.getElementById("search-button");

const heroSection = document.querySelector(".hero");

const KEY_API = "00943edc7ab94b01b96175007240403";
const BASE_API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${KEY_API}&days=7&q=`;

const createURL = (location) => {
  const formattedCity = formatCityName(location);
  return BASE_API_URL + formattedCity;
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

searchButton.addEventListener("click", (e) => {
  const cityName = locationInput.value;
  if(cityName.trim() === "") return;
  locationInput.value = "";
  fetchWeather(cityName);
});

locationInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click()
  }
});

document.addEventListener("load", fetchWeather("São Paulo"));
