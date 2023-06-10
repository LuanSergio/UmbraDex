import { Either, right, left } from '@core/Either';
import IHttpClient from '@services/http/IHttpClient';

import PokemonRepository, {
  GetAllParams,
} from '@domain/repository/PokemonRepository';
import PokemonSummary from '@domain/entities/PokemonSummary';
import Pokemon from '@domain/entities/Pokemon';
import {
  GetPokemonByIdResponse,
  GetAllPokemonResponse,
} from '@data/responses/PokemonResponses';

import formatQueryFilters from '@data/format/formatQueryFilters';
import formatQuerySort from '@data/format/formatQuerySort';
import formatPokemonDetailsDescription from '@data/format/formatPokemonDetailsDescription';
import checkIfPokemonHasType from '@utils/checkIfPokemonHasType';
import replaceDashWithSpace from '@utils/replaceDashWithSpace';
import getPokemonImageUrl from '@utils/getPokemonImageUrl';
import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';

interface GetAllPokemonQueryParams {
  queryName?: string;
  page: number;
  search?: string;
  generationsFilter?: string[];
  primaryTypeFilter?: string[];
  secondaryTypeFilter?: string[];
  sortValue?: string;
  pokemonPerRequest: number;
}

export default class PokemonData implements PokemonRepository {
  private readonly getAllPokemonQuery = ({
    queryName,
    page,
    search,
    primaryTypeFilter,
    secondaryTypeFilter,
    generationsFilter,
    sortValue,
    pokemonPerRequest,
  }: GetAllPokemonQueryParams) => {
    const filterQuery = formatQueryFilters({
      search,
      generation: generationsFilter,
      primaryType: primaryTypeFilter,
      secondaryType: secondaryTypeFilter,
    });

    const sortQuery = formatQuerySort(sortValue);
    const offset = page * pokemonPerRequest;

    return `
      query ${queryName} {
        pokemonSpecieList: pokemon_v2_pokemonspecies(limit: ${pokemonPerRequest}, offset: ${offset}, ${filterQuery} ${sortQuery}) {
          id
          pokemon: pokemon_v2_pokemons {
            forms: pokemon_v2_pokemonforms {
              name
              formId: pokemon_id
            }
            types: pokemon_v2_pokemontypes {
              type: pokemon_v2_type {
                name
              }
            }
            isDefault: is_default
          }
        }
        pokemon_v2_pokedex(where: {name: {_eq: "national"}}) {
          pokemon_v2_pokemondexnumbers(order_by: {pokedex_number: desc}, limit: 1) {
            pokedex_number
          }
        }
      }`;
  };

  private readonly pokemonByIdQuery = id => `
  query PokemonDetails {
    pokedex: pokemon_v2_pokedex(where: {name: {_eq: "national"}}) {
      pokedexNumbers: pokemon_v2_pokemondexnumbers(order_by: {pokedex_number: desc}, limit: 1) {
        number: pokedex_number
      }
    }
    species: pokemon_v2_pokemonspecies(where: {id: {_eq: ${id} }}) {
      pokemon: pokemon_v2_pokemons {
        name
        isDefault: is_default
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
        pokemonForms: pokemon_v2_pokemonforms {
          formName: form_name
          formOrder: form_order
          id: pokemon_id
          pokemonDetails: pokemon_v2_pokemon {
            stats: pokemon_v2_pokemonstats {
              statValue: base_stat
              stat: pokemon_v2_stat {
                name
              }
            }
            weight
            height
            abilities: pokemon_v2_pokemonabilities {
              ability: pokemon_v2_ability {
                name
              }
            }
          }
          groupVersion: version_group_id
        }
      }
      specieName:pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 1}}) {
        name
      }
      flavorTexts: pokemon_v2_pokemonspeciesflavortexts(where: {pokemon_v2_version: {name: {_in: ["red", "silver", "ruby", "diamond", "white", "x", "moon", "sword"]}}, _and: {language_id: {_eq: 9}}}) {
        id
        flavorText:flavor_text
        versionId: version_id
      }
      evolutionChain: pokemon_v2_evolutionchain {
        specie: pokemon_v2_pokemonspecies {
          id
          name
          order
        }
      }
      generationId: generation_id
    }
  }  
`;

  constructor(private readonly client: IHttpClient) {}

  async getAll(params: GetAllParams): Promise<Either<Error, PokemonSummary[]>> {
    try {
      const result = await this.client.request<GetAllPokemonResponse>({
        query: this.getAllPokemonQuery(params),
      });

      const pokemonSummaryList = result.body.pokemonSpecieList.map(
        pokemonSpecies => {
          const pokemonForm = pokemonSpecies.pokemon.find(pokemon => {
            if (
              ((!params.primaryTypeFilter && !params.secondaryTypeFilter) ||
                (params.primaryTypeFilter.length === 0 &&
                  params.secondaryTypeFilter.length === 0)) &&
              pokemon.isDefault
            ) {
              return true;
            }

            const types = pokemon?.types.map(item => item.type.name);
            if (
              `primaryTypeFilter` &&
              checkIfPokemonHasType(
                types,
                params.primaryTypeFilter,
                params.secondaryTypeFilter,
              )
            ) {
              return true;
            }

            return false;
          });

          return {
            types: pokemonForm?.types.map(item => item.type.name),
            isDefault: pokemonForm?.isDefault,
            name: replaceDashWithSpace(pokemonForm.forms[0].name),
            image: getPokemonImageUrl(pokemonForm?.forms[0].formId),
            id: pokemonSpecies.id,
          };
        },
      );

      return right(pokemonSummaryList);
    } catch (error) {
      return left(error);
    }
  }

  async getById(id: number): Promise<Either<Error, Pokemon>> {
    try {
      const result = await this.client.request<GetPokemonByIdResponse>({
        query: this.pokemonByIdQuery(id),
      });

      const pokemon = {
        pokedexLimit: result.body.pokedex[0].pokedexNumbers[0].number,
        forms: result.body.species[0].pokemon.map(form => {
          return {
            id: form.pokemonForms[0].id,
            name: transformFirstLetterToUppercase(
              replaceDashWithSpace(form.name),
            ),
            isDefault: form.isDefault,
            types: form.types.map(type => {
              return type.type.name;
            }),
            formName: form.pokemonForms[0].formName,
            formOrder: form.pokemonForms[0].formOrder,
            height: form.pokemonForms[0].pokemonDetails.height,
            weight: form.pokemonForms[0].pokemonDetails.weight,
            groupVersion: form.pokemonForms[0].groupVersion,
            abilities: form.pokemonForms[0].pokemonDetails.abilities.map(
              item => item.ability.name,
            ),
            stats: form.pokemonForms[0].pokemonDetails.stats.map(stats => {
              return {
                name: stats.stat.name,
                value: stats.statValue,
              };
            }),
            image: getPokemonImageUrl(form.pokemonForms[0].id),
          };
        }),
        japaneseName: result.body.species[0].specieName[0].name,

        descriptions: result.body.species[0].flavorTexts.map(item => ({
          id: item.id,
          description: formatPokemonDetailsDescription(item.flavorText),
          gameVersion: item.id,
        })),
        evolutionChain: result.body.species[0].evolutionChain.specie,
      };

      return right(pokemon);
    } catch (error) {
      return left(error);
    }
  }
}
