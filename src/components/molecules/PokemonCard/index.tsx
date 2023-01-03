import Link from 'next/link';
import PokemonPicture from '@components/atoms/PokemonPicture';
import Routes from '@data/routes';
import PokeBallIcon from '@public/icons/pokeball.svg';

import styles from './styles.module.scss';

const PokemonCard = ({
  id,
  name,
  types,
  image,
}: IBasicPokemonInfo): JSX.Element => {
  return (
    <Link href={`${Routes.pokemonDetails}/${id}`} passHref>
      <a>
        <article className={styles.card} id={`${id}`}>
          {id <= 10 ? (
            <span className={styles.number}># 0{id}</span>
          ) : (
            <span className={styles.number}># {id}</span>
          )}

          <div className={styles.pokemonContainer}>
            <span className={styles.pokeball}>
              <PokeBallIcon />
            </span>
            <div className={styles.pokemon}>
              <PokemonPicture layout="fill" src={image} alt="" />
            </div>

            <h2 className={`${styles.name} ${styles[types[0]]}`}>{name}</h2>
          </div>

          <ul className={styles.typeContainer}>
            {types.map((type, index) => (
              <li
                key={type}
                className={`${styles.type} ${styles[types[index]]}`}
              >
                {type}
              </li>
            ))}
          </ul>

          <div className={`${styles.background} ${styles[types[0]]}`} />
        </article>
      </a>
    </Link>
  );
};

export default PokemonCard;
