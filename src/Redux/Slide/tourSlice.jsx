import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../API/APIService";

// Tạo asyncThunk để gọi API
export const fetchTour = createAsyncThunk(
  "tour/fetchTour",
  async ({ page, pageSize }) => {
    const response = await apiGet("get-tour", { page, pageSize });
    return response;
  }
);

const tourSlice = createSlice({
  name: "tours",
  initialState: {
    tours: [], // Lưu danh sách người dùng
    statusTour: "idle", // Trạng thái: idle, loading, succeeded, failed
    error: null, // Lỗi nếu có
    page: 1,
    pageSize: 10,
    total: 0,
  },
  reducers: {
    setPagination: (state, action) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTour.pending, (state) => {
        state.statusTour = "loading"; // Bắt đầu gọi API
      })
      .addCase(fetchTour.fulfilled, (state, action) => {
        state.statusTour = "succeeded"; // Thành công
        state.tours = action.payload; // Cập nhật danh sách người dùng
        state.total = action.payload.total;
      })
      .addCase(fetchTour.rejected, (state, action) => {
        state.statusTour = "failed"; // Thất bại
        state.error = action.error.message; // Lưu lỗi
      });
  },
});

export const { setPagination } = tourSlice.actions;

export default tourSlice.reducer;
