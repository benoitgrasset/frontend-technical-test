import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConversation } from "../types/conversation";
import { IUser } from "../types/user";
import { HYDRATE } from "next-redux-wrapper";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import { IMessage } from "../types/message";

type AppState = {
  users: IUser[];
  conversations: IConversation[];
  messages: IMessage[];
  loggedUserId: number;
  conversationId: number;
};

const initialState: AppState = {
  users: [],
  conversations: [],
  messages: [],
  loggedUserId: getLoggedUserId(),
  conversationId: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    getUsersRequest: () => {},
    getUsersSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    getUsersError: () => {},
    getConversationsRequest: () => {},
    getConversationsSuccess: (
      state,
      action: PayloadAction<IConversation[]>
    ) => {
      state.conversations = action.payload;
    },
    getConversationsError: () => {},
    createConversationError: () => {},
    createConversationRequest: (
      state,
      action: PayloadAction<{ userId: number; body: IConversation }>
    ) => {},
    createConversationSuccess: () => {},
    getMessagesRequest: (state, action: PayloadAction<number>) => {
      state.conversationId = action.payload;
    },
    getMessagesSuccess: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
    getMessagesError: () => {},
    sendMessageError: () => {},
    sendMessageSuccess: () => {},
    sendMessageRequest: (
      state,
      action: PayloadAction<{ conversationId: number; body: IMessage }>
    ) => {},
    deleteMessageError: () => {},
    deleteMessageSuccess: () => {},
    deleteMessageRequest: (state, action: PayloadAction<number>) => {
      const messageId = action.payload;
      state.messages = state.messages.filter(
        (message) => message.id !== messageId
      );
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

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersError,
  getConversationsRequest,
  getConversationsSuccess,
  getConversationsError,
  createConversationError,
  createConversationRequest,
  createConversationSuccess,
  getMessagesError,
  getMessagesSuccess,
  getMessagesRequest,
  sendMessageError,
  sendMessageSuccess,
  sendMessageRequest,
  deleteMessageError,
  deleteMessageSuccess,
  deleteMessageRequest,
} = slice.actions;

const rootReducer = slice.reducer;
export default rootReducer;

export const selectUsers = (state: AppState) => state.users || [];
export const selectConversations = (state: AppState) =>
  state.conversations || [];
export const selectMessages = (state: AppState) => state.messages || [];
export const selectLoggedUserId = (state: AppState) =>
  state.loggedUserId || null;
export const selectConversationId = (state: AppState) =>
  state.conversationId || null;
export const selectLoggedUser = (state: AppState) =>
  state.users.find((user) => user.id === state.loggedUserId);
