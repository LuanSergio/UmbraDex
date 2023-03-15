import graphqlClient from '@services/api';

async function fetchTypeEfficacies(types: string[]) {
  const query = `
  query TypeEfficacies {
    pokemon_v2_type(where: {id: {_in: [${types.toString()}]}}) {
      id
      pokemon_v2_typeefficacies(where: {damage_factor: {_neq: 100}}) {
        damage_factor
        id
      }
    }
  }
  `;

  const result = await graphqlClient.request(query);

  return result;
}

export default async function getTypeEfficacies(
  types: string[],
): Promise<string[]> {
  const response = await fetchTypeEfficacies(types);

  const typeEfficacies = response.pokemon_v2_type;

  return typeEfficacies;
}
