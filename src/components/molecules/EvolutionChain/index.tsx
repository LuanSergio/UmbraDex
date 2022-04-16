import { useState } from 'react';
import Link from 'next/link';

import getPokemonImageUrl from '@utils/getPokemonImageUrl';
import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';
import Carousel from '@components/molecules/Carousel';
import CarouselItem from '@components/atoms/CarouselItem';
import styles from './styles.module.scss';

interface IEvolutionChainProps {
  currentId: number;
  evolutionChain: IPokemonEvolution[];
}

const EvolutionChain = ({
  evolutionChain,
  currentId,
}: IEvolutionChainProps): JSX.Element => {
  const [evolutionIndex, setEvolutionIndex] = useState(0);

  function handleEvolutionIndexChange(index: number): void {
    setEvolutionIndex(index);
  }

  return (
    <>
      {evolutionChain.length > 3 ? (
        <div className={styles.evolutionChainCarouselContainer}>
          <Carousel
            currentIndex={evolutionIndex}
            updateCurrentIndex={handleEvolutionIndexChange}
            tagName="ul"
            itemWidth={120}
            gap={20}
            maxItems={3}
            large
            maxPositionIndex="auto"
          >
            {evolutionChain.map(evolution => {
              return (
                <CarouselItem key={evolution.id} tagName="li">
                  <Link href={`/pokemon/${evolution.id}`} passHref>
                    <a
                      className={` ${styles.evolutionContainer} ${
                        currentId === evolution.id
                          ? styles.evolutionContainerActive
                          : ''
                      }`}
                    >
                      <div
                        title={transformFirstLetterToUppercase(evolution.name)}
                        role="img"
                        id={evolution.name}
                        aria-labelledby={evolution.name}
                        className={styles.evolution}
                        style={{
                          WebkitMaskImage: `url(${getPokemonImageUrl(
                            evolution.id,
                          )})`,
                          maskImage: `url(${getPokemonImageUrl(evolution.id)})`,
                        }}
                      />
                      <span
                        id={evolution.name}
                        className={styles.evolutionName}
                      >
                        {evolution.name}
                      </span>
                    </a>
                  </Link>
                </CarouselItem>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div className={styles.evolutionChain}>
          {evolutionChain.map(evolution => {
            return (
              <Link
                href={`/pokemon/${evolution.id}`}
                key={evolution.id}
                passHref
              >
                <a
                  className={` ${styles.evolutionContainer} ${
                    currentId === evolution.id
                      ? styles.evolutionContainerActive
                      : ''
                  }`}
                >
                  <div
                    title={transformFirstLetterToUppercase(evolution.name)}
                    role="img"
                    id={evolution.name}
                    aria-labelledby={evolution.name}
                    className={styles.evolution}
                    style={{
                      WebkitMaskImage: `url(${getPokemonImageUrl(
                        evolution.id,
                      )})`,
                      maskImage: `url(${getPokemonImageUrl(evolution.id)})`,
                    }}
                  />
                  <span id={evolution.name} className={styles.evolutionName}>
                    {evolution.name}
                  </span>
                </a>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default EvolutionChain;
