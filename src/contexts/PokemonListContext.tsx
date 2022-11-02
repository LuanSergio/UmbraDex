import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import usePokemonList from '@hooks/usePokemonList';
import useDebounce from '@hooks/useDebounce';

interface IPokemonListContextData {
  searchValue: string;
  pokemonList: IBasicPokemonInfo[][];
  isLoading: boolean;
  handleSearchValueChange: (pokemonName: string) => void;
  setPokemonListSize: (
    size: number | ((_size: number) => number),
  ) => Promise<IBasicPokemonInfo[][]>;
}

export const PokemonListContext = createContext({} as IPokemonListContextData);

type PokemonListContextProviderProps = {
  fallback: IBasicPokemonInfo[][];
  children: ReactNode;
};

export function PokemonListContextProvider({
  children,
  fallback,
}: PokemonListContextProviderProps) {
  const [searchValue, setSearchValue] = useState<string>('');

  const {
    pokemonList,
    isLoading,
    setSize: setPokemonListSize,
  } = usePokemonList({
    fallback: searchValue.length ? undefined : fallback,
    search: searchValue,
  });

  function updateSearchValue(pokemonName: string) {
    setSearchValue(pokemonName);
  }

  const handleSearchValueChange = useDebounce(updateSearchValue, 700);

  const contextValue = useMemo(
    () => ({
      searchValue,
      handleSearchValueChange,
      pokemonList,
      isLoading,
      setPokemonListSize,
    }),
    [
      handleSearchValueChange,
      isLoading,
      pokemonList,
      searchValue,
      setPokemonListSize,
    ],
  );

  return (
    <PokemonListContext.Provider value={contextValue}>
      {children}
    </PokemonListContext.Provider>
  );
}

export const usePokemonListContext = () => useContext(PokemonListContext);
