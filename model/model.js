export async function getWeather(city) {
  const API_KEY = "28b0fa7cf6044116b81152251251509";
  const BASE_URL = "https://api.weatherapi.com/v1/current.json";

  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&aqi=no`);
    if (!response.ok) {
      throw new Error("City not found or API error");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
