import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '.';
import { IConversation } from '../types/conversation';
import { IMessage } from '../types/message';
import { IUser } from '../types/user';

export const api = createApi({
  baseQuery: retry(fetchBaseQuery({ baseUrl }), { maxRetries: 3 }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => 'users',
    }),
    getUser: builder.query<IUser, number>({
      query: (userId) => `user/${userId}`,
    }),
    getConversations: builder.query<IConversation[], number>({
      query: (userId) => `conversations/${userId}`,
    }),
    postConversation: builder.mutation<
      IConversation,
      { userId: number; body: IConversation }
    >({
      query: ({ userId, body }) => {
        return {
          url: `conversations/${userId}`,
          method: 'POST',
          body,
        };
      },
    }),
    deleteConversation: builder.mutation<IConversation, number>({
      query: (conversationId) => {
        return {
          url: `conversation/${conversationId}`,
          method: 'DELETE',
        };
      },
    }),
    getMessages: builder.query<IMessage[], number>({
      query: (conversationId) => `messages/${conversationId}`,
    }),
    postMessage: builder.mutation<
      IMessage,
      { conversationId: number; body: IMessage }
    >({
      query: ({ conversationId, body }) => {
        return {
          url: `messages/${conversationId}`,
          method: 'POST',
          body,
        };
      },
    }),
    deleteMessage: builder.mutation<IMessage, number>({
      query: (messageId) => {
        return {
          url: `message/${messageId}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});
