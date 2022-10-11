import React, { FC } from "react";
import styles from "../styles/Home.module.css";
import cx from "classnames";

const ConversationSkeleton: FC = () => {
  return (
    <div
      className={cx(styles.card, styles.skeleton, styles.conversationSkeleton)}
    ></div>
  );
};

export default ConversationSkeleton;
