import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface ISearchContextData {
  searchValue: string;
  updateSearchValue: (product: string) => void;
}

export const SearchContext = createContext({} as ISearchContextData);

type SearchContextProviderProps = {
  children: ReactNode;
};

export function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchValue, setSearchValue] = useState<string>('');

  function updateSearchValue(product: string) {
    setSearchValue(product);
  }

  const contextValue = useMemo(
    () => ({ searchValue, updateSearchValue }),
    [searchValue],
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);
