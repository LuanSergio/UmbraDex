import { useEffect, useState } from 'react';
import Image from 'next/image';

import substitutePlaceholder from '@data/substitutePlaceholder';

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
  const [imageSrc, setImageSrc] = useState(image);

  function handleImageError(): void {
    setImageSrc(substitutePlaceholder);
  }

  useEffect(() => {
    setImageSrc(image);
  }, [image]);

  return (
    <div className={styles.pokemonContainer}>
      <span className={styles.japaneseName} aria-hidden="true">
        {japaneseName}
      </span>

      <div className={styles.pokemon}>
        <Image
          quality={100}
          layout="fill"
          priority
          objectFit="contain"
          src={imageSrc}
          alt={name}
          onError={handleImageError}
          title={name}
        />
      </div>
    </div>
  );
};

export default PokemonHighlight;
