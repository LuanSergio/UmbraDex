import { ReactNode } from 'react';
import ReactPortal from '../ReactPortal';

import styles from './styles.module.scss';

interface ISnackBarProps {
  children: ReactNode;
}

const SnackBar = ({ children }: ISnackBarProps): JSX.Element => (
  <ReactPortal wrapperId="snack-bar-wrapper">
    <div className={styles.snackBar}>{children}</div>
  </ReactPortal>
);

export default SnackBar;
