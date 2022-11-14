import * as Dialog from '@radix-ui/react-dialog';
import { ReactChild } from 'react';
import CloseIcon from '@public/icons/close.svg';

import styles from './styles.module.scss';

interface IModalProps {
  children: ReactChild;
  openButton: ReactChild;
  size?: 'small' | 'medium';
}

const Modal = ({
  children,
  openButton,
  size = 'medium',
}: IModalProps): JSX.Element => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{openButton}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={`${styles.dialogContent} ${styles[size]}`}>
        <Dialog.Title className={styles.dialogTitle}>
          <span>Disclaimer</span>
          <Dialog.Close asChild>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close"
            >
              <span className={styles.icon}>
                <CloseIcon />
              </span>
            </button>
          </Dialog.Close>
        </Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
