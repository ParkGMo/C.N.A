import { configureStore } from '@reduxjs/toolkit';
import countryInfoSlice from './countryInfo/coutryInfoSlice';

export const store = configureStore({
  reducer: {
    countryInfoSlice,
  },
});
