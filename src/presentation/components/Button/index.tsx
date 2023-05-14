import { ButtonHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface ButtonProps {
  children: string;
  theme?: 'primary' | 'secondary';
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const Button = ({
  children,
  buttonProps,
  theme = 'primary',
}: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[theme]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
