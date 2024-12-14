import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';
import uiSlice from './ui-slice';
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
