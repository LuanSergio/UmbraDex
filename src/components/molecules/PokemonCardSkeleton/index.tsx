import PokeBallIcon from '@public/icons/pokeball.svg';
import substitutePlaceholder from '@data/substitutePlaceholder';

import Image from 'next/image';
import styles from './styles.module.scss';

const PokemonCardSkeleton = (): JSX.Element => {
  return (
    <article className={styles.card}>
      <div className={styles.number}>???</div>

      <div className={styles.pokemonContainer}>
        <span className={styles.pokeball}>
          <PokeBallIcon />
        </span>
        <div className={styles.pokemon}>
          <Image src={substitutePlaceholder} layout="fill" alt="" />
        </div>

        <div className={styles.name}>??????</div>
      </div>

      <div className={styles.typeContainer}>
        <div className={styles.type}>????</div>
      </div>

      <div className={styles.background} />
    </article>
  );
};

export default PokemonCardSkeleton;
