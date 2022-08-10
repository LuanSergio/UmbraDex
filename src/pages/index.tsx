import Head from 'next/head';
import DefaultLayout from '@components/layouts/DefaultLayout';
import { GetStaticProps } from 'next';
import PokemonCardList from '@components/organism/PokemonCardList';
import getPokemonListData from '@requests/getPokemonListData';
import { SWRConfig } from 'swr';

const Home = ({ fallback }): JSX.Element => {
  return (
    <div>
      <Head>
        <title>UmbraDex</title>
      </Head>
      <DefaultLayout>
        <SWRConfig value={fallback}>
          <PokemonCardList />
        </SWRConfig>
      </DefaultLayout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pokemonList = await getPokemonListData({});

  return {
    props: {
      fallback: {
        'pokemon_v2_pokemonspecies(order_by: {id: asc}, limit: 24, offset: 24)':
          pokemonList,
      },
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;
