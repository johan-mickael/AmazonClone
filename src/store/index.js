// store.js
import {configureStore, createSlice} from '@reduxjs/toolkit';

// Create a slice with automatically generated action creators and reducers
const globalVariableSlice = createSlice({
  name: 'globalVariable',
  initialState: {
    count: '0',
    price: '0',
  },
  reducers: {
    setTotalCount: (state, action) => {
      state.count = action.payload < 10 ? action.payload : '9+';
    },
    setTotalPrice: (state, action) => {
      state.price = action.payload;
    },
  },
});

const {reducer: globalVariableReducer, actions} = globalVariableSlice;
export const {setTotalCount, setTotalPrice} = actions;

const store = configureStore({
  reducer: {
    globalVariable: globalVariableReducer,
  },
});

export default store;
