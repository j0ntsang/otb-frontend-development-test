"use client";

import { useEffect, useState } from "react";

import CityOptions from "./CityOptions/CityOptions";
import CurrentWeather from "./CurrentWeather/CurrentWeather";
import Forecast from "./Forecast/Forecast";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { WeatherData } from "./types";
import axios from "axios";
import classNames from "classnames";
import styles from "./Weather.css";

const cx = classNames.bind(styles);

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

  interface CurrentWeatherProps {
    city: string;
    weather: WeatherData;
  }

  const WeatherDetails: React.FC<CurrentWeatherProps> = ({ city, weather }) => {
    return (
      <>
        <CurrentWeather city={city} weather={weather} />
        <Forecast weather={weather} />
      </>
    );
  };

  const containerClasses = cx([
    "weather-app-container flex flex-col md:flex-row",
    {
      "items-center justify-center": isLoading,
    },
  ]);

  return (
    <div className="weather-app flex flex-col">
      <CityOptions setCity={setCity} city={city} />
      <div className={containerClasses}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          weather && <WeatherDetails city={city} weather={weather} />
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Weather;
