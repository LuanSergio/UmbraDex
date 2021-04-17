import Head from 'next/head';
import HomeLayout from '../components/layouts/HomeLayout';

function Home() {
  return (
    <div>
      <Head>
        <title>UmbraDex</title>
      </Head>
      <HomeLayout />
    </div>
  );
}

export default Home;
