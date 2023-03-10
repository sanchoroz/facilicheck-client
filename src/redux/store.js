import { configureStore } from '@reduxjs/toolkit';
import { gardensReducer } from './slices/gardens';
import { authReducer } from './slices/auth';

const store = configureStore({
  reducer: { gardens: gardensReducer, auth: authReducer },
});

export default store;
