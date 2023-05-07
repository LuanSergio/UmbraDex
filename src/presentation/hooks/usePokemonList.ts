import useSWRInfinite from 'swr/infinite';
import createGetPokemonListUsecase from '@factories/createGetPokemonListUsecase';
import PokemonSummary from '@domain/entities/PokemonSummary';

import POKEMON_PER_REQUEST from 'src/presentation/constants/pokemonPerRequest';

interface IFilterOptions {
  generation?: number[];
  primaryType?: string[];
  secondaryType?: string[];
}

interface IUsePokemonListParams {
  fallback?: PokemonSummary[][];
  search?: string;
  filterValues?: IFilterOptions;
  sortValue?: string;
}

interface IUsePokemonListResponse {
  pokemonList: PokemonSummary[][];
  isLoading: boolean;
  size: number;
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<PokemonSummary[][]>;
}

export default function usePokemonList({
  fallback,
  filterValues,
  search = '',
  sortValue,
}: IUsePokemonListParams): IUsePokemonListResponse {
  const { generation, primaryType, secondaryType } = filterValues;
  const getPokemonListUsecase = createGetPokemonListUsecase();

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return [
      `pokemonList`,
      pageIndex,
      search,
      generation,
      primaryType,
      secondaryType,
      sortValue,
    ];
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    async (
      key,
      page,
      searchKey,
      generationKey,
      primaryTypeKey,
      secondaryTypeKey,
      sortValueKey,
    ) => {
      const response = await getPokemonListUsecase.getAll({
        queryName: key,
        page,
        search: searchKey,
        generationsFilter: generationKey,
        primaryTypeFilter: primaryTypeKey,
        secondaryTypeFilter: secondaryTypeKey,
        sortValue: sortValueKey,
        pokemonPerRequest: POKEMON_PER_REQUEST,
      });

      if (response.isRight()) {
        return response.value;
      }

      throw response.value;
    },
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
