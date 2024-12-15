import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../API/APIService";

// Fetch hotel data with pagination
export const fetchBooking = createAsyncThunk(
  "booking/fetchBooking",
  async ({ page, pageSize, objectType }) => {
    const response = await apiGet("get-booking", {
      page,
      pageSize,
      objectType,
    });
    return response;
  }
);

const initialState = {
  hotel: {
    booking: [],
    status: "idle",
    error: null,
    page: 1,
    pageSize: 10,
    total: 0,
  },
  flight: {
    booking: [],
    status: "idle",
    error: null,
    page: 1,
    pageSize: 10,
    total: 0,
  },
  tour: {
    booking: [],
    status: "idle",
    error: null,
    page: 1,
    pageSize: 10,
    total: 0,
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      const { objectType, page, pageSize } = action.payload;
      state[objectType].page = page;
      state[objectType].pageSize = pageSize;
    },
    resetState: (state, action) => {
      const { objectType } = action.payload;
      state[objectType] = JSON.parse(JSON.stringify(initialState[objectType]));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooking.pending, (state, action) => {
        const { objectType } = action.meta.arg; // Lấy objectType từ meta
        state[objectType].status = "loading";
      })
      .addCase(fetchBooking.fulfilled, (state, action) => {
        const { objectType } = action.meta.arg; // Lấy objectType từ meta
        state[objectType].status = "succeeded";
        state[objectType].booking = action.payload.data;
        state[objectType].total = action.payload.total;
      })
      .addCase(fetchBooking.rejected, (state, action) => {
        const { objectType } = action.meta.arg; // Lấy objectType từ meta
        state[objectType].status = "failed";
        state[objectType].error = action.error.message;
      });
  },
});

export const { setPagination, resetState } = bookingSlice.actions;

export default bookingSlice.reducer;
