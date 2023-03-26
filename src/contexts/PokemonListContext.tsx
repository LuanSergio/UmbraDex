import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import usePokemonList from '@hooks/usePokemonList';
import useDebounce from '@hooks/useDebounce';

interface IFilterOptions {
  generation?: number[];
  primaryType?: string[];
  secondaryType?: string[];
}

interface IPokemonListContextData {
  searchValue: string;
  pokemonList: IBasicPokemonInfo[][];
  isLoading: boolean;
  staticData: {
    pokedexLimit: number;
    generations: IGeneration[];
    pokemonTypes: IPokemonType[];
  };
  filterValues: IFilterOptions;
  sortValue: string;
  updateSort: (value: string) => void;
  handleSearchValueChange: (pokemonName: string) => void;
  setPokemonListSize: (
    size: number | ((_size: number) => number),
  ) => Promise<IBasicPokemonInfo[][]>;
  updateFilters: (params: keyof IFilterOptions, value: unknown) => void;
}

export const PokemonListContext = createContext({} as IPokemonListContextData);

interface PokemonListContextProviderProps {
  fallback?: IBasicPokemonInfo[][];
  staticData: {
    pokedexLimit: number;
    generations: IGeneration[];
    pokemonTypes: IPokemonType[];
  };
  children: ReactNode;
}

export function PokemonListContextProvider({
  children,
  fallback,
  staticData,
}: PokemonListContextProviderProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterValues, setFiltersValues] = useState<IFilterOptions>({});
  const [sortValue, setSortValue] = useState<string>('');
  const [hasFilter, setHasFilter] = useState(false);

  const updateFilters = useCallback(
    (params: keyof IFilterOptions, value: unknown): void => {
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
