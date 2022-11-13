import * as Dialog from '@radix-ui/react-dialog';
import { ReactChild } from 'react';

import styles from './styles.module.scss';

interface IModalProps {
  children: ReactChild;
}

const Modal = ({ children }: IModalProps): JSX.Element => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{children}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={styles.dialogContent}>
        <Dialog.Title className={styles.dialogTitle}>Disclaimer</Dialog.Title>
        <p>
          Sit sint labore excepteur ea ipsum et. Sint est sint sunt velit fugiat
          fugiat. Aute consectetur reprehenderit occaecat consectetur veniam
          enim proident commodo voluptate irure sint deserunt irure commodo.
          Labore exercitation fugiat laboris laboris magna quis ad id. Quis
          voluptate eiusmod sit incididunt labore id cupidatat. Nisi laboris
          velit nisi voluptate ea. Dolore labore ipsum velit anim sit minim
          nisi. Dolor commodo reprehenderit aute eu fugiat do laboris qui
          cupidatat veniam. Esse adipisicing veniam amet cupidatat fugiat
          laboris. Qui occaecat ipsum est consectetur nulla est tempor officia.
          Magna non qui voluptate velit deserunt aliquip consequat aliquip
          ullamco tempor reprehenderit culpa. Cillum mollit Lorem consectetur
          dolor enim. Reprehenderit dolor nisi esse mollit id exercitation sunt
          velit quis esse adipisicing do sint. Proident deserunt consectetur
          aliqua ad esse laborum aliquip sint reprehenderit excepteur veniam
          pariatur sunt. Lorem ipsum nisi nostrud consectetur excepteur. Nulla
          voluptate do ut velit commodo cupidatat. Eu adipisicing ipsum
          consectetur mollit pariatur laborum nisi veniam pariatur fugiat sunt
          excepteur culpa id. Dolore est officia ad ad dolor nulla exercitation
          commodo incididunt sint eu. Commodo consequat elit et enim labore
          exercitation proident fugiat commodo cupidatat mollit consectetur
          excepteur ad. Anim consectetur eiusmod sunt tempor qui consequat.
          Consectetur proident proident qui ex est laboris cupidatat
          reprehenderit culpa. Culpa magna laboris deserunt qui mollit eu ex
          mollit aliqua ipsum excepteur irure reprehenderit aliqua. Exercitation
          sint Lorem in ea cupidatat esse tempor ea amet aliqua tempor in magna.
          Exercitation ipsum tempor aliquip sunt. Nisi eiusmod laborum nisi eu
          dolore in proident dolore nulla elit labore sunt sit sit. In dolor do
          velit reprehenderit ad consequat aliqua ut minim est. Lorem esse et
          enim cupidatat commodo proident. Exercitation enim enim ad
          exercitation exercitation ad pariatur enim laborum irure et cillum do.
          Qui labore est veniam et reprehenderit duis duis irure consequat.
        </p>
        <Dialog.Close asChild>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Close"
          >
            x{/* <Cross2Icon /> */}
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
