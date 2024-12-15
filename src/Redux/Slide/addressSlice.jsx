import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Tạo asyncThunk để gọi API
export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );
    const responseJSON = await response.json();
    return responseJSON;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [], // Lưu danh sách người dùng
    statusAddress: "idle", // Trạng thái: idle, loading, succeeded, failed
    errorAddress: null, // Lỗi nếu có
  },
  reducers: {}, // Không cần reducers nếu chỉ fetch
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.statusAddress = "loading"; // Bắt đầu gọi API
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.statusAddress = "succeeded"; // Thành công
        state.address = action.payload; // Cập nhật danh sách người dùng
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.statusAddress = "failed"; // Thất bại
        state.errorAddress = action.errorAddress.message; // Lưu lỗi
      });
  },
});

export default addressSlice.reducer;
