import Head from 'next/head';
import PokemonCard from '../components/molecules/PokemonCard';

function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>UmbraDex</title>
      </Head>

      <main>
        <h1>UmbraDex</h1>
        <PokemonCard  id={1} name="bulbassaur" type="grass" imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" />
      </main>
    </div>
  );
}

export default Home;
