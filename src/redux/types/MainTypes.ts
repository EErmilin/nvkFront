import {IProgram} from '../../models/Program';
import {WeatherConditionType} from '../../models/Weather';

export type MainStateTypes = {
  currency: {
    usd: {
      value: number;
      previous: number;
    };
    eur: {
      value: number;
      previous: number;
    };
    cny: {
      value: number;
      previous: number;
    };
  };
  weather: {
    temperature: string;
    condition: WeatherConditionType;
    date: Date | null;
  };
  radioProgram: IProgram[];
  radioImage: string | null;
};

export type IWeatherInput = {
  lat: string;
  lon: string;
  date: Date | null;
};
