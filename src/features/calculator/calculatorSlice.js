import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  currentExpenseId: '1',
  expenses: [
    {
      id: '1',
      name: 'Trip to mountains',
      toDo: [
        {
          id: nanoid(),
          name: 'fuel',
          cost: '200',
          complite: false,
        },
        {
          id: nanoid(),
          name: 'tickets',
          cost: '2*50',
          complite: false,
        },
        {
          id: nanoid(),
          name: 'equipment rental',
          cost: '150',
          complite: false,
        },
        {
          id: nanoid(),
          name: 'rent a room',
          cost: '750',
          complite: false,
        },
      ],
    },
    {
      id: '2',
      name: 'Monthly fees',
      toDo: [
        {
          id: nanoid(),
          name: 'internet',
          cost: '50',
          complite: false,
        },
        {
          id: nanoid(),
          name: 'rent',
          cost: '380',
          complite: false,
        },
        {
          id: nanoid(),
          name: 'light fee',
          cost: '90',
          complite: false,
        },
        {
          id: nanoid(),
          name: 'water fee',
          cost: '70',
          complite: false,
        },
      ],
    },
    {
      id: '3',
      name: 'Car repair',
      toDo: [
        {
          id: nanoid(),
          name: 'Engine cushions',
          cost: '130+(2*80)+65+150',
          complite: false,
        },
        {
          id: nanoid(),
          name: 'Engine temperature sensor',
          cost: '40+70',
          complite: false,
        },
        {
          id: nanoid(),
          name: 'Brake line',
          cost: '(2*44)+50',
          complite: false,
        },
        {
          id: nanoid(),
          name: 'Stabilizer links',
          cost: '160+70',
          complite: false,
        },
      ],
    },
  ],
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addMathOperation: {
      reducer(state, action) {
        const { currentExpenseId, expenses } = state;
        let found = expenses.find((element) => element.id === currentExpenseId);

        if (!found) {
          // addNewExpense
          const expense = {
            id: nanoid(),
            name: '',
            toDo: [],
          };
          state.expenses.push(expense);
          state.currentExpenseId = expense.id;

          found = expenses.find((element) => element.id === expense.id);
        }

        found.toDo.push(action.payload);
      },
      prepare(cost) {
        return {
          payload: {
            id: nanoid(),
            name: '',
            cost,
            complite: false,
          },
        };
      },
    },
    removeMathOperation: (state, action) => {
      const { currentExpenseId, expenses } = state;
      const found = expenses.find((element) => element.id === currentExpenseId);

      const newToDo = found.toDo.filter((item) => item.id !== action.payload);

      found.toDo = newToDo;
    },
    setCompliteToDoItem: (state, action) => {
      const { currentExpenseId, expenses } = state;
      const found = expenses.find((element) => element.id === currentExpenseId);

      const foundToDoItem = found.toDo.find(
        (element) => element.id === action.payload
      );

      foundToDoItem.complite = !foundToDoItem.complite;
    },
    setNameToDoItem: (state, action) => {
      const { currentExpenseId, expenses } = state;
      const found = expenses.find((element) => element.id === currentExpenseId);

      const foundToDoItem = found.toDo.find(
        (element) => element.id === action.payload.id
      );

      foundToDoItem.name = action.payload.name;
    },
    setCurrentExpense: (state, action) => {
      state.currentExpenseId = action.payload;
    },
    addNewExpense: (state) => {
      const expense = {
        id: nanoid(),
        name: '',
        toDo: [],
      };

      state.expenses.push(expense);
      state.currentExpenseId = expense.id;
    },
    removeExpense: (state, action) => {
      const { currentExpenseId, expenses } = state;

      const newExpenses = expenses.filter((item) => item.id !== action.payload);

      if (currentExpenseId === action.payload) {
        if (newExpenses.length > 0) {
          const newCurrentExpenseId = newExpenses[0].id;
          state.currentExpenseId = newCurrentExpenseId;
        }
      }

      state.expenses = newExpenses;
    },
    setNameExpense: (state, action) => {
      const { expenses } = state;
      const { id, name } = action.payload;
      const found = expenses.find((element) => element.id === id);

      found.name = name;
    },
  },
});

export const {
  addMathOperation,
  removeMathOperation,
  setCompliteToDoItem,
  setNameToDoItem,
  setCurrentExpense,
  addNewExpense,
  removeExpense,
  setNameExpense,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;

export const selectCurrentExpense = (state) => {
  const { currentExpenseId, expenses } = state.calculator;
  const found = expenses.find((element) => element.id === currentExpenseId);

  return found;
};

export const selectExpense = (state, id) => {
  const { expenses } = state.calculator;
  if (!id) return undefined;

  const found = expenses.find((element) => element.id === id);
  return found;
};

export const selectExpenses = (state) => {
  return state.calculator.expenses;
};

export const selectCurrentToDo = (state) => {
  const { currentExpenseId, expenses } = state.calculator;
  if (expenses.length === 0) return [];

  const found = expenses.find((element) => element.id === currentExpenseId);
  if (!found) return [];

  return found.toDo;
};

export const selectCurrentToDoItem = (state, id) => {
  const { currentExpenseId, expenses } = state.calculator;
  const found = expenses.find((element) => element.id === currentExpenseId);

  const foundToDoItem = found.toDo.find((element) => element.id === id);

  return foundToDoItem;
};
