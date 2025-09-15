import { getWeather } from "../model/model.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weatherForm");
  const display = document.getElementById("weatherDisplay");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = document.getElementById("cityInput").value.trim();

    if (!city) return;

    try {
      const data = await getWeather(city);

      display.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
      `;
    } catch (error) {
      display.innerHTML = `<p class="error">${error.message}</p>`;
    }
  });
});