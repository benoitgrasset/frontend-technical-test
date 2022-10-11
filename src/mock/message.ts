import { IMessage } from "../types/message";

export const mockMessage: IMessage = {
  id: 1,
  conversationId: 1,
  timestamp: 1625637849,
  authorId: 1,
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

export const mockMessages: IMessage[] = [
  {
    id: 1,
    conversationId: 1,
    timestamp: 1625637867,
    authorId: 1,
    body: "Bonjour c'est le second message de la première conversation",
  },
  {
    id: 2,
    conversationId: 1,
    timestamp: 1625648667,
    authorId: 2,
    body: "Bonjour c'est le troisième message de la première conversation",
  },
  {
    id: 3,
    conversationId: 1,
    timestamp: 1625648667,
    authorId: 2,
    body: "Bonjour c'est le n message de la première conversation",
  },
];
