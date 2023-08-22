import {createAsyncThunk} from '@reduxjs/toolkit';

export interface ResponseCurrentcies {
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
}

export const getCurrentcies = createAsyncThunk<ResponseCurrentcies, undefined>(
  'main/fetchCurrentcies',
  async () => {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
      method: 'GET',
    });
    let responseData = await response.json();
    console.log('status', response.status);

    return {
      usd: {
        value: parseFloat(responseData.Valute.USD.Value) ?? 0,
        previous: parseFloat(responseData.Valute.USD.Previous) ?? 0,
      },
      eur: {
        value: parseFloat(responseData.Valute.EUR.Value) ?? 0,
        previous: parseFloat(responseData.Valute.EUR.Previous) ?? 0,
      },
      cny: {
        value: parseFloat(responseData.Valute.CNY.Value) ?? 0,
        previous: parseFloat(responseData.Valute.CNY.Previous) ?? 0,
      },
    };
  },
);
