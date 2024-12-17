import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet, apiGetAll } from "../../API/APIService";

// Tạo asyncThunk để gọi API
export const fetchReview = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    const response = await apiGetAll("get-reviews");
    return response;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [], // Lưu danh sách người dùng
    statusReviews: "idle", // Trạng thái: idle, loading, succeeded, failed
    errorReviews: null, // Lỗi nếu có
  },
  reducers: {}, // Không cần reducers nếu chỉ fetch
  extraReducers: (builder) => {
    builder
      .addCase(fetchReview.pending, (state) => {
        state.statusReviews = "loading"; // Bắt đầu gọi API
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.statusReviews = "succeeded"; // Thành công
        state.reviews = action.payload; // Cập nhật danh sách người dùng
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.statusReviews = "failed"; // Thất bại
        state.errorReviews = action.errorReviews.message; // Lưu lỗi
      });
  },
});

export default reviewSlice.reducer;
