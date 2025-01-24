import React, { useState, useEffect, useRef } from "react";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const weatherApiKey = "e18f6b68c008cac4c02e74954d6a27e7"; // Replace with your OpenWeatherMap API key
  const cachedData = useRef(null); // To cache the API data

  useEffect(() => {
    const fetchWeather = (lat, lon) => {
      // Check if data is already cached
      if (cachedData.current) {
        const { current, nextDays, location } = cachedData.current;
        setCurrentWeather(current);
        setForecast(nextDays);
        setLocation(location);
        return; // Skip fetching since we already have cached data
      }

      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const current = data.list[0];

          // Extract unique days from the forecast data
          const nextDays = [];
          const uniqueDates = new Set();
          for (const forecast of data.list) {
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
            city: data.city.name,
            country: data.city.country,
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

          // Cache the data
          cachedData.current = {
            current: currentData,
            nextDays,
            location: locationData,
          };

          // Update state
          setCurrentWeather(currentData);
          setForecast(nextDays);
          setLocation(locationData);
        })
        .catch(() => {
          setError("Failed to fetch weather data.");
        });
    };

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          () => {
            setError("Unable to fetch location.");
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    };

    getUserLocation();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="bg-gray-200 rounded-2xl max-w-screen px-2 py-2 flex flex-wrap m-2 items-center justify-center">
        {/* Text on the same row */}
        <div className="mb-2">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 text-wrap">
            Planning to go out?
          </h3>
          <p className="text-md sm:text-lg md:text-xl text-gray-500 text-wrap">
            Check the weather before you head out!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center justify-center">
          {/* Current Weather Card */}
          <div className="col-span-1 sm:col-span-12 lg:col-span-8 bg-blue-500 text-white shadow-md rounded-md p-1 flex items-center justify-evenly text-center h-full">
            {error ? (
              <p className="text-center text-red-200">{error}</p>
            ) : currentWeather && location ? (
              <>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                    {location.city}, {location.country}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-200">
                    {currentWeather.date}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base capitalize text-gray-200">
                    {currentWeather.description}
                  </p>
                </div>
                <div className="flex justify-evenly gap-4 items-center">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold">
                    {currentWeather.temperature}°C
                  </p>
                  <div className="text-xs sm:text-sm md:text-base">
                    <p>Wind: {currentWeather.windSpeed} m/s</p>
                    <p>Humidity: {currentWeather.humidity}%</p>
                    <p>Rain: {currentWeather.rain} mm</p>
                  </div>
                </div>
                <img
                  src={currentWeather.icon}
                  alt={currentWeather.description}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                />
              </>
            ) : (
              <p className="text-center">Loading...</p>
            )}
          </div>

          {/* Forecast Cards */}
          {forecast.length > 0 && (
            <div className="col-span-1 sm:col-span-12 lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 gap-2 justify-center">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className="bg-blue-400 text-white shadow-md rounded-md p- sm:p-3 flex flex-wrap items-center justify-evenly text-center h-full"
                >
                  <p className="text-sm sm:text-base md:text-lg font-medium">{day.day}</p>
                  <img
                    src={day.icon}
                    alt={day.description}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  />
                  <p className="mr-2 text-xs sm:text-sm md:text-base capitalize">
                    {day.description}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-bold">
                    {day.temperature}°C
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
