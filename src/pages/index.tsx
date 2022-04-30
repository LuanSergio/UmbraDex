import Head from 'next/head';
import DefaultLayout from '@components/layouts/DefaultLayout';
import { GetStaticProps } from 'next';
import PokemonCardList from '@components/organism/PokemonCardList';
import getPokemonListData from '@requests/getPokemonListData';

interface HomeProps {
  pokemonList: IBasicPokemonInfo[];
}

const Home = ({ pokemonList }: HomeProps): JSX.Element => {
  return (
    <div>
      <Head>
        <title>UmbraDex</title>
      </Head>
      <DefaultLayout>
        <PokemonCardList pokemonList={pokemonList} />
      </DefaultLayout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pokemonList = await getPokemonListData();

  return {
    props: {
      pokemonList,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;
