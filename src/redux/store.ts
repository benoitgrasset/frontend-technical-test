import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slice";
import createSagaMiddleware from "redux-saga";
import saga from "./sagas";
import { createWrapper } from "next-redux-wrapper";

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

export const wrapper = createWrapper<AppStore>(makeStore);
