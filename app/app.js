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

      let html = `
        <h2>${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
        <p><strong>Local Time:</strong> ${data.location.localtime}</p>
        <p><strong>Coordinates:</strong> ${data.location.lat}, ${data.location.lon}</p>
        
        <h3>Current Weather</h3>
        <p><img src="${data.current.condition.icon}" alt="${data.current.condition.text}"> ${data.current.condition.text}</p>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C (Feels like ${data.current.feelslike_c}°C)</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind:</strong> ${data.current.wind_kph} kph ${data.current.wind_dir}</p>
        <p><strong>UV Index:</strong> ${data.current.uv}</p>
        
      `;
      //broke
      // <p><strong>Air Quality Index:</strong> ${JSON.stringify(data.current.air_quality)}</p>

      html += `<h3>5-Day Forecast</h3><div class="forecast">`;

      data.forecast.forecastday.forEach(day => {
        html += `
          <div class="day">
            <h4>${day.date}</h4>
            <p><img src="${day.day.condition.icon}" alt="${day.day.condition.text}"> ${day.day.condition.text}</p>
            <p><strong>High:</strong> ${day.day.maxtemp_c}°C | <strong>Low:</strong> ${day.day.mintemp_c}°C</p>
            <p><strong>Sunrise:</strong> ${day.astro.sunrise} | <strong>Sunset:</strong> ${day.astro.sunset}</p>
            <p><strong>Chance of Rain:</strong> ${day.day.daily_chance_of_rain}%</p>
            <p><strong>Max Wind:</strong> ${day.day.maxwind_kph} kph</p>
          </div>
        `;
      });

      html += `</div>`;

      display.innerHTML = html;
    } catch (error) {
      display.innerHTML = `<p class="error">${error.message}</p>`;
    }
  });
});