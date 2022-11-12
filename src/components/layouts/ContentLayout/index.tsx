import { ReactNode } from 'react';

import Header from '@components/molecules/Header';
import { PokemonListContextProvider } from '@contexts/PokemonListContext';

interface ContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps): JSX.Element => {
  return (
    <>
      <PokemonListContextProvider>
        <Header />
      </PokemonListContextProvider>
      <main className="h-container">{children}</main>
    </>
  );
};

export default ContentLayout;
