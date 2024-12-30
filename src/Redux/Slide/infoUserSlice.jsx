import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// 🛡️ Async Thunk để refresh accessToken
export const refreshAccessToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/refresh-token-admin`,
        { method: "GET", credentials: "include" }
      );

      const { accessToken } = await response.json();

      return jwtDecode(accessToken);
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      return rejectWithValue("Failed to refresh access token");
    }
  }
);


export const fetchUserInfo = createAsyncThunk(
  "user/getInfo",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      if (token) {
        return jwtDecode(token);
      }
      throw new Error("No access token found");
    } catch (error) {
      console.error("Failed to decode token:", error);
      return rejectWithValue("Failed to decode token");
    }
  }
);

const initialState = {
  infor: null,
  isAuthenticated: !!Cookies.get("accessToken"),
  status: "idle",
  error: null,
};

// 🛡️ Tạo Slice
const userSlice = createSlice({
  name: "inforUser",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      state.infor = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.infor = action.payload;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
        state.infor = null;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.infor = action.payload;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
        state.infor = null;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
