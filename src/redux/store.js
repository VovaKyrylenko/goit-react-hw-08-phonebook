import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './apiSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
