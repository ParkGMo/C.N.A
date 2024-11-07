import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { overseasTouristData } from '../../api/overseasTourist';

const initialState = {
  touristStatsData: [],
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
        state.touristStatsData = action.payload;
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

      const result = [];

      data.forEach((item) => {
        let existingAgeCd = result.find(
          (entry) => entry.ageCd === item.ageCd && entry.sex === item.sex
        );

        if (existingAgeCd) {
          existingAgeCd.num = Number(item.num);
        } else {
          result.push({
            port: item.port,
            ageCd: item.ageCd,
            num: Number(item.num),
            gender: item.sexCd,
            ym: item.ym,
          });
        }
      });

      const touristStatsData = result.sort((a, b) => a.ageCd - b.ageCd);

      return touristStatsData;
    } catch (error) {
      return `fetch Err: ${error}`;
    }
  }
);

export default tourlistInfoSlice.reducer;
