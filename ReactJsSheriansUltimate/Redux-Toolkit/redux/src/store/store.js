import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';

// we have made the redux store
export const store = configureStore({
  reducer: {
    counter: counterReducer 
    // NOTE TO SELF 😅: slice ❌ | slice.reducer ✅
  }
});

// ⚠️ IMPORTANT:
// configureStore expects a REDUCER FUNCTION, not the entire slice.
// createSlice() returns an object (slice) that contains:
//   - slice.actions  → action creators
//   - slice.reducer  → the actual reducer
// So we must pass `counterSlice.reducer` (or import the default reducer),
// NOT the slice object itself.
// NOTE TO SELF 😅
// I messed this up before:
// `configureStore` does NOT want the whole slice,
// it only wants the reducer inside the slice.
// slice ❌
// slice.reducer ✅
