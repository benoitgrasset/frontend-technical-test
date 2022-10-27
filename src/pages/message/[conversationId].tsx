import cx from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Message, SendIcon, Textfield } from '../../components';
import { selectConversationId, selectLoggedUserId } from '../../redux/slice';
import { api } from '../../services/api';
import styles from '../../styles/Home.module.css';
import { convertTimeStamp, getTimeStamp } from '../../utils/convertTimeStamp';

const dateFormat = 'MMMM D, h:mm A';

const Messages: FC = () => {
  const bottomRef = useRef(null);

  const [value, setValue] = useState('');
  const loggedUserId = useSelector(selectLoggedUserId);
  const conversationId = useSelector(selectConversationId);
  const { data: conversations } = api.useGetConversationsQuery(loggedUserId);
  const { data: messages } = api.useGetMessagesQuery(conversationId);
  const [sendMessage] = api.usePostMessageMutation();

  const conversation = conversations?.find(
    (conversation) => conversation.id === conversationId
  );

  const otherUserId = conversation
    ? [conversation.recipientId, conversation.senderId].find(
        (id) => id !== loggedUserId
      )
    : null;

  // To get nickName from id
  const userWithIds = conversation
    ? {
        [conversation.recipientId]: conversation.recipientNickname,
        [conversation.senderId]: conversation.senderNickname,
      }
    : {};

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (value.length > 0 && event.key === 'Enter') {
      const body = {
        body: value,
        conversationId: Number(conversationId),
        authorId: loggedUserId,
        timestamp: getTimeStamp(),
        id: null,
      };
      sendMessage({ conversationId, body });
      setValue('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.grid}>
      <Header>{`${userWithIds[otherUserId]} - You`}</Header>
      <div className={styles.messages} id="messages">
        {messages &&
          messages.map((message, index) => {
            const isLogged = message.authorId === loggedUserId;
            return (
              <div key={message.id} className={styles.messageFlexContainer}>
                <div className={cx(styles.date, styles.center)}>
                  {convertTimeStamp(message.timestamp, dateFormat)}
                </div>
                <div
                  className={cx(styles.messageItemContainer, {
                    [styles.logged]: isLogged,
                  })}
                >
                  {!isLogged && (
                    <div className={styles.author}>
                      {conversation.recipientNickname}
                    </div>
                  )}
                  <Message
                    body={message.body}
                    isLogged={isLogged}
                    id={message.id}
                    index={index}
                  />
                </div>
              </div>
            );
          })}
        <div ref={bottomRef} />
      </div>
      <Textfield
        name="message"
        placeholder="Send message"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        required
        icon={<SendIcon color="grey" />}
      />
    </div>
  );
};

export default Messages;
