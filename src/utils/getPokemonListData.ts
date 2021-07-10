import { apiUrl, axios } from '@services/graphqlApi';

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

export default async function getPokemonListData(): Promise<IPokemonData[]> {
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
