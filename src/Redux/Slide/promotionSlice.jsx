import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAll } from "../../API/APIService";

// Tạo asyncThunk để gọi API
export const fetchPromotion = createAsyncThunk(
  "promotion/fetchPromotion",
  async () => {
    const response = await apiGetAll("get-promotion");
    return response;
  }
);

const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    promotion: [],
    statusPromotion: "idle", // Trạng thái: idle, loading, succeeded, failed
    errorPromotion: null, // Lỗi nếu có
  },
  reducers: {}, // Không cần reducers nếu chỉ fetch
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotion.pending, (state) => {
        state.statusPromotion = "loading"; // Bắt đầu gọi API
      })
      .addCase(fetchPromotion.fulfilled, (state, action) => {
        state.statusPromotion = "succeeded"; // Thành công
        state.promotion = action.payload; // Cập nhật danh sách người dùng
      })
      .addCase(fetchPromotion.rejected, (state, action) => {
        state.statusPromotion = "failed"; // Thất bại
        state.errorPromotion = action.errorPromotion.message; // Lưu lỗi
      });
  },
});

export default promotionSlice.reducer;
