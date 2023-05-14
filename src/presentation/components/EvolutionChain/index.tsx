import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import PokemonEvolution from '@domain/entities/PokemonEvolution';

import Carousel from 'src/presentation/components/Carousel';
import CarouselItem from 'src/presentation/components/CarouselItem';
import useWindowSize from '@hooks/useWindowSize';

import getPokemonImageUrl from '@helpers/getPokemonImageUrl';
import transformFirstLetterToUppercase from '@helpers/transformFirstLetterToUppercase';

import styles from './styles.module.scss';

interface EvolutionChainProps {
  currentId: number;
  evolutionChain: PokemonEvolution[];
}

const EvolutionChain = ({
  evolutionChain,
  currentId,
}: EvolutionChainProps): JSX.Element => {
  const [evolutionIndex, setEvolutionIndex] = useState(0);
  const [widthList, setWidthList] = useState([]);
  const [windowWidth] = useWindowSize();
  const [clearWidthListCount, setClearWidthListCount] = useState(0);
  const evolutionRef = useRef([]);

  const router = useRouter();

  function handleEvolutionIndexChange(index: number): void {
    setEvolutionIndex(index);
    router.push(`/pokemon/${evolutionChain[index].id}`);
  }

  useEffect(() => {
    const currentEvolution = evolutionChain.findIndex(
      item => item.id.toString() === (router.query.id as string),
    );

    setEvolutionIndex(currentEvolution);
  }, [evolutionChain, router.query.id]);

  useEffect(() => {
    // force the width list to be redone when the window width change
    setWidthList([]);
    setClearWidthListCount(previousState => previousState + 1);
  }, [windowWidth]);

  useEffect(() => {
    evolutionRef.current.forEach(element => {
      if (element?.getBoundingClientRect()?.width) {
        setWidthList(previousState => [
          ...previousState,
          element.getBoundingClientRect().width,
        ]);
      }
    });
  }, [evolutionChain, router.query.id, clearWidthListCount]);

  return (
    <>
      {evolutionChain.length > 3 ? (
        <div className={styles.evolutionChainCarouselContainer}>
          <Carousel
            currentIndex={evolutionIndex}
            updateCurrentIndex={handleEvolutionIndexChange}
            tagName="ul"
            itemWidth={widthList}
            gap={20}
            maxItems={3}
            large
            maxPositionIndex="auto"
          >
            {evolutionChain.map((evolution, index) => {
              return (
                <CarouselItem key={evolution.id} tagName="li">
                  <Link href={`/pokemon/${evolution.id}`} passHref>
                    <a
                      className={` ${styles.evolutionContainer} ${
                        currentId === evolution.id
                          ? styles.evolutionContainerActive
                          : ''
                      }`}
                      ref={element => {
                        evolutionRef.current[index] = element;
                      }}
                    >
                      <div
                        title={transformFirstLetterToUppercase(evolution.name)}
                        role="img"
                        aria-labelledby={`evolution-${evolution.name}`}
                        className={styles.evolution}
                        style={{
                          WebkitMaskImage: `url(${getPokemonImageUrl(
                            evolution.id,
                          )})`,
                          maskImage: `url(${getPokemonImageUrl(evolution.id)})`,
                        }}
                      />
                      <span
                        id={`evolution-${evolution.name}`}
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
