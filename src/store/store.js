import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import calculatorReducer from '../features/calculator/calculatorSlice';
import snackbarReducer from '../features/snackbar/snackbarSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    calculator: calculatorReducer,
    snackbar: snackbarReducer,
  },
});
