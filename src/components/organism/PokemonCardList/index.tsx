/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';
import { useEffect, useRef, Fragment } from 'react';

import { useSearchContext } from '@contexts/SearchContext';
import PokemonCard from '@components/molecules/PokemonCard';
import usePokemonList from '@hooks/usePokemonList';
import useWindowSize from '@hooks/useWindowSize';
import useCardListLoader from './useCardListLoader';

import styles from './styles.module.scss';

interface IPokemonCardListProps {
  fallback?: IBasicPokemonInfo[][];
}

const PokemonCardList = ({ fallback }: IPokemonCardListProps): JSX.Element => {
  const { searchValue } = useSearchContext();
  const loader = useRef(null);
  const isFirstRender = useRef(true);

  const { pokemonList, setSize } = usePokemonList({
    fallback: searchValue.length ? undefined : fallback,
    search: searchValue,
  });
  const [windowWidth] = useWindowSize();

  const router = useRouter();

  useCardListLoader({ loader, setSize, shouldUpdate: !searchValue.length });

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
      <ol className={styles.cardContainer}>
        {pokemonList?.map((list, index) => (
          <Fragment key={index}>
            {list.map(pokemon => (
              <li key={pokemon.id}>
                <PokemonCard
                  id={pokemon.id}
                  name={pokemon.name}
                  types={pokemon.types}
                  image={pokemon.image}
                />
              </li>
            ))}
          </Fragment>
        ))}
      </ol>
      <div ref={loader} />
    </>
  );
};

export default PokemonCardList;
