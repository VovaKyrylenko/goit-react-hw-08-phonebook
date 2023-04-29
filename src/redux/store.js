import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './apiSlice';
import userReducer from './userSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistUserConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    users: persistedUserReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistedStore = persistStore(store);
