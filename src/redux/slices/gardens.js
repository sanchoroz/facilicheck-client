import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gardens: {
    items: [],
    status: 'loading',
  },
};

const gardensSlice = createSlice({
  name: 'gardens',
  initialState,
  reducer: {},
});

export const gardensReducer = gardensSlice.reducer;
