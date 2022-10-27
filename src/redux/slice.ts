import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { getLoggedUserId } from '../utils/getLoggedUserId';

type AppState = {
  loggedUserId: number;
  conversationId: number;
};

const initialState: AppState = {
  loggedUserId: getLoggedUserId(),
  conversationId: null,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoggedUserId: (state, action: PayloadAction<number>) => {
      state.loggedUserId = action.payload;
    },
    setConversationId: (state, action: PayloadAction<number>) => {
      state.conversationId = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setConversationId, setLoggedUserId } = slice.actions;

const rootReducer = slice.reducer;
export default rootReducer;

export const selectLoggedUserId = (state: { appReducer: AppState }) =>
  state.appReducer.loggedUserId || null;
export const selectConversationId = (state: { appReducer: AppState }) =>
  state.appReducer.conversationId || null;
