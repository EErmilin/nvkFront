import {createSlice} from '@reduxjs/toolkit';

import {getWeather} from '../thunks/main/GetWeather';
import {MainStateTypes} from '../types/MainTypes';
import {getCurrentcies} from '../thunks/main/GetCurrentcies';

const initialState: MainStateTypes = {
  currency: {
    usd: {
      value: 0,
      previous: 0,
    },
    eur: {
      value: 0,
      previous: 0,
    },
    cny: {
      value: 0,
      previous: 0,
    },
  },
  weather: {
    temperature: '0',
    condition: 'clear',
    date: null,
  },
  radioProgram: [],
  radioImage: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setWeather: (state, action) => {
      state.weather = action.payload;
    },
    setRadioProgramRedux: (state, action) => {
      state.radioProgram = action.payload;
    },
    setRadioImage: (state, action) => {
      state.radioImage = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.weather = {
          ...action.payload,
          date: new Date(),
        };
      }
    });
    builder.addCase(getWeather.rejected, () => {});
    builder.addCase(getCurrentcies.fulfilled, (state, action) => {
      state.currency = action.payload;
    });
    builder.addCase(getCurrentcies.rejected, () => {});
  },
});

export const {setCurrency, setWeather, setRadioProgramRedux, setRadioImage} =
  mainSlice.actions;
export default mainSlice.reducer;
