import cx from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { AddIcon, Conversation, ConversationSkeleton } from '../components';
import { selectLoggedUserId } from '../redux/slice';
import { api } from '../services/api';
import styles from '../styles/Home.module.css';

const Home: FC = () => {
  const year = new Date().getFullYear();
  const router = useRouter();
  const loggedUserId = useSelector(selectLoggedUserId);

  const {
    data: conversations,
    error,
    isLoading,
    isError,
  } = api.useGetConversationsQuery(loggedUserId);

  const handleAddConversation = () => {
    router.push(`/message/create`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Frontend exercise for developpers who want to join us on leboncoin.fr"
        ></meta>
      </Head>

      <main className={styles.main}>
        {isLoading
          ? [...Array(3)].map((e, index) => (
              <ConversationSkeleton key={index} />
            ))
          : conversations.map((conversation, index) => (
              <Conversation
                key={conversation.id}
                conversation={conversation}
                dataTestId={`conversation-${index}`}
                index={index}
              />
            ))}
        <button
          className={cx(styles.addButton, styles.actionButton)}
          onClick={handleAddConversation}
          data-testid="button-add-conversation"
        >
          <AddIcon />
        </button>
      </main>
      <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
    </div>
  );
};

export default Home;
