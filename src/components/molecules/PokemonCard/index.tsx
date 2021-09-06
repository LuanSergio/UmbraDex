import Link from 'next/link';
import styles from './styles.module.scss';
import PokeballIcon from '../../../assets/icons/pokeball.svg';

const PokemonCard = ({
  id,
  name,
  types,
  image,
}: IBasicPokemonInfo): JSX.Element => {
  return (
    <Link href={`/pokemon/${id}`}>
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
            loading="lazy"
            className={styles.pokemon}
            src={image}
            alt={name}
            title={name}
          />
          <span className={`${styles.name} ${styles[types[0]]}`}>{name}</span>
        </div>

        <div className={styles.typeContainer}>
          {types.map((type, index) => (
            <span
              key={type}
              className={`${styles.type} ${styles[types[index]]}`}
            >
              {type}
            </span>
          ))}
        </div>

        <div className={`${styles.background} ${styles[types[0]]}`} />
      </div>
    </Link>
  );
};

export default PokemonCard;
