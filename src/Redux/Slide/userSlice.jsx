import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../API/APIService";

// Tạo asyncThunk để gọi API
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await apiGet("get-all-users");
  return response;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // Lưu danh sách người dùng
    status: "idle", // Trạng thái: idle, loading, succeeded, failed
    error: null, // Lỗi nếu có
  },
  reducers: {}, // Không cần reducers nếu chỉ fetch
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading"; // Bắt đầu gọi API
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"; // Thành công
        state.users = action.payload; // Cập nhật danh sách người dùng
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed"; // Thất bại
        state.error = action.error.message; // Lưu lỗi
      });
  },
});

export default userSlice.reducer;
