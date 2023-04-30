export default function formatPokemonDetailsDescription(description) {
  return description.replace('\f', ' ').replace('POKéMON', 'Pokémon');
}
