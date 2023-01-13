export default function checkIfPokemonHasType(pokemonTypes, typeList): boolean {
  return pokemonTypes.some(item => typeList.includes(item));
}
