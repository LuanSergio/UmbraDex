import getPokemonImageUrl from '@utils/getPokemonImageUrl';
import graphqlClient from '@services/api';
import POKEMON_PER_REQUEST from '@data/pokemonPerRequest';
import formatQueryFilters from '@utils/formatQueryFilters';
import formatQuerySort from '@utils/formatQuerySort';

interface IFetchPokemonListParams {
  queryName?: string;
  page: number;
  search?: string;
  generationsFilter?: string[];
  typesFilter?: string[];
  sortValue?: string;
}

async function fetchPokemonListData({
  queryName,
  page,
  search,
  typesFilter,
  generationsFilter,
  sortValue,
}: IFetchPokemonListParams) {
  const filterQuery = formatQueryFilters({
    search,
    generation: generationsFilter,
    type: typesFilter,
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
            isDefault: is_default
            formId: pokemon_id
          }
          types: pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              name
            }
          }
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
  typesFilter,
  generationsFilter,
  sortValue,
}: IFetchPokemonListParams): Promise<IBasicPokemonInfo[]> {
  const response = await fetchPokemonListData({
    queryName,
    page,
    search,
    typesFilter,
    generationsFilter,
    sortValue,
  });
  const pokemonInfoArray = [];
  response.pokemonSpecieList.forEach(pokemonSpecies => {
    const pokemonInfo: IBasicPokemonInfo = {
      id: pokemonSpecies.id,
      forms: pokemonSpecies.pokemon.map(pokemon => {
        return {
          name: pokemon.forms[0].name,
          types: pokemon.types.map(item => item.type.name),
          isDefault: pokemon.forms[0].isDefault ?? false,
          image: getPokemonImageUrl(pokemon.forms[0].formId),
        };
      }),
    };

    pokemonInfoArray.push(pokemonInfo);
  });

  return pokemonInfoArray;
}
