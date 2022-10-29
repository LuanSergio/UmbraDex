import getPokemonListData from '@requests/getPokemonListData';
import useSWRInfinite from 'swr/infinite';

interface IUsePokemonListParams {
  fallback?: IBasicPokemonInfo[][];
  search?: string;
}

interface IUsePokemonListResponse {
  pokemonList: IBasicPokemonInfo[][];
  isLoading: boolean;
  size: number;
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<IBasicPokemonInfo[][]>;
}

export default function usePokemonList({
  fallback,
  search = '',
}: IUsePokemonListParams): IUsePokemonListResponse {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return [`pokemonList`, pageIndex, search];
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    (key, page, searchKey) =>
      getPokemonListData({ queryName: key, page, search: searchKey }),
    {
      fallbackData: fallback,
    },
  );

  return {
    pokemonList: data,
    isLoading: !error && !data,
    size,
    setSize,
  };
}
