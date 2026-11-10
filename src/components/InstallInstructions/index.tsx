import styles from './styles.module.scss';

const InstallInstructions = (): JSX.Element => {
  return (
    <div className={styles.instructions}>
      <p className={styles.text}>
        Install UmbraDex on your home screen for quick access, a full-screen
        experience and offline support for the Pokémon you have visited.
      </p>
      <ol className={styles.steps}>
        <li>
          Tap the <strong>Share</strong> button in Safari&apos;s toolbar.
        </li>
        <li>
          Scroll down and choose <strong>Add to Home Screen</strong>.
        </li>
        <li>
          Tap <strong>Add</strong> to confirm.
        </li>
      </ol>
    </div>
  );
};

export default InstallInstructions;
