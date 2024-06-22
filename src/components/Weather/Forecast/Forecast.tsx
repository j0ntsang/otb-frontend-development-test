import "./Forecast.css";

import { WeatherData } from "../types";

interface ForecastProps {
  weather: WeatherData;
}

const Forecast: React.FC<ForecastProps> = ({ weather }) => {
  return (
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
  );
};

export default Forecast;
