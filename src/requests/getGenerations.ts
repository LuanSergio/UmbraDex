import graphqlClient from '@services/api';

async function fetchGenerations() {
  const query = `
    query PokemonGeneration {
      pokemon_v2_generation {
        id
        name
    }
  }
`;

  const result = await graphqlClient.request(query);

  return result;
}

export default async function getGenerations(): Promise<IGeneration[]> {
  const response = await fetchGenerations();

  const generations = response.pokemon_v2_generation;

  return generations;
}
