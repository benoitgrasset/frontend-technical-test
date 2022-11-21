import cx from 'classnames';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMessageRequest } from '../redux/slice';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import { DeleteIcon } from './DeleteIcon';
import styles from './Message.module.css';
import Tooltip from './Tooltip';

type Props = {
  body: string;
  isLogged: boolean;
  id: number;
  index: number;
};

const Message: FC<Props> = (props) => {
  const { isLogged, body, id, index } = props;
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteMessage = (messageId: number) => {
    dispatch(
      deleteMessageRequest({ messageId, conversationId: getLoggedUserId() })
    );
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
      role="none"
      tabIndex={index + 1}
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
