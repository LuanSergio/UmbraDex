/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';
import { useEffect, useRef, Fragment } from 'react';
import PokemonCard from '@components/molecules/PokemonCard';
import usePokemonList from '@hooks/usePokemonList';
import useController from './index.controller';

import styles from './styles.module.scss';

const PokemonCardList = (): JSX.Element => {
  const loader = useRef(null);
  const isFirstRender = useRef(true);
  const { pokemonList, setSize } = usePokemonList({ limit: 24 });

  const router = useRouter();

  useController({ loader, setSize });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const currentPokemonId =
        parseInt(sessionStorage.getItem('currentPokemonId'), 10) - 4;

      if (currentPokemonId) {
        router.replace({ hash: currentPokemonId.toString() });
      }
    }
  }, [router]);

  useEffect(() => {
    document.body.className = 'initial';
  }, []);

  return (
    <>
      <ol className={styles.cardContainer}>
        {pokemonList && (
          <>
            {pokemonList.map((list, index) => (
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
          </>
        )}
      </ol>
      <div ref={loader} />
    </>
  );
};

export default PokemonCardList;
