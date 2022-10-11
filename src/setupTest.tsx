import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import configureMockStore from "redux-mock-store";
import { mockConversations } from "./mock/conversation";
import { mockUsers } from "./mock/user";
import { mockMessages } from "./mock/message";
import { getLoggedUserId } from "./utils/getLoggedUserId";

const mockStore = configureMockStore();

const mockedStore = mockStore({
  conversations: mockConversations,
  messages: mockMessages,
  users: mockUsers,
  conversationId: 1,
  loggedUserId: getLoggedUserId(),
});

const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  window.HTMLElement.prototype.scrollIntoView = function () {};

  return <Provider store={mockedStore}>{children}</Provider>;
};

const customRender = (
  ui: ReactElement,
  {
    route = "/",
  }: {
    route?: string;
  } = {},
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };
