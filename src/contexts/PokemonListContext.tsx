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
  generation?: string[];
  type?: string[];
}

interface IPokemonListContextData {
  searchValue: string;
  pokemonList: IBasicPokemonInfo[][];
  isLoading: boolean;
  pokedexLimit: number;
  handleSearchValueChange: (pokemonName: string) => void;
  setPokemonListSize: (
    size: number | ((_size: number) => number),
  ) => Promise<IBasicPokemonInfo[][]>;
  handleFilterChange: (params: keyof IFilterOptions, value: unknown) => void;
}

export const PokemonListContext = createContext({} as IPokemonListContextData);

interface PokemonListContextProviderProps {
  fallback?: IBasicPokemonInfo[][];
  pokedexLimit: number;
  children: ReactNode;
}

export function PokemonListContextProvider({
  children,
  fallback,
  pokedexLimit,
}: PokemonListContextProviderProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterValues, setFiltersValues] = useState<IFilterOptions>({});

  const handleFilterChange = useCallback(
    (params: keyof IFilterOptions, value: unknown): void => {
      setFiltersValues(currentState => ({
        ...currentState,
        [params]: value,
      }));
    },
    [],
  );

  const {
    pokemonList,
    isLoading,
    setSize: setPokemonListSize,
  } = usePokemonList({
    fallback: searchValue.length ? undefined : fallback,
    search: searchValue,
    filterValues,
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
      pokedexLimit,
      handleSearchValueChange,
      setPokemonListSize,
      handleFilterChange,
    }),
    [
      isLoading,
      pokemonList,
      searchValue,
      pokedexLimit,
      handleSearchValueChange,
      setPokemonListSize,
      handleFilterChange,
    ],
  );

  return (
    <PokemonListContext.Provider value={contextValue}>
      {children}
    </PokemonListContext.Provider>
  );
}

export const usePokemonListContext = () => useContext(PokemonListContext);
