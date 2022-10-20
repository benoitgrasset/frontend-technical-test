import cx from 'classnames';
import { FC, InputHTMLAttributes } from 'react';
import styles from './Textfield.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  name: string;
  label: string;
}

const Textfield: FC<Props> = (props) => {
  const { icon, name, label, ...otherProps } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        minLength={1}
        maxLength={600}
        className={cx(styles.input, { [styles.disabled]: props.disabled })}
        {...otherProps}
      />
      {icon}
    </div>
  );
};

export default Textfield;
