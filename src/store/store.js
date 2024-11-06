import { configureStore } from '@reduxjs/toolkit';
import countryInfoSlice from './country-info-slice/countryInfoSlice';
import tourlistInfoSlice from './tourist-info-slice/touristInfoSlice';

export const store = configureStore({
  reducer: {
    countryInfoSlice,
    tourlistInfoSlice,
  },
});
