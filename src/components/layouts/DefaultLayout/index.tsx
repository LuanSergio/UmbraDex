import Header from '@components/molecules/Header';
import { ReactNode } from 'react';

interface DefaultLayoutProps {
  children: ReactNode;
  classes?: string;
}

const HomeLayout = ({
  children,
  classes = '',
}: DefaultLayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      <main className={`h-container ${classes}`}>{children}</main>
    </>
  );
};

HomeLayout.defaultProps = {
  classes: '',
};

export default HomeLayout;
