import Link from 'next/link';
import PokemonPicture from '@components/atoms/PokemonPicture';
import Routes from '@data/routes';
import PokeBallIcon from '@public/icons/pokeball.svg';

import styles from './styles.module.scss';

interface IPokemonCard {
  id: number;
  form: IBasicFormInfo;
}

const PokemonCard = ({ id, form }: IPokemonCard): JSX.Element => {
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
              <PokemonPicture layout="fill" src={form.image} alt="" />
            </div>

            <h2 className={`${styles.name} ${styles[form.types[0]]}`}>
              {form.name}
            </h2>
          </div>

          <ul className={styles.typeContainer}>
            {form.types.map((type, index) => (
              <li
                key={type}
                className={`${styles.type} ${styles[form.types[index]]}`}
              >
                {type}
              </li>
            ))}
          </ul>

          <div className={`${styles.background} ${styles[form.types[0]]}`} />
        </article>
      </a>
    </Link>
  );
};

export default PokemonCard;
