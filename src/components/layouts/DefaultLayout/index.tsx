import { ReactNode, useEffect } from 'react';

import { usePokemonListContext } from '@contexts/PokemonListContext';
import Header from '@components/molecules/Header';
import WebDoor from '@components/molecules/WebDoor';
import useWindowSize from '@hooks/useWindowSize';

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
      {!(searchValue?.length > 0) && <WebDoor />}
      <main className={styles.main}>
        <div className="h-container">{children}</div>
      </main>
    </>
  );
};

export default DefaultLayout;
