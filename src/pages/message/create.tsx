import cx from 'classnames';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, SendIcon, Textfield } from '../../components';
import {
  createConversationRequest,
  selectConversations,
  selectLoggedUser,
  selectUsers,
} from '../../redux/slice';
import styles from '../../styles/Home.module.css';
import { IConversation } from '../../types/conversation';
import { getTimeStamp } from '../../utils/convertTimeStamp';
import { loggedUserId } from '../_app';

const getUniqueIds = (conversation: IConversation): string => {
  return [conversation.recipientId, conversation.senderId]
    .sort((a, b) => a - b)
    .join();
};

const Messages: FC = () => {
  const router = useRouter();

  const users = useSelector(selectUsers);
  const [newUserId, setNewUserId] = useState<number | null>(users[0]?.id || 0);
  const conversations = useSelector(selectConversations);

  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUserId(Number(event.target.value));
  };

  // create a new conversation if it doesn't exist yet, otherwise redirect to the existing conversation
  const handleCreateConversation = () => {
    if (newUserId !== null) {
      const recipientUser = users.find((user) => user.id === newUserId);
      const newId = Math.max(...conversations.map((conv) => conv.id)) + 1;
      const newConversation: IConversation = {
        lastMessageTimestamp: getTimeStamp(),
        recipientId: recipientUser.id,
        recipientNickname: recipientUser.nickname,
        senderId: loggedUser.id,
        senderNickname: loggedUser.nickname,
        id: newId,
      };
      const conversationId = conversations.find(
        (conversation) =>
          getUniqueIds(conversation) === getUniqueIds(newConversation)
      )?.id;
      if (conversationId) {
        router.push(`/message/${conversationId}`);
      } else {
        dispatch(
          createConversationRequest({
            userId: loggedUserId,
            body: newConversation,
          })
        );
        router.push(`/message/${newId}`);
      }
    }
  };

  return (
    <div className={styles.grid}>
      <Header>
        <>
          Create new conversation with:
          <select
            className={styles.select}
            value={newUserId}
            onChange={handleSelectChange}
          >
            {users
              .filter((user) => user.id !== loggedUserId)
              .map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.nickname}
                  </option>
                );
              })}
          </select>
          <button
            onClick={handleCreateConversation}
            className={cx(styles.createButton, styles.actionButton)}
          >
            Create
          </button>
        </>
      </Header>
      <div />
      <Textfield
        name="message"
        placeholder="Send message"
        disabled
        icon={<SendIcon color="grey" />}
      />
    </div>
  );
};

export default Messages;
