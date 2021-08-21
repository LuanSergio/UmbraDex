import { apiUrl, axios } from '@services/graphqlApi';
import {
  pokemonArtworkImages,
  pokemonArtworkUploadedQuantity,
} from '@data/imagesRoutes';
import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';

async function fetchPokemonDetailsData(id: number) {
  const result = await axios.post(apiUrl, {
    query: `
      query PokemonSpecies {
        pokemon_v2_pokemonspecies(where: {id: {_eq: ${id}}}) {
          name
          pokemon_v2_pokemons {
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
          }
          pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: ${id}}}) {
            name
          }
          pokemon_v2_pokemonspeciesflavortexts(where: {pokemon_v2_version: {name: {_in: ["red", "silver", "ruby", "diamond", "white", "x", "moon", "sword"]}}, _and: {language_id: {_eq: 9}, _and: {_and: {}}}}) {
            flavor_text
            version_id
          }
          pokemon_v2_evolutionchain {
            pokemon_v2_pokemonspecies {
              id
              name
              order
            }
          }
        }
        pokemon_v2_pokemonmove(where: {pokemon_id: {_eq: ${id}}}) {
          level
          pokemon_v2_move {
            name
            id
            accuracy
            move_effect_chance
            move_effect_id
            power
            pp
            priority
            type_id
            move_damage_class_id
          }
        }
        pokemon_v2_pokemontype(where: {id: {_eq: ${id}}}) {
          pokemon_v2_pokemon {
            pokemon_v2_pokemonstats {
              base_stat
              pokemon_v2_stat {
                name
              }
            }
          }
        }
      }`,
  });

  return result.data.data;
}

export default async function getPokemonDetailsData(
  id: number,
): Promise<IPokemonDetails> {
  const response = await fetchPokemonDetailsData(id);

  function formatPokemonDescription(description) {
    return description.replace('\f', ' ').replace('POKéMON', 'Pokémon');
  }

  // Map graphql response
  const pokemonDetails: IPokemonDetails = {
    id,
    name: transformFirstLetterToUppercase(
      response.pokemon_v2_pokemonspecies[0].name,
    ),
    types: response.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(
      item => item.pokemon_v2_type.name,
    ),
    originalName:
      response.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesnames[0]
        .name,
    image:
      pokemonArtworkUploadedQuantity >= id
        ? `${pokemonArtworkImages.main}/${id}.png`
        : `${pokemonArtworkImages.fallback}/${id}.png`,
    descriptions: response.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts.map(
      item => ({
        description: formatPokemonDescription(item.flavor_text),
        gameVersion: item.version_id,
      }),
    ),
    evolutionChain:
      response.pokemon_v2_pokemonspecies[0].pokemon_v2_evolutionchain
        .pokemon_v2_pokemonspecies,
    stats: response.pokemon_v2_pokemontype[0].pokemon_v2_pokemon.pokemon_v2_pokemonstats.map(
      item => ({ name: item.pokemon_v2_stat.name, value: item.base_stat }),
    ),
  };

  return pokemonDetails;
}
