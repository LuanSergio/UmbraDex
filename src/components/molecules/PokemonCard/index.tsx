import styles from './styles.module.scss';
import PokeballIcon from '../../../assets/images/icons/pokeball.svg';

interface Props {
  id: number;
  name: string;
  types: Array<string>;
  imageUrl: string;
}

const PokemonCard = ({ id, name, types, imageUrl }: Props): JSX.Element => {
  const test = [1, 2, 3, 4];
  return (
    <div className={styles.card}>
      <span className={styles.number}># 0{id}</span>
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
        <span className={styles.name}>{name}</span>
      </div>

      <div className={styles.typeContainer}>
        {types.map(type => (
          <span key={type} className={`${styles.type}`}>
            {type}
          </span>
        ))}
      </div>

      <div
        className={`${styles.background} ${styles.background}--${types[0]}`}
      />
    </div>
  );
};

export default PokemonCard;
