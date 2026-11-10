import Head from 'next/head';

import OfflineMessage from '@components/OfflineMessage';

const OfflinePage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Offline | UmbraDex</title>
        <meta name="robots" content="noindex" />
      </Head>
      <OfflineMessage />
    </>
  );
};

export default OfflinePage;
