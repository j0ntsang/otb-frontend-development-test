"use client";

import "./Weather.css";

import { useEffect, useState } from "react";

import CityOptions from "./CityOptions/CityOptions";
import Forecast from "./Forecast/Forecast";
import { WeatherData } from "./types";
import axios from "axios";

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>("Tokyo");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchWeather = async (city: string) => {
    try {
      const response = await axios.get<WeatherData>(`/api/weather`, {
        params: { city },
      });
      setWeather(response.data);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError("Error fetching weather data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div className="weather-app flex flex-col">
      <CityOptions setCity={setCity} city={city} />
      <div className="weather-stats flex flex-col md:flex-row">
        <section className="current-weather flex flex-col max-md:mb-4 md:w-3/4 md:mr-4">
          <h1
            className="current-city flex flex-col flex-grow items-center justify-center"
            aria-label={
              weather
                ? `It is currently ${weather.current.condition.text} in ${city} at ${weather.current.temp_c} degrees`
                : "Loading weather data"
            }
            aria-live="polite">
            {city}
          </h1>
          <div className="current-weather-details flex justify-evenly">
            <h2 className="current-temperature inline-flex flex-col items-center justify-center w-1/2">
              <span className="current-temperature-unit">
                {isLoading ? (
                  <>&#8212;</>
                ) : weather ? (
                  <>
                    {Math.floor(weather.current.temp_c)}
                    <span className="degree-symbol">&#176;</span>
                  </>
                ) : (
                  ""
                )}
              </span>
              <span className="subheading">Current</span>
            </h2>
            <h3 className="current-condition inline-flex flex-col items-center justify-center w-1/2">
              <span className="current-condition-icon">
                {weather && (
                  <img
                    className="current-condition-image"
                    src={weather.current.condition.icon}
                    alt={weather.current.condition.text}
                  />
                )}
              </span>
              <span className="subheading">
                {weather ? weather.current.condition.text : ""}
              </span>
            </h3>
          </div>
        </section>
        {weather && <Forecast weather={weather} />}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Weather;
