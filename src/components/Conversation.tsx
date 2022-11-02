import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedUserId, setConversationId } from '../redux/slice';
import { getMessages, getUsers } from '../services';
import styles from '../styles/Home.module.css';
import { IConversation } from '../types/conversation';
import { convertTimeStamp } from '../utils/convertTimeStamp';

type Props = {
  conversation: IConversation;
  dataTestId: string;
  index: number;
};

const Conversation: FC<Props> = (props) => {
  const { conversation, dataTestId, index } = props;
  const { data: users } = useQuery(['users'], getUsers);
  const loggedUserId = useSelector(selectLoggedUserId);
  const loggedUser = users?.find((user) => user.id === loggedUserId);
  const { refetch: refetchMessages } = useQuery(['messages'], () =>
    getMessages(conversation.id)
  );
  const dispatch = useDispatch();

  const avatar = useMemo(() => faker.image.avatar(), [conversation.id]);
  const router = useRouter();

  const handleClick = (conversationId: number) => {
    router.push(`/message/${conversationId}`);
    dispatch(setConversationId(conversationId));
    refetchMessages();
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
      tabIndex={index + 1}
      role="none"
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
