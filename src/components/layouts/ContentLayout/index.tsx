import { ReactNode } from 'react';

import Header from '@components/molecules/Header';

interface ContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      <main className="h-container">{children}</main>
    </>
  );
};

export default ContentLayout;
