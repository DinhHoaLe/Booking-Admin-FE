import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAll } from "../../API/APIService";

export const fetchAllHotel = createAsyncThunk(
  "allHotels/fetchAllHotel",
  async () => {
    const response = await apiGetAll("get-all-hotel");
    return response;
  }
);

const allHotelSlice = createSlice({
  name: "allHotels",
  initialState: {
    allHotels: [],
    statusAllHotels: "idle", // "idle", "loading", "succeeded", "failed"
    errorAllHotels: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHotel.pending, (state) => {
        state.statusAllHotels = "loading";
      })
      .addCase(fetchAllHotel.fulfilled, (state, action) => {
        state.statusAllHotels = "succeeded";
        state.allHotels = action.payload.data;
      })
      .addCase(fetchAllHotel.rejected, (state, action) => {
        state.statusAllHotels = "failed";
        state.errorAllHotels = action.error.message;
      });
  },
});

export default allHotelSlice.reducer;
