import Head from 'next/head';
import DefaultLayout from '@components/layouts/DefaultLayout';
import { GetStaticProps } from 'next';
import { apiUrl, axios } from '@services/graphqlApi';
import PokemonCardList from '@components/organism/PokemonCardList';

interface HomeProps {
  pokemonList: IPokemonData[];
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
  async function fetchPokemonListData() {
    const result = await axios.post(apiUrl, {
      query: `
            query samplePokeAPIquery {
              species: pokemon_v2_pokemonspecies(order_by: {id: asc}) {
                name
                id
                information: pokemon_v2_pokemons {
                  types: pokemon_v2_pokemontypes {
                    type: pokemon_v2_type {
                      name
                    }
                  }
                }
              }
            }
          `,
    });

    return result.data.data.species;
  }

  async function getPokemonListData(): Promise<IPokemonData[]> {
    const responses = await fetchPokemonListData();
    const pokemonDataArray = [];

    responses.forEach(response => {
      const pokemonData: IPokemonData = {
        id: response.id,
        name: response.name,
        types: response.information[0].types.map(item => item.type.name),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`,
      };

      pokemonDataArray.push(pokemonData);
    });

    return pokemonDataArray;
  }

  const pokemonList = await getPokemonListData();

  return {
    props: {
      pokemonList,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;
