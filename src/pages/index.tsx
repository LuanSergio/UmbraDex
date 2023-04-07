// eslint-disable-next-line camelcase
import { unstable_serialize } from 'swr';
import { useEffect } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';

import DefaultLayout from '@layouts/DefaultLayout';
import PokemonCardList from '@components/PokemonCardList';
import getPokemonListData from '@requests/getPokemonListData';
import { PokemonListContextProvider } from '@contexts/PokemonListContext';
import bodyDefaultClasses from '@data/bodyDefaultClasses';
import getPokedexLimit from '@requests/getPokedexLimit';
import getGenerations from '@requests/getGenerations';
import getPokemonTypes from '@requests/getPokemonTypes';

const Home = ({ fallback, staticData }): JSX.Element => {
  function getPokemonFallbackList(): IBasicPokemonInfo[][] {
    return Object.values(fallback)[0] as IBasicPokemonInfo[][];
  }

  useEffect(() => {
    document.body.className = `initial ${bodyDefaultClasses}`;
  }, []);

  return (
    <div>
      <Head>
        <title>UmbraDex</title>
      </Head>
      <PokemonListContextProvider
        fallback={getPokemonFallbackList()}
        staticData={staticData}
      >
        <DefaultLayout>
          <PokemonCardList />
        </DefaultLayout>
      </PokemonListContextProvider>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryName = 'pokemonList';
  const pokedexLimit = await getPokedexLimit();
  const generations = await getGenerations();
  const pokemonTypes = await getPokemonTypes();
  const staticData = {
    pokedexLimit,
    generations,
    pokemonTypes,
  };

  const pokemonList = await getPokemonListData({
    queryName,
    page: 0,
    search: '',
  });

  return {
    props: {
      fallback: {
        [unstable_serialize([queryName, 1])]: [pokemonList],
      },
      staticData,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;
