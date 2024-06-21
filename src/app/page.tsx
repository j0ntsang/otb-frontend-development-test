export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="weather-app flex flex-col">
        <nav className="cities">
          <ul className="cities-list list-none flex">
            <li className="cities-list-item">
              <button className="button--city button--city-selected">
                Tokyo
              </button>
            </li>
            <li className="cities-list-item">
              <button className="button--city">New York</button>
            </li>
            <li className="cities-list-item">
              <button className="button--city">Moscow</button>
            </li>
          </ul>
        </nav>
        <div className="weather-stats flex">
          <section className="current-weather flex flex-col">
            <h1
              className="current-city flex flex-col flex-grow items-center justify-center"
              aria-label="It is currently [CONDITION] in [CITY] at [TEMPERATURE] degrees"
              aria-live="polite">
              TOKYO
            </h1>
            <div className="current-weather-details flex justify-evenly">
              <h2 className="current-temperature inline-flex flex-col items-center justify-center">
                <span className="current-temperature-unit">
                  21<span className="degree-symbol">&#176;</span>
                </span>
                <span className="subheading">Current</span>
              </h2>
              <h3 className="current-condition inline-flex flex-col  items-center justify-center">
                <span className="current-condition-icon"></span>
                <span className="subheading">Sunny</span>
              </h3>
            </div>
          </section>
          <aside className="forecast flex-grow">
            <ul className="forecast-list list-none flex flex-col justify-evenly">
              <li className="forecast-list-item m-0 p-0 inline-flex flex-col flex-grow items-center justify-center">
                <span className="forecast-day">Tomorrow</span>
                <span className="forecast-temperature">
                  15<span className="degree-symbol">&#176;</span>
                </span>
              </li>
              <li className="forecast-list-item m-0 p-0 inline-flex flex-col flex-grow items-center justify-center">
                <span className="forecast-day">Sunday</span>
                <span className="forecast-temperature">
                  15<span className="degree-symbol">&#176;</span>
                </span>
              </li>
              <li className="forecast-list-item m-0 p-0 inline-flex flex-col flex-grow items-center justify-center">
                <span className="forecast-day">Monday</span>
                <span className="forecast-temperature">
                  15<span className="degree-symbol">&#176;</span>
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
