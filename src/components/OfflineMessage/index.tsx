import ConfusedPsyduck from '@public/confused-psyduck.svg';

import styles from './styles.module.scss';

const OfflineMessage = (): JSX.Element => {
  return (
    <div className={styles.offline}>
      <h1 className={`${styles.title} h-title`}>You are offline</h1>
      <div className={styles.psyduck}>
        <ConfusedPsyduck />
      </div>
      <p className={styles.text}>
        This page is not available offline yet. Check your connection and try
        again — Pokémon you have already visited are still available.
      </p>
      <a href="/" className={styles.button}>
        Try again
      </a>
    </div>
  );
};

export default OfflineMessage;
