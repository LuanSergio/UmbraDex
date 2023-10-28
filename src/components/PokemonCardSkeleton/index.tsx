import Image from 'next/image';

import PokeBallIcon from '@public/icons/pokeball.svg';
import substitutePlaceholder from 'src/constants/substitutePlaceholder';

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
          <Image unoptimized src={substitutePlaceholder} layout="fill" alt="" />
        </div>

        <div className={styles.name}>??????</div>
      </div>

      <div className={styles.typeContainer}>
        <div className={styles.type}>????</div>
      </div>

      <div className={`${styles.background} skeleton-loading`} />
    </article>
  );
};

export default PokemonCardSkeleton;
