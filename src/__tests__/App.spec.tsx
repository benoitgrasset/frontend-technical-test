import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '../setupTest';
import App from '../pages/Home';
import { default as Conversation } from '../pages/message/[conversationId]';
import { deleteMessage, getConversations, getUsers } from '../services';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import { mockConversations } from '../mock/conversation';
import { mockUsers } from '../mock/user';

// intercept all PAI calls and mock it
jest.mock('../services');

const loggedUserId = getLoggedUserId();

describe('App', () => {
  it('should render correctly App', () => {
    render(<App />);
    expect(screen.getByTestId('button-add-conversation')).toBeInTheDocument();
  });
  it('should display 3 conversations', () => {
    render(<App />);
    const conversations = screen.getAllByTestId(/^conversation-*/);
    expect(conversations).toHaveLength(3);
  });
  it('should display 3 messages', () => {
    render(<App />, { route: '/message/1' });
    const messages = screen.getAllByTestId(/^message-*/);
    expect(messages).toHaveLength(3);
  });
  it('should display 3 messages', () => {
    render(<Conversation />);
    const messages = screen.getAllByTestId(/^message-*/);
    expect(messages).toHaveLength(3);
  });
  it('should delete a message when clicking on delete button', async () => {
    render(<Conversation />);
    const messages = screen.getAllByTestId(/^message-*/);
    expect(messages).toHaveLength(3);

    (deleteMessage as jest.Mock).mockResolvedValueOnce(null);

    fireEvent.mouseEnter(screen.getByTestId('message-1'));
    const deleteButton = screen.getByTestId('button-delete-message-1');
    await waitFor(() => expect(deleteButton).toBeInTheDocument());
    fireEvent.click(deleteButton);
    await waitFor(() => expect(deleteMessage).toHaveBeenCalled());
    const newMessages = screen.getAllByTestId(/^message-*/);
    // await waitFor(() => expect(newMessages).toHaveLength(2));
  });
  it('should get the users', async () => {
    const users = await (getUsers as jest.Mock).mockResolvedValueOnce(
      mockUsers
    );
    expect(users).toEqual(mockUsers);
  });
});
