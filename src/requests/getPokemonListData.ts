import getPokemonImageUrl from '@utils/getPokemonImageUrl';
import graphqlClient from '@services/api';
import POKEMON_PER_REQUEST from '@data/pokemonPerRequest';
import formatQueryFilters from '@utils/formatQueryFilters';
import formatQuerySort from '@utils/formatQuerySort';
import checkIfPokemonHasType from '@utils/checkIfPokemonHasType';
import replaceDashWithSpace from '@utils/replaceDashWithSpace';

interface IFetchPokemonListParams {
  queryName?: string;
  page: number;
  search?: string;
  generationsFilter?: string[];
  primaryTypeFilter?: string[];
  secondaryTypeFilter?: string[];
  sortValue?: string;
}

async function fetchPokemonListData({
  queryName,
  page,
  search,
  primaryTypeFilter,
  secondaryTypeFilter,
  generationsFilter,
  sortValue,
}: IFetchPokemonListParams) {
  const filterQuery = formatQueryFilters({
    search,
    generation: generationsFilter,
    primaryType: primaryTypeFilter,
    secondaryType: secondaryTypeFilter,
  });
  const sortQuery = formatQuerySort(sortValue);
  const offset = page * POKEMON_PER_REQUEST;

  const query = `
    query ${queryName} {
      pokemonSpecieList: pokemon_v2_pokemonspecies(limit: ${POKEMON_PER_REQUEST}, offset: ${offset}, ${filterQuery} ${sortQuery}) {
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
    }
    
  `;

  const result = await graphqlClient.request(query);

  return result;
}

export default async function getPokemonListData({
  queryName,
  page,
  search,
  primaryTypeFilter,
  secondaryTypeFilter,
  generationsFilter,
  sortValue,
}: IFetchPokemonListParams): Promise<IBasicPokemonInfo[]> {
  const response = await fetchPokemonListData({
    queryName,
    page,
    search,
    primaryTypeFilter,
    secondaryTypeFilter,
    generationsFilter,
    sortValue,
  });

  const pokemonInfoArray = response.pokemonSpecieList.map(pokemonSpecies => {
    const pokemonForm = pokemonSpecies.pokemon.find(pokemon => {
      if (
        ((!primaryTypeFilter && !secondaryTypeFilter) ||
          (primaryTypeFilter.length === 0 &&
            secondaryTypeFilter.length === 0)) &&
        pokemon.isDefault
      ) {
        return true;
      }

      const types = pokemon?.types.map(item => item.type.name);
      if (
        `primaryTypeFilter` &&
        checkIfPokemonHasType(types, primaryTypeFilter, secondaryTypeFilter)
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
  });

  return pokemonInfoArray;
}
