import styles from './styles.module.scss';
import PokeballIcon from '../../../assets/images/icons/pokeball.svg';

interface Props {
  id: number;
  name: string;
  types: Array<string>;
  imageUrl: string;
}

const PokemonCard = ({ id, name, types, imageUrl }: Props): JSX.Element => {
  const dualType = `dual-${types[1]}`;

  return (
    <div className={styles.card}>
      {id <= 10 ? (
        <span className={styles.number}># 0{id}</span>
      ) : (
        <span className={styles.number}># {id}</span>
      )}

      <div className={styles.pokemonContainer}>
        <span className={styles.pokeball}>
          <PokeballIcon />
        </span>
        <img
          className={styles.pokemon}
          src={imageUrl}
          alt={name}
          title={name}
        />
        <span className={`${styles.name} ${styles[types[0]]}`}>{name}</span>
      </div>

      <div className={styles.typeContainer}>
        {types.map((type, index) => (
          <span key={type} className={`${styles.type} ${styles[types[index]]}`}>
            {type}
          </span>
        ))}
      </div>

      {types.length > 0 ? (
        <div
          className={`${styles.background} ${styles[dualType]} ${
            styles[types[0]]
          }`}
        />
      ) : (
        <div className={`${styles.background} ${styles[types[0]]}`} />
      )}
    </div>
  );
};

export default PokemonCard;
