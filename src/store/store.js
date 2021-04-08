import { configureStore } from '@reduxjs/toolkit';
import mathOperationsReducer from '../actions/mathOperationsSlice';

export default configureStore({
  reducer: {
    mathOperations: mathOperationsReducer,
  },
});
