import getPokemonImageUrl from '@utils/getPokemonImageUrl';
import graphqlClient from '@services/api';

const POKEMON_PER_REQUEST = 48;

interface IPaginationParams {
  queryName?: string;
  page;
}

async function fetchPokemonListData({ queryName, page }: IPaginationParams) {
  const query = `
    query ${queryName} {
      ${`species: pokemon_v2_pokemonspecies(order_by: {id: asc}, limit: ${POKEMON_PER_REQUEST}, offset: ${
        page * POKEMON_PER_REQUEST
      })`} {
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
    }
  `;

  const result = await graphqlClient.request(query);

  return result.species;
}

export default async function getPokemonListData({
  queryName,
  page,
}: IPaginationParams): Promise<IBasicPokemonInfo[]> {
  const responses = await fetchPokemonListData({ queryName, page });
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
