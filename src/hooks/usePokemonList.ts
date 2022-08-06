import getPokemonListData from '@requests/getPokemonListData';
import useSWRInfinite from 'swr/infinite';

interface IUsePokemonListParams {
  limit?: number;
}

interface IUsePokemonListReponse {
  pokemonList: IBasicPokemonInfo[][];
  isLoading: boolean;
  size: number;
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<IBasicPokemonInfo[][]>;
}

export default function usePokemonList({
  limit,
}: IUsePokemonListParams): IUsePokemonListReponse {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `species: pokemon_v2_pokemonspecies(order_by: {id: asc}, limit: ${limit}, offset: ${
      pageIndex * limit
    })`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, url =>
    getPokemonListData({ url }),
  );

  return {
    pokemonList: data,
    isLoading: !error && !data,
    size,
    setSize,
  };
}
