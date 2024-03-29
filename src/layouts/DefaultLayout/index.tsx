import { ReactNode, useEffect } from 'react';

import { usePokemonListContext } from 'src/contexts/PokemonListContext';
import Header from '@components/Header';

import WebDoor from '@components/WebDoor/WebsDoor';
import useWindowSize from 'src/hooks/useWindowSize';
import { WebDoorContextProvider } from '@components/WebDoor/WebdoorContext';

import styles from './styles.module.scss';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, windowHeight] = useWindowSize();
  const { searchValue } = usePokemonListContext();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--screen-height',
      `${document.documentElement.clientHeight.toString()}px`,
    );
  }, [windowHeight]);

  return (
    <>
      <Header />
      {!(searchValue?.length > 0) && (
        <WebDoorContextProvider>
          <WebDoor />
        </WebDoorContextProvider>
      )}
      <main className={styles.main}>
        <div className="h-container">{children}</div>
      </main>
    </>
  );
};

export default DefaultLayout;
