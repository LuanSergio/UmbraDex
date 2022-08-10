import getPokemonImageUrl from '@utils/getPokemonImageUrl';
import graphqlClient from '@services/api';

interface IPaginationParams {
  url?: string;
}

async function fetchPokemonListData({ url }: IPaginationParams) {
  const query = `
    query pokemonList {
      ${url || 'species: pokemon_v2_pokemonspecies(order_by: {id: asc})'} {
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
  url,
}: IPaginationParams): Promise<IBasicPokemonInfo[]> {
  const responses = await fetchPokemonListData({ url });
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
