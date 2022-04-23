import { ReactNode } from 'react';

import Header from '@components/molecules/Header';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      <main className="h-container">{children}</main>
    </>
  );
};

export default DefaultLayout;
