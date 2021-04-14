import { configureStore } from '@reduxjs/toolkit';
import mathOperationsReducer from '../reducers/mathOperationsSlice';
import userReducer from '../reducers/userSlice';

export default configureStore({
  reducer: {
    mathOperations: mathOperationsReducer,
    user: userReducer,
  },
});
