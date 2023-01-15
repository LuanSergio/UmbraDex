/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';
import { useEffect, useRef, Fragment } from 'react';

import { usePokemonListContext } from '@contexts/PokemonListContext';

import PokemonCard from '@components/molecules/PokemonCard';
import useWindowSize from '@hooks/useWindowSize';
import POKEMON_PER_REQUEST from '@data/pokemonPerRequest';
import PokemonCardSkeleton from '@components/molecules/PokemonCardSkeleton';
import useCardListLoader from './useCardListLoader';

import styles from './styles.module.scss';

const PokemonCardList = (): JSX.Element => {
  const { pokemonList, isLoading, setPokemonListSize } =
    usePokemonListContext();
  const loader = useRef(null);
  const isFirstRender = useRef(true);

  const [windowWidth] = useWindowSize();

  const router = useRouter();

  useCardListLoader({
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
        <ul className={styles.cardContainer}>
          {Array.from(Array(24), (e, i) => {
            return <PokemonCardSkeleton key={i} />;
          })}
        </ul>
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
          {pokemonList && pokemonList[0].length >= POKEMON_PER_REQUEST && (
            <div ref={loader} />
          )}
        </>
      )}
    </>
  );
};

export default PokemonCardList;
