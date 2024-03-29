/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';
import { useEffect, useRef, Fragment } from 'react';

import PokemonSummary from '@domain/entities/PokemonSummary';

import LoadingCircleIcon from '@public/icons/loading.svg';
import ConfusedPsyduck from '@public/confused-psyduck.svg';
import LoadingDots from '@public/icons/loading-dots.svg';

import { usePokemonListContext } from 'src/contexts/PokemonListContext';
import POKEMON_PER_REQUEST from 'src/constants/pokemonPerRequest';
import useWindowSize from 'src/hooks/useWindowSize';

import useLoader from '@hooks/useLoader';
import PokemonCard from '@components/PokemonCard';
import PokemonCardSkeleton from '@components/PokemonCardSkeleton';
import SnackBar from '@components/SnackBar';

import styles from './styles.module.scss';

const PokemonCardList = (): JSX.Element => {
  const { pokemonList, isLoading, searchValue, setPokemonListSize } =
    usePokemonListContext();
  const loader = useRef(null);

  const isFirstRender = useRef(true);

  const [windowWidth] = useWindowSize();

  const router = useRouter();

  useLoader<PokemonSummary>({
    loader: loader.current,
    setSize: setPokemonListSize,
  });

  useEffect(() => {
    if (isFirstRender.current && windowWidth > 0) {
      isFirstRender.current = false;

      const positionCorrection = windowWidth > 600 ? 4 : 1;
      const currentPokemonId =
        parseInt(sessionStorage.getItem('currentPokemonId'), 10) -
        positionCorrection;

      if (currentPokemonId) {
        router.replace({ hash: currentPokemonId.toString() });
        sessionStorage.setItem('currentPokemonId', '' as string);
      }
    }
  }, [router, windowWidth]);

  return (
    <>
      {isLoading ? (
        <>
          {searchValue.length > 0 ? (
            <div className={styles.loadingCircleContainer}>
              <span className={styles.loadingCircle}>
                <LoadingCircleIcon />
              </span>
            </div>
          ) : (
            <div className={styles.cardList}>
              <ul className={styles.cardContainer}>
                {Array.from(Array(POKEMON_PER_REQUEST), (e, i) => {
                  return <PokemonCardSkeleton key={i} />;
                })}
              </ul>
            </div>
          )}

          <SnackBar>
            Loading
            <span className={styles.loadingDots}>
              <LoadingDots />
            </span>
          </SnackBar>
        </>
      ) : (
        <div
          className={`${styles.cardList} ${
            searchValue?.length > 0 ? styles.cardListSpaced : ''
          }`}
        >
          {pokemonList && pokemonList[0].length === 0 ? (
            <div className={styles.pokemonNotFound}>
              <h2 className={styles.pokemonNotFoundTitle}>Ops...</h2>
              <div className={styles.psyduck}>
                <ConfusedPsyduck />
              </div>
              <p className={styles.pokemonNotFoundText}>Pokemon not found</p>
            </div>
          ) : (
            <>
              <ol className={styles.cardContainer}>
                {pokemonList?.map((list, index) => (
                  <Fragment key={index}>
                    {list.map(pokemon => (
                      <li key={pokemon.id}>
                        <PokemonCard pokemon={pokemon} />
                      </li>
                    ))}
                  </Fragment>
                ))}
              </ol>
              {pokemonList?.[0].length >= POKEMON_PER_REQUEST && (
                <div ref={loader} />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PokemonCardList;
