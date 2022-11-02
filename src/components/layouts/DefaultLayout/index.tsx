import { ReactNode, useEffect } from 'react';

import Header from '@components/molecules/Header';
import WebDoor from '@components/molecules/WebDoor';
import useWindowSize from '@hooks/useWindowSize';
import { usePokemonListContext } from '@contexts/PokemonListContext';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, windowHeight] = useWindowSize();
  const { searchValue } = usePokemonListContext();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--webdoor-height',
      `${document.documentElement.clientHeight.toString()}px`,
    );
  }, [windowHeight]);

  return (
    <>
      <Header />
      {!searchValue?.length && <WebDoor />}
      <main
        className="h-container"
        style={{ paddingTop: `${searchValue?.length > 0 ? '64px' : '0'}` }}
      >
        {children}
      </main>
    </>
  );
};

export default DefaultLayout;
