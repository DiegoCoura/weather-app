import { createCustomElement } from "../helpers.js";

const Card = (weatherInfos) => {
  const container = createCustomElement("div", { className: "card-container" });
  const cardHeader = createCustomElement("div", { className: "card-header" });

  const cardTitle = createCustomElement("h3", {
    className: "card-title",
    innerText: `${weatherInfos.location.name}, ${weatherInfos.location.country}`,
  });

  const temperature = createCustomElement("div", {
    className: "temperature",
    innerText: `${weatherInfos.current.temp_c}ºC`,
  });

  const condition = createCustomElement("div", {
    className: "condition",
    innerText: `${weatherInfos.current.condition.text}`,
  });

  const conditionIcon = createCustomElement("img", {
    className: "condition-icon",
    src: `${weatherInfos.current.condition.icon}`
  })

  const minMaxTemp = createCustomElement("div", {
    className: "min-max-temperature",
    innerText: ``
  })

  cardHeader.appendChild(cardTitle);
  cardHeader.appendChild(temperature);
  cardHeader.appendChild(condition);
  cardHeader.appendChild(conditionIcon);

  container.appendChild(cardHeader);

  return container;
};

export default Card;
