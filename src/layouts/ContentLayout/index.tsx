import { ReactNode } from 'react';

interface ContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps): JSX.Element => {
  return (
    <>
      <main className="h-container">{children}</main>
    </>
  );
};

export default ContentLayout;
