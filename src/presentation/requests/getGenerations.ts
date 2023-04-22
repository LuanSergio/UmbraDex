import graphqlClient from '@clients/api';
import Generation from '@domain/entities/Generation';

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

export default async function getGenerations(): Promise<Generation[]> {
  const response = await fetchGenerations();

  const generations = response.pokemon_v2_generation;

  return generations;
}
