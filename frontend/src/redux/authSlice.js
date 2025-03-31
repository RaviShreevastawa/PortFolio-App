import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// Load user and token from Local Storage
const storedUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
})();

const storedToken = localStorage.getItem("accessToken") || null;

// ✅ Register User
export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/api/v1/users/register", userData);
    return data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

// ✅ Login User
export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/api/v1/users/login", userData);
    
    // Store user and access token in localStorage
    localStorage.setItem("user", JSON.stringify(data.data.user));
    localStorage.setItem("accessToken", data.data.accessToken);

    return { user: data.data.user, token: data.data.accessToken };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// ✅ Logout User
export const logout = createAsyncThunk("auth/logout", async () => {
  await API.post("/api/v1/users/logout");
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  return null;
});

// ✅ Redux Slice
const authSlice = createSlice({
  name: "auth",
  initialState: { user: storedUser, token: storedToken, loading: false, error: null },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError, setToken } = authSlice.actions;
export default authSlice.reducer;