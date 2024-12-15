import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../API/APIService";

// Tạo asyncThunk để gọi API
export const fetchFlight = createAsyncThunk("flight/fetchFlight", async () => {
  const response = await apiGet("get-flight");
  return response;
});

const flightSlice = createSlice({
  name: "flights",
  initialState: {
    flights: [], // Lưu danh sách người dùng
    statusFlights: "idle", // Trạng thái: idle, loading, succeeded, failed
    errorFlights: null, // Lỗi nếu có
  },
  reducers: {}, // Không cần reducers nếu chỉ fetch
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlight.pending, (state) => {
        state.statusFlights = "loading"; // Bắt đầu gọi API
      })
      .addCase(fetchFlight.fulfilled, (state, action) => {
        state.statusFlights = "succeeded"; // Thành công
        state.flights = action.payload; // Cập nhật danh sách người dùng
      })
      .addCase(fetchFlight.rejected, (state, action) => {
        state.statusFlights = "failed"; // Thất bại
        state.errorFlights = action.errorFlights.message; // Lưu lỗi
      });
  },
});

export default flightSlice.reducer;
