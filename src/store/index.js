// store.js
import {configureStore, createSlice} from '@reduxjs/toolkit';

// Create a slice with automatically generated action creators and reducers
const globalVariableSlice = createSlice({
  name: 'globalVariable',
  initialState: {
    value: '0',
  },
  reducers: {
    setGlobalVariable: (state, action) => {
      state.value = action.payload < 10 ? action.payload : '9+';
    },
  },
});

const {reducer: globalVariableReducer, actions} = globalVariableSlice;
export const {setGlobalVariable} = actions;

const store = configureStore({
  reducer: {
    globalVariable: globalVariableReducer,
  },
});

export default store;
