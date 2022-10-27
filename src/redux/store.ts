import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../services/api';
import appReducer from './slice';

const rtkMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware);

export const store = configureStore({
  reducer: { appReducer, [api.reducerPath]: api.reducer },
  middleware: rtkMiddleware,
  devTools: true,
});

const makeStore = () => store;

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
