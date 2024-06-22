import { CITY_WEATHER_LIST } from "../../../constants";
import classNames from "classnames";
import styles from "./CityOptions.css";

const cx = classNames.bind(styles);

interface CityOptionsProps {
  setCity: (city: string) => void;
  city: string;
}

const CityOptions: React.FC<CityOptionsProps> = ({ setCity, city }) => {
  return (
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
  );
};

export default CityOptions;
