import graphqlClient from '@clients/api';
import formatTypeEfficiency from '@utils/formatTypeEfficiency';

interface ITypeEfficaciesResponse {
  name: string;
  efficacies: [
    {
      damageFactor: number;
      typeId: number;
    },
  ];
}

async function fetchTypeEfficacies(types: number[]) {
  const query = `
  query TypeEfficacies {
    typeEfficacies: pokemon_v2_type {
      name
      efficacies: pokemon_v2_typeefficacies(where: {damage_factor: {_neq: 100}, target_type_id: {_in: [${types.toString()}]}}) {
        damageFactor: damage_factor
        typeId: target_type_id
      }
    }
  }
  
  
  `;

  const result = await graphqlClient.request(query);

  return result;
}

export default async function getTypeEfficacies(
  types: number[],
): Promise<PokemonTypeEfficiency> {
  const response = await fetchTypeEfficacies(types);

  const { typeEfficacies } = response;

  return formatTypeEfficiency(typeEfficacies);
}
