import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { countryInfoData } from '../../api/countryBasicInfos';

const initialState = {
  basicData: [],
  generalData: [],
  securityEnvData: [],
  localContactData: [],
  countryFlagData: [],
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
        state.countryFlagData = action.payload.countryFlagData;
        state.generalData = action.payload.generalData;
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
    const [
      basicIsoCode,
      localContactIsoCode,
      securityEnvIsoCode,
      countryFlagIsoCode,
      generalIsoCode,
    ] = isoCodes;

    const baseParams = {
      numOfRows: 10,
      pageNo: 1,
    };

    const countryFlagParams = {
      returnType: 'JSON',
      perPage: 10,
      page: 1,
    };

    try {
      const basicData = await countryInfoData(
        basicIsoCode,
        'CountryBasicService/getCountryBasicList',
        baseParams
      );
      const localContactData = await countryInfoData(
        localContactIsoCode,
        'LocalContactService2/getLocalContactList2',
        baseParams
      );
      const securityEnvData = await countryInfoData(
        securityEnvIsoCode,
        'SecurityEnvironmentService/getSecurityEnvironmentList',
        baseParams
      );
      const countryFlagData = await countryInfoData(
        countryFlagIsoCode,
        'CountryFlagService2/getCountryFlagList2',
        countryFlagParams
      );
      const generalData = await countryInfoData(
        generalIsoCode,
        'OverviewGnrlInfoService/getOverviewGnrlInfoList',
        baseParams
      );

      return {
        basicData,
        localContactData,
        securityEnvData,
        countryFlagData,
        generalData,
      };
    } catch (error) {
      return error;
    }
  }
);

export default countryInfoSlice.reducer;
