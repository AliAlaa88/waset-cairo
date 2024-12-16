import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';
import uiSlice from './ui-slice';
import authReducer from "./authSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
