import { createSlice } from "@reduxjs/toolkit";

// blkl similar to use state we told the initial state
export const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      // ye bat pta chlegi redux store ko
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // the reducers also have actions as arguments to accept data
    incrementAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementAmount } = counterSlice.actions;
export default counterSlice.reducer;