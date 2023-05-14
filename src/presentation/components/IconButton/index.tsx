/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss';

interface ButtonProps {
  children: ReactNode;
  round?: boolean;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  theme?: 'primary' | 'secondary';
  fill?: boolean;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const IconButton = ({
  children,
  props,
  round,
  label,
  fill,
  theme = 'primary',
  type = 'button',
}: ButtonProps): JSX.Element => (
  <button
    type={type}
    aria-label={label}
    {...props}
    className={`${styles.iconButton} ${round ? styles.round : ''} ${
      styles[theme]
    } ${fill ? styles.fill : ''}`}
  >
    {children}
  </button>
);

export default IconButton;
