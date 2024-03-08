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