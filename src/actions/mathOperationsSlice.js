import { createSlice, nanoid } from '@reduxjs/toolkit';

export const mathOperationsSlice = createSlice({
  name: 'mathOperations',
  initialState: {
    history: [],
  },
  reducers: {
    addMathOperation: {
      reducer(state, action) {
        state.history.push(action.payload);
      },
      prepare(mathOperation) {
        return {
          payload: {
            id: nanoid(),
            name: '',
            mathOperation,
            complite: false,
          },
        };
      },
    },
    removeMathOperation: (state, action) => {
      const newHistory = state.history.filter(
        (item) => item.id !== action.payload
      );

      state.history = newHistory;
    },
    setComplite: (state, action) => {
      state.history.map((item) => {
        if (item.id === action.payload) {
          item.complite = !item.complite;
        }
      });
    },
    setName: (state, action) => {
      const { id, nameItem } = action.payload;
      state.history.map((item) => {
        if (item.id === id) {
          item.name = nameItem;
        }
      });
    },
  },
});

export const {
  addMathOperation,
  removeMathOperation,
  setComplite,
  setName,
} = mathOperationsSlice.actions;

export default mathOperationsSlice.reducer;

export const selectCount = (state) => state.mathOperations.history;
