import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import PokemonSummary from '@domain/entities/PokemonSummary';
import PokemonType from '@domain/entities/PokemonType';
import Generation from '@domain/entities/Generation';

import usePokemonList from 'src/hooks/usePokemonList';
import useDebounce from 'src/hooks/useDebounce';

interface FilterOptions {
  generation?: number[];
  primaryType?: string[];
  secondaryType?: string[];
}

interface PokemonListContextData {
  searchValue: string;
  pokemonList: PokemonSummary[][];
  isLoading: boolean;
  staticData: {
    pokedexLimit: number;
    generations: Generation[];
    pokemonTypes: PokemonType[];
  };
  filterValues: FilterOptions;
  sortValue: string;
  updateSort: (value: string) => void;
  handleSearchValueChange: (pokemonName: string) => void;
  setPokemonListSize: (
    size: number | ((_size: number) => number),
  ) => Promise<PokemonSummary[][]>;
  updateFilters: (params: keyof FilterOptions, value: unknown) => void;
}

export const PokemonListContext = createContext({} as PokemonListContextData);

interface PokemonListContextProviderProps {
  fallback?: PokemonSummary[][];
  staticData: {
    pokedexLimit: number;
    generations: Generation[];
    pokemonTypes: PokemonType[];
  };
  children: ReactNode;
}

export function PokemonListContextProvider({
  children,
  fallback,
  staticData,
}: PokemonListContextProviderProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterValues, setFiltersValues] = useState<FilterOptions>({});
  const [sortValue, setSortValue] = useState<string>('');
  const [hasFilter, setHasFilter] = useState(false);

  const updateFilters = useCallback(
    (params: keyof FilterOptions, value: unknown): void => {
      setFiltersValues(currentState => ({
        ...currentState,
        [params]: value,
      }));
    },
    [],
  );

  const updateSort = useCallback((value: string): void => {
    setSortValue(value);
  }, []);

  useEffect(() => {
    if (
      searchValue.length ||
      Object.values(filterValues).filter(item => item?.length > 0).length
    ) {
      setHasFilter(true);
      return;
    }

    setHasFilter(false);
  }, [filterValues, searchValue]);

  const {
    pokemonList,
    isLoading,
    setSize: setPokemonListSize,
  } = usePokemonList({
    fallback: hasFilter ? undefined : fallback,
    search: searchValue,
    filterValues,
    sortValue,
  });

  function updateSearchValue(pokemonName: string) {
    setSearchValue(pokemonName.toLowerCase());
  }

  const handleSearchValueChange = useDebounce(updateSearchValue, 700);

  const contextValue = useMemo(
    () => ({
      isLoading,
      pokemonList,
      searchValue,
      staticData,
      filterValues,
      sortValue,
      handleSearchValueChange,
      updateSort,
      setPokemonListSize,
      updateFilters,
    }),
    [
      isLoading,
      pokemonList,
      searchValue,
      staticData,
      filterValues,
      sortValue,
      updateSort,
      handleSearchValueChange,
      setPokemonListSize,
      updateFilters,
    ],
  );

  return (
    <PokemonListContext.Provider value={contextValue}>
      {children}
    </PokemonListContext.Provider>
  );
}

export const usePokemonListContext = () => useContext(PokemonListContext);
