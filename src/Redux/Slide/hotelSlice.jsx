import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../API/APIService";

// Fetch hotel data with pagination
export const fetchHotel = createAsyncThunk(
  "hotels/fetchHotel",
  async ({ page, pageSize }) => {
    const response = await apiGet("get-hotel", { page, pageSize });
    return response;
  }
);

const hotelSlice = createSlice({
  name: "hotels",
  initialState: {
    hotels: [],
    statusHotels: "idle", // "idle", "loading", "succeeded", "failed"
    errorHotels: null,
    // page: 1,
    // pageSize: 10,
    // total: 0,
  },
  reducers: {
    // setPagination: (state, action) => {
    //   state.page = action.payload.page;
    //   state.pageSize = action.payload.pageSize;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotel.pending, (state) => {
        state.statusHotels = "loading";
      })
      .addCase(fetchHotel.fulfilled, (state, action) => {
        state.statusHotels = "succeeded";
        state.hotels = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchHotel.rejected, (state, action) => {
        state.statusHotels = "failed";
        state.errorHotels = action.error.message;
      });
  },
});

export const { setPagination } = hotelSlice.actions;

export default hotelSlice.reducer;
