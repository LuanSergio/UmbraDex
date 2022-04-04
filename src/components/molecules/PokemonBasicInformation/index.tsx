import replaceDashWithSpace from '@utils/replaceDashWithSpace';
import styles from './styles.module.scss';

interface PokemonBasicInformationProps {
  name: string;
  pokedexIndex: number;
  types: string[];
}

const PokemonBasicInformation = ({
  name,
  pokedexIndex,
  types,
}: PokemonBasicInformationProps): JSX.Element => {
  return (
    <div>
      <h1 className={styles.name}>{replaceDashWithSpace(name)}</h1>
      <div className={styles.basicInfo}>
        {pokedexIndex <= 10 ? (
          <span className={styles.number}>
            <span className={styles.hashtag}>#</span> 0{pokedexIndex}
          </span>
        ) : (
          <span className={styles.number}>
            <span className={styles.hashtag}>#</span> {pokedexIndex}
          </span>
        )}
        <div className={styles.typeContainer}>
          {types.map((type, index) => (
            <span
              key={type}
              title={type}
              className={`${styles.type} ${styles[types[index]]} ${
                types.length > 1 ? styles.dualType : styles.singleType
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonBasicInformation;
