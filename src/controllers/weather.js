import express from "express";
import fetchWeather from "../utils/fetchWeather.js";

const router = express.Router();

const getWeather =  async (req, res) => {
  const { city } = req.query;

  if(!city) {
    res.status(400).json({ error: "City is not specified" })
  }

  try {
    const data = await fetchWeather(city);

    res.json({
      temperature: data.day.avgtemp_c,
      humidity: data.day.avghumidity,
      description: data.day.condition.text,
    });
  } catch (err) {    
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

export default {
  getWeather
};
