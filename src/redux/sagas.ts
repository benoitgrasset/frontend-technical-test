import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  deleteMessage,
  getConversations,
  getMessages,
  getUsers,
  postConversation,
  postMessage,
} from '../services';
import { IConversation } from '../types/conversation';
import { IMessage } from '../types/message';
import {
  createConversationError,
  createConversationRequest,
  createConversationSuccess,
  deleteMessageError,
  deleteMessageRequest,
  deleteMessageSuccess,
  getConversationsError,
  getConversationsRequest,
  getConversationsSuccess,
  getMessagesError,
  getMessagesRequest,
  getMessagesSuccess,
  getUsersError,
  getUsersRequest,
  getUsersSuccess,
  selectLoggedUserId,
  sendMessageError,
  sendMessageRequest,
  sendMessageSuccess,
} from './slice';

function* getUsersFLow() {
  try {
    const response = yield call(getUsers);
    yield put(getUsersSuccess(response));
  } catch (e) {
    yield put(getUsersError());
  }
}

function* getConversationsFlow() {
  try {
    const userId: number = yield select(selectLoggedUserId);
    const response = yield call(getConversations, userId);
    yield put(getConversationsSuccess(response));
  } catch (e) {
    yield put(getConversationsError());
  }
}

function* createConversationFlow(
  action: PayloadAction<{ userId: number; body: IConversation }>
) {
  try {
    const { userId, body } = action.payload;
    yield call(postConversation, userId, body);
    yield put(createConversationSuccess());
    yield put(getConversationsRequest());
  } catch (e) {
    yield put(createConversationError());
  }
}

function* getMessagesFLow(action: PayloadAction<number>) {
  try {
    const conversationId = action.payload;
    const response = yield call(getMessages, conversationId);
    yield put(getMessagesSuccess(response));
  } catch (e) {
    yield put(getMessagesError());
  }
}

function* sendMessageFlow(
  action: PayloadAction<{ conversationId: number; body: IMessage }>
) {
  try {
    const { conversationId, body } = action.payload;
    yield call(postMessage, conversationId, body);
    yield put(sendMessageSuccess());
    yield put(getMessagesRequest(conversationId));
  } catch (e) {
    yield put(sendMessageError);
  }
}

export function* deleteMessageFlow(action: PayloadAction<number>) {
  try {
    const messageId: number = action.payload;
    yield call(deleteMessage, messageId);
    yield put(deleteMessageSuccess());
  } catch (e) {
    yield put(deleteMessageError());
  }
}

export function* usersWatcher() {
  yield takeLatest(getUsersRequest.type, getUsersFLow);
}

export function* conversationsWatcher() {
  yield takeLatest(getConversationsRequest.type, getConversationsFlow);
  yield takeLatest(createConversationRequest.type, createConversationFlow);
}

export function* messagesWatcher() {
  yield takeLatest(getMessagesRequest.type, getMessagesFLow);
  yield takeLatest(sendMessageRequest.type, sendMessageFlow);
  yield takeLatest(deleteMessageRequest.type, deleteMessageFlow);
}

export default function* rootSaga() {
  yield all([usersWatcher(), conversationsWatcher(), messagesWatcher()]);
}
