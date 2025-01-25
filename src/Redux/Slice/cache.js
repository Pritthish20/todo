// weatherSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Key
const weatherApiKey = "e18f6b68c008cac4c02e74954d6a27e7";

// Thunk to fetch weather data
export const fetchWeatherData = createAsyncThunk(
  "fetchWeatherData",
  async ({ lat, lon }, { getState }) => {
    const { cache } = getState().cache;

    // Check if data for this location is already cached
    const cacheKey = `${lat}-${lon}`;
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    // Fetch data from the API
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`;
    const response = await axios.get(url);

    const current = response.data.list[0];

    // Extract unique days from the forecast data
    const nextDays = [];
    const uniqueDates = new Set();
    for (const forecast of response.data.list) {
      const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      });
      if (!uniqueDates.has(forecastDate)) {
        uniqueDates.add(forecastDate);
        nextDays.push({
          day: forecastDate,
          description: forecast.weather[0].description,
          temperature: Math.round(forecast.main.temp),
          icon: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
        });
      }
      if (nextDays.length === 4) break; // Limit to 3 unique days
    }

    const locationData = {
      city: response.data.city.name,
      country: response.data.city.country,
    };

    const currentData = {
      description: current.weather[0].description,
      temperature: Math.round(current.main.temp),
      icon: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
      windSpeed: current.wind.speed,
      humidity: current.main.humidity,
      rain: current.rain ? current.rain["3h"] : 0,
      date: new Date(current.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    // Return the processed data
    return {
      cacheKey,
      current: currentData,
      nextDays,
      location: locationData,
    };
  }
);

const weatherSlice = createSlice({
  name: "cache",
  initialState: {
    currentWeather: null,
    forecast: [],
    location: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    cache: {}, // Cache object for weather data
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        const { cacheKey, current, nextDays, location } = action.payload;
        state.cache[cacheKey] = { current, nextDays, location }; // Cache the data
        state.currentWeather = current;
        state.forecast = nextDays;
        state.location = location;
        state.status = "succeeded";
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
