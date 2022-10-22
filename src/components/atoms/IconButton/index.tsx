/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss';

interface IButtonProps {
  children: ReactNode;
  round?: boolean;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  elevation?: boolean;
  fill?: boolean;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const IconButton = ({
  children,
  props,
  round,
  label,
  fill,
  elevation = false,
  type = 'button',
}: IButtonProps): JSX.Element => (
  <button
    type={type}
    aria-label={label}
    {...props}
    className={`${styles.iconButton} ${round ? styles.round : ''} ${
      elevation ? styles.elevation : ''
    } ${fill ? styles.fill : ''}`}
  >
    {children}
  </button>
);

export default IconButton;
