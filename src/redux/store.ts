import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';
import appReducer from './slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: appReducer,
  middleware: [sagaMiddleware],
  devTools: true,
});

const makeStore = () => store;

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
