import { mockConversations } from '../../mock/conversation';
import { mockMessages } from '../../mock/message';
import { mockUsers } from '../../mock/user';
import reducer, { deleteMessageRequest } from '../slice';

const conversationId = 1;

const state = {
  users: mockUsers,
  conversations: mockConversations,
  messages: mockMessages,
  loggedUserId: 1,
  conversationId,
};

describe('reducer', () => {
  it('should delete a message', () => {
    expect(state.messages.length).toEqual(3);
    expect(
      reducer(state, deleteMessageRequest({ messageId: 1, conversationId }))
        .messages.length
    ).toEqual(2);
  });
});
