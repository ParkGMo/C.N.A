import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { countryInfoData } from '../../api/countryBasicInfos';

const initialState = {
  basicData: [],
  securityEnvData: [],
  localContactData: [],
  isLoading: false,
  error: null,
};

const countryInfoSlice = createSlice({
  name: 'countryInfoData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 국가별 기본정보
      .addCase(fetchCountryInfoData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCountryInfoData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.basicData = action.payload.basicData;
        state.localContactData = action.payload.localContactData;
        state.securityEnvData = action.payload.securityEnvData;
      })
      .addCase(fetchCountryInfoData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const fetchCountryInfoData = createAsyncThunk(
  'countryInfoData/fetchCountryInfoData',
  async (isoCodes) => {
    const [basicIsoCode, localContactIsoCode, securityEnvIsoCode] = isoCodes;

    try {
      const basicData = await countryInfoData(
        basicIsoCode,
        'CountryBasicService/getCountryBasicList'
      );
      const localContactData = await countryInfoData(
        localContactIsoCode,
        'LocalContactService2/getLocalContactList2'
      );
      const securityEnvData = await countryInfoData(
        securityEnvIsoCode,
        'SecurityEnvironmentService/getSecurityEnvironmentList'
      );

      return { basicData, localContactData, securityEnvData };
    } catch (error) {
      return error;
    }
  }
);

export default countryInfoSlice.reducer;
