import graphqlClient from '@services/api';

async function fetchPokemonTypes() {
  const query = `
    query PokemonType {
      pokemon_v2_type {
        id
        name
      }
    }
  `;

  const result = await graphqlClient.request(query);

  return result;
}

export default async function getPokemonTypes(): Promise<IPokemonType[]> {
  const response = await fetchPokemonTypes();

  const pokemonTypes = response.pokemon_v2_type;

  return pokemonTypes;
}
