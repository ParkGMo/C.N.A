import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { overseasTouristData } from '../../api/overseasTourist';

const initialState = {
  touristStatsByAgeData: [],
  touristStatsByGenderData: [],
  isLoading: false,
  error: null,
};

const tourlistInfoSlice = createSlice({
  name: 'touristInfoData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverseasTouristData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOverseasTouristData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.touristStatsByAgeData = action.payload.touristStatsByAgeData;
        state.touristStatsByGenderData =
          action.payload.touristStatsByGenderData;
      })
      .addCase(fetchOverseasTouristData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const fetchOverseasTouristData = createAsyncThunk(
  'touristInfoData/fetchOverseasTouristData',
  async ({ yyyymm, portCode }) => {
    try {
      const data = await overseasTouristData(yyyymm, portCode);

      const StatByAgeData = [];

      data.forEach((item) => {
        let existingAgeCd = StatByAgeData.find(
          (entry) => entry.ageCd === item.ageCd && entry.sex === item.sex
        );

        if (existingAgeCd) {
          existingAgeCd.num = Number(item.num);
        } else {
          StatByAgeData.push({
            port: item.port,
            ageCd: item.ageCd,
            num: Number(item.num),
            gender: item.sex,
            ym: item.ym,
          });
        }
      });

      const touristStatsByAgeData = StatByAgeData.sort(
        (a, b) => a.ageCd - b.ageCd
      );

      const touristStatsByGenderData = data;

      return { touristStatsByAgeData, touristStatsByGenderData };
    } catch (error) {
      return `fetch Err: ${error}`;
    }
  }
);

export default tourlistInfoSlice.reducer;
