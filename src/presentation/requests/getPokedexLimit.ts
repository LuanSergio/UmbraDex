import graphqlClient from '@clients/api';

async function fetchPokedexLimit() {
  const query = `
  query PokemonDetails {
    pokemon_v2_pokedex(where: {name: {_eq: "national"}}) {
      pokemon_v2_pokemondexnumbers(order_by: {pokedex_number: desc}, limit: 1) {
        pokedex_number
      }
    }
  }  
  `;

  const result = await graphqlClient.request(query);

  return result;
}

export default async function getPokedexLimit(): Promise<number> {
  const response = await fetchPokedexLimit();

  const pokedexLimit =
    response.pokemon_v2_pokedex[0].pokemon_v2_pokemondexnumbers[0]
      .pokedex_number;

  return pokedexLimit;
}
