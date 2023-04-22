interface IGetTypeByName {
  name: string;
  typesList: IPokemonType[];
}

export default function getTypeByName({
  name,
  typesList,
}: IGetTypeByName): IPokemonType {
  const type = typesList.find(item => item.name === name);

  return type;
}
