interface IGetTypeById {
  id: number;
  typesList: IPokemonType[];
}

export default function getTypeById({
  id,
  typesList,
}: IGetTypeById): IPokemonType {
  const type = typesList.find(item => item.id === id);

  return type;
}
