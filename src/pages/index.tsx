import Head from 'next/head';
import HomeLayout from '@components/layouts/HomeLayout';
import { GetStaticProps } from 'next';
import { apiUrl, api } from 'src/services/api';
import axios from 'axios';
import pLimit from 'p-limit';

const Home = ({ pokemonList }): JSX.Element => {
  return (
    <div>
      <Head>
        <title>UmbraDex</title>
      </Head>
      <HomeLayout pokemonList={pokemonList} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const limit = pLimit(50);
  async function getAvailablePokemonQuantity(): Promise<number> {
    const response = await api.get('pokedex/1/');
    return response.data.pokemon_entries.length;
  }

  async function fetchPokemonData() {
    const quantity = await getAvailablePokemonQuantity();
    const pokemonUrlList = [];

    for (let i = 1; i <= quantity; i++) {
      const url = `${apiUrl}pokemon/${i}/`;
      pokemonUrlList.push(url);
    }

    function fetchData(url: string) {
      return axios.get(url);
    }

    const promises = pokemonUrlList.map(url => limit(() => fetchData(url)));
    const responses = await axios.all(promises);

    return responses;
  }

  async function getPokemonDataList(): Promise<IPokemonData[]> {
    const responses = await fetchPokemonData();
    const pokemonDataArray = [];

    responses.forEach(response => {
      const pokemonData: IPokemonData = {
        id: response.data.id,
        name: response.data.name,
        types: response.data.types.map(item => item.type.name),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`,
      };

      pokemonDataArray.push(pokemonData);
    });

    return pokemonDataArray;
  }

  const pokemonList = await getPokemonDataList();

  return {
    props: {
      pokemonList,
    },
  };
};

export default Home;
