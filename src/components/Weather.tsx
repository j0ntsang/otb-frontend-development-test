"use client";

import { useEffect, useState } from "react";

import { CITY_WEATHER_LIST } from "../constants.js";
import axios from "axios";
import classNames from "classnames";
import styles from "./Weather.css";

const cx = classNames.bind(styles);

const Weather = () => {
  const [city, setCity] = useState("Tokyo");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`/api/weather`, {
        params: { city },
      });
      setWeather(response.data);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError("Error fetching weather data");
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div className="weather-app flex flex-col">
      <nav className="cities">
        <ul className="cities-list list-none flex">
          {CITY_WEATHER_LIST.map((cityName) => {
            const buttonClasses = cx("button--city", {
              "button--city-selected": city === cityName,
            });
            return (
              <li key={cityName} className="cities-list-item">
                <button
                  className={buttonClasses}
                  onClick={() => setCity(cityName)}>
                  {cityName}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="weather-stats flex">
        <section className="current-weather flex flex-col">
          <h1
            className="current-city flex flex-col flex-grow items-center justify-center"
            aria-label={
              weather
                ? `It is currently ${weather.current.condition.text} in ${city} at ${weather.current.temp_c} degrees`
                : ""
            }
            aria-live="polite">
            {city}
          </h1>
          <div className="current-weather-details flex justify-evenly">
            <h2 className="current-temperature inline-flex flex-col items-center justify-center">
              <span className="current-temperature-unit">
                {isLoading ? (
                  <>&#8212;</>
                ) : weather ? (
                  <>
                    {weather.current.temp_c}
                    <span className="degree-symbol">&#176;</span>
                  </>
                ) : (
                  ""
                )}
              </span>
              <span className="subheading">Current</span>
            </h2>
            <h3 className="current-condition inline-flex flex-col  items-center justify-center">
              <span className="current-condition-icon">
                <img
                  className="current-condition-image"
                  src={weather ? weather.current.condition.icon : ""}
                  alt=""
                />
              </span>
              <span className="subheading">
                {weather ? weather.current.condition.text : ""}
              </span>
            </h3>
          </div>
        </section>
        <aside className="forecast flex-grow">
          <ul className="forecast-list list-none flex flex-col justify-evenly">
            {weather?.forecast &&
              weather.forecast.forecastday.slice(1, 4).map((day) => (
                <li
                  key={day.date_epoch}
                  className="forecast-list-item m-0 p-0 inline-flex flex-col flex-grow items-center justify-center">
                  <span className="forecast-day">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "long",
                    }).format(new Date(day.date_epoch * 1000))}
                  </span>
                  <span className="forecast-temperature">
                    {day.day.maxtemp_c ? day.day.maxtemp_c : <>&#8212;</>}
                    <span className="degree-symbol">&#176;</span>
                  </span>
                </li>
              ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Weather;
