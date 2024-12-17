import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../API/APIService";

// Tạo asyncThunk để gọi API
export const fetchRoom = createAsyncThunk("room/fetchRoom", async () => {
  const response = await apiGet("get-room");
  return response;
});

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [], // Lưu danh sách người dùng
    statusRooms: "idle", // Trạng thái: idle, loading, succeeded, failed
    errorRooms: null, // Lỗi nếu có
  },
  reducers: {}, // Không cần reducers nếu chỉ fetch
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoom.pending, (state) => {
        state.statusRooms = "loading"; // Bắt đầu gọi API
      })
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.statusRooms = "succeeded"; // Thành công
        state.rooms = action.payload.data; // Cập nhật danh sách người dùng
      })
      .addCase(fetchRoom.rejected, (state, action) => {
        state.statusRooms = "failed"; // Thất bại
        state.errorRooms = action.error.message; // Lưu lỗi
      });
  },
});

export default roomSlice.reducer;
