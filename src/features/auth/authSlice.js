import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  emailAuth,
  createUser,
  logout as logautFirebase,
} from '../../services/firebase';

export const emailAuthAsync = createAsyncThunk(
  'auth/emailAuthAsync',
  async (user) => {
    const { email, password } = user;
    const response = await emailAuth(email, password);
    return {
      id: response.user.uid,
      email: response.user.email,
      refreshToken: response.user.refreshToken,
    };
  }
);

export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async (user) => {
    const { email, password } = user;
    const response = await createUser(email, password);
    return {
      id: response.user.uid,
      email: response.user.email,
      refreshToken: response.user.refreshToken,
    };
  }
);

export const logoutAsync = createAsyncThunk('auth/logoutAsync', async () => {
  const result = await logautFirebase();
  return result;
});

const initialState = {
  user: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // SignIn
      .addCase(emailAuthAsync.fulfilled, (state, action) => {
        const user = action.payload;
        state.user = user;
      })

      // SignUp
      .addCase(registerAsync.fulfilled, (state, action) => {
        const user = action.payload;
        state.user = user;
      })

      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { login, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
