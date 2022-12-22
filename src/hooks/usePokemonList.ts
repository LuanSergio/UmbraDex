import useSWRInfinite from 'swr/infinite';
import getPokemonListData from '@requests/getPokemonListData';

interface IFilterOptions {
  generation?: string[];
  type?: string[];
}

interface IUsePokemonListParams {
  fallback?: IBasicPokemonInfo[][];
  search?: string;
  filterValues?: IFilterOptions;
  sortValue?: string;
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
  sortValue,
}: IUsePokemonListParams): IUsePokemonListResponse {
  const { generation, type } = filterValues;

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return [`pokemonList`, pageIndex, search, generation, type, sortValue];
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    (key, page, searchKey, generationKey, typeKey) =>
      getPokemonListData({
        queryName: key,
        page,
        search: searchKey,
        generationsFilter: generationKey,
        typesFilter: typeKey,
        sortValue,
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
