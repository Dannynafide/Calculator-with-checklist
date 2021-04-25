import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { emailAuth, createUser } from '../../services/firebase';

export const emailAuthenticate = createAsyncThunk(
  'auth/emailAuthenticate',
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

export const signUp = createAsyncThunk('auth/signUp', async (user) => {
  const { email, password } = user;
  const response = await createUser(email, password);
  return {
    id: response.user.uid,
    email: response.user.email,
    refreshToken: response.user.refreshToken,
  };
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
      .addCase(emailAuthenticate.fulfilled, (state, action) => {
        const user = action.payload;
        state.user = user;
      })

      // SignUp
      .addCase(signUp.fulfilled, (state, action) => {
        const user = action.payload;
        state.user = user;
      });
  },
});

export const { login, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
