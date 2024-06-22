import "./CurrentWeather.css";

import { WeatherData } from "../types";

interface CurrentWeatherProps {
  city: string;
  weather: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city, weather }) => {
  return (
    <section className="current-weather flex flex-col max-md:mb-4 md:w-3/4 md:mr-4">
      <h1
        className="current-city flex flex-col flex-grow items-center justify-center"
        aria-label={`It is currently ${weather.current.condition.text} in ${city} at ${weather.current.temp_c} degrees`}
        aria-live="polite">
        {city}
      </h1>
      <div className="current-weather-details flex justify-evenly">
        <h2 className="current-temperature inline-flex flex-col items-center justify-center w-1/2">
          <span className="current-temperature-unit">
            {Math.floor(weather.current.temp_c)}
            <span className="degree-symbol">&#176;</span>
          </span>
          <span className="subheading">Current</span>
        </h2>
        <h3 className="current-condition inline-flex flex-col items-center justify-center w-1/2">
          <span className="current-condition-icon">
            <img
              className="current-condition-image"
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
          </span>
          <span className="subheading">
            {weather ? weather.current.condition.text : ""}
          </span>
        </h3>
      </div>
    </section>
  );
};

export default CurrentWeather;
