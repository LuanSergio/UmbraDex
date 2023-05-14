import PokemonType from '@domain/entities/PokemonType';

interface GetTypeById {
  id: number;
  typesList: PokemonType[];
}

export default function getTypeById({
  id,
  typesList,
}: GetTypeById): PokemonType {
  const type = typesList.find(item => item.id === id);

  return type;
}
