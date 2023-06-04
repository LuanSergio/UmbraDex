import PokemonType from '@domain/entities/PokemonType';

interface GetTypeByName {
  name: string;
  typesList: PokemonType[];
}

export default function getTypeByName({
  name,
  typesList,
}: GetTypeByName): PokemonType {
  const type = typesList.find(item => item.name === name);

  return type;
}
