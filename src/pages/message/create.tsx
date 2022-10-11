import React, { FC, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import cx from "classnames";
import { getTimeStamp } from "../../utils/convertTimeStamp";
import { Header } from "../../components";
import { IConversation } from "../../types/conversation";
import { useDispatch, useSelector } from "react-redux";
import {
  createConversationRequest,
  selectConversations,
  selectLoggedUser,
  selectUsers,
} from "../../redux/slice";
import { loggedUserId } from "../_app";

const createRandomId = () => Math.floor(Math.random() * 10000000);

const getUniqueIds = (conversation: IConversation): string => {
  return [conversation.recipientId, conversation.senderId]
    .sort((a, b) => a - b)
    .join();
};

const Messages: FC = () => {
  const router = useRouter();

  const users = useSelector(selectUsers);
  const [newUserId, setNewUserId] = useState<number | null>(users[0].id);
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
      const newId = createRandomId();
      const newConversation: IConversation = {
        id: newId,
        lastMessageTimestamp: getTimeStamp(),
        recipientId: recipientUser.id,
        recipientNickname: recipientUser.nickname,
        senderId: loggedUser.id,
        senderNickname: loggedUser.nickname,
      };

      if (
        conversations
          .map((conversation) => getUniqueIds(conversation))
          .includes(getUniqueIds(newConversation))
      ) {
        const conversationId = conversations.find(
          (conversation) =>
            getUniqueIds(conversation) === getUniqueIds(newConversation)
        ).id;
        router.push(`/message/${conversationId}`);
      } else {
        const newId = createRandomId();
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
            {users.map((user) => {
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
      <input
        id="message"
        minLength={1}
        maxLength={600}
        type="text"
        placeholder="Send message"
        className={cx(styles.input, styles.disabled)}
        disabled={true}
      />
    </div>
  );
};

export default Messages;
