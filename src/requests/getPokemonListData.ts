import getPokemonImageUrl from '@utils/getPokemonImageUrl';
import graphqlClient from '@services/api';
import POKEMON_PER_REQUEST from '@data/pokemonPerRequest';

interface IFetchPokemonListParams {
  queryName?: string;
  page: number;
  search?: string;
  generations?: string[];
  types?: string[];
}

async function fetchPokemonListData({
  queryName,
  page,
  search,
}: IFetchPokemonListParams) {
  const searchQuery =
    search.length > 0 ? `where: {name: {_regex: ${search}}}` : '';
  const offset = page * POKEMON_PER_REQUEST;

  const query = `
    query ${queryName} {
      ${`species: pokemon_v2_pokemonspecies(order_by: {id: asc}, limit: ${POKEMON_PER_REQUEST}, offset: ${offset}, ${searchQuery}
      )`} {
        name
        id
        information: pokemon_v2_pokemons {
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

  return result.species;
}

export default async function getPokemonListData({
  queryName,
  page,
  search,
}: IFetchPokemonListParams): Promise<IBasicPokemonInfo[]> {
  const responses = await fetchPokemonListData({ queryName, page, search });
  const pokemonInfoArray = [];
  responses.forEach(response => {
    const pokemonInfo: IBasicPokemonInfo = {
      id: response.id,
      name: response.name,
      types: response.information[0].types.map(item => item.type.name),
      image: getPokemonImageUrl(response.id),
    };

    pokemonInfoArray.push(pokemonInfo);
  });

  return pokemonInfoArray;
}
