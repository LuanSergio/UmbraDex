import { ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import ReactPortal from '@components/ReactPortal';

import styles from './styles.module.scss';

interface SnackBarProps {
  children: ReactNode;
  adornment: ReactNode;
}

const SnackBar = ({ children, adornment }: SnackBarProps): JSX.Element => (
  <ReactPortal wrapperId="snack-bar-wrapper">
    <div className={`${styles.snackBar} ${RemoveScroll.classNames.fullWidth}`}>
      <div className={styles.snackBarContainer}>
        <p className={styles.snackBarContent}>{children}</p>
        {adornment}
      </div>
    </div>
  </ReactPortal>
);

export default SnackBar;
