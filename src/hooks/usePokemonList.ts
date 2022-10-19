import getPokemonListData from '@requests/getPokemonListData';
import useSWRInfinite from 'swr/infinite';

interface IUsePokemonListParams {
  limit?: number;
  fallback?: IBasicPokemonInfo[][];
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
  fallback,
}: IUsePokemonListParams): IUsePokemonListReponse {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return [`pokemonList`, pageIndex];
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    (key, page) => getPokemonListData({ queryName: key, page }),
    {
      fallbackData: fallback,
      fallback,
    },
  );

  return {
    pokemonList: data,
    isLoading: !error && !data,
    size,
    setSize,
  };
}
