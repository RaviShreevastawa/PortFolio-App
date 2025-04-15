import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api.js";

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
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/v1/users/register", userData);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  }
);

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

// ✅ Logout User (Includes clearing everything)
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await API.post("/api/v1/users/logout", {}, { withCredentials: true });

      // Clear local storage on logout
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");

      return null;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk("auth/updateProfile", async (profileData, { rejectWithValue }) => {
  try {
    const { data } = await API.put("/api/v1/users/profile", profileData);
    localStorage.setItem("user", JSON.stringify(data.user)); // Update stored user
    return data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Profile update failed");
  }
});

export const uploadProfileImage = createAsyncThunk("auth/uploadProfileImage", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/api/v1/users/upload-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Image upload failed");
  }
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
    },
    forceLogout: (state) => {
      // This is for token expiration handling
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
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

export const { clearError, setToken, forceLogout } = authSlice.actions;
export default authSlice.reducer;
