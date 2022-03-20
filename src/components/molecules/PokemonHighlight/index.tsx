import Image from 'next/image';
import styles from './styles.module.scss';

interface PokemonHighlightProps {
  japaneseName: string;
  image: string;
  name: string;
}

const PokemonHighlight = ({
  japaneseName,
  image,
  name,
}: PokemonHighlightProps): JSX.Element => {
  return (
    <div className={styles.pokemonContainer}>
      <span className={styles.japaneseName} aria-hidden="true">
        {japaneseName}
      </span>

      <div className={styles.pokemon}>
        <Image
          quality={100}
          layout="fill"
          objectFit="contain"
          src={image}
          alt={name}
          title={name}
        />
      </div>
    </div>
  );
};

export default PokemonHighlight;
