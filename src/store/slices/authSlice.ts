import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  token: string;
  role: 'admin' | 'doctor' | 'patient';


}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const API_URL = 'http://localhost:3000/api/auth'; // Replace with your actual backend API

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'), // Persist session
  loading: false,
  error: null,
};

// Async action for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
      return userData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed.');
    }
  }
);

// Async action for signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: { name: string; email: string; password: string; role: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, credentials);
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
      return userData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed.');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem('user'); // Remove from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
