import {createAsyncThunk} from '@reduxjs/toolkit';

import {WeatherConditionType} from '../../../models/Weather';
import {IWeatherInput} from '../../types/MainTypes';

export interface ResponseLogin {
  temperature: string;
  condition: WeatherConditionType;
}

const LANG = 'ru_RU';
const KEY = '0591c4c7-3d6a-44a4-8151-53a70b8da6a7';
const LIMIT = '1';

export const getWeather = createAsyncThunk<ResponseLogin | null, IWeatherInput>(
  'main/fetchWeather',
  async data => {
    let now = new Date();
    if (
      data.date === null ||
      now.getTime() - new Date(data.date).getTime() > 1000 * 60 * 60
    ) {
      const responseWeather = await fetch(
        `https://api.weather.yandex.ru/v2/forecast?lat=${data.lat}&lon=${data.lon}&[lang=${LANG}]&[limit=${LIMIT}]`,
        {
          method: 'GET',
          headers: {
            'X-Yandex-API-Key': KEY,
          },
        },
      );
      const responseData = await responseWeather.json();
      return {
        temperature: responseData.fact.temp.toString(),
        condition: responseData.fact.condition,
      } as ResponseLogin;
    } else {
      return null;
    }
  },
);
