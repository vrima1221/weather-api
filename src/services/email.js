import "dotenv/config";
import sendEmail from "../utils/sendEmail.js";
import fetchWeather from "../utils/fetchWeather.js";
import { getAllSubscriptionsByFrequency } from "./subscription.js";

const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.BASE_URL : process.env.RENDER_EXTERNAL_URL

export async function sendConfirmationEmail(email, token) {
  const url = process.env.NODE_ENV === 'development' ? `${BASE_URL}/api/confirm/${token}` : process.env.RENDER_EXTERNAL_URL;

  await sendEmail(
    email,
    "Confirm your subscription",
    `Click <a href="${url}">here</a> to confirm your subscription.`
  );
}

async function sendWeatherEmail(
  email,
  city,
  weather,
  description,
  token,
  frequency
) {
  console.log(weather);
  
  const html =
    frequency === "daily"
      ? `
    <h3>Weather Update for ${city}</h3>
    <p><strong>Temperature:</strong> ${weather.avgtemp_c}°C</p>
    <p><strong>Humidity:</strong> ${weather.avghumidity}%</p>
    <p><strong>Description:</strong> ${description}</p>
    <p><a href="${BASE_URL}/api/unsubscribe/${token}">Unsubscribe</a></p>
  `
      : `
    <h3>Hourly weather update for ${city}</h3>
    <p><strong>Temperature:</strong> ${weather.temp_c}°C</p>
    <p><strong>Humidity:</strong> ${weather.humidity}%</p>
    <p><strong>Description:</strong> ${description}</p>
    <p><a href="${BASE_URL}/api/unsubscribe/${token}">Unsubscribe</a></p>
  `;

  await sendEmail(email, `Weather Update - ${city}`, html);
}

export async function deliverWeatherEmails(frequency) {
  const subscriptions = await getAllSubscriptionsByFrequency(frequency);

  for (const sub of subscriptions) {
    let weather = await fetchWeather(sub.city);
    console.log("WEATHER", weather);
    
    const description = weather.day.condition.text;

    if (frequency === "hourly") {
      const nowEpoch = Math.floor(Date.now() / 1000);

      const nextHourEpoch = nowEpoch + 3600;

      weather = weather.hour.find(
        (forecast) => forecast.time_epoch >= nextHourEpoch
      ) || weather.hour[weather.hour.length - 1];
    }

    try {
      await sendWeatherEmail(
        sub.User.email,
        sub.city,
        weather,
        description,
        sub.token,
        frequency
      );
    } catch (error) {
      console.error(
        `Error sending weather email to ${sub.User.email} for ${sub.city}:`,
        error
      );
    }
  }
}
