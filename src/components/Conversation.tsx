import React, { FC } from "react";
import styles from "../styles/Home.module.css";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { IConversation } from "../types/conversation";
import { useRouter } from "next/router";
import { convertTimeStamp } from "../utils/convertTimeStamp";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesRequest, selectLoggedUser } from "../redux/slice";

type Props = {
  conversation: IConversation;
  dataTestId: string;
};

const Conversation: FC<Props> = (props) => {
  const { conversation, dataTestId } = props;
  const loggedUser = useSelector(selectLoggedUser);

  const avatar = faker.image.avatar();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (conversationId: number) => {
    router.push(`/message/${conversationId}`);
    dispatch(getMessagesRequest(conversationId));
  };

  const nickname =
    conversation.recipientNickname === loggedUser?.nickname
      ? conversation.senderNickname
      : conversation.recipientNickname;

  return (
    <div
      className={styles.card}
      onClick={() => handleClick(conversation.id)}
      data-testid={dataTestId}
    >
      <Image
        src={avatar}
        alt="avatar"
        width={40}
        height={40}
        className={styles.avatar}
      />
      <div>
        <h2>{nickname}</h2>
        <div className={styles.date}>
          {convertTimeStamp(conversation.lastMessageTimestamp)}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
