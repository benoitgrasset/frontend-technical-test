import React, { FC, useState } from "react";
import cx from "classnames";
import styles from "./Message.module.css";
import { DeleteIcon } from "./DeleteIcon";
import Tooltip from "./Tooltip";
import { useDispatch } from "react-redux";
import { deleteMessageRequest } from "../redux/slice";

type Props = {
  body: string;
  isLogged: boolean;
  id: number;
};

const Message: FC<Props> = (props) => {
  const { isLogged, body, id } = props;
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteMessage = (messageId: number) => {
    dispatch(deleteMessageRequest(messageId));
  };

  return (
    <div
      className={cx(styles.message, {
        [styles.logged]: isLogged,
      })}
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
      data-testid={`message-${id}`}
    >
      {body}
      {visible && (
        <>
          <Tooltip id="button-delete-tooltip" />
          <button
            className={cx(styles.button, { [styles.logged]: isLogged })}
            onClick={() => handleDeleteMessage(id)}
            data-tip="Delete message"
            data-for="button-delete-tooltip"
            data-testid={`button-delete-message-${id}`}
          >
            <DeleteIcon />
          </button>
        </>
      )}
    </div>
  );
};

export default Message;
