export default function checkIfPokemonHasType(
  pokemonTypes,
  primaryTypeList,
  secondaryTypeList,
): boolean {
  if (secondaryTypeList.length > 0) {
    return (
      pokemonTypes.some(item => primaryTypeList.includes(item)) &&
      pokemonTypes.some(item => secondaryTypeList.includes(item))
    );
  }
  return pokemonTypes.some(item => primaryTypeList.includes(item));
}
