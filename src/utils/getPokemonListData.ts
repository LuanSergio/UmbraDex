import { apiUrl, axios } from '@services/api';
import {
  pokemonArtworkImages,
  pokemonArtworkUploadedQuantity,
} from '@data/imagesRoutes';

async function fetchPokemonListData() {
  const result = await axios.post(apiUrl, {
    query: `
          query samplePokeAPIquery {
            species: pokemon_v2_pokemonspecies(order_by: {id: asc}) {
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
        `,
  });

  return result.data.data.species;
}

export default async function getPokemonListData(): Promise<
  IBasicPokemonInfo[]
> {
  const responses = await fetchPokemonListData();
  const pokemonInfoArray = [];

  responses.forEach(response => {
    const pokemonInfo: IBasicPokemonInfo = {
      id: response.id,
      name: response.name,
      types: response.information[0].types.map(item => item.type.name),
      image:
        pokemonArtworkUploadedQuantity >= response.id
          ? `${pokemonArtworkImages.main}/${response.id}.png`
          : `${pokemonArtworkImages.fallback}/${response.id}.png`,
    };

    pokemonInfoArray.push(pokemonInfo);
  });

  return pokemonInfoArray;
}
