import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';
import { RootState } from '../index';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  token: string;
  phone?: string | null;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  dateOfBirth?: string | null;
  gender?: 'male' | 'female' | 'other';
  profilePicture?: string;
  notifications?: {
    email: boolean;
    sms: boolean;
    appointments: boolean;
  };
  preferences?: {
    language: string;
    theme: string;
  };
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const API_URL = 'http://localhost:3000/api/auth'; // Replace with your actual backend API

// Manual JWT Decoding Function
const decodeJwtToken = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.error('Manual token decoding error:', error);
    return null;
  }
};

const decodeUserFromToken = (token: string): User | null => {
  try {
    console.log('Attempting to decode token:', token);
    
    const decoded = decodeJwtToken(token);
    
    console.log('Decoded token payload:', decoded);
    
    if (!decoded) {
      throw new Error('Failed to decode token');
    }

    // Log each field being extracted
    console.log('Extracting user details:', {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      phone: decoded.phone,
      role: decoded.role
    });

    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      token: token,
      phone: decoded.phone || '', // Ensure phone is always a string
      address: decoded.address,
      dateOfBirth: decoded.dateOfBirth,
      gender: decoded.gender,
      profilePicture: decoded.profilePicture,
      notifications: decoded.notifications,
      preferences: decoded.preferences
    };
  } catch (error) {
    console.error('Comprehensive user decoding error:', error);
    return null;
  }
};

const initialState: AuthState = {
  user: (() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // If token exists, decode it
        return parsedUser.token ? decodeUserFromToken(parsedUser.token) : null;
      } catch (error) {
        return null;
      }
    }
    return null;
  })(),
  loading: false,
  error: null,
};

// Async action for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const { token, user: userData } = response.data;
      
      // Decode token and extract full user details
      const decodedUser = decodeUserFromToken(token);
      
      if (decodedUser) {
        localStorage.setItem('user', JSON.stringify(decodedUser));
        return decodedUser;
      }
      
      throw new Error('Failed to decode user token');
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
      const { token, user: userData } = response.data;
      
      // Decode token and extract full user details
      const decodedUser = decodeUserFromToken(token);
      
      if (decodedUser) {
        localStorage.setItem('user', JSON.stringify(decodedUser));
        return decodedUser;
      }
      
      throw new Error('Failed to decode user token');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed.');
    }
  }
);

// Async action for updating user profile
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: Partial<User>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;

      const response = await axios.put(`${API_URL}/update-profile`, userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Decode the new token from the response
      const updatedUserData = decodeUserFromToken(response.data.token);
      
      if (updatedUserData) {
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        return updatedUserData;
      }
      
      throw new Error('Failed to update user');
    } catch (error: any) {
      console.error('Update user error:', error.response?.data || error.message);
      
      // Extract and return a meaningful error message
      if (error.response) {
        // Server responded with an error
        return rejectWithValue(
          error.response.data.message || 
          error.response.data.field_errors || 
          'Update failed'
        );
      } else if (error.message) {
        // Network error or other client-side error
        return rejectWithValue(error.message);
      }
      
      return rejectWithValue('Unknown error occurred during update');
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
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update the user in the state
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
