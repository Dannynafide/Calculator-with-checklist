import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: null,
  type: null, // error, success
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeSnackbar: (state) => {
      state.open = false;
      state.message = null;
      state.type = null;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;

export const isSnackbarOpen = (state) => {
  return state.snackbar.open;
};
export const selectSnackbarMessage = (state) => {
  return state.snackbar.message;
};
export const selectSnackbarType = (state) => {
  return state.snackbar.type;
};
