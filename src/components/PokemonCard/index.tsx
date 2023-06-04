import Link from 'next/link';
import Routes from 'src/constants/routes';

import PokeBallIcon from '@public/icons/pokeball.svg';

import PokemonSummary from '@domain/entities/PokemonSummary';

import PokemonPicture from '@components/PokemonPicture';
import TypeBadge from '@components/TypeBadge';

import styles from './styles.module.scss';

interface PokemonCard {
  pokemon: PokemonSummary;
}

const PokemonCard = ({ pokemon }: PokemonCard): JSX.Element => {
  const { id, image, name, types } = pokemon;

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

            <h2 className={`${styles.name} ${styles[types?.[0]]}`}>{name}</h2>
          </div>

          <ul className={styles.typeContainer}>
            {types?.map(type => (
              <li key={type}>
                <TypeBadge>{type}</TypeBadge>
              </li>
            ))}
          </ul>

          <div className={`${styles.background} ${styles[types?.[0]]}`} />
        </article>
      </a>
    </Link>
  );
};

export default PokemonCard;
