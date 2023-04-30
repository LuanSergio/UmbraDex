import transformFirstLetterToUppercase from '@helpers/transformFirstLetterToUppercase';
import getPokemonImageUrl from '@helpers/getPokemonImageUrl';
import graphqlClient from '@clients/api';
import replaceDashWithSpace from '@helpers/replaceDashWithSpace';

interface GetPokemonDetailsDataResponse {
  pokedexLimit: number;
  forms: IPokemonForm[];
  japaneseName: string;
  descriptions: IPokemonDescription[];
  evolutionChain: IPokemonEvolution[];
}

async function fetchPokemonDetailsData(id: number) {
  const query = `
    query PokemonDetails {
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
              weight
              height
            }
          }
          pokemon_v2_pokemonabilities {
            pokemon_v2_ability {
              name
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
        generation_id
      }
    }  
  `;

  const result = await graphqlClient.request(query);

  return result;
}

export default async function getPokemonDetailsData(
  id: number,
): Promise<GetPokemonDetailsDataResponse> {
  const response = await fetchPokemonDetailsData(id);

  function formatPokemonDescription(description) {
    return description.replace('\f', ' ').replace('POKéMON', 'Pokémon');
  }

  // Map graphql response
  const pokemonDetails: GetPokemonDetailsDataResponse = {
    pokedexLimit: response.pokedex.pokedexNumbers[0].number,
    forms: response.species[0].pokemon.map(form => {
      return {
        id: form.pokemonForms[0].formId,
        name: transformFirstLetterToUppercase(replaceDashWithSpace(form.name)),
        isDefault: form.isDefault,
        types: form.types.map(type => {
          return type.type.name;
        }),
        formName: form.pokemonForms[0].form_name,
        formOrder: form.pokemonForms[0].form_order,
        height: form.pokemonForms[0].pokemonDetails.height,
        weight: form.pokemonForms[0].pokemonDetails.weight,
        stats: form.pokemonForms[0].pokemonDetails.stats.map(stats => {
          return {
            name: stats.stat.name,
            value: stats.statValue,
          };
        }),
        image: getPokemonImageUrl(form.pokemonForms[0].id),
      };
    }),
    japaneseName: response.species.specieName[0].name,

    descriptions: response.species.flavorTexts.map(item => ({
      id: item.id,
      description: formatPokemonDescription(item.flavor_text),
      gameVersion: item.version_id,
    })),
    evolutionChain: response.species[0].evolutionChain.specie,
  };

  return pokemonDetails;
}
