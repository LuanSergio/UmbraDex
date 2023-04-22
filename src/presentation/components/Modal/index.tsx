import { Dispatch, ReactChild, SetStateAction } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import CloseIcon from '@public/icons/close.svg';

import styles from './styles.module.scss';

interface IModalProps {
  children: ReactChild;
  openButton: ReactChild;
  title: string;
  footer?: ReactChild;
  size?: 'small' | 'medium';
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({
  children,
  openButton,
  title,
  footer,
  size = 'medium',
  open,
  onOpenChange,
}: IModalProps): JSX.Element => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Trigger asChild>{openButton}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={`${styles.dialogContent} ${styles[size]}`}>
        <Dialog.Title className={styles.dialogTitle}>
          <span>{title}</span>
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
        <div className={`${styles.contentContainer} h-secondary-scroll`}>
          {children}
        </div>
        {footer && <div>{footer}</div>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
