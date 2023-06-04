import styles from './styles.module.scss';

const Disclaimer = (): JSX.Element => {
  return (
    <p className={styles.disclaimerText}>
      This website was made as a study project, with no no financial purpose.{' '}
      <br />
      <br />
      All image contents within are Copyright of The Pokémon Company. Pokémon ©
      2002-2023 Pokémon. © 1995-2023 Nintendo/Creatures Inc./GAME FREAK inc. TM,
      ® and Pokémon character names are trademarks of Nintendo.
      <br />
      <br />
      No copyright or trademark infringement is intended in using Pokémon
      content on this website.
    </p>
  );
};

export default Disclaimer;
