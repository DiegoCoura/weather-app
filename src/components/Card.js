import { correctDayOffset, createCustomElement } from "../helpers.js";

const Card = (weatherInfos) => {
  const forecastDays = weatherInfos.forecast.forecastday;

  const container = createCustomElement("div", { className: "card-container" });
  const cardHeader = createCustomElement("div", { className: "card-header" });

  const cardTitle = createCustomElement("h3", {
    className: "card-title",
    innerText: `${weatherInfos.location.name}, ${weatherInfos.location.country}`,
  });

  const temperature = createCustomElement("div", {
    className: "main-temperature",
    innerText: `${Math.round(weatherInfos.current.temp_c)}ºC`,
  });

  const conditionIcon = createCustomElement("img", {
    className: "condition-icon",
    src: `${weatherInfos.current.condition.icon}`,
  });

  const condition = createCustomElement("div", {
    className: "condition",
    innerText: `${weatherInfos.current.condition.text}`,
  });

  const minMaxTemp = createCustomElement("div", {
    className: "min-max-temperature",
    innerText: `${Math.round(forecastDays[0].day.maxtemp_c)}º/${Math.round(
      forecastDays[0].day.maxtemp_c
    )}º`,
  });

  const mainFooter = createCustomElement("div", {
    className: "main-footer",
  });

  mainFooter.appendChild(conditionIcon);
  mainFooter.appendChild(condition);
  mainFooter.appendChild(minMaxTemp);

  cardHeader.appendChild(cardTitle);
  cardHeader.appendChild(temperature);
  cardHeader.appendChild(mainFooter);

  const weekContainer = createCustomElement("div", {
    className: "week-container",
  });

  forecastDays.forEach((foreDay, index) => {
    let dayOfWeek;

    if (index === 0) {
      dayOfWeek = "Today";
    } else {
      dayOfWeek = correctDayOffset(new Date(forecastDays[index].date));
    }

    const weekDayRow = createCustomElement("div", {
      className: "week-container-row",
    });
    const weekDay = createCustomElement("div", {
      className: "weekday",
      innerText: `${dayOfWeek}`,
    });

    const rainContainer = createCustomElement("div", {
      className: "foreday-rain-container",
    });

    const dropIcon = createCustomElement("i", {
      className: "fa-solid fa-droplet",
    });

    const rainPercentage = createCustomElement("div", {
      className: "rain-percentage",
      innerText: `${foreDay.day.daily_chance_of_rain}%`,
    });

    rainContainer.appendChild(dropIcon);
    rainContainer.appendChild(rainPercentage);

    const dayIcon = createCustomElement("div", { className: "day-icons" });
    const dayWeatherImg = createCustomElement("img", {
      className: "day-weather-img",
      src: `${foreDay.day.condition.icon}`,
    });
    dayIcon.appendChild(dayWeatherImg);

    const dayMaxMin = createCustomElement("div", {
      className: "foreday-max-min",
      innerText: `${Math.round(foreDay.day.maxtemp_c)}º ${Math.round(
        foreDay.day.mintemp_c
      )}º`,
    });

    weekDayRow.appendChild(weekDay);
    weekDayRow.appendChild(rainContainer);
    weekDayRow.appendChild(dayIcon);
    weekDayRow.appendChild(dayMaxMin);

    weekContainer.appendChild(weekDayRow);
  });

  container.appendChild(cardHeader);
  container.appendChild(weekContainer);

  return container;
};

export default Card;
