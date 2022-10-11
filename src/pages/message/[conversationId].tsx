import React, { FC, useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import { IMessage } from "../../types/message";
import cx from "classnames";
import { convertTimeStamp, getTimeStamp } from "../../utils/convertTimeStamp";
import { Header, Message } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectConversations,
  selectLoggedUserId,
  selectMessages,
  selectConversationId,
  sendMessageRequest,
} from "../../redux/slice";

const dateFormat = "MMMM D, h:mm A";

const Messages: FC = () => {
  const dispatch = useDispatch();
  const bottomRef = useRef(null);

  const [value, setValue] = useState("");
  const conversations = useSelector(selectConversations);
  const messages = useSelector(selectMessages);
  const loggedUserId = useSelector(selectLoggedUserId);
  const conversationId = useSelector(selectConversationId);

  const conversation = conversations.find(
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

  /**
   * FIXME: not the max of ALL IDs
   * @returns
   */
  const createNewMessageId = () => {
    return Math.max(...messages.map((message) => message.id)) + 1;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (value.length > 0 && event.key === "Enter") {
      const body: IMessage = {
        body: value,
        id: createNewMessageId(),
        conversationId: Number(conversationId),
        authorId: loggedUserId,
        timestamp: getTimeStamp(),
      };
      dispatch(sendMessageRequest({ conversationId, body }));
      setValue("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.grid}>
      <Header>{`${userWithIds[otherUserId]} - You`}</Header>
      <div className={styles.messages} id="messages">
        {messages &&
          messages.map((message) => {
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
                  />
                </div>
              </div>
            );
          })}
        <div ref={bottomRef} />
      </div>
      <input
        id="message"
        minLength={1}
        maxLength={600}
        type="text"
        placeholder="Send message"
        className={styles.input}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Messages;
