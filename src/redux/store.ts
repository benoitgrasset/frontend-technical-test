import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice';

export const store = configureStore({
  reducer: appReducer,
  devTools: true,
});

const makeStore = () => store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
