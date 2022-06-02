import { ReactNode } from 'react';

import Header from '@components/molecules/Header';
import WebDoor from '@components/molecules/WebDoor';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      <WebDoor />
      <main className="h-container">{children}</main>
    </>
  );
};

export default DefaultLayout;
