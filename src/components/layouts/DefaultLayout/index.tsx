import Header from '@components/molecules/Header';
import { ReactNode } from 'react';

interface DefaultLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: DefaultLayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
    </>
  );
};

export default HomeLayout;
