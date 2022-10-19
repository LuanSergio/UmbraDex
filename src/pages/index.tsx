import Head from 'next/head';
import { GetStaticProps } from 'next';
// eslint-disable-next-line camelcase
import { unstable_serialize } from 'swr';

import DefaultLayout from '@components/layouts/DefaultLayout';
import PokemonCardList from '@components/organism/PokemonCardList';
import getPokemonListData from '@requests/getPokemonListData';
import { useEffect } from 'react';

const Home = ({ fallback }): JSX.Element => {
  function getPokemonFallbackList(): IBasicPokemonInfo[][] {
    return Object.values(fallback)[0] as IBasicPokemonInfo[][];
  }

  useEffect(() => {
    document.body.className = 'initial';
  }, []);

  return (
    <div>
      <Head>
        <title>UmbraDex</title>
      </Head>
      <DefaultLayout>
        <PokemonCardList fallback={getPokemonFallbackList()} />
      </DefaultLayout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryName = 'pokemonList';
  const pokemonList = await getPokemonListData({
    queryName,
    page: 0,
  });

  return {
    props: {
      fallback: {
        [unstable_serialize([queryName, 1])]: [pokemonList],
      },
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;
