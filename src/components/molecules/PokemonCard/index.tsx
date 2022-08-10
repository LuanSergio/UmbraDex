import Link from 'next/link';
import PokemonPicture from '@components/atoms/PokemonPicture';
import styles from './styles.module.scss';

const PokemonCard = ({
  id,
  name,
  types,
  image,
}: IBasicPokemonInfo): JSX.Element => {
  return (
    <Link href={`/pokemon/${id}`}>
      <div className={styles.card} id={`${id}`}>
        {id <= 10 ? (
          <p className={styles.number}># 0{id}</p>
        ) : (
          <p className={styles.number}># {id}</p>
        )}

        <div className={styles.pokemonContainer}>
          <span className={styles.pokeball} />
          <div className={styles.pokemon}>
            <PokemonPicture layout="fill" src={image} alt="" />
          </div>

          <p className={`${styles.name} ${styles[types[0]]}`}>{name}</p>
        </div>

        <div className={styles.typeContainer}>
          {types.map((type, index) => (
            <p key={type} className={`${styles.type} ${styles[types[index]]}`}>
              {type}
            </p>
          ))}
        </div>

        <div className={`${styles.background} ${styles[types[0]]}`} />
      </div>
    </Link>
  );
};

export default PokemonCard;
