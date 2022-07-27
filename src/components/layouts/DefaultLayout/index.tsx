import { ReactNode, useEffect } from 'react';

import Header from '@components/molecules/Header';
import WebDoor from '@components/molecules/WebDoor';
import useWindowSize from '@hooks/useWindowSize';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, windowHeight] = useWindowSize();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--webdoor-height',
      `${document.documentElement.clientHeight.toString()}px`,
    );
  }, [windowHeight]);

  return (
    <>
      <Header />
      <WebDoor />
      <main className="h-container">{children}</main>
    </>
  );
};

export default DefaultLayout;
