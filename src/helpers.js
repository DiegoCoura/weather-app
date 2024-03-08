export const createCustomElement = (elementTag, props = {}) => {
  const customElement = document.createElement(elementTag);

  Object.entries(props).forEach(([key, value]) => {
    customElement[key] = value;
  });

  return customElement;
};

export const formatCityName = (cityName) => {
  return cityName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");
};

export const removeChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
};

export const correctDayOffset = (date) => {
  date.setMinutes(
    date.getMinutes() + date.getTimezoneOffset()
  );
  return date.toLocaleDateString("en-us", { weekday: "long" })
}

export const containsNumber = (value) => {
  return /[0-9]/.test(value);
}

export const handleToggleUnit = () => {
  const slideSelection = document.querySelector(".slide-selection");
  if(slideSelection.classList.contains("slide-select-celsius")){
    slideSelection.classList.remove("slide-select-celsius")
    slideSelection.classList.add("slide-select-fahrenheit")

  } else if (slideSelection.classList.contains("slide-select-fahrenheit")){
    slideSelection.classList.remove("slide-select-fahrenheit")
    slideSelection.classList.add("slide-select-celsius")

  }
};