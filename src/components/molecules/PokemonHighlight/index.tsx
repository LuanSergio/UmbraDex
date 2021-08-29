import styles from './styles.module.scss';

interface PokemonHighlightProps {
  japaneseName: string;
  image: string;
  name: string;
}

const PokemonHighlight = ({
  japaneseName,
  image,
  name,
}: PokemonHighlightProps): JSX.Element => {
  return (
    <div className={styles.pokemonContainer}>
      <span className={styles.japaneseName}>{japaneseName}</span>
      <img className={styles.pokemon} src={image} alt={name} />
    </div>
  );
};

export default PokemonHighlight;
