import cx from 'classnames';
import { FC, InputHTMLAttributes } from 'react';
import styles from './Textfield.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  name: string;
}

const Textfield: FC<Props> = (props) => {
  const { icon, name, ...otherProps } = props;
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        id={name}
        minLength={1}
        maxLength={600}
        className={cx({ [styles.disabled]: props.disabled })}
        {...otherProps}
      />
      <span className={styles.icon}>{icon}</span>
    </div>
  );
};

export default Textfield;
