import { FC, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersRequest,
  getConversationsRequest,
  selectConversations,
} from "../redux/slice";
import { AddIcon, Conversation, ConversationSkeleton } from "../components";
import { useRouter } from "next/router";
import cx from "classnames";

const Home: FC = () => {
  const year = new Date().getFullYear();
  const router = useRouter();
  const dispatch = useDispatch();
  const conversations = useSelector(selectConversations);

  const handleAddConversation = () => {
    router.push(`/message/create`);
  };

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getConversationsRequest());
  }, [dispatch]);

  const isLoading = conversations.length === 0;

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
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
