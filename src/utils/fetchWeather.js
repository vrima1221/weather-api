import "dotenv/config";

async function fetchWeather(city) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();

  return data.forecast.forecastday[0];
}

export default fetchWeather;
