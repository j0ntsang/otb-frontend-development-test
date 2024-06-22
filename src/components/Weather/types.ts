export interface WeatherData {
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
};