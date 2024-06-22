"use client";

import { useEffect, useState } from "react";

import { CITY_WEATHER_LIST } from "../constants";
import axios from "axios";
import classNames from "classnames";
import styles from "./Weather.css";

const cx = classNames.bind(styles);

interface WeatherData {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: Array<{
      date_epoch: number;
      day: {
        maxtemp_c: number;
      };
    }>;
  };
}

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>("Tokyo");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchWeather = async (city: string) => {
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
      setIsLoading(false);
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
      <div className="weather-stats flex flex-col md:flex-row">
        <section className="current-weather flex flex-col max-md:mb-4 md:w-3/4 md:mr-4">
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
                    {Math.floor(weather.current.temp_c)}
                    <span className="degree-symbol">&#176;</span>
                  </>
                ) : (
                  ""
                )}
              </span>
              <span className="subheading">Current</span>
            </h2>
            <h3 className="current-condition inline-flex flex-col items-center justify-center">
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
        <aside className="forecast md:w-1/4">
          <ul className="forecast-list list-none flex md:flex-col justify-evenly">
            {weather?.forecast &&
              weather.forecast.forecastday.slice(1, 4).map((day, index) => {
                const forecastDayLabel = new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                }).format(new Date(day.date_epoch * 1000));

                return (
                  <li
                    key={day.date_epoch}
                    className="forecast-list-item m-0 [&:not(:last-child)]:md:mb-10 p-0 inline-flex flex-col flex-grow items-center justify-center">
                    <span className="forecast-day mb-2">
                      {index === 0 ? "Tomorrow" : forecastDayLabel}
                    </span>
                    <span className="forecast-temperature">
                      {day.day.maxtemp_c !== null ? (
                        <>
                          {Math.floor(day.day.maxtemp_c)}
                          <span className="degree-symbol">&#176;</span>
                        </>
                      ) : (
                        <>&#8212;</>
                      )}
                    </span>
                  </li>
                );
              })}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Weather;
