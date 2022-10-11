import { IConversation } from "../types/conversation";
import { IMessage } from "../types/message";

const baseUrl = "http://localhost:3005/";

export const getUser = async (userId: number) => {
  const user = await fetch(baseUrl + `user/${userId}`)
    .then((res) => res.json())
    .catch((err) => console.error(`Error fetching user ${userId}`, err));

  return user;
};

export const getUsers = async () => {
  const users = await fetch(baseUrl + `users`)
    .then((res) => res.json())
    .catch((err) => console.error(`Error fetching users`, err));

  return users;
};

export const getConversations = async (userId: number) => {
  const conversations = await fetch(baseUrl + `conversations/${userId}`)
    .then((res) => res.json())
    .catch((err) =>
      console.error(`Error fetching conversation from user ${userId}`, err)
    );

  return conversations;
};

export const postConversation = async (userId: number, body: IConversation) => {
  await fetch(baseUrl + `conversations/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch((err) =>
    console.error(`Error posting conversation from user ${userId}`, err)
  );
};

export const deleteConversation = async (conversationId: number) => {
  await fetch(baseUrl + `conversation/${conversationId}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
    },
  }).catch((err) =>
    console.error(`Error deleting conversation ${conversationId}`, err)
  );
};

export const getMessages = async (conversationId: number) => {
  const messages = await fetch(baseUrl + `messages/${conversationId}`)
    .then((res) => res.json())
    .catch((err) =>
      console.error(
        `Error fetching message from conversation ${conversationId}`,
        err
      )
    );

  return messages;
};

export const postMessage = async (conversationId: number, body: IMessage) => {
  await fetch(baseUrl + `messages/${conversationId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch((err) =>
    console.error(
      `Error posting message from conversation ${conversationId}`,
      err
    )
  );
};

/**
 * FIXME: error 404 - catch route
 * @param messageId
 */
export const deleteMessage = async (messageId: number) => {
  await fetch(baseUrl + `message/${messageId}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
    },
  }).catch((err) => console.error(`Error deleting message ${messageId}`, err));
};
