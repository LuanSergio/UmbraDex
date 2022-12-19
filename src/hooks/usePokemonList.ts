import getPokemonListData from '@requests/getPokemonListData';
import useSWRInfinite from 'swr/infinite';

interface IFilterOptions {
  generation?: string[];
  type?: string[];
}

interface IUsePokemonListParams {
  fallback?: IBasicPokemonInfo[][];
  search?: string;
  filterValues?: IFilterOptions;
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
  filterValues,
  search = '',
}: IUsePokemonListParams): IUsePokemonListResponse {
  const { generation, type } = filterValues;

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return [`pokemonList`, pageIndex, search, generation, type];
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    (key, page, searchKey, generationKey, typeKey) =>
      getPokemonListData({
        queryName: key,
        page,
        search: searchKey,
        generations: generationKey,
        types: typeKey,
      }),
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
