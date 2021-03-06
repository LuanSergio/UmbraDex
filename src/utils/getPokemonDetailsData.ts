import { apiUrl, axios } from '@services/api';
import {
  pokemonArtworkImages,
  pokemonArtworkUploadedQuantity,
} from '@data/imagesRoutes';
import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';

interface GetPokemonDetailsDataResponse {
  pokedexLimit: number;
  forms: PokemonForm[];
  japaneseName: string;
  descriptions: PokemonDescription[];
  evolutionChain: PokemonEvolution[];
}

async function fetchPokemonDetailsData(id: number) {
  const result = await axios.post(apiUrl, {
    query: `
    query PokemonSpecies {
      pokemon_v2_pokedex(where: {name: {_eq: "national"}}) {
        pokemon_v2_pokemondexnumbers(order_by: {pokedex_number: desc}, limit: 1) {
          pokedex_number
        }
      }
      pokemon_v2_pokemonspecies(where: {id: {_eq: ${id}}}) {
        pokemon_v2_pokemons {
          name
          is_default
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
          pokemon_v2_pokemonforms {
            form_name
            form_order
            pokemon_id
            pokemon_v2_pokemon {
              pokemon_v2_pokemonstats {
                base_stat
                pokemon_v2_stat {
                  name
                }
              }
            }
          }
        }
        pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 1}}) {
          name
        }
        pokemon_v2_pokemonspeciesflavortexts(where: {pokemon_v2_version: {name: {_in: ["red", "silver", "ruby", "diamond", "white", "x", "moon", "sword"]}}, _and: {language_id: {_eq: 9}}}) {
          id
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
          pokemon_v2_movedamageclass {
            name
          }
          pokemon_v2_moveeffect {
            pokemon_v2_moveeffecteffecttexts {
              short_effect
              effect
            }
          }
        }
      }
    }
    
    `,
  });

  return result.data.data;
}

export default async function getPokemonDetailsData(
  id: number,
): Promise<GetPokemonDetailsDataResponse> {
  const response = await fetchPokemonDetailsData(id);

  function formatPokemonDescription(description) {
    return description.replace('\f', ' ').replace('POK??MON', 'Pok??mon');
  }

  // Map graphql response
  const pokemonDetails: GetPokemonDetailsDataResponse = {
    pokedexLimit:
      response.pokemon_v2_pokedex[0].pokemon_v2_pokemondexnumbers[0]
        .pokedex_number,
    forms: response.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons.map(
      form => {
        return {
          id: form.pokemon_v2_pokemonforms[0].pokemon_id,
          name: transformFirstLetterToUppercase(form.name),
          isDefault: form.is_default,
          types: form.pokemon_v2_pokemontypes.map(type => {
            return type.pokemon_v2_type.name;
          }),
          formName: form.pokemon_v2_pokemonforms[0].form_name,
          formOrder: form.pokemon_v2_pokemonforms[0].form_order,
          stats: form.pokemon_v2_pokemonforms[0].pokemon_v2_pokemon.pokemon_v2_pokemonstats.map(
            stats => {
              return {
                name: stats.pokemon_v2_stat.name,
                value: stats.base_stat,
              };
            },
          ),
          image:
            pokemonArtworkUploadedQuantity >=
            form.pokemon_v2_pokemonforms[0].pokemon_id
              ? `${pokemonArtworkImages.main}/${form.pokemon_v2_pokemonforms[0].pokemon_id}.png`
              : `${pokemonArtworkImages.fallback}/${form.pokemon_v2_pokemonforms[0].pokemon_id}.png`,
        };
      },
    ),
    japaneseName:
      response.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesnames[0]
        .name,

    descriptions: response.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts.map(
      item => ({
        id: item.id,
        description: formatPokemonDescription(item.flavor_text),
        gameVersion: item.version_id,
      }),
    ),
    evolutionChain:
      response.pokemon_v2_pokemonspecies[0].pokemon_v2_evolutionchain
        .pokemon_v2_pokemonspecies,
  };

  return pokemonDetails;
}
