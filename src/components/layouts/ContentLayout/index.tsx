import { ReactNode } from 'react';

import Header from '@components/molecules/Header';
import { PokemonListContextProvider } from '@contexts/PokemonListContext';
import { ThemeContextProvider } from '@contexts/ThemeContext';

interface ContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps): JSX.Element => {
  return (
    <>
      <PokemonListContextProvider>
        <ThemeContextProvider>
          <Header />
        </ThemeContextProvider>
      </PokemonListContextProvider>
      <main className="h-container">{children}</main>
    </>
  );
};

export default ContentLayout;
